const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const port = process.env.PORT || 51600;

const app = express();
app.use(morgan('common'));
app.use(helmet());
app.use(cors({
  origin: '*',
}));

app.get('/', (req, res) => {
  res.json({
    message: 'Hello World',
  });
});

app.use((req, res, next) => {
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? 'Stack only available in development mode!' : error.stack,
  });
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}}`);
});
