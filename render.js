var fs = require("fs");

function view (templateName, values, res) {
  var fileContent = fs.readFileSync('./views/'+templateName+'.html');
  res.write(fileContent);
}

module.exports.view = view;