const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
  // fs.readFile('test-file.txt',(err,data) => {
  //     if (err) console.log(err);
  //     res.end(data);
  // });

  //next solution
//   const readable = fs.createReadStream("test-file.txt");
//   readable.on("data", (chunk) => res.write(chunk));
//   readable.on("end", () => res.end());
//   readable.on("error", (error) => {
//     console.error(error);
//     res.statusCode = 500;
//     res.end("File not found");
//   });

    //even better solution
    const readable = fs.createReadStream("test-file.txt");
    readable.pipe(res);
    
    // readableSource.pipe(writableDestination);
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening on port 8000!!");
});
