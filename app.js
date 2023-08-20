const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRouter');
const userRouter = require('./routes/userRouter');

const app = express();


// ADDING THE MIDDLEWARE FOR THE POST REQUET
app.use(express.json());

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('tiny'));
}



// app.get('/api/v1/tours/:id', getTours)
// app.get('/api/v1/tours', getTour)
// app.post('/api/v1/tours', addTour)
// app.patch('/api/v1/tours/:id', updateTour)

const printRes = (req, res, next) => {
    
    next();
}

app.use('/', printRes);
app.use(express.static(`${__dirname}/public`));
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
    

module.exports = app;