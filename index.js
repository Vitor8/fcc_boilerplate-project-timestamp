var express = require('express');
var app = express();
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));

app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/:date?", function (req, res) {
  const regexDate = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/;
  const date = req.params.date;

  if (date == undefined) {
    const utc = new Date().toUTCString();
    const unix = Math.floor(new Date().getTime());
    
    return res.json({ unix, utc });
  }
  
  const testValidDate = new Date(date);
  
  if (regexDate.test(date) || testValidDate != "Invalid Date") {
    const unix = Math.floor(new Date(date).getTime());
    const utc = new Date(date).toUTCString();

    return res.json({ unix, utc });
  } else {
    const time = date/1000;
    const utc  = new Date(time*1000).toUTCString();

    if (utc == "Invalid Date") return res.json({error : "Invalid Date"});

    return res.json({ unix: Number(date), utc });
  }
  
});

app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
