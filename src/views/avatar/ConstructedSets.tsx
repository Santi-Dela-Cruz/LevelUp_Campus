"use client";

import React from "react";
import type { BodyGenderType, EquipmentSetId, EquipmentSlotKey, PlayerAvatarConfig } from "../../models/entities/UserProgress.model";

export const CONSTRUCTED_SETS = ["base", "set1", "set2", "set3"] as const;
export type ConstructedSet = typeof CONSTRUCTED_SETS[number];
export const isConstructedSet = (set: EquipmentSetId): set is ConstructedSet => set !== "set4";
/** Projected joints, shared by every garment. Left on screen is the nearer side. */
export const CONSTRUCTED_RIG = {
  viewBox: "0 0 240 340", projection: "three-quarter-right",
  joints: { root: [120, 327], pelvis: [119, 193], spine: [122, 150], neck: [123, 101],
    "shoulder-left": [78, 119], "shoulder-right": [159, 119],
    "elbow-left": [62, 158], "elbow-right": [173, 158],
    "wrist-left": [54, 195], "wrist-right": [183, 194],
    "hip-left": [101, 198], "hip-right": [137, 198],
    "knee-left": [92, 253], "knee-right": [149, 254],
    "ankle-left": [84, 305], "ankle-right": [151, 306] },
  parent: { pelvis: "root", spine: "pelvis", neck: "spine", "shoulder-left": "spine", "shoulder-right": "spine",
    "elbow-left": "shoulder-left", "elbow-right": "shoulder-right", "wrist-left": "elbow-left", "wrist-right": "elbow-right",
    "hip-left": "pelvis", "hip-right": "pelvis", "knee-left": "hip-left", "knee-right": "hip-right", "ankle-left": "knee-left", "ankle-right": "knee-right" },
} as const;
type Bone = keyof typeof CONSTRUCTED_RIG.joints;
function Joint({ name, children }: { name: Bone; children: React.ReactNode }) {
  const [x, y] = CONSTRUCTED_RIG.joints[name];
  return <g data-bone={name} data-pivot={`${x},${y}`} transform={`translate(${x} ${y})`}><g transform={`translate(${-x} ${-y})`}>{children}</g></g>;
}
type Appearance = Pick<PlayerAvatarConfig, "skinColor" | "hairColor" | "eyeColor">;
export const AppearancePalette = React.createContext<Partial<Appearance>>({});
const ColorRole = React.createContext<"hair" | "eye" | null>(null);
const skinPlanes = ["#FDCF94", "#FFDAA0", "#D9A078", "#B87F60", "#E8B388", "#F2BD84", "#F2BE7F", "#DFAD75", "#FFDFA1", "#EABC91", "#C18D6D", "#F2D6A6"];
function facetColor(source: string, target: string, base: string) {
  const rgb = (hex: string) => [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16));
  const light = (hex: string) => { const [r, g, b] = rgb(hex); return r * .2126 + g * .7152 + b * .0722; };
  const delta = (light(source) - light(base)) / 255;
  return "#" + rgb(target).map(v => Math.round(Math.max(0, Math.min(255, delta < 0 ? v * (1 + delta * 1.5) : v + (255 - v) * delta * 1.5))).toString(16).padStart(2, "0")).join("");
}
const P = ({ p, c }: { p: string; c: string }) => {
  const palette = React.useContext(AppearancePalette);
  const role = React.useContext(ColorRole);
  let fill = c;
  if (role === "hair" && palette.hairColor && !["#493963", "#4a3327"].includes(palette.hairColor.toLowerCase())) fill = facetColor(c, palette.hairColor, "#4C345F");
  else if (role === "eye" && palette.eyeColor && palette.eyeColor.toUpperCase() !== "#35356D") fill = facetColor(c, palette.eyeColor, "#35356D");
  else if (!role && skinPlanes.includes(c) && palette.skinColor && palette.skinColor.toUpperCase() !== "#F3C39A") fill = facetColor(c, palette.skinColor, skinPlanes[0]);
  return <polygon points={p} fill={fill} data-color-role={role ?? (skinPlanes.includes(c) ? "skin" : undefined)} />;
};
const L = ({ d, c, w = 1.5 }: { d: string; c: string; w?: number }) => <path d={d} fill="none" stroke={c} strokeWidth={w} strokeLinejoin="round" />;
type Facet = [string, string];
const Faces = ({ items }: { items: Facet[] }) => <>{items.map(([p, c], i) => <P key={i} p={p} c={c} />)}</>;
// Flat light/shadow planes, based on color samples from Sets_Basics.png.
const skin = { front: "#FDCF94", light: "#FFDAA0", side: "#D9A078", shadow: "#B87F60" };
function cloth(female: boolean, academic: boolean) {
  return academic
    ? { front: "#29375D", light: "#40517C", side: "#1B2848", deep: "#151F38", edge: "#627398", trim: "#E3B754" }
    : female
      ? { front: "#2E6FE9", light: "#4B85EA", side: "#244890", deep: "#183260", edge: "#7199D5", trim: "#DCE6EE" }
      : { front: "#344B8C", light: "#4966A5", side: "#263C70", deep: "#192B50", edge: "#7287B1", trim: "#DCE6EE" };
}

function Head({ gender, setId }: { gender: BodyGenderType; setId: ConstructedSet }) {
  const academic = setId === "set1";
  const female = gender === "female";
  return <Joint name="neck"><g data-slot="head" data-set={setId} data-view="three-quarter-right">
    {female && <ColorRole.Provider value="hair"><g data-part="hair-back"><Faces items={academic || setId === "set3" ? [
      ["92,30 114,21 142,28 161,44 164,72 168,97 161,119 144,112 136,95 104,94 93,118 77,113 84,86 78,58", "#282139"],
      ["86,40 99,31 96,67 93,93 84,114 78,110 85,80", "#463257"],
      ["153,43 161,49 159,84 165,105 159,115 150,96", "#392B4A"],
    ] : [
      ["94,29 80,24 69,29 62,43 65,61 60,78 65,90 59,111 73,110 81,98 79,83 84,70 82,53 100,44", "#302443"],
      ["77,29 68,36 67,49 72,64 66,81 71,93 65,108 74,103 76,87 79,70 74,51 83,38", "#513269"],
      ["70,31 80,27 93,35 83,41 74,41 68,47", "#694A7D"],
      ["81,40 90,39 93,46 83,49 77,45", "#7752AC"],
     ]} /></g></ColorRole.Provider>}
    <g data-part="neck"><P p="108,83 134,84 136,104 125,115 107,107" c={skin.side} /><P p="118,88 134,89 134,104 125,110 115,106" c={skin.front} /><P p="109,86 121,91 121,99 109,104" c={skin.shadow} /></g>
    <g data-part="head-side-plane"><P p="88,42 113,34 130,43 120,88 109,94 91,88 83,73 83,54" c={skin.side} /><P p="89,48 102,44 109,58 108,82 116,91 104,92 91,85" c="#E8B388" /></g>
    <g data-part="face-front-plane">
      <P p={female ? "112,42 132,35 156,41 164,52 164,76 157,86 141,92 122,90 112,82 108,60" : "111,42 133,35 156,40 165,50 165,78 160,85 146,91 123,91 112,83 108,60"} c={skin.front} />
      <P p="117,47 133,40 156,45 162,52 161,76 154,83 127,84 116,76 113,60" c={skin.light} />
      <P p="112,73 119,82 137,88 158,84 146,91 123,91 112,83" c="#F2BD84" />
      <P p="160,48 165,52 165,78 159,85 156,82 160,72" c="#F2BE7F" />
      <g data-part="nose"><P p="142,61 141,72 146,75 150,72 146,68" c="#DFAD75" /><P p="143,62 143,71 148,72 146,68" c="#FFDFA1" /></g>
      <g data-part="eyes">
        <P p="117,56 131,55 131,69 119,70" c="#FFF2CF" /><P p="151,55 161,54 160,67 151,68" c="#FFF0CC" />
        <ColorRole.Provider value="eye"><g data-part="eye-iris"><P p="121,57 130,57 130,69 120,68" c="#35356D" /><P p="154,55 160,55 160,66 153,67" c="#303263" />
        <P p="124,59 130,59 129,67 124,68" c="#4D5EA4" /><P p="156,57 160,57 159,65 155,66" c="#4C5CA5" /></g></ColorRole.Provider>
        <P p="121,57 125,57 125,61 121,61" c="#E5E7EE" /><P p="154,55 157,55 157,58 154,59" c="#ECEDF0" />
        <L d="M117 56L131 55 M151 55L162 54" c={female ? "#30213E" : "#644029"} w={1.5} />
        <P p="116,50 130,50 132,53 117,53" c={female ? "#392541" : "#3F291C"} /><P p="151,49 162,47 163,50 151,52" c={female ? "#392541" : "#3F291C"} />
        {female && <L d="M117 56L114 53 M161 54L163 51" c="#30213E" w={1.8} />}
      </g>
      <P p="134,80 145,80 146,82 135,83" c={female ? "#B87969" : "#B08453"} />
      <P p="136,80 144,80 143,81 136,81" c="#F2D6A6" />
    </g>
    <g data-part="near-ear"><P p="88,61 82,60 78,64 79,75 84,81 92,79 94,70 91,63" c={skin.side} /><P p="83,65 88,65 89,75 85,77 82,72" c="#EABC91" /><P p="83,66 86,65 87,72 84,73" c="#C18D6D" /></g>
    <ColorRole.Provider value="hair"><g data-part="hair-front">
      {female ? <Faces items={[
        ["82,62 79,46 87,30 106,20 128,18 148,27 162,41 166,54 160,58 151,43 142,36 125,47 112,51 103,56 100,76 92,80 88,65", "#30223D"],
        ["82,47 89,34 108,24 127,22 139,29 122,38 109,48 98,52 94,70 89,66", "#4C345F"],
        ["91,34 108,24 126,21 137,27 120,30 107,39 96,46", "#624377"],
        ["140,30 151,35 161,46 163,55 158,50 150,42", "#241E32"],
        ["88,51 99,45 101,58 98,73 92,78 92,61", "#35243F"],
      ]} /> : <Faces items={[
        ["83,63 78,53 80,39 75,32 88,29 101,20 117,17 133,21 146,19 158,24 171,26 166,37 164,50 157,46 150,40 137,46 125,39 114,45 107,49 101,60 99,72 92,71 90,61", "#221814"],
        ["77,32 91,30 103,22 118,20 132,24 146,22 160,27 147,31 132,31 118,26 104,30 91,39 81,43", "#34251C"],
        ["84,41 101,29 115,27 109,37 100,44 96,58 91,61 87,52", "#2B1E18"],
        ["112,28 122,26 135,31 148,29 162,29 154,36 143,38 137,43 126,37 117,40 107,47", "#3D2B1E"],
        ["80,44 87,41 91,51 92,65 88,60 83,64 80,56", "#1D1513"],
      ]} />}
      <g data-part="hair-edge-facets"><Faces items={female ? [
        ["91,35 106,26 118,24 106,30 97,38", "#705183"],
        ["102,47 117,39 130,33 121,40 110,48", "#543862"],
        ["90,52 94,50 95,65 92,69", "#45314E"],
      ] : [
        ["94,29 105,23 118,21 108,26 100,30", "#4C3526"],
        ["125,28 137,33 151,30 141,36 134,36", "#493121"],
        ["96,47 103,41 100,49 96,58 94,59", "#39281F"],
      ]} /></g>
    </g>
    </ColorRole.Provider>
    {academic && <g data-part="glasses"><path d="M114 54L134 53L134 72L116 73Z M148 52L164 51L164 69L149 70Z" fill="#95B8CC" fillOpacity=".1" stroke="#202439" strokeWidth="2.5" strokeLinejoin="round" /><L d="M134 58L141 57L149 58 M114 57L96 55L91 62" c="#26283A" w={2.2} /><L d="M118 57L123 57 M152 55L156 55" c="#B9CBD8" w={1} /><P p="113,56 116,56 116,59 113,59" c="#D1AF56" /></g>}
    {setId === "set2" && <SportsCap female={female} />}
    {setId === "set3" && <TechVisor />}
  </g></Joint>;
}

function Torso({ female, setId }: { female: boolean; setId: ConstructedSet }) {
  const academic = setId === "set1";
  if (setId === "set2") return <SportsTorso female={female} />;
  if (setId === "set3") return <TechTorso female={female} />;
  const c = cloth(female, academic);
  return <g data-slot="chest" data-set={academic ? "set1" : "base"} data-part="torso" data-view="three-quarter-right">
    <g data-part="backpack"><Faces items={[
      ["81,109 91,105 101,117 97,172 83,189 68,186 65,166 68,135", "#70472E"],
      ["73,122 81,115 79,145 71,172 72,183 66,177 65,163", "#A16C42"],
      ["72,171 83,167 89,177 83,190 70,186", "#4B352A"],
    ]} /></g>
    <P p={female ? "83,112 107,103 135,104 157,115 154,150 160,190 137,199 83,192 86,151" : "81,112 107,103 135,104 158,115 159,152 165,191 139,199 80,193 79,152"} c={c.side} />
    <g data-part="shirt"><Faces items={[
      ["108,105 133,105 144,117 141,187 104,188 105,125", "#CBD6E3"],
      ["114,111 125,116 124,144 110,144 110,125", "#EDF1EF"],
      ["126,116 134,111 138,125 135,181 125,185", "#DAE2E8"],
      ["110,145 124,146 125,183 108,184", "#9FAEC7"],
      ["121,118 124,119 124,185 120,185", "#F2F2E9"],
    ]} /><L d="M127 121L127 144" c="#F0F0E9" /></g>
    {academic ? <g data-part="coat"><Faces items={[
      ["83,112 103,106 113,115 111,176 105,228 76,226 81,185 78,149", c.front],
      ["140,108 157,115 157,152 161,188 168,229 140,233 132,186 136,121", c.front],
      ["82,121 94,117 94,161 87,196 82,222 77,222 81,181", c.light],
      ["149,120 156,121 153,155 158,188 164,224 154,226 147,184", c.side],
      ["102,106 111,110 118,123 110,136 104,126 112,120", "#E3B754"],
      ["140,107 133,112 130,126 135,138 144,125 138,119", "#F2CC6F"],
      ["107,134 112,136 110,184 104,227 100,227 105,184", "#D6A546"],
      ["135,138 139,133 139,185 147,232 142,232 134,186", "#EAC468"],
      ["119,113 129,114 130,122 125,128 120,123", "#EFCC70"],
      ["123,127 128,127 132,163 126,172 120,166", "#E4B250"],
      ["124,128 126,129 128,167 125,169 123,162", "#F8D57B"],
      ["84,175 98,171 98,176 84,180", "#BA903D"],
      ["148,171 157,175 158,180 148,176", "#B38B3E"],
      ["148,128 155,129 154,141 150,145 146,139", "#CFA550"],
      ["149,132 153,132 151,140 149,137", c.side],
    ]} /></g> : <g data-part="jacket"><Faces items={[
      ["82,112 105,106 114,118 110,181 106,195 81,194 77,182 82,150", c.front],
      ["140,109 157,116 157,151 165,189 158,196 137,198 132,185 136,123", c.front],
      ["82,121 94,115 92,146 84,177 86,188 78,185 78,156", c.side],
      ["97,118 106,114 110,128 105,161 108,184 101,189 93,185 97,160", c.light],
      ["143,121 152,120 150,151 156,179 160,189 146,190 140,175", c.side],
      ["108,121 112,121 110,180 108,188 105,190 106,171", "#7188B5"],
      ["136,125 140,121 138,172 141,191 137,191 134,177", "#627BA7"],
      ["80,186 106,189 106,196 83,197 78,192", "#253E77"],
      ["139,191 163,186 165,193 158,199 138,199", "#233B70"],
      ["84,189 87,190 88,196 84,196", c.edge],
      ["102,190 105,190 104,195 102,195", "#B8C9E3"],
      ["140,191 143,192 144,197 141,197", "#A7BCD9"],
      ["151,190 159,188 157,193 150,194", "#47649C"],
      ["94,165 101,161 103,164 96,173 92,174", "#7288B7"],
      ["149,165 154,172 153,177 148,172", "#5A71A1"],
    ]} /></g>}
    <g data-part="backpack-straps"><Faces items={[
      ["87,108 99,109 103,125 96,154 88,166 89,149 94,126", "#10161B"],
      ["88,112 94,113 98,125 93,148 91,154 94,125", "#30383D"],
      ["146,110 153,114 155,128 150,151 146,159 147,141 149,126", "#202821"],
      ["147,113 150,115 152,127 149,145 148,145 150,125", "#444D3D"],
      ["91,138 97,138 95,145 90,145", "#3D4853"],
    ]} /></g>
    {!academic && <g data-part="raised-collar"><Faces items={[
      ["84,105 88,97 100,94 113,99 124,111 111,119 104,109 92,107", c.front],
      ["88,99 99,96 111,101 116,107 105,105 94,103", c.light],
      ["104,109 112,113 119,114 111,119", c.deep],
      ["131,108 140,99 151,96 157,103 150,111 140,115 137,124 132,119", c.front],
      ["138,105 145,99 151,99 154,103 147,106 138,111", c.light],
      ["132,113 140,111 137,122 132,119", c.deep],
    ]} /></g>}
    <g data-part="tailoring-details">
      <L d={academic ? "M87 122L84 157L82 178 M150 124L150 153 M79 223L100 225 M145 229L164 226" : "M88 120L85 145L82 173 M147 125L148 147 M85 193L103 194 M143 195L159 192"} c={c.edge} w={.75} />
      <L d="M113 128L113 137 M113 153L112 176" c="#BBCADD" w={.7} />
      <P p="111,138 113,138 113,140 111,140" c="#F4F6EF" /><P p="111,157 113,157 113,159 111,159" c="#F4F6EF" />
      <P p="91,137 97,138 96,146 90,145" c="#778898" /><P p="92,139 95,139 94,143 91,143" c="#222D37" />
      <P p="147,136 151,137 150,144 146,144" c="#758292" /><P p="148,138 150,138 149,142 147,142" c="#27333D" />
      {academic ? <><P p="150,130 153,132 151,138 149,136" c="#F7D982" /><L d="M110 139L108 181L103 224 M137 143L138 180L144 228" c="#FADE8E" w={.7} /></> : <><P p="106,177 109,177 108,183 105,183" c="#BAC9DD" /><L d="M93 168L101 163 M149 170L153 175 M93 102L105 105 M145 103L151 102" c="#90A7C9" w={.9} /></>}
    </g>
  </g>;
}

/** Independent side geometries: the far arm is shorter and narrower, never mirrored. */
function Arms({ chestSet, handsSet, female = false, sleeves = true, hands = true }: { chestSet: ConstructedSet; handsSet: ConstructedSet; female?: boolean; sleeves?: boolean; hands?: boolean }) {
  const sport = chestSet === "set2", tech = chestSet === "set3", study = handsSet === "set1";
  const bare = female && (sport || tech);
  const c = bare ? { front: skin.front, light: skin.light, side: skin.side, edge: skin.shadow, trim: skin.front }
    : sport ? { front: "#E1E6EF", light: "#FCFCF5", side: "#A1B1D2", edge: "#C2D0EA", trim: "#284F9B" }
    : tech ? { front: "#172F48", light: "#284663", side: "#0C1C30", edge: "#3C6883", trim: "#133C55" }
    : cloth(female, chestSet === "set1");
  return <>{(["left", "right"] as const).map(side => {
    const near = side === "left";
    return <Joint key={side} name={`shoulder-${side}`}>
      {sleeves && <g data-slot="chest" data-set={chestSet} data-part={`upper-arm-${side}`} data-depth={near ? "near" : "far"}><Faces items={near ? [
        ["74,115 84,111 94,123 86,143 75,165 51,159 57,135 65,121", c.front],
        ["65,124 74,118 78,121 67,151 55,154 58,136", c.light],
        ["84,117 93,123 85,144 76,165 66,156 75,139", c.side],
        ["52,153 66,155 75,162 73,168 50,162", c.side],
        ["54,153 66,155 69,158 53,157", c.edge],
      ] : [
        ["154,115 166,117 173,127 181,148 184,160 164,166 157,146 151,130", c.front],
        ["157,119 165,122 170,136 174,151 166,157 159,141", c.light],
        ["168,124 174,131 183,155 184,160 175,161 171,143", c.side],
        ["165,157 180,152 183,158 168,164", c.side],
      ]} /><ArmDetails setId={chestSet} near={near} female={female} segment="upper" /></g>}
      <Joint name={`elbow-${side}`}>
        {sleeves && <g data-slot="chest" data-set={chestSet} data-part={`forearm-${side}`}><Faces items={near ? [
          ["51,156 71,161 72,171 65,191 43,189 44,174", c.front],
          ["50,161 60,163 59,179 47,183 45,177", c.light],
          ["63,164 71,164 69,181 65,191 57,187 61,177", c.side],
          ["44,180 60,181 67,185 65,194 42,192 41,187", c.trim],
          ["44,181 58,182 64,185 62,188 43,187", "#EFF2EE"],
          ["42,190 64,192 64,197 43,195", "#879BB4"],
          ["43,192 63,194 62,197 44,196", "#D6E1E9"],
        ] : [
          ["164,162 182,157 188,173 192,189 174,195 169,182", c.front],
          ["167,165 175,162 181,177 182,187 175,189", c.side],
          ["177,162 182,162 187,175 189,182 182,183", c.light],
          ["173,183 190,179 193,188 193,192 175,197", c.trim],
          ["175,184 190,182 191,185 175,189", "#EEF1EE"],
          ["175,194 192,190 193,195 177,199", "#8B9DB5"],
          ["177,195 192,193 192,197 178,200", "#D9E3E9"],
        ]} />{chestSet === "set1" && <P p={near ? "43,183 61,184 66,187 64,193 43,190" : "174,185 191,181 193,188 175,193"} c="#DCB255" />}<ArmDetails setId={chestSet} near={near} female={female} segment="forearm" /></g>}
        {hands && <Joint name={`wrist-${side}`}><g data-slot="hands" data-set={handsSet} data-part={`hand-${side}`}><Faces items={near ? [
          ["44,195 61,196 64,204 67,211 62,220 53,223 44,218 42,209", skin.side],
          ["45,198 55,199 58,208 57,220 50,221 45,216", skin.front],
          ["56,198 61,200 62,206 68,208 69,212 65,215 61,210 59,213 57,209", skin.light],
          ["44,195 61,197 61,201 45,200", study ? "#9C793E" : "#8798AD"],
          ["46,201 53,202 54,210 45,208", study ? "#C8A352" : "#EDC38E"],
          ["58,215 63,213 62,219 55,222 53,221", "#E8B67C"],
        ] : [
          ["177,198 191,195 194,202 193,214 186,220 174,216 173,207", skin.side],
          ["181,199 191,198 191,212 186,217 177,215 178,207", skin.front],
          ["177,202 182,201 183,207 180,211 176,209 174,213 172,210 173,205", skin.light],
          ["178,198 191,196 192,201 179,202", study ? "#846A3A" : "#7C8B9B"],
          ["185,203 191,202 190,209 185,211", study ? "#B7944B" : "#F4C68C"],
          ["175,214 183,217 187,216 185,220 175,217", "#C89566"],
        ]} /><HandDetails setId={handsSet} near={near} female={female} /></g></Joint>}
      </Joint>
    </Joint>;
  })}</>;
}

function Legs({ female, setId }: { female: boolean; setId: ConstructedSet }) {
  const academic = setId === "set1";
  const skirt = female && academic;
  const legColor = (color: string) => {
    if (!female || setId !== "set2") return color;
    const shades: Record<string, string> = {
      "#172536": "#282948", "#25384B": "#42456E", "#0E1B2B": "#181D36",
      "#172435": "#252641", "#253445": "#383D61", "#101C2A": "#161C34",
      "#142234": "#272A49", "#26394A": "#41466B", "#0D1A2B": "#181D37",
      "#162436": "#292B4A", "#243747": "#3A4165", "#0D1A2A": "#171D36",
    };
    return shades[color] ?? color;
  };
  return <g data-slot="legs" data-set={setId} data-view="three-quarter-right">
    <Faces items={[
      ["84,187 145,188 153,205 144,220 124,211 113,219 84,214 80,202", "#142033"],
      ["87,192 115,194 125,207 112,220 84,214", "#1B2B3F"],
      ["125,194 145,191 151,207 143,218 125,209", "#111D30"],
      ["87,187 144,188 147,195 85,195", "#101820"],
      ["115,187 125,187 125,193 115,193", "#BDAB6D"],
      ["118,188 121,188 121,192 118,192", "#292C28"],
    ]} />
    {(["left", "right"] as const).map(side => {
      const near = side === "left";
      return <Joint key={side} name={`hip-${side}`}>
        <g data-part={`thigh-${side}`}><Faces items={near ? [
          ["85,204 112,201 122,214 114,236 103,258 80,255 80,237", skirt ? skin.side : legColor("#172536")],
          ["88,208 105,210 99,230 88,248 82,247 83,231", skirt ? skin.front : legColor("#25384B")],
          ["111,208 121,215 113,236 103,254 94,250 102,230", skirt ? skin.shadow : legColor("#0E1B2B")],
        ] : [
          ["125,203 146,198 154,215 161,248 156,259 139,257 131,235", skirt ? skin.side : legColor("#172435")],
          ["130,209 144,205 149,224 153,247 143,254 138,236", skirt ? skin.front : legColor("#253445")],
          ["146,203 151,209 160,244 159,255 153,252 149,230", skirt ? skin.shadow : legColor("#101C2A")],
        ]} />{setId === "base" && near && <Faces items={[
          ["83,242 89,239 98,243 105,249 101,255 82,253 79,249", "#244E6A"],
          ["83,243 88,240 92,245 90,249 81,249", "#397894"],
          ["92,246 101,248 101,251 91,252", "#1A3D58"],
        ]} />}<LegDetails setId={setId} near={near} segment="thigh" /></g>
        <Joint name={`knee-${side}`}><g data-part={`shin-${side}`}><Faces items={near ? [
          ["80,250 104,254 100,275 94,306 72,307 75,280", skirt ? skin.side : legColor("#142234")],
          ["82,255 94,257 89,280 85,302 74,303 77,279", skirt ? skin.front : legColor("#26394A")],
          ["98,257 103,256 98,282 94,304 86,306 91,280", skirt ? skin.shadow : legColor("#0D1A2B")],
        ] : [
          ["139,251 160,251 159,275 163,307 142,309 138,282", skirt ? skin.side : legColor("#162436")],
          ["143,255 153,257 151,278 155,305 145,306 141,280", skirt ? skin.front : legColor("#243747")],
          ["154,255 159,253 157,278 162,304 155,307 151,279", skirt ? skin.shadow : legColor("#0D1A2A")],
        ]} />{skirt && <Faces items={near ? [
          ["77,277 99,280 94,306 72,307", "#CBD9E6"],
          ["79,279 87,280 82,303 75,304", "#EFF1EF"],
          ["77,276 99,279 99,284 76,282", "#EDF1EF"],
        ] : [
          ["139,280 159,278 163,307 142,309", "#C1CEDD"],
          ["141,281 148,281 153,305 144,306", "#E5EAEB"],
          ["139,278 159,276 160,282 140,284", "#EEF0ED"],
        ]} />}<LegDetails setId={setId} near={near} segment="shin" /></g>
          <Joint name={`ankle-${side}`}><g data-part={`shoe-${side}`}><Faces items={near ? [
            ["72,297 95,300 96,310 99,321 95,329 55,329 55,323 62,317 68,309", academic ? female ? "#69313E" : "#323D50" : "#314B92"],
            ["73,298 91,301 89,312 67,316 66,309", academic ? female ? "#94525C" : "#566177" : "#607BC1"],
            ["91,301 96,303 96,313 100,323 93,325 86,317", academic ? "#263044" : "#243D7B"],
            ["67,316 83,315 91,320 93,324 57,326 59,322", "#A6B7D9"],
            ["58,323 74,322 93,323 96,326 93,330 55,330 55,326", "#E6E9F0"],
            ["56,329 94,329 95,332 55,332", "#283A61"],
            ["70,307 86,308 87,312 68,312", "#E2E5EF"],
            ["66,314 83,313 86,316 64,317", "#E9EDF1"],
            ["87,312 91,312 93,319 90,321 88,317", "#D6E2EC"],
          ] : [
            ["140,299 160,298 163,308 170,315 179,319 182,326 179,331 138,331 136,325 139,317", academic ? female ? "#65303E" : "#343C4D" : "#2D478A"],
            ["143,300 158,300 159,311 150,316 140,314", academic ? female ? "#94515A" : "#596377" : "#5E7ABC"],
            ["159,303 163,310 174,317 179,321 164,323 152,316", academic ? "#2C3647" : "#224579"],
            ["141,318 152,316 160,322 178,323 180,328 140,328 138,324", "#B7C7DF"],
            ["139,326 159,327 180,326 181,330 177,333 138,333", "#E2E7EE"],
            ["139,331 178,331 179,334 138,334", "#233759"],
            ["143,306 157,305 158,309 141,310", "#E5E9EF"],
            ["150,313 159,310 162,313 153,317", "#F0F1EC"],
            ["154,317 164,314 167,317 157,321", "#DBE5ED"],
          ]} /><LegDetails setId={setId} near={near} segment="shoe" /></g></Joint>
        </Joint>
      </Joint>;
    })}
    {skirt && <g data-part="pleated-skirt"><Faces items={[
      ["88,190 145,190 161,237 147,245 105,244 76,236", "#273654"],
      ["88,196 103,196 93,237 79,233", "#3D4C73"],
      ["105,195 117,196 113,241 95,238", "#293751"],
      ["119,197 131,196 139,242 115,242", "#465378"],
      ["133,196 144,194 157,235 142,241", "#303E5E"],
      ["145,196 149,202 161,237 156,239", "#192841"],
    ]} /><L d="M79 234L95 240L116 243L141 243L158 237" c="#606E88" /></g>}
  </g>;
}

function SportsCap({ female }: { female: boolean }) {
  return <g data-part="sports-cap"><Faces items={[
    ["79,46 81,30 93,18 113,13 137,15 153,23 163,40 159,50 125,56 94,53", "#16346B"],
    ["82,32 94,21 110,17 119,19 114,45 87,50 80,45", "#295FC1"],
    ["113,17 135,18 149,26 156,42 115,49", female ? "#F0F3F3" : "#376FD0"],
    ["114,19 120,19 119,45 114,46", "#D8E4F1"],
    ["136,19 148,26 156,43 148,44 140,30", female ? "#BDCEE3" : "#2554A8"],
    ["90,48 118,45 157,40 175,43 183,49 163,55 128,56 108,53", "#174485"],
    ["115,46 155,42 173,44 178,47 159,51 129,52", "#426FB3"],
    ["108,52 128,54 162,53 180,48 182,50 163,57 127,58", "#D5E4F0"],
    ["132,27 137,25 142,29 141,36 135,38 130,34", female ? "#278CB8" : "#DFC25C"],
    ["134,28 137,28 138,32 140,29 140,34 135,36 133,33", "#EEF7F3"],
    ["108,13 114,12 119,14 118,17 110,17", "#497BCD"],
  ]} /><L d="M96 24L91 44 M124 20L123 42" c="#7194CC" w={.8} /></g>;
}

function TechVisor() {
  return <g data-part="tech-visor"><Faces items={[
    ["84,52 105,50 115,53 116,68 95,64 85,61", "#112839"],
    ["86,54 105,53 112,56 111,60 87,58", "#2C5767"],
    ["108,52 133,51 145,52 164,48 172,52 172,66 162,76 144,76 133,79 114,74 106,65", "#142936"],
    ["111,55 133,54 145,55 165,52 169,55 168,65 160,72 144,72 132,75 116,70 110,64", "#38C7E7"],
    ["114,57 132,57 134,68 129,72 117,68 113,64", "#72DAED"],
    ["135,57 145,58 165,55 165,64 159,69 144,69 137,71", "#20A9D4"],
    ["116,57 123,57 136,70 130,72", "#BAF4F8"],
    ["154,56 162,55 156,68 150,69", "#54D8E7"],
    ["114,72 133,77 144,74 161,74 161,77 144,78 133,81 115,76", "#6489A0"],
    ["81,52 89,49 99,55 97,66 88,68 80,61", "#14506B"],
    ["83,54 89,52 94,56 93,62 88,64 83,60", "#37CFE5"],
    ["77,51 83,54 81,61 77,58", "#78DFE8"],
  ]} /><L d="M115 54L134 53L144 54L163 51" c="#92E6F0" w={1} /></g>;
}

function SportsTorso({ female }: { female: boolean }) {
  return <g data-slot="chest" data-set="set2" data-part="sports-torso" data-view="three-quarter-right">
    {female ? <><g data-part="midriff" data-skin="true"><Faces items={[
      ["96,148 146,149 148,176 151,190 133,197 89,190 94,173", skin.side],
      ["105,151 138,152 139,176 146,187 133,192 101,186 100,170", skin.front],
      ["99,169 105,171 107,186 101,187 96,181", "#DCA375"],
    ]} /></g><Faces items={[
      ["86,112 105,103 113,106 124,119 135,106 144,104 158,115 148,132 149,163 137,172 97,169 88,162 91,134", "#DEE7EE"],
      ["99,110 109,108 121,124 134,111 139,110 143,139 135,149 100,148 95,138", "#FAFBF5"],
      ["88,117 95,113 97,138 102,149 96,163 89,160 91,135", "#B0C4DF"],
      ["139,113 147,113 151,119 145,134 148,160 139,165 136,147 142,138", "#BCCCE0"],
      ["91,147 105,148 138,150 148,146 149,157 138,161 96,158 89,155", "#2A5EA5"],
      ["90,159 137,165 148,160 148,165 138,171 95,168 89,164", "#27477F"],
      ["105,104 111,106 124,119 134,107 139,105 137,111 124,124 111,111", "#E1B75E"],
      ["141,128 146,127 146,136 142,140 139,135", "#3B7AC0"],
    ]} /></> : <><Faces items={[
      ["82,111 106,102 135,104 157,115 156,150 163,189 141,197 81,195 79,150", "#254B91"],
      ["103,109 135,109 142,121 137,189 105,188 102,128", "#E4EBEF"],
      ["111,117 123,119 121,183 110,184", "#FAFCF8"],
      ["85,113 105,107 112,121 106,188 83,193 79,180 84,148", "#3471CF"],
      ["94,117 101,114 103,149 96,181 86,186 90,151", "#4C8BE2"],
      ["139,110 155,116 155,152 162,187 141,195 133,187 138,128", "#234F9B"],
      ["144,122 150,121 148,151 154,181 143,185", "#183C78"],
      ["80,185 106,189 106,195 82,196", "#D4E0EF"],
      ["139,190 162,185 164,193 141,198", "#D4E0EF"],
      ["105,111 109,118 106,184 103,187", "#BDD3EC"],
      ["138,119 141,117 138,186 135,188", "#92B6E4"],
      ["86,106 94,97 109,98 123,111 113,122 106,111 94,110", "#D0DCEC"],
      ["132,111 140,100 151,100 156,108 143,117 138,127", "#EAF0F0"],
      ["100,108 107,109 111,128 108,139 101,138 97,124", "#1C324A"],
      ["140,110 147,111 148,124 144,137 137,135 137,121", "#1A3148"],
      ["100,116 106,116 108,128 106,134 102,133", "#3F6582"],
      ["140,116 145,116 145,125 142,132 139,130", "#3E6583"],
    ]} /><L d="M107 107Q123 98 142 109 M110 125L112 159 M136 127L134 160" c="#7A9AB7" w={1.5} /><L d="M88 169L98 162 M146 162L153 170" c="#B1CCE9" w={2} /></>}
  </g>;
}

function TechTorso({ female }: { female: boolean }) {
  return <g data-slot="chest" data-set="set3" data-part="tech-torso" data-view="three-quarter-right"><Faces items={[
    ["78,114 91,103 107,102 137,104 159,111 163,142 155,171 163,194 141,204 81,197 79,161", "#0C1C2D"],
    ["88,115 105,109 115,123 112,183 104,195 82,193 83,163", "#193550"],
    ["138,113 154,115 152,146 157,177 162,191 141,199 132,186 136,140", "#142C44"],
    ["113,111 133,111 137,128 133,186 111,186 108,130", "#0D1826"],
    ["116,120 126,122 124,180 116,181", "#213146"],
    ["83,120 91,116 96,135 92,154 83,169 80,159", "#275476"],
    ["141,122 148,123 146,148 151,174 145,185 138,175", female ? "#344B91" : "#244163"],
    ["83,106 92,96 107,96 122,110 112,124 103,110 89,112", "#2755A1"],
    ["88,100 100,98 112,105 107,109 96,106", "#3D79CB"],
    ["132,110 140,97 153,97 161,107 145,114 138,127", "#264A8F"],
    ["140,103 150,99 157,105 147,109", "#3B76C7"],
    ["108,122 113,125 110,169 105,190 100,191 105,165", "#1DADCF"],
    ["137,125 142,121 139,163 145,189 140,192 134,165", "#21B9D8"],
    ["110,125 112,127 109,158 107,158", "#70DCEB"],
    ["84,155 91,149 96,152 95,159 88,164 82,163", "#238FB3"],
    ["144,153 151,157 152,163 146,163 140,158", "#2685B2"],
    ["88,172 97,170 99,186 92,192 83,188", "#0B192A"],
    ["91,175 95,174 96,182 91,185", "#38516C"],
    ["96,189 143,190 147,197 133,202 101,199 91,196", "#28384A"],
    ["116,190 128,191 129,199 116,199", "#8A9FAE"],
    ["118,192 126,193 126,196 118,196", "#25BAD4"],
    ["80,113 89,108 94,114 91,126 81,130 75,123", "#173A5E"],
    ["151,111 161,113 166,121 160,129 153,124", "#1C466C"],
  ]} /><L d="M91 133L89 146 M148 134L148 145 M93 191L101 194 M141 193L151 189" c="#4099B9" w={1.3} /></g>;
}

function ArmDetails({ setId, near, female, segment }: { setId: ConstructedSet; near: boolean; female: boolean; segment: "upper" | "forearm" }) {
  if (setId === "base" || setId === "set1") return <g data-part="sleeve-seams"><L d={segment === "upper" ? near ? "M74 121L65 145L61 150 M68 156L74 160" : "M166 126L177 151" : near ? "M48 166L45 178 M54 179L60 182" : "M180 166L186 177"} c={setId === "base" ? "#617DAC" : "#54678B"} w={.8} /></g>;
  if (setId === "set2") {
    if (female) return <g data-part="sport-bare-arm" data-skin="true"><P p={segment === "upper" ? near ? "70,120 85,121 82,139 70,162 55,158 61,139" : "157,123 168,126 177,148 180,158 166,162 162,146" : near ? "52,159 69,164 66,179 60,191 46,189 47,176" : "167,164 180,161 187,180 189,190 177,194 173,179"} c={skin.front} /><P p={segment === "upper" ? near ? "55,155 72,158 71,165 53,162" : "165,157 180,152 183,158 167,164" : near ? "44,185 63,188 62,194 44,193" : "176,189 191,185 192,193 178,197"} c="#2E5B9D" /></g>;
    return <g data-part="sports-sleeve-stripes"><P p={segment === "upper" ? near ? "67,121 71,120 62,145 56,151 54,149" : "168,125 172,130 179,149 176,151" : near ? "46,163 50,163 45,178 44,179" : "181,165 185,174 188,179 185,180"} c="#4174C6" /><P p={segment === "upper" ? near ? "72,124 75,124 67,143 64,144" : "166,129 169,132 174,146 171,147" : near ? "43,186 64,188 64,193 43,191" : "175,186 191,182 193,187 176,191"} c="#3764AE" /></g>;
  }
  return <g data-part={segment === "upper" ? "tech-shoulder-plate" : "tech-bracer"}><Faces items={segment === "upper" ? near ? [
    ["72,115 85,112 94,123 89,136 77,139 64,131", "#24577D"],
    ["73,116 83,114 89,121 84,129 69,128", "#3B83B2"],
    ["68,128 77,131 86,130 85,135 76,138 65,132", "#25BED7"],
    ["66,142 73,145 67,157 59,156", female ? skin.front : "#132D44"],
  ] : [
    ["155,115 165,118 173,129 168,139 157,136 150,125", "#1E456D"],
    ["155,117 163,120 168,127 163,131 154,128", "#3768A2"],
    ["154,130 164,134 169,131 168,136 163,139 155,135", "#25B4D3"],
  ] : near ? [
    ["51,161 69,166 66,184 64,197 43,195 42,186", "#112C43"],
    ["51,164 59,166 54,183 46,187 45,183", "#2A5770"],
    ["62,167 67,169 62,185 59,187 59,179", "#22B8D1"],
    ["44,187 60,190 64,188 64,194 59,197 43,194", "#1C8EAF"],
  ] : [
    ["168,166 181,162 191,187 193,196 177,200 171,182", "#10283E"],
    ["176,168 181,166 187,183 183,188", "#27516C"],
    ["169,171 172,170 178,185 176,190 173,183", "#269EBC"],
    ["175,193 191,188 192,195 179,199", "#1C91B0"],
  ]} /></g>;
}

function HandDetails({ setId, near, female }: { setId: ConstructedSet; near: boolean; female: boolean }) {
  if (setId === "base" || setId === "set1") return <g data-part="glove-stitching"><L d={near ? "M47 211L48 217 M51 212L52 219 M55 213L56 218" : "M182 210L181 215 M186 209L185 215 M190 208L189 212"} c="#C89565" w={.65} />{setId === "set1" && <P p={near ? "45,197 56,199 57,206 48,207" : "182,199 191,197 192,205 184,208"} c="#B9944F" />}</g>;
  const tech = setId === "set3", base = tech ? "#123A50" : female ? "#DEE8EF" : "#255D9C";
  return <g data-part={tech ? "tech-glove" : "sports-glove"}><Faces items={near ? [
    ["44,196 60,198 63,207 65,215 60,222 49,222 43,215 41,207", base],
    ["46,199 55,201 56,208 48,210 43,207", tech ? "#28BBD8" : "#EEF4F5"],
    ["57,201 62,203 63,208 68,209 68,214 64,217 60,211", tech ? "#379EB7" : "#B5CDDD"],
    ["44,212 48,213 49,219 46,219", tech ? "#50D4E7" : "#DAECF2"],
    ["50,213 54,213 55,220 51,221", tech ? "#25A8CB" : "#D2E2EB"],
    ["56,213 60,212 61,217 57,221", tech ? "#3AC5E0" : "#D2E2EB"],
  ] : [
    ["178,198 191,196 195,204 193,214 186,221 175,218 172,209", base],
    ["182,201 190,200 191,207 184,211 178,208", tech ? "#26ACCD" : "#EEF4F5"],
    ["174,207 177,203 181,204 182,209 178,213 174,212", tech ? "#3ACAE0" : "#C4DCE7"],
    ["178,213 182,214 181,218 177,217", tech ? "#48D1E2" : "#DBEAF0"],
    ["184,212 188,211 188,217 184,220", tech ? "#2CACCA" : "#DBEAF0"],
    ["190,208 193,207 192,213 189,217", tech ? "#44C5DE" : "#BDCFDE"],
  ]} /></g>;
}

function LegDetails({ setId, near, segment }: { setId: ConstructedSet; near: boolean; segment: "thigh" | "shin" | "shoe" }) {
  if (setId === "base" || setId === "set1") return <g data-part="garment-finish"><L d={segment === "thigh" ? near ? "M89 207L85 231 M93 207L102 210" : "M146 209L153 234" : segment === "shin" ? near ? "M79 263L75 293" : "M158 263L160 292" : near ? "M59 326L91 326 M70 308L80 309" : "M142 328L175 329 M145 308L153 307"} c={segment === "shoe" ? "#94ACCC" : "#34465A"} w={.8} /></g>;
  if (setId === "set2") return <g data-part="sports-piping"><L d={segment === "thigh" ? near ? "M87 204L82 232L82 248" : "M146 207L155 241" : segment === "shin" ? near ? "M80 259L76 279L74 298" : "M158 259L157 279L160 300" : near ? "M69 302L90 304 M58 325L93 326" : "M143 303L158 302 M140 329L179 329"} c={segment === "shoe" ? "#65BAE6" : "#6F89B8"} w={segment === "shoe" ? 2.5 : 1.8} />{segment === "thigh" && <P p={near ? "92,211 98,211 96,219 91,222" : "141,211 146,210 147,215 143,217"} c="#B3C6DA" />}</g>;
  return <g data-part={`tech-${segment}-panel`}><Faces items={segment === "thigh" ? near ? [
    ["86,208 98,207 98,220 88,228 81,222", "#263B54"],
    ["86,210 90,210 88,219 83,221", "#3199BD"],
    ["99,225 111,219 108,235 101,244 94,241", "#172F45"],
  ] : [
    ["139,207 148,208 152,222 143,226 136,219", "#24374C"],
    ["145,209 148,210 150,219 147,221", "#2785A6"],
  ] : segment === "shin" ? near ? [
    ["81,246 91,241 103,247 103,259 94,267 80,262 76,255", "#1B4E74"],
    ["83,248 91,245 98,249 98,256 91,261 81,257", "#2B81AB"],
    ["82,248 86,247 84,254 80,255", "#3AD3E4"],
    ["83,272 95,270 91,295 80,299 76,290", "#253C55"],
    ["80,277 83,275 79,289 81,295 77,294", "#278AAD"],
  ] : [
    ["140,247 150,244 160,249 163,257 157,266 144,266 138,257", "#183E63"],
    ["144,249 151,247 158,252 158,257 152,262 144,260", "#2A6F9F"],
    ["155,250 159,251 161,256 157,260", "#2DBAD3"],
    ["143,276 155,273 160,296 147,300 141,287", "#1C354F"],
    ["155,278 158,286 158,294 155,295 153,285", "#289ABB"],
  ] : near ? [
    ["72,298 94,301 95,315 98,323 93,329 56,328 57,321 66,313", "#16334E"],
    ["74,300 88,302 86,309 70,310", "#34618B"],
    ["68,313 83,312 86,316 65,318", "#29A7C6"],
    ["57,324 93,325 94,329 56,329", "#32BBD3"],
    ["88,312 93,313 94,320 89,320", "#4DD6E3"],
  ] : [
    ["141,300 160,299 164,314 177,319 181,326 178,332 138,331 137,323", "#142E49"],
    ["144,302 157,302 158,309 142,312", "#355B86"],
    ["151,314 160,311 165,316 155,320", "#24A5C3"],
    ["139,328 178,328 179,332 138,332", "#2FB0CD"],
    ["164,320 173,320 176,324 166,324", "#305976"],
  ]} /></g>;
}

export function ConstructedModule({ slot, setId, gender }: { slot: EquipmentSlotKey; setId: ConstructedSet; gender: BodyGenderType }) {
  const female = gender === "female";
  if (slot === "head") return <Head gender={gender} setId={setId} />;
  if (slot === "legs") return <Legs female={female} setId={setId} />;
  if (slot === "hands") return <Arms chestSet={setId} handsSet={setId} female={female} sleeves={false} />;
  return <><Torso female={female} setId={setId} /><Arms chestSet={setId} handsSet={setId} female={female} hands={false} /></>;
}

export function ConstructedCharacter({ config }: { config: PlayerAvatarConfig }) {
  const female = config.bodyType === "female";
  return <AppearancePalette.Provider value={config}><Joint name="root"><Joint name="pelvis"><Legs female={female} setId={config.legsEquip as ConstructedSet} />
    <Joint name="spine"><Torso female={female} setId={config.chestEquip as ConstructedSet} />
      <Arms chestSet={config.chestEquip as ConstructedSet} handsSet={config.handsEquip as ConstructedSet} female={female} />
      <Head gender={config.bodyType} setId={config.headEquip as ConstructedSet} />
    </Joint>
  </Joint></Joint></AppearancePalette.Provider>;
}
