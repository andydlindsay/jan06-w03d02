const express = require('express');
const app = express();

const port = process.env.PORT || 8000;

app.set('view engine', 'ejs');

const breadsAndSoups = {
  'abc': {
    style: 'sourdough',
    description: 'Andy\'s least fave'
  },
  'def': {
    style: 'hot hot soup',
    description: 'super hot?!'
  },
  'ghi': {
    style: 'phocaccio',
    description: 'soup bread'
  }
};

// Browse
app.get('/', (req, res) => {
  const templateVars = {
    breadsAndSoups
  };
  res.render('index', templateVars);
});

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
