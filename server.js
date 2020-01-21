const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const port = process.env.PORT || 8000;

app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));

const breadsAndSoups = {
  'abc': {
    id: 'abc',
    style: 'sourdough',
    description: 'Andy\'s least fave'
  },
  'def': {
    id: 'def',
    style: 'hot hot soup',
    description: 'super hot?!'
  },
  'ghi': {
    id: 'ghi',
    style: 'phocaccio',
    description: 'soup bread'
  }
};

// Browse
app.get('/', (req, res) => {
  res.render('index', { breadsAndSoups });
});

// new bread form
app.get("/new", (req, res) => {
  res.render("new");
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

// Edit
app.post('/:bread_id', (req, res) => {
  const style = req.body.style;
  const desc = req.body.description;
  breadsAndSoups[req.params.bread_id] = {
    id: req.params.bread_id,
    style,
    description: desc
  };

  res.redirect(`/${req.params.bread_id}`);
});

// Add
app.post('/', (req, res) => {
  const { id, style, description } = req.body;
  breadsAndSoups[id] = {
    id,
    style,
    description
  };

  res.redirect('/');
});

// Delete
app.post('/:bread_id/delete', (req, res) => {
  delete breadsAndSoups[req.params.bread_id];

  res.redirect('/');
});

// catchall route
app.get('*', (req, res) => {
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
