// Load the actual TypeScript artwork in Node without a second drawing implementation.
const fs = require("node:fs");
const path = require("node:path");
const ts = require("typescript");
const sourceRoot = path.resolve(__dirname, "../../src") + path.sep;
for (const extension of [".ts", ".tsx"]) {
  const previous = require.extensions[extension];
  require.extensions[extension] = (module, filename) => {
    if (!filename.startsWith(sourceRoot)) {
      if (previous) return previous(module, filename);
      throw new Error("Avatar loader only accepts project sources");
    }
    const { outputText } = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
      compilerOptions: {
        target: ts.ScriptTarget.ES2020,
        module: ts.ModuleKind.CommonJS,
        jsx: ts.JsxEmit.ReactJSX,
        esModuleInterop: true,
      },
      fileName: filename,
    });
    module._compile(outputText, filename);
  };
}
module.exports = {
  ...require("../../src/views/avatar/ConstructedSets.tsx"),
  ...require("../../src/models/avatar/ReferenceAtlas.model.ts"),
  ...require("../../src/models/avatar/AvatarEquipment.model.ts"),
  ...require("../../src/views/avatar/AvatarArtwork.tsx"),
};
