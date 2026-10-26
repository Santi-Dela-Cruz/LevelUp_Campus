// Run against the local app and an isolated Chromium/Edge instance with CDP on 9222.
// Override DASHBOARD_URL and CDP_URL when using other local ports.
const assert = require('node:assert/strict');
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
  const base = process.env.DASHBOARD_URL || 'http://127.0.0.1:3000';
  const html = await (await fetch(base)).text();
  const styles = [...html.matchAll(/href="([^"]+\.css[^"]*)"/g)];
  assert(styles.length, 'The page must load a stylesheet');
  for (const [, path] of styles) assert.equal((await fetch(new URL(path, base))).status, 200, 'Stylesheet must load');
  for (const [, path] of html.matchAll(/src="([^"]+\.js[^"]*)"/g)) {
    assert.equal((await fetch(new URL(path, base))).status, 200, `JavaScript must load: ${path}`);
  }
  assert(!html.includes('visibility:hidden'), 'Server-rendered dashboard must not wait invisibly for hydration');
  const tabs = await (await fetch((process.env.CDP_URL || 'http://127.0.0.1:9222') + '/json/list')).json();
  const socket = new WebSocket(tabs.find(tab => tab.type === 'page' && !tab.url.startsWith('edge:')).webSocketDebuggerUrl);
  await new Promise(resolve => socket.onopen = resolve);
  let id = 0;
  const pending = new Map(), errors = [];
  socket.onmessage = event => {
    const message = JSON.parse(event.data);
    if (message.method === 'Runtime.exceptionThrown') errors.push(message.params.exceptionDetails.text);
    if (message.id) { const request = pending.get(message.id); pending.delete(message.id); message.error ? request.reject(message.error) : request.resolve(message.result); }
  };
  const send = (method, params = {}) => new Promise((resolve, reject) => { const key = ++id; pending.set(key, { resolve, reject }); socket.send(JSON.stringify({ id: key, method, params })); });
  const evaluate = async expression => {
    const result = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
    assert(!result.exceptionDetails, JSON.stringify(result.exceptionDetails));
    return result.result.value;
  };
  const click = async expression => {
    const point = await evaluate(`(()=>{const element=${expression}; if(!element)throw Error('Missing control'); const r=element.getBoundingClientRect();const x=r.x+r.width/2,y=r.y+r.height/2; return {x,y,reachable:element.contains(document.elementFromPoint(x,y))};})()`);
    assert(point.reachable, `Control is obscured: ${expression}`);
    await send('Input.dispatchMouseEvent', { type: 'mousePressed', x: point.x, y: point.y, button: 'left', clickCount: 1 });
    await send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: point.x, y: point.y, button: 'left', clickCount: 1 });
    await delay(160);
  };
  const button = text => `[...document.querySelectorAll('button')].find(button=>button.textContent.trim()===${JSON.stringify(text)})`;
  const section = name => click(`document.querySelector('[data-section="${name}"]')`);
  const checkViewport = async () => {
    const metrics = await evaluate(`(()=>{window.scrollTo(0,9999);return {scroll:[scrollX,scrollY],size:[document.documentElement.scrollWidth,document.documentElement.scrollHeight],viewport:[innerWidth,innerHeight],outside:[...document.querySelectorAll('main button, [role="dialog"] button')].filter(b=>{const r=b.getBoundingClientRect();return r.width&&r.height&&(r.left < -1||r.top < -1||r.right>innerWidth+1||r.bottom>innerHeight+1)}).map(b=>b.textContent)}})()`);
    assert.deepEqual(metrics.scroll, [0, 0]); assert.deepEqual(metrics.size, metrics.viewport); assert.deepEqual(metrics.outside, [], 'All controls fit the screen');
  };
  try {
    await send('Runtime.enable'); await send('Page.enable');
    await send('Network.enable');
    await send('Network.setBlockedURLs', { urls: ['*sets-basics.png*'] });
    await send('Page.navigate', { url: base }); await delay(1500);
    await evaluate(`localStorage.setItem('university-display',JSON.stringify({guideEnabled:false}))`);
    await send('Page.reload'); await delay(1500);
    for (const [width, height] of [[1440,900],[1303,643],[1024,768]]) {
      await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: false }); await delay(200);
      for (const name of ['inicio','perfil','misiones','modulos','insignias','estadisticas','configuracion']) {
        await section(name);
        assert.equal(await evaluate(`document.querySelector('[aria-current="page"]').dataset.section`), name);
        await checkViewport();
      }
      await section('modulos'); await click(button('Continuar')); await checkViewport();
      await click(button('← Volver a módulos'));
      assert.equal(await evaluate(`document.querySelector('[aria-current="page"]').dataset.section`), 'modulos');
      assert.equal(await evaluate(`!!document.querySelector('.module-screen')`), false);
      await section('perfil');
      await click(`document.querySelector('button[title^="Ver Lámina"]')`); await checkViewport();
      assert.equal(await evaluate(`document.querySelectorAll('.set-catalog > div').length`), 4);
      await click(`document.querySelector('.sets-gender-tabs button:nth-child(2)')`);
      assert.equal(await evaluate(`document.querySelectorAll('.set-catalog [data-avatar-body="female"]').length`), 4);
      await click(`[...document.querySelectorAll('.set-catalog button')].find(b=>b.textContent==='Equipar conjunto')`);
      await delay(450); // Allow AnimatePresence to remove the closing dialog.
      assert.equal(await evaluate(`!!document.querySelector('[role="dialog"]')`), false);
      assert.equal(await evaluate(`[...document.querySelectorAll('button')].find(b=>b.textContent.includes('Guardar cambios')).disabled`), false);
      await click(button('Cancelar'));
      assert.equal(await evaluate(`[...document.querySelectorAll('button')].find(b=>b.textContent.includes('Guardar cambios')).disabled`), false);
      await click(`document.querySelector('button[title^="Ver Lámina"]')`);
      await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Escape', code: 'Escape' }); await delay(500);
      assert.equal(await evaluate(`!!document.querySelector('[role="dialog"]')`), false);
      for (const gender of ['male', 'female']) for (const setId of ['set2', 'set3']) {
        await click(`document.querySelector('button[title^="Ver Lámina"]')`);
        await click(`document.querySelector('.sets-gender-tabs button:nth-child(${gender === 'male' ? 1 : 2})')`);
        await click(`document.querySelector('.set-catalog [data-set="${setId}"] button')`);
        await delay(450);
        assert.equal(await evaluate(`!!document.querySelector('.profile-layout [data-complete-set="${setId}"][data-avatar-body="${gender}"][data-renderer="constructed-vector"]')`), true);
        await checkViewport();
        await click(button('Cancelar'));
      }
    }
    // Save a mixed outfit + all appearance channels; verify persistence after reload.
    await section('perfil');
    const originalSaved = await evaluate(`localStorage.getItem('player-avatar')`);
    await click(`document.querySelector('button[title^="Ver Lámina"]')`);
    await click(`document.querySelector('.set-catalog [data-set="set2"] button')`); await delay(450);
    await click(`document.querySelector('.piece-options button')`);
    for (const [name, color] of [['piel', '#38DC85'], ['cabello', '#FFFFFF'], ['ojos', '#00FFFF']]) {
      await click(`[...document.querySelectorAll('.color-crystal-trigger')].find(b=>b.getAttribute('aria-label').includes('${name}'))`);
      await checkViewport();
      if (name === 'piel') {
        const wheel = await evaluate(`(()=>{const r=document.querySelector('.color-wheel').getBoundingClientRect();return {x:r.right-2,y:r.top+r.height/2}})()`);
        await send('Input.dispatchMouseEvent', {type:'mousePressed', ...wheel, button:'left', clickCount:1});
        await send('Input.dispatchMouseEvent', {type:'mouseReleased', ...wheel, button:'left', clickCount:1});
        await delay(100);
        const channels = await evaluate(`[...document.querySelectorAll('.color-channel input')].map(e=>Number(e.value))`);
        assert(Math.abs(channels[0] - 90) < 2, 'Right edge of the wheel corresponds to hue 90');
        assert(channels[1] > 95, 'Radius controls saturation');
      }
      await evaluate(`(()=>{const input=document.querySelector('input[aria-label="Código hexadecimal"]');Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(input,'${color}');input.dispatchEvent(new Event('input',{bubbles:true}));})()`);
      await delay(100);
      await click(button('Aplicar'));
      assert.equal(await evaluate(`!!document.querySelector('.color-crystal-panel')`), false);
    }
    await evaluate(`window.originalStorageSet = Storage.prototype.setItem; Storage.prototype.setItem = function(){throw new Error('Storage unavailable')}`);
    await click(button('Guardar cambios'));
    assert.match(await evaluate(`document.querySelector('[role="alert"]').textContent`), /No se pudo guardar/);
    assert.equal(await evaluate(`localStorage.getItem('player-avatar')`), originalSaved, 'Failed saves must not overwrite stored appearance');
    await evaluate(`Storage.prototype.setItem = window.originalStorageSet; delete window.originalStorageSet`);
    await click(button('Guardar cambios'));
    const saved = await evaluate(`JSON.parse(localStorage.getItem('player-avatar'))`);
    assert.equal(saved.chestEquip, 'set2'); assert.equal(saved.headEquip, 'base');
    assert.equal(saved.skinColor, '#38DC85'); assert.equal(saved.hairColor, '#FFFFFF'); assert.equal(saved.eyeColor, '#00FFFF');
    await send('Page.reload'); await delay(1500); await section('perfil');
    assert(await evaluate(`!!document.querySelector('.profile-layout [data-color-role="skin"][fill="#38dc85"]')`));
    await click(`document.querySelector('button[title^="Ver Lámina"]')`);
    await click(`document.querySelector('.set-catalog [data-set="set3"] button')`); await delay(450);
    await click(button('Cancelar'));
    assert.equal(await evaluate(`localStorage.getItem('player-avatar')`), JSON.stringify(saved));
    await click(`document.querySelector('.color-crystal-trigger')`);
    await send('Input.dispatchKeyEvent', {type:'keyDown', key:'Escape', code:'Escape'}); await delay(150);
    assert.equal(await evaluate(`!!document.querySelector('.color-crystal-panel')`), false);
    // Restore the test browser's previous saved appearance.
    await evaluate(originalSaved === null ? `localStorage.removeItem('player-avatar')` : `localStorage.setItem('player-avatar',${JSON.stringify(originalSaved)})`);
    await send('Page.reload'); await delay(1500);
    await section('inicio');
    await click(`document.querySelector('input[aria-label="Buscar secciones o materias"]')`);
    await send('Input.insertText', { text: 'Gestion' }); await delay(150);
    await click(`document.querySelector('.search-results button')`);
    assert.equal(await evaluate(`document.querySelector('[aria-current="page"]').dataset.section`), 'modulos');
    assert.match(await evaluate(`document.querySelector('.module-screen h2').textContent`), /Gestión/);
    await section('misiones'); await click(button('Ir a misión')); await click(button('← Volver a módulos'));
    await section('inicio');
    await send('Emulation.setDeviceMetricsOverride', { width: 1303, height: 643, deviceScaleFactor: 1, mobile: false });
    assert.deepEqual(errors, [], 'No uncaught browser errors');
    console.log('PASS: CSS 200, seven sections at three viewport sizes, no scroll or offscreen controls, module return, missions, search, both outfit catalogs, free outfit previews, mixed outfit + skin/hair/eye save/reload, color picker, cancel and Escape.');
  } finally { await send('Network.setBlockedURLs', { urls: [] }); socket.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
