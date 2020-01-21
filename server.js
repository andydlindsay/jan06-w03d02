const express = require('express');
const app = express();
const morgan = require('morgan');

const port = process.env.PORT || 8000;

app.set('view engine', 'ejs');

app.use(morgan('dev'));

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
  res.render('index', { breadsAndSoups });
});

// Read
app.get('/:bread_id', (req, res) => {
  const bread = breadsAndSoups[req.params.bread_id];
  if (!bread) {
    return res.redirect('/');
  }

  const templateVars = {
    bread,
    id: req.params.bread_id
  };
  res.render('bread', templateVars);
});

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
