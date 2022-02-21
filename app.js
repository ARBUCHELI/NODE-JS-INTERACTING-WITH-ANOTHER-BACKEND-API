const http = require('http');

const handleGetRequest = (req, res) => {
  const options = {
    hostname: 'static-assets.codecademy.com',
    path: '/Courses/Learn-Node/http/data.json',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  
  const request = http.request(options, response => {
    let data = '';

    // Aggregate data chunks as they come in from the API
    response.on('data', (chunk) => {
      data += chunk;
    });

    // Handle the end of the request
    response.on('end', () => {
      console.log("Retrieved Data:", data);
      res.end(data);
    });
  });

  request.end();
}

// Creates server instance
const server = http.createServer((req, res) => {
  const { method } = req;
 
  switch(method) {
    case 'GET':
      return handleGetRequest(req, res);
    default:
      throw new Error(`Unsupported request method: ${method}`);
  }
});

// Starts server listening on specified port
server.listen(4001, () => {
  const { address, port } = server.address();
  console.log(`Server is listening on: http://${address}:${port}`);
});