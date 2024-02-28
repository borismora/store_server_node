import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`)
})
