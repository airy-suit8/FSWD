const http = require('http');
let count = 0;

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Rep Counter</title>
        <style>
          body {
            text-align: center;
            font-family: Arial, sans-serif;
            padding: 50px;
            background: #f4f4f4;
          }
          #count {
            font-size: 4em;
            margin: 20px;
          }
          button {
            padding: 15px 25px;
            margin: 10px;
            font-size: 1.2em;
            background: #7e528cff;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
          }
          button:hover {
            background: #c160ebff;
          }
        </style>
      </head>
      <body>
        <h1> Rep Counter</h1>
        <div id="count">0</div>
        <div>
          <button onclick="change(-1)">-</button>
          <button onclick="change(1)">+</button>
          <button onclick="reset()">Reset</button>
        </div>
        <script src="/home.js"></script>
      </body>
      </html>
    `);
  } else if (req.url === '/home.js') {
    
    res.writeHead(200, { 'Content-Type': 'application/javascript' });
    res.end(`
      let countEl = document.getElementById('count');
      function updateDisplay(value) {
        countEl.innerText = value;
      }

      function change(val) {
        fetch('/change?by=' + val)
          .then(res => res.json())
          .then(data => updateDisplay(data.count));
      }

      function reset() {
        fetch('/reset')
          .then(res => res.json())
          .then(data => updateDisplay(data.count));
      }

      // Load initial value
      fetch('/current')
        .then(res => res.json())
        .then(data => updateDisplay(data.count));
    `);
  } else if (req.url.startsWith('/change')) {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const by = parseInt(url.searchParams.get('by') || '0');
    count += by;
    if (count < 0) count = 0;
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ count }));
  } else if (req.url === '/reset') {
    count = 0;
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ count }));
  } else if (req.url === '/current') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ count }));
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
