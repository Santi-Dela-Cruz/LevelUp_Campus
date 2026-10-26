const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const React = require('react');
const { renderToStaticMarkup: render } = require('react-dom/server');
const { CONSTRUCTED_SETS: sets, CONSTRUCTED_RIG: rig, ConstructedModule, SETS_BASICS_CATALOG: catalog,
  createSetAvatar, PlayerLowPolyAvatar, EquipmentPiecePreviewSvg, canEquipSet } = require('./lib/load-avatar.cjs');
const slots = { head: 'headEquip', chest: 'chestEquip', hands: 'handsEquip', legs: 'legsEquip' };
const element = (component, props) => render(React.createElement(component, props));
function assertVector(markup) {
  assert.doesNotMatch(markup, /<image\b|<foreignObject\b|data:image|sets-basics\.png|<mask\b|<clipPath\b/, 'Native art must not use raster crops or embedded images');
  assert.doesNotMatch(markup, /NaN|undefined|Infinity/);
  assert(markup.includes('<polygon'), 'Clothing must contain its own geometry');
}
let combinations = 0, modules = 0;
for (const gender of ['male', 'female']) {
  for (const setId of sets) {
    const config = createSetAvatar(setId, gender);
    const full = element(PlayerLowPolyAvatar, { config });
    assertVector(full);
    assert(full.includes('data-renderer="constructed-vector"'));
    for (const slot of Object.keys(slots)) {
      const props = { slot, setId, gender, colors: config.slotColors[slot] };
      const svg = render(React.createElement('svg', null, React.createElement(ConstructedModule, props)));
      const preview = element(EquipmentPiecePreviewSvg, props);
      assertVector(svg); assertVector(preview);
      assert(svg.includes('data-slot="' + slot + '"'));
      assert(preview.includes('data-vector-preview="' + slot + '"'));
      modules++;
    }
    assert(canEquipSet(setId, catalog[setId].unlockLevel));
    assert(canEquipSet(setId, 0), "Constructed outfits are freely available during design");
  }
  for (const head of sets) for (const chest of sets) for (const hands of sets) for (const legs of sets) {
    const config = { ...createSetAvatar('base', gender), headEquip: head, chestEquip: chest, handsEquip: hands, legsEquip: legs };
    const markup = element(PlayerLowPolyAvatar, { config });
    assertVector(markup);
    const bones = [...markup.matchAll(/data-bone="([^"]+)"/g)].map(match => match[1]);
    assert.equal(new Set(bones).size, bones.length, 'Only one transform per skeleton joint');
    assert.deepEqual(bones.slice().sort(), Object.keys(rig.joints).sort());
    for (const [slot, set] of Object.entries({ head, chest, hands, legs })) assert(markup.includes('data-slot="' + slot + '" data-set="' + set + '"'));
    for (const [name, parent] of Object.entries(rig.parent)) assert(name in rig.joints && parent in rig.joints);
    combinations++;
  }
}
// Changing an appearance channel must only affect polygons in that channel.
const polygons = markup => [...markup.matchAll(/<polygon[^>]+>/g)].map(([tag]) => ({
  fill: tag.match(/fill="([^"]+)"/)?.[1], role: tag.match(/data-color-role="([^"]+)"/)?.[1],
}));
for (const gender of ['male', 'female']) for (const set of sets) {
  const config = createSetAvatar(set, gender);
  const original = polygons(element(PlayerLowPolyAvatar, { config }));
  for (const [channel, role] of [['skinColor', 'skin'], ['hairColor', 'hair'], ['eyeColor', 'eye']]) {
    for (const color of ['#FFFFFF', '#111111', '#38DC85']) {
      const changed = polygons(element(PlayerLowPolyAvatar, { config: { ...config, [channel]: color } }));
      assert.equal(changed.length, original.length);
      let differences = 0;
      original.forEach((polygon, i) => {
        if (polygon.role !== role) assert.equal(changed[i].fill, polygon.fill, channel + ' must not tint clothes, other features or eye whites');
        else if (changed[i].fill !== polygon.fill) differences++;
      });
      assert(differences > 0, channel + ' must change every outfit');
    }
  }
  const preview = element(EquipmentPiecePreviewSvg, { slot: 'head', setId: set, gender, skinColor: '#38DC85', hairColor: '#FFFFFF', eyeColor: '#00FFFF', colors: config.slotColors.head });
  assert(preview.includes('fill="#38dc85"'), 'Piece previews must apply the same skin palette');
}
assert(!canEquipSet('set4', 99), 'Unconstructed outfit stays outside this delivery');
const out = path.resolve(__dirname, '../public/avatars/constructed');
const manifest = JSON.parse(fs.readFileSync(path.join(out, 'manifest.json'), 'utf8'));
assert.equal(manifest.variants.length, sets.length * 2);
for (const variant of manifest.variants) {
  assertVector(fs.readFileSync(path.join(out, variant.character), 'utf8'));
  for (const file of Object.values(variant.pieces)) assertVector(fs.readFileSync(path.join(out, file), 'utf8'));
}
assertVector(fs.readFileSync(path.join(out, 'delivery-1.svg'), 'utf8'));
assertVector(fs.readFileSync(path.join(out, 'delivery-2.svg'), 'utf8'));
const collection = fs.readFileSync(path.join(out, 'collection.svg'), 'utf8');
const filterIds = [...collection.matchAll(/id="([^"]+)"/g)].map(match => match[1]);
assert.equal(filterIds.length, new Set(filterIds).size, 'Collection filters must not collide');
assert.doesNotMatch(collection, /\[data-avatar-body\]\s/, 'Color filters must be scoped to an individual character');
console.log('PASS: ' + sets.length * 2 + ' constructed characters, ' + modules + ' vector pieces, ' + combinations + ' modular combinations, 16 unique joints, free equipment, isolated skin/hair/eye palettes, and no raster art.');
