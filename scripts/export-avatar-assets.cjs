const fs = require("node:fs");
const path = require("node:path");
const React = require("react");
const { renderToStaticMarkup: render } = require("react-dom/server");
const {
  EQUIPMENT_OPTIONS_IDS: sets, SETS_BASICS_CATALOG: catalog, SLOT_LABELS,
  createSetAvatar, AvatarModule, PlayerLowPolyAvatar, EquipmentPiecePreviewSvg, AVATAR_RIG, REFERENCE_ATLAS_URL,
} = require("./lib/load-avatar.cjs");

const output = path.resolve(__dirname, "../public/avatars");
const slots = Object.keys(SLOT_LABELS);
const genders = ["male", "female"];
const escape = (text) => text.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll('"', "&quot;");
const write = (relative, contents) => {
  const file = path.join(output, relative);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const texturePath = relative.includes("/") ? "../../reference/sets-basics.png" : "reference/sets-basics.png";
  fs.writeFileSync(file, contents.replaceAll(REFERENCE_ATLAS_URL, texturePath), "utf8");
};
let renderId = 0;
const element = (component, props) => {
  const prefix = "export-" + (++renderId) + "-";
  const node = React.createElement(component, props);
  const markup = component === AvatarModule
    ? render(React.createElement("svg", null, node)).replace(/^<svg[^>]*>|<\/svg>$/g, "")
    : render(node);
  return markup
    .replace(/id="([^"]+)"/g, (_, id) => 'id="' + prefix + id + '"')
    .replace(/url\(#([^)]*)\)/g, (_, id) => "url(#" + prefix + id + ")");
};
// Keep stable, unique node names when opening the exports in a vector editor.
const namedGroups = (svg, prefix) => {
  const counts = {};
  return svg.replace(/<g([^>]*)>/g, (tag, attributes) => {
    const name = attributes.match(/data-part="([^"]*)"/)?.[1]
      ?? attributes.match(/data-slot="([^"]*)"/)?.[1];
    if (!name) return tag;
    counts[name] = (counts[name] ?? 0) + 1;
    return `<g id="${prefix}-${name}-${counts[name]}"${attributes}>`;
  });
};
const place = (svg, x, y, width, height) =>
  svg.replace("<svg ", `<svg x="${x}" y="${y}" width="${width}" height="${height}" `);
const text = (x, y, label, size = 12, color = "#C7D4E8") =>
  `<text x="${x}" y="${y}" fill="${color}" font-family="Arial,sans-serif" font-size="${size}">${escape(label)}</text>`;
let sheet = '<svg xmlns="http://www.w3.org/2000/svg" width="1500" height="1240" viewBox="0 0 1500 1240"><rect width="1500" height="1240" fill="#0A1020"/>';
sheet += text(32, 38, "SOBREVIVIENDO A LA UNIVERSIDAD", 24, "#F1F5FF");
sheet += text(32, 62, "10 conjuntos originales · 40 piezas · Arte de la referencia", 14);
const manifest = { version: 2, format: "SVG clips with original PNG texture", source: "reference/sets-basics.png", rig: AVATAR_RIG,
  assemblyOrder: ["legs", "head", "chest", "hands"],
  sets: [] };

genders.forEach((gender, row) => {
  const rowY = 112 + row * 560;
  sheet += text(32, rowY - 12, gender === "male" ? "MASCULINO" : "FEMENINO", 16, gender === "male" ? "#65C8ED" : "#B5A0E4");
  sets.forEach((setId, column) => {
    const config = createSetAvatar(setId, gender);
    const meta = catalog[setId];
    const folder = `${gender}/${setId}`;
    const full = element(PlayerLowPolyAvatar, { config });
    write(`${folder}/character.svg`, namedGroups(full.replace("<svg ", '<svg width="240" height="340" '), `${gender}-${setId}`));
    const pieces = {};
    const x = 24 + column * 294;
    sheet += `<rect x="${x}" y="${rowY}" width="282" height="530" rx="12" fill="#101C31" stroke="#2C405E"/>`;
    sheet += text(x + 14, rowY + 25, meta.setName, 16, "#F1F5FF");
    sheet += text(x + 14, rowY + 45, meta.badgeLabel, 11, "#E7BE65");
    sheet += place(full, x + 21, rowY + 53, 240, 340);
    slots.forEach((slot, index) => {
      const props = { slot, setId, gender, colors: config.slotColors[slot],
        skinColor: config.skinColor, hairColor: config.hairColor };
      const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="' + AVATAR_RIG.viewBox +
        '" width="240" height="340">' + element(AvatarModule, props) + '</svg>';
      const filename = `${folder}/${slot}.svg`;
      write(filename, namedGroups(svg, `${gender}-${setId}-${slot}`));
      pieces[slot] = filename;
      const miniX = x + 9 + index * 67;
      sheet += `<rect x="${miniX}" y="${rowY + 401}" width="63" height="110" rx="6" fill="#0A1324"/>`;
      sheet += place(element(EquipmentPiecePreviewSvg, props), miniX + 3, rowY + 406, 57, 79);
      sheet += text(miniX + 4, rowY + 502, SLOT_LABELS[slot], 10);
    });
    manifest.sets.push({ id: setId, gender, name: meta.setName, unlockLevel: meta.unlockLevel,
      character: `${folder}/character.svg`, pieces });
  });
});
sheet += text(32, 1212, "Arte original conservado · Piezas recortadas de la referencia · Calzado incluido en Pantalones", 13);
sheet += "</svg>";
write("collection.svg", sheet);
write("collection.html", '<!doctype html><html lang="es"><meta charset="utf-8"><title>Colección original</title><style>body{margin:0;background:#0A1020}svg{display:block}</style><body>' + sheet + '</body></html>');
write("manifest.json", JSON.stringify(manifest, null, 2) + "\n");
console.log("Exported 40 clipped modules, 10 original characters, collection and source manifest.");
