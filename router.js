const Profile = require("./profile.js");

function home (req, res) {
  if (req.url === "/") {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('End of the response\n');
  }
}

function user (req, res) {
  var username = req.url.replace("/", "");
  if (username.length > 0 ) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');

    var studentProfile = new Profile(username)
    studentProfile.on('end', function(data) {
      var values = {
        avatarUrl: data.gravatar_url, 
        username: data.profile_name,
        badges: data.badges.length,
        javascript: data.points.javascript
      }
      res.write(values.username + ' has ' + values.badges + ' badges\n');
      res.end('End of the response\n');
    });

    studentProfile.on('error', function(err) {
      res.write(err.message);
      res.end('End of the response\n');
    });

  }
}

module.exports.home = home;
module.exports.user = user;

