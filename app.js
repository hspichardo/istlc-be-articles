// app.js

const express = require('express');
const bodyParser = require('body-parser');
const articleRouter = require('./routes/articulo.routes');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
app.use('/api/articles', articleRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
