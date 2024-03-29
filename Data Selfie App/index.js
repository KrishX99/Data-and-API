const express = require('express');
const Datastore = require('nedb');
const app = express();

app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));
const database = new Datastore('database.db');
database.loadDatabase();

app.get('/api', (request, response) => {
  database.find({}, (err, data) => {
    if (err) {
      response.end();
      return;
    }
    response.json(data);
  });
});

app.post('/api' , (req,res) => {
  const data = req.body;
  const timestamp = Date.now();
  data.timestamp = timestamp;
  database.insert(data);
  res.json(data);
})
app.listen(4000 , () => console.log('Listening to PORT 4000'));

