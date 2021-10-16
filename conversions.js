const fs = require('fs')
const ttf2svg = require('ttf2svg')
const svg2img = require('svg2img')
const sharp = require('sharp')


const convertTTFToSVG = (filepath, outputPath) => {
  fs.readFile(filepath, function (err, buffer) {
    if (!!err) throw err;

    var svgContent = ttf2svg(buffer);
    fs.writeFileSync(outputPath, svgContent);
  });
}
/*
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <path fill="none" stroke="red"
    d="M 10,30
       A 20,20 0,0,1 50,30
       A 20,20 0,0,1 90,30
       Q 90,60 50,90
       Q 10,60 10,30 z" />
</svg>
*/

const getGlyphs = (svgString) => {
  const output = []
  let lines = svgString.split('\n')
  for (let line of lines) {
    let words = line.toString().trim().split(' ')
    for (let word of words) {
      if (word === "<glyph") {
        //add lines to output that start with glyph
        output.push(line.toString().trim())
        break
      }
    }
  }

  return output
}

const convertSVGToPNG = (svgString, outputPath) => {

  svg2img(svgString, { 'width': 60, 'height': 100 }, function (error, buffer) {
    if (!!error) throw error;
    fs.writeFileSync(outputPath, buffer);
  });
}

// var svgString = [
//   '<svg viewBox="-300 -300 1200 2000" xmlns="http://www.w3.org/2000/svg">',
//   '<glyph glyph-name="uni21" unicode="&#x21;" d="M158 406L349 1462L551 1462L293 406L158 406M146-28Q97-28 70.50-0.50Q44 27 44 76Q44 137 78.50 185Q113 233 188 233Q232 233 258.50 206Q285 179 285 129Q285 73 251 22.50Q217-28 146-28Z"  horiz-adv-x="524" vert-adv-y="2048"  />',
//   '</svg>'
// ].join('');

// convertSVGToPNG(svgString, "foo1.png")

const generatePNGsFromSVG = (svgPath, outputDirectory) => {
  fs.readFile(svgPath, 'utf-8', (err, string) => {
    if (!!err) throw err;
    let glyphs = getGlyphs(string)
    for (let i in glyphs) {
      console.log("Converting character " + (i + 1) + " of " + glyphs.length)
      const svgString = [
        '<svg viewBox="-300 -300 3000 3000" xmlns="http://www.w3.org/2000/svg">',
        glyphs[i],
        '</svg>'
      ].join('');
      convertSVGToPNG(svgString, outputDirectory + "character" + i + ".png")


    }
  })
}

const flipImages = (path) => {
  fs.readdir(path, (err, files) => {
    for (let i in files) {
      sharp(path + files[i]).flip().png().toBuffer((err, img) => {
        fs.writeFile(path + files[i], img, 'utf-8', () => {
          console.log("Flipped " + i)
        })
      })
    }
  })
}
//flipImages("./images/")
//generatePNGsFromSVG("./font.svg", "./images/")



//convertTTFToSVG('./Open_Sans/static/OpenSans_Condensed/OpenSans_Condensed-Medium.ttf', './font.svg')
