const fs = require("fs");

// const hello = "Hello World!";
// console.log(hello);

//synchronous way
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textIn);
// const textOut = `This is what we know about avocado: ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync("./txt/input.txt", textOut);
// console.log(`File Written!`);

//asynchronous way
fs.readFile("./txt/start.txt", "utf-8", (error, data1) => {
  if (error) return console.error(`Error!`);
  fs.readFile(`./txt/${data1}.txt`, "utf-8", (error, data2) => {
    fs.readFile("./txt/append.txt", "utf-8", (error, data3) => {
      console.log(data3);
      fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
        console.log(`Files have been written!`);
      });
    });
  });
});
console.log(`Will read file!`);
