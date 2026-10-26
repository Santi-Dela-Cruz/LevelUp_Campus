const fs = require('node:fs');
const path = require('node:path');
const React = require('react');
const { renderToStaticMarkup: render } = require('react-dom/server');
const { CONSTRUCTED_SETS, CONSTRUCTED_RIG, createSetAvatar, PlayerLowPolyAvatar, EquipmentPiecePreviewSvg, ConstructedModule, SLOT_LABELS, SETS_BASICS_CATALOG } = require('./lib/load-avatar.cjs');
const out = path.resolve(__dirname, '../public/avatars/constructed');
const write = (file, data) => { const destination = path.join(out, file); fs.mkdirSync(path.dirname(destination), { recursive: true }); fs.writeFileSync(destination, data); };
let renderIndex = 0;
const element = (component, props) => render(React.createElement(component, props), { identifierPrefix: 'export-' + (++renderIndex) + '-' });
const nameGroups = (svg, prefix) => {
  const counts = {};
  return svg.replace(/<g([^>]*)>/g, (tag, attrs) => {
    const name = attrs.match(/data-bone="([^"]+)"/)?.[1] || attrs.match(/data-part="([^"]+)"/)?.[1];
    if (!name) return tag;
    counts[name] = (counts[name] || 0) + 1;
    return '<g id="' + prefix + '-' + name + '-' + counts[name] + '"' + attrs + '>';
  });
};
const place = (svg, x, y, w, h) => svg.replace('<svg ', '<svg x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" ');
const label = (x, y, value, size = 14, color = '#C4CDEB') => '<text x="'+x+'" y="'+y+'" font-family="Arial,sans-serif" font-size="'+size+'" fill="'+color+'">'+value+'</text>';
const manifest = { version: 1, delivery: 2, revision: 3, format: 'Self-contained vector SVG; no raster images', rig: CONSTRUCTED_RIG, variants: [] };
for (const gender of ['male','female']) for (const setId of CONSTRUCTED_SETS) {
  const config = createSetAvatar(setId, gender), folder = gender+'/'+setId;
  write(folder+'/character.svg', nameGroups(element(PlayerLowPolyAvatar, { config }), gender+'-'+setId));
  const pieces = {};
  for (const slot of Object.keys(SLOT_LABELS)) {
    const props = { slot, setId, gender, colors: config.slotColors[slot] };
    const svg = render(React.createElement('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: CONSTRUCTED_RIG.viewBox }, React.createElement(ConstructedModule, props)));
    pieces[slot] = folder+'/'+slot+'.svg';
    write(pieces[slot], nameGroups(svg, gender+'-'+setId+'-'+slot));
  }
  manifest.variants.push({ setId, gender, character: folder+'/character.svg', pieces });
}
function sheet(setIds, file, subtitle) {
  const rows = Math.ceil(setIds.length * 2 / 4), height = 110 + rows * 810;
  let svg = '<svg xmlns="http://www.w3.org/2000/svg" width="1440" height="'+height+'" viewBox="0 0 1440 '+height+'"><rect width="1440" height="'+height+'" fill="#090F23"/>';
  svg += label(30, 40, 'SOBREVIVIENDO A LA UNIVERSIDAD · CONSTRUCCIÓN VECTORIAL', 23, '#F5F5FF');
  svg += label(30, 68, subtitle, 15);
  let index = 0;
  for (const gender of ['male','female']) for (const setId of setIds) {
    const config = createSetAvatar(setId, gender), x = 24 + (index % 4) * 354, y = Math.floor(index++ / 4) * 810;
    svg += '<rect x="'+x+'" y="'+(94+y)+'" width="336" height="791" rx="12" fill="#141C36" stroke="#485785"/>';
    svg += label(x+18,y+125,SETS_BASICS_CATALOG[setId].setName,20,'#F3F3FF');
    svg += label(x+18,y+149,gender === 'male' ? 'MASCULINO' : 'FEMENINO',12,'#75CFEA');
    svg += place(element(PlayerLowPolyAvatar, { config }),x+18,y+165,300,425);
    Object.keys(SLOT_LABELS).forEach((slot,i)=>{
      const sx=x+18+(i%2)*152, sy=y+602+Math.floor(i/2)*132;
      svg += '<rect x="'+sx+'" y="'+sy+'" width="146" height="120" rx="7" fill="#0B1229" stroke="#2C3D60"/>';
      svg += place(element(EquipmentPiecePreviewSvg, { slot,setId,gender,colors:config.slotColors[slot] }),sx+15,sy+6,116,87);
      svg += label(sx+14,sy+110,SLOT_LABELS[slot],12);
    });
  }
  svg += '</svg>';
  write(file+'.svg',svg);
  write(file+'.html','<!doctype html><html lang="es"><meta charset="utf-8"><title>'+subtitle+'</title><style>body{margin:0;background:#090F23}svg{display:block;width:100%;height:auto}</style><body>'+svg+'</body></html>');
}
sheet(['base','set1'],'delivery-1','ENTREGA 1 · REVISIÓN 3 / Universitario + Académico / 4 personajes · 16 piezas');
sheet(['set2','set3'],'delivery-2','ENTREGA 2 / Deportivo + Tecnológico / 4 personajes · 16 piezas');
sheet(CONSTRUCTED_SETS,'collection','COLECCIÓN ACTUAL / 4 sets · 8 personajes · 32 piezas / Vista tres cuartos');
write('manifest.json',JSON.stringify(manifest,null,2));
console.log('Exported 8 vector characters, 32 modules, two delivery sheets, full collection and rig manifest.');
