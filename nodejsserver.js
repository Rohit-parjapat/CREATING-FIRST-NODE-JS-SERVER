const http = require('http');

const port = 8081;

const myDetails = ["Rohit", "Ashish", "Sachin"];
http
    .createServer((request, response) => {
        // response.writeHead(200, { 'content-type': "text/html" });
        // response.write("<h1>Hello, This is from my first server</h1>");
        // response.end();

        const { method, url } = request;

        if (url === "/todo") {
            response.writeHead(200, { "content-type": "text/html" });
            if (method === "GET") {
                response.write(myDetails.toString());
            } else if (method === "POST") {
                // response.write("<h1>Hello, You are todo section using Post request</h1>");

                let body = '';

                request
                    .on('error', (err) => {
                        console.error(err);
                    }).on('data', (chunk) => {
                        body += chunk;
                        // console.log(chunk);
                    }).on('end', () => {
                        body = JSON.parse(body);
                        let newDetails = myDetails;
                        newDetails.push(body.item);
                        console.log(newDetails);
                    })
            } else if (method === "DELETE") {
                let body = '';
                request
                    .on('error', (err) => {
                        console.error(err);
                    }).on('data', (chunk) => {
                        body += chunk;
                    }).on('end', () => {
                        body = JSON.parse(body);
                        let deleteItem = body.item;
                        for (let i = 0; i < myDetails.length; i++) {
                            if (myDetails[i] === deleteItem) {
                                myDetails.splice(i, 1);
                                break;
                            }
                            response.writeHead(204);
                        }
                    })
            } else {
                response.writeHead(404);
            }
        } else {
            response.writeHead(404);
        }
        response.end();
    })
    .listen(port, () => {
        console.log(`Nodejs server started on ${port}`);
    })

//http://localhost:8081