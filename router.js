function home (req, res) {
  if (req.url === "/") {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Set Home Route\n');
  }
}

function user (req, res) {
  var username = req.url.replace("/", "");
  if (username.length > 0 ) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Set User Route\n');
  }
}

module.exports.home = home;
module.exports.user = user;

