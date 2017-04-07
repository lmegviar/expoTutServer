var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var path = require('path');
// var http = require('http');
var app = express();
// var server = http.createServer(app);

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../')));

var podcastParser = require('podcast-parser');

app.post('/api/podcastParse', (req, res) => {
  console.log('req body :', req);
  var feedUrl = req.body.feedUrl;
  podcastParser.execute(feedUrl, {},
    function (err, response) {
      if (err) {
        console.log(err);
        return res.send(err);
      }

      let data = response.channel.items[0];
      delete data.description;

      console.log('Channel/Items/0 ', data);

      res.send(JSON.stringify(data));
    });
});

// podcastParser.execute( 'http://blackastronautspodcast.libsyn.com/rss', {},
//   function (err, res) {
//         if (err) {
//             console.log(err);
//             return;
//         }
//         console.log('Channel/Items/0 ', JSON.stringify(res.channel.items[1]));
//     });

// Listen
var port = process.env.PORT || 1337;
const server = app.listen(port, () => {
  const { address, port } = server.address();
  console.log(`Listening at http://${address}:${port}`);
});




