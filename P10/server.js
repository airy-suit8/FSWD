const express = require('express');
const fs = require('fs');   
const path = require('path');

const app = express();


// Logs route
app.get('/', (req, res) => {
  const logFilePath = path.join(process.cwd(), 'error.log');

  fs.readFile(logFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send("⚠️ Log file is missing or inaccessible.");
    }

    res.send(`
      <h2>Error Logs</h2>
      <pre>${data}</pre>
    `);
  });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
