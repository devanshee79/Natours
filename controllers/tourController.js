const express = require('express');
const fs = require('fs');
const Tour = require('../models/tourModel')

exports.aliasTopTours = (req, res, next) => {
    req.query.limit = 5;
    req.query.sort = '-ratingsAverage, price';
    req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
    next();
}

exports.getTours = async (req, res) => {
    try{

        class APIFeatures{
            constructor(query, queryString){
                this.query = query;
                this.queryString = queryString;
            }

            filter(){
                const excludeFields = ['page', 'sort', 'limit', 'fields'];
                excludeFields.forEach(el =>  delete this.queryString[el]);
        
        
                // ADVANCE FILTERING
                let queryStr = JSON.stringify(this.queryString);
                queryStr = queryStr.replace(/\b(get|gt|lte|lt)\b/g, match => `$${match}`);
        
                let query = Tour.find(JSON.parse(queryStr));
            }
        }

        // const queryObj = {...req.query};
        // const excludeFields = ['page', 'sort', 'limit', 'fields'];
        // excludeFields.forEach(el =>  delete queryObj[el]);


        // // ADVANCE FILTERING
        // let queryStr = JSON.stringify(queryObj);
        // queryStr = queryStr.replace(/\b(get|gt|lte|lt)\b/g, match => `$${match}`);

        // let query = Tour.find(JSON.parse(queryStr));

        //  2) SORTING
        if(req.query.sort){
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
        }else{
            query = query.sort('-createdAt');
        }

        // 3) LIMITING FIELDS
        if(req.query.fields){
            const fields = req.query.fields.split(',').join(' ');
            query = query.select(fields);
        }else{
            query = query.select('-__v');
        }

        // 4) PAGINATION
            const page = req.query.page*1 || 1;
            const limit = req.query.limit*1 || 10;
            const skip = (page-1) * limit;
            query = query.skip(skip).limit(limit);

            if(req.query.page){
                const numTours = await Tour.countDocuments();
                if(skip>numTours) throw new Error('This page does not exists.')
            }
        

        // const query = Tour.find(queryObj);
        // const allTours = await Tour.find();

    // WAITING FOR QUERY
       const allTours = await query;   
       console.log(allTours);        
        
    //    SENDING THE RESPONSE
       res.status(200).json({status: 200, data: {allTours: allTours}})
    }catch(err){
        res
            .status(404)
            .json({
                status: 404,
                message: err.message
            })
    }
}

exports.getTour = async(req, res) => {  
    try{
        console.log(req.params.is)
        const tour = await Tour.findById(req.params.id);
        console.log(tour);
        res.status(200).json({status: 200, data: {tour: tour}})
    }catch(err){
        res
            .status(404)
            .json({
                status: 404,
                message: err.message
            })
    }
}

exports.addTour = async (req, res) => {
    try{
        const newTour = await Tour.create(req.body);
        console.log(newTour);
        res.status(200).json({status: 200, data: {newTour: newTour}})
    }catch(err){
        res
            .status(404)
            .json({
                status: 404,
                message: err.message
            })
    }
}

exports.deleteTour =  async(req, res) => {
    try{
        await Tour.findByIdAndDelete(req.params.id);
        res.status(200).json({status: 200, data: {message: "Tour got deleted"}})
    }catch(err){
        res
            .status(404)
            .json({
                status: 404,
                message: err.message
            })
    }
}

exports.updateTour = async (req, res) => {
    try{
        const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        console.log(updatedTour);
        res.status(200).json({status: 200, data: {updatedTour: updatedTour}})
    }catch(err){
        res
            .status(404)
            .json({
                status: 404,
                message: err.message
            })
    }
}












// exports.checkBody = (req, res, next) => {
//     console.log(req.body, req.body.name, req.body.price)
//     if(req.body === undefined || req.body.name === undefined || req.body.price === undefined){
//         // return res.status(404).message('Please provide valid data containing name and price');
//         return res.send("give al the data")
//     }

//     next();
// }// exports.checkBody = (req, res, next) => {
//     console.log(req.body, req.body.name, req.body.price)
//     if(req.body === undefined || req.body.name === undefined || req.body.price === undefined){
//         // return res.status(404).message('Please provide valid data containing name and price');
//         return res.send("give al the data")
//     }

//     next();
// }
// PARAMS MIDDLEWARE
// exports.checkID = (req, res, next, val) => {
    //     console.log(`Tour id is: ${val}`);
    
    //     if(req.params.id * 1 > tours.length){
    //         return res.status(404).json({
    //             status: 'fail',
    //             messsage: 'Invalid ID'
    //         });
    //     }
    //     next();
    // }

    
// const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));
// console.log(tours[0]._id);
