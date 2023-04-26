const fs = require("fs");
const superagent = require("superagent");

const readFilePro =file=>{
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if(err) reject('I could not find a file');
      resolve(data);
    });
  })
}

const writeFilePro=(file,data)=>{
  return new Promise((resolve, reject) => {
    fs.writeFile(file,data,err=>{
      if(err) reject('I could not write file');
      resolve('Success');
    })
  })
}


// readFilePro(`${__dirname}/dog.txt`).then(data=>{
//   console.log(`Breed:${data}`);
//   return superagent
//   .get(`https://dog.ceo/api/breed/${data}/images/random`)
//   })
//   .then((res) => {
//     console.log(res.body.message);
//     return writeFilePro('dog-img.txt',res.body.message)
//   })
//   .then(()=>{
//     console.log(`Random dog image saved`);
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });

//async function
const getDogPic = async () => {
  try{
    const data=await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed:${data}`);
    
    // const res=await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    const res1Pro= superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    const res2Pro= superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    const res3Pro= superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);

    const all=await Promise.all([res1Pro, res2Pro, res3Pro]);
    const imgs=all.map(el=>el.body.message);
    console.log(imgs);
    // console.log(res.body.message);
    
    await writeFilePro('dog-img.txt',imgs.join('\n'));
    console.log(`Random dog image saved`);
  } catch(err){
    console.error(err);
    throw(err);
  }
  return '2:Ready!!'
}

(async()=>{
  try {
    console.log('1:Will get dog image!!');
    const string2=await getDogPic();
    console.log(string2);
    console.log('3: Done getting dog image!!');

  } catch (err) {
    console.log("Error !!");
  }
})();


/*
console.log('1:Will get dog image!!');
getDogPic().then(x=>{
  console.log(x)
  console.log('3: Done getting dog image!!');
}).catch(err=>{
  console.log("Error !!");
});
*/




// console.log(x);

// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//   console.log(`Breed:${data}`);
//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .then((res) => {
//       console.log(res.body.message);
//       fs.writeFile("dog-img.txt", res.body.message, (err) => {
//         if(err) throw console.error(err.message);
//         console.log(`Random dog image saved`);
//       });
//     })
//     .catch((err) => {
//       console.log(err.message);
//     });
// });


