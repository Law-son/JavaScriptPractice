/*
 * Understanding Node.js Architecture and Event Loop
 * -------------------------------------------------
 * This section demonstrates how Node.js handles asynchronous operations
 * using the Event Loop. Below are examples to understand blocking and 
 * non-blocking code in Node.js.
 */

// Example: Non-blocking I/O with setTimeout
console.log('Start');  // This is synchronous, so it runs first

// Asynchronous task (Non-blocking)
setTimeout(() => {
  console.log('Timeout callback');  // Executes after synchronous code
}, 0);

console.log('End');  // Synchronous, runs after 'Start' and before the timeout

/*
 * Exploring Node.js Core Modules
 * ------------------------------
 * Node.js has built-in modules that provide various functionalities.
 * Below, we explore the `fs`, `http`, `path`, and `os` modules.
 */

// --------------------------------------------------
// 1. fs (File System) Module
// --------------------------------------------------
const fs = require('fs');

/*
 * Asynchronous file read example
 * This method reads a file without blocking the main thread.
 */
fs.readFile('example.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log('Asynchronous Read: ', data);
});

/*
 * Synchronous file read example
 * This method blocks the main thread until the file is read.
 */
const syncData = fs.readFileSync('example.txt', 'utf8');
console.log('Synchronous Read: ', syncData);

/*
 * Writing to a file asynchronously
 * This writes data to a file without blocking the execution.
 */
fs.writeFile('output.txt', 'This is the content', (err) => {
  if (err) throw err;
  console.log('File written successfully');
});

/*
 * Appending to a file asynchronously
 * Adds new content to the file without overwriting.
 */
fs.appendFile('output.txt', '\nNew content', (err) => {
  if (err) throw err;
  console.log('Content appended');
});

/*
 * Deleting a file asynchronously
 * This removes the specified file.
 */
fs.unlink('output.txt', (err) => {
  if (err) throw err;
  console.log('File deleted');
});

// --------------------------------------------------
// 2. http Module
// --------------------------------------------------
const http = require('http');

/*
 * Creating a basic HTTP server
 * This server listens on port 3000 and responds with "Hello, World!" 
 * when accessed.
 */
const server = http.createServer((req, res) => {
  res.statusCode = 200;  // HTTP status code (200 = OK)
  res.setHeader('Content-Type', 'text/plain');  // Response type is plain text
  res.end('Hello, World!\n');  // End the response with some content
});

server.listen(3000, '127.0.0.1', () => {
  console.log('Server running at http://127.0.0.1:3000/');
});

// --------------------------------------------------
// 3. path Module
// --------------------------------------------------
const path = require('path');

/*
 * Joining paths
 * This helps in constructing file paths by joining segments.
 */
const filePath = path.join(__dirname, 'folder', 'file.txt');
console.log('Joined Path: ', filePath);

/*
 * Resolving absolute paths
 * This gives the absolute path based on the current directory.
 */
const absolutePath = path.resolve('folder', 'file.txt');
console.log('Resolved Absolute Path: ', absolutePath);

/*
 * Extracting file information
 * Below examples show how to get the file extension and base file name.
 */
const ext = path.extname('file.txt');
console.log('File Extension: ', ext);  // Outputs: '.txt'

const fileName = path.basename('/folder/file.txt');
console.log('Base File Name: ', fileName);  // Outputs: 'file.txt'

// --------------------------------------------------
// 4. os Module
// --------------------------------------------------
const os = require('os');

/*
 * Getting OS information
 * The os module helps retrieve information about the host system.
 */
console.log('OS Platform:', os.platform());  // Outputs platform (e.g., 'win32')
console.log('CPU Architecture:', os.arch());  // Outputs architecture (e.g., 'x64')
console.log('Total Memory:', os.totalmem());  // Outputs total system memory (in bytes)
console.log('Free Memory:', os.freemem());  // Outputs available memory (in bytes)

// --------------------------------------------------
// 5. url Module
// --------------------------------------------------
const url = require('url');

/*
 * Parsing a URL
 * This parses a given URL and extracts information like hostname, pathname, and query parameters.
 */
const myUrl = new URL('https://example.com:8000/pathname?id=100&status=active');
console.log('Hostname:', myUrl.hostname);  // Outputs: 'example.com'
console.log('Pathname:', myUrl.pathname);  // Outputs: '/pathname'
console.log('Query Parameters:', myUrl.search);  // Outputs: '?id=100&status=active'


// --------------------------------------------------
// 1. Creating a Simple HTTP Server with Node.js
// --------------------------------------------------
const http = require('http');

/*
 * Creating a basic HTTP server
 * This server listens on port 3000 and responds with "Hello, World!"
 * when accessed.
 */
const server = http.createServer((req, res) => {
  res.statusCode = 200;  // HTTP status code (200 = OK)
  res.setHeader('Content-Type', 'text/plain');  // Response type is plain text
  res.end('Hello, World!\n');  // End the response with some content
});

// The server will listen on port 3000 and local IP address '127.0.0.1'
server.listen(3000, '127.0.0.1', () => {
  console.log('Server running at http://127.0.0.1:3000/');
});

// --------------------------------------------------
// 2. Handling Requests and Responses in Node.js
// --------------------------------------------------

/*
 * Handling requests and responses involves parsing the incoming request URL,
 * inspecting the HTTP method (GET, POST, etc.), and sending an appropriate 
 * response back to the client.
 */

const handleRequest = (req, res) => {
  const { url, method } = req;  // Destructure URL and method from request object

  // Basic routing logic based on the URL and HTTP method
  if (url === '/' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>Welcome to the Home Page!</h1>');
  } 
  else if (url === '/about' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>About Us</h1><p>This is the About page.</p>');
  } 
  else if (url === '/data' && method === 'POST') {
    let body = '';

    // Collect the incoming data
    req.on('data', chunk => {
      body += chunk.toString();  // Accumulate the data chunks
    });

    // Once all data is received, respond back
    req.on('end', () => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ receivedData: body }));  // Respond with the received data in JSON format
    });
  } 
  else {
    // If no route matches, send a 404 Not Found response
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h1>404 Not Found</h1>');
  }
};

// Create a server that handles the incoming requests with `handleRequest` function
const requestServer = http.createServer(handleRequest);

// The server listens on port 4000
requestServer.listen(4000, () => {
  console.log('Server is listening on port 4000');
});
