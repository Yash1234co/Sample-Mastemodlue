const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const SampleRouter = require('./Router/Sample');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static('uploads'));


app.use('/', SampleRouter);

mongoose.connect('mongodb://localhost:27017/SampleDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.error("MongoDB Connection Error", err.message));

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
