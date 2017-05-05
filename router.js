const Profile = require("./profile.js");
var render = require("./render");

function home (req, res) {
  if (req.url === "/") {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    render.view("header", {}, res);
    render.view("search", {}, res);
    render.view("footer", {}, res);
    res.end('End of the response\n');
  }
}

function user (req, res) {
  var username = req.url.replace("/", "");
  if (username.length > 0 ) {
    

    var studentProfile = new Profile(username)
    studentProfile.on('end', function(data) {
      var values = {
        avatarUrl: data.gravatar_url, 
        username: data.profile_name,
        badges: data.badges.length,
        javascript: data.points.javascript
      }
      res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    render.view("header", {}, res);
    render.view("profile", values, res);
    render.view("search", {}, res);
    render.view("footer", {}, res);
      res.end('End of the response\n');
    });

    studentProfile.on('error', function(err) {
      render.view("header", {}, res);
      render.view("error", {errorMessage: err.message}, res)
      render.view("search", {}, res);
      render.view("footer", {}, res);
      res.end('End of the response\n');
    });
  }
}

module.exports.home = home;
module.exports.user = user;

