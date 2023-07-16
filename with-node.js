//server creation

const http = require("http");

const port = 8081;
//http method
// GET -getting certain details from server / default method/n it can diretcly work on any browser
// PUT -overwrite ,fully ypdate
// DELETE -delete data from server
// PATCH -update very few fields / certain fields
// POST -sending to the server

const toDolist = ["need to learn", "need to code"];
http
    .createServer((req, res) => {
    //res.writeHead(200, { "Content-Type": "text/html" });
    //res.write("<h4>HELLO, this is my new server</h4>");
    // res.write("<h1>hi all,how r you </h1>");
   // res.end();
        const { method, url } = req;
        if (url == "/todos") {
            //http:localhost:8081/todos
            if (method == "GET") {
                res.writeHead(200, { "Content-Type": "text/html" });
                res.write(toDolist.toString());

            } else if (method == "POST") {
                let body = "";
                req.on("error", (err) => {
                    console.error(err);
                }).on("data", (chunk) => {
                    body += chunk;
                   // console.log(chunk);
                }).on("end", () => {
                    body = JSON.parse(body);
                   // console.log(body);
                    let newToDo = toDolist;
                    newToDo.push(body.item);
                    console.log(newToDo);
                });
            } else if (method == "DELETE") {
                let body = "";
                req.on("error", (err) => {
                    console.log(err);
                }).on("data", (chunk) => {
                    body += chunk;
                }).on("end", () => {
                    body = JSON.parse(body);
                    let DeleteItem = body.item;
                    for (i = 0; i < toDolist.length; i++) {
                        if (toDolist[i] === DeleteItem) {
                            toDolist.splice(i,1);
                            break;
                        }
                    }
                    res.writeHead(204);
                });
            }
            else {
                res.writeHead(501);
            }
        }
            else {
            res.writeHead(404);
        } res.end();
        
    })
    .listen(port, () => {
    console.log(`my nodejs server started on port ${port}`);
});



//   http://localhost:8081