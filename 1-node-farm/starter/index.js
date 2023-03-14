const fs = require("fs");
const http = require("http");
const url = require("url");
const slugify = require("slugify");
const replaceTemplate = require("./modules/replaceTemplate");
// const hello = "Hello World!";
// console.log(hello);

////////////////////
// FILES
//synchronous way
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textIn);
// const textOut = `This is what we know about avocado: ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync("./txt/input.txt", textOut);
// console.log(`File Written!`);

//asynchronous way
// fs.readFile("./txt/start.txt", "utf-8", (error, data1) => {
//   if (error) return console.error(`Error!`);
//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (error, data2) => {
//     fs.readFile("./txt/append.txt", "utf-8", (error, data3) => {
//       console.log(data3);
//       fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
//         console.log(`Files have been written!`);
//       });
//     });
//   });
// });
// console.log(`Will read file!`);

////////////////////
// SERVER

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const slug = dataObj.map((el) => slugify(el.productName, { lower: true }));

// console.log(slug);
// console.log(slugify("Fresh Avocardo", { lower: true }));

const server = http.createServer((req, res) => {
  // console.log(req);
  // console.log(req.url);
  // console.log(url.parse(req.url, true));
  // const pathName = req.url;
  const { query, pathname } = url.parse(req.url, true);
  // Overview Page
  if (pathname === "/" || pathname === "/overview") {
    // res.end(`This is the overview`);
    // Product Page

    res.writeHead(200, { "Content-type": "text/html" });
    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join("");

    // console.log(cardsHtml); // prints all the content in an array

    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);
    res.end(output);
  } else if (pathname === "/product") {
    res.writeHead(200, { "Content-type": "text/html" });
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);
    // console.log(query);

    // Api
  } else if (pathname === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);
    // not found
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello world",
    });
    res.end(`<h1>Page Not Found!!</h1>`);
  }
  // res.end(`Hello from the server!!`);
});

server.listen(9000, "127.0.0.1", () => {
  console.log(`Listening to request on port 9000`);
});
