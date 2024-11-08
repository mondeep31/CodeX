const express = require('express');
const { v4: uuidv4 } = require('uuid');
const app = express();
const PORT = 3050;

// Enabled CORS for local testing with the client
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Endpoint to generate a random room code
app.get('/generate-room', (req, res) => {
  const roomCode = uuidv4();
  res.json({ roomCode });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
