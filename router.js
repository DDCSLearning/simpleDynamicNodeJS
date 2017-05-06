const Profile = require("./profile.js");
var render = require("./render");
var querystring = require("querystring");
var commonHeader = { 'Content-Type': 'html' };

function home(req, res) {
  if (req.url === "/") {
    if (req.method.toLowerCase() === "get") {
      res.writeHead(200, commonHeader);
      render.view("header", {}, res);
      render.view("search", {}, res);
      render.view("footer", {}, res);
      res.end();
    } else {
      req.on("data", function (postBody) {
        var query = querystring.parse(postBody.toString());
        res.writeHead(303, { "location": "/" + query.username });
        res.end();
      })
    }
  }
}

function user(req, res) {
  var username = req.url.replace("/", "");
  if (username.length > 0) {
    var studentProfile = new Profile(username)
    studentProfile.on('end', function (data) {
      var values = {
        avatarUrl: data.gravatar_url,
        username: data.profile_name,
        badges: data.badges.length,
        javascript: data.points.JavaScript
      }
      res.writeHead(200, commonHeader);
      render.view("header", {}, res);
      render.view("profile", values, res);
      render.view("footer", {}, res);
      res.end();
    });

    studentProfile.on('error', function (err) {
      render.view("header", {}, res);
      render.view("error", { errorMessage: err.message }, res)
      render.view("search", {}, res);
      render.view("footer", {}, res);
      res.end();
    });
  }
}

module.exports.home = home;
module.exports.user = user;

