const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Request Logger
app.post('/log-request', (req, res) => {
  const log = req.body;
  fs.appendFile('requests.log', JSON.stringify(log) + '\n', (err) => {
    if (err) return res.status(500).send('Failed to log request');
    res.status(200).send('Request logged');
  });
});

// API Proxy
app.all('/api/*', async (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) return res.status(400).send('Missing URL');

  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: req.headers,
      body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined,
    });

    const data = await response.json();
    res.status(response.status).send(data);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch API' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
