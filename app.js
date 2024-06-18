const express = require('express');
const app = express();
require('./conn/conn');
const auth = require('./routes/auth');
const list = require('./routes/list');
const cors = require('cors');
const port = process.env.PORT || 1000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use("/api/v1", auth);


app.use("/api/v2", list);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});