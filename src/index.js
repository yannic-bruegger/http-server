const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

const port = process.env.PORT || 51600;

const app = express();
app.use(morgan('common'));
app.use(helmet());

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}}`);
});
