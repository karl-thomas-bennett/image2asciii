const fs = require('fs')
const ttf2svg = require('ttf2svg')
const svg2img = require('svg2img')


const convertToSVG = (filepath, output) => {
  fs.readFile(filepath, function (err, buffer) {
    if (!!err) throw err;

    var svgContent = ttf2svg(buffer);
    fs.writeFileSync(output, svgContent);
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


var svgString = [
  '<svg viewBox="-300 -300 1200 2000" xmlns="http://www.w3.org/2000/svg">',
  '<glyph glyph-name="uni21" unicode="&#x21;" d="M158 406L349 1462L551 1462L293 406L158 406M146-28Q97-28 70.50-0.50Q44 27 44 76Q44 137 78.50 185Q113 233 188 233Q232 233 258.50 206Q285 179 285 129Q285 73 251 22.50Q217-28 146-28Z"  horiz-adv-x="524" vert-adv-y="2048"  />',
  '</svg>'
].join('');
//fs.readFile("./font.svg", (err, string) => {
//if (!!err) throw err;
svg2img(svgString, { 'width': 600, 'height': 1000 }, function (error, buffer) {
  if (!!error) throw error;
  fs.writeFileSync('foo1.png', buffer);
});
//})


//convertToSVG('./Open_Sans/OpenSans-Italic-VariableFont_wdth,wght.ttf', './font.svg')
