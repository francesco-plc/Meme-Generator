'use strict';

const express = require('express');
const morgan = require('morgan'); // logging middleware
const session = require('express-session'); // session middleware
const { check, validationResult } = require('express-validator'); // validation middleware
const passport = require('passport');
const passportLocal = require('passport-local');

const dao = require('./dao');

passport.use(new passportLocal.Strategy((username, password, done) => {
  dao.getUser(username, password).then((user) => {
    if (user) {
      done(null, user);
    } else {
      done(null, false, { message: 'Wrong username or password' });
    }
  }).catch((err) => {
    done(err);
  });
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  dao.getUserById(id).then((user) => {
    done(null, user);
  }).catch((err) => {
    done(null, err);
  });
});

const app = express();
const port = 3001;

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({ message: 'not authenticated' });
};

app.use(morgan('dev'));
app.use(express.json());
app.use(session({
  secret: 'qzwsxedcrfvtgbyhnujmikol',
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

// Retrieve ALL created memes (both PUBLIC and PROTECTED)
app.get('/api/memes', isLoggedIn, (req, res) => {
  dao.getAllMemes()
    .then((memes) => { res.json(memes); })
    .catch((error) => { res.status(500).json(error); });
});

// Retrieve all PUBLIC memes 
app.get('/api/memes/public', (req, res) => {
  dao.getPublicMemes()
    .then((memes) => { res.json(memes); })
    .catch((error) => { res.status(500).json(error); });
});

// Retrieve all USER's memes
app.get('/api/memes/user', isLoggedIn, (req, res) => {
  const userId = req.user.id;
  dao.getUserMemes(userId)
    .then((memes) => { res.json(memes); })
    .catch((error) => { res.status(500).json(error); });
});

// Retrieve a meme (copy)
app.get('/api/memes/copy/:id', isLoggedIn, (req, res) => {
  const memeId = req.params.id;
  dao.getMeme(memeId)
    .then((memes) => { res.json(memes); })
    .catch((error) => { res.status(500).json(error); });
});

// Create a new meme
app.post('/api/memes', isLoggedIn, async (req, res) => {
  const userId = req.user.id;
  const meme = {
    id_template: m.id_template,
    title: req.body.title,
    text0: req.body.text0,
    text1: req.body.text1,
    text2: req.body.text2,
    text3: req.body.text3,
    color: req.body.color,
    font: req.body.font,
    size: req.body.size,
    protected: req.body.protected,
    image: req.body.image,
  };

  try {
    await dao.addMeme(userId, meme);
    res.status(201).end();
  } catch (err) {
    res.status(503).json({ error: `Database error during the creation of meme: ${meme.title}.` });
  }
});

// delete a meme
app.deleteMeme('/api/memes/:id', isLoggedIn, async (req, res) => {
  const userId = req.user.id;
  const memeId = req.params.id;

  try {
    await dao.deleteMeme(userId, memeId);
    res.status(204).end();
  } catch (err) {
    res.status(503).json({ error: `Database error during the deletion of meme: ${req.params.id}.` });
  }
});

/**
 * Users APIs
 */

/* POST /api/sessions */
app.post('/api/sessions', passport.authenticate('local'), (req, res) => {
  res.json(req.user);
});

/* DELETE /api/sessions/current */
app.delete('/api/sessions/current', isLoggedIn, (req, res) => {
  req.logout();
  res.end();
});

/* GET /api/sessions/current */
app.get('/api/sessions/current', isLoggedIn, (req, res) => {
  res.json(req.user);
});

// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});