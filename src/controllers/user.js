// import userController from '../models/recordModel';
// const userController = require('../models/dataModel');
const {userModel} = require('../models/user');

export const getAll = (req, res, next) => {
    userModel
        .find({})
        .exec(function (err, records) {
            if (err) { return next(err); }

            res.json({
                records,
                success :true
            });
        });
};

export const createOne = (req, res, next) => {
    const initialData = new userModel(req.body);
    initialData.save((err, record) => {
        if (err) { return next(err); }
        console.log(record);
        res.json({
            record,
            success: true
        });
    });
};

export const getOne = (req, res, next) => {
    userModel.findOne({email: req.params.email}, (err, record) => {
        if(err) throw err;
        res.json({
            success: true,
            record
        })
    })
}
