const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log('Hello from the middleware 👋');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;

// app.get('/',(req,res)=>{{
//   // res.status(200).send('Hello from server side!!');
//   res.status(200).json({message:'Hello from server side!!',app:'Natours'});
// }})

// app.post('/',(req,res)=>{
//   res.send('You can post to this endpoint...')
// })

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      // tours:tours
      tours
    }
  });
});

app.post('/api/v1/tours',(req,res)=>{
  console.log(req.body);
  res.send('Done!!');
})

const port = 3000;
app.listen(port, () => {
  console.log(`app running on port ${port}...`);
});
