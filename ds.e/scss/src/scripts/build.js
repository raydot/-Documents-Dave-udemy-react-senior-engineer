const Fs = require("fs");

const Path = require("path");

const Sass = require("node-sass");

// // Make this a constant to "lock it in."
// const result = Sass.renderSync({
//     data: Fs.readFileSync (
//         Path.resolve('src/global.scss')
//     ).toString(),
//     outputStyle: 'expanded',
//     outFile: 'global.css',
//     includePaths: [Path.resolve('src')]
// })

// Do the same for the atoms, molecules, etc...
const getComponents = () => {
  let allComponents = [];

  const types = ["atoms", "molecules", "organisms"];

  types.forEach((type) => {
    const allFiles = Fs.readdirSync(`src/${type}`).map((file) => ({
      //input: Path.resolve(type, file),
      input: `src/${type}/${file}`,
      output: `src/lib/${file.slice(0, -4) + "css"}`,
    }));

    allComponents = [...allComponents, ...allFiles];
  });

  return allComponents;
};

// Make this a constant to "lock it in."
const compile = (path, filename) => {
  const result = Sass.renderSync({
    data: Fs.readFileSync(Path.resolve(path)).toString(),
    outputStyle: "expanded",
    outFile: "global.css",
    includePaths: [Path.resolve("src")],
  });

  Fs.writeFileSync(Path.resolve(filename), result.css.toString());
};

compile("src/global.scss", "src/lib/global.css");

// Log the buffer:
// console.log(result.css)
// console.log(result.css.toString())

// Write the buffer to a file
// If I thought the way he was writing the CSS was bullshit
// I stopped thinking that when I saw this output for the first time.
// Fs.writeFileSync(
//     Path.resolve('src/lib/global.css'),
//     result.css.toString()
// )

// Test the getComponents jam:
// console.log(getComponents())

getComponents().forEach((component) => {
  compile(component.input, component.output);
});
