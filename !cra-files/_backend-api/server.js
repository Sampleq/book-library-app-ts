// import express from 'express'; // Если вы хотите использовать ES-модули (например, import/export), добавьте "type": "module" в ваш package.json

const express = require('express');
const cors = require('cors');

// import booksList from './data/books.json';
const booksList = require('./data/books.json');

const app = express();

app.use(cors());

app.get('/random-book', function (request, response) {
  // response.send('Hello World');

  const randomIndex = Math.floor(Math.random() * booksList.length);

  // simulate server response lag
  setTimeout(() => {
    response.json(booksList[randomIndex]);
  }, 500 + Math.random() * 1000);
});

const port = process.env.PORT || 4000;

app.listen(port, () =>
  console.log('Server started at port 4000. CORS-enabled')
);
