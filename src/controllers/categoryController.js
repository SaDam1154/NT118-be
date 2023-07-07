const Category = require('../models/Category');

// [GET] api/category
const read = async (req, res, next) => {
    try {
        let cagories;
        cagories = await Category.aggregate([{ $match: req.filters }, { $sort: req.sorts }]);
        return res.status(200).json({ success: true, cagories });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, status: 500, message: 'Internal server error' });
    }
};

// [POST] api/category
const create = async (req, res, next) => {
    const { name } = req.body;

    // Validate field
    if (!name) {
        return res.status(400).json({ success: false, status: 400, message: 'Missed field' });
    }

    try {
        const newCagory = new Category({
            name,
        });
        await newCagory.save();
        return res.status(201).json({ success: true, category: newCagory });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, status: 500, message: 'Internal server error' });
    }
};

// [GET] api/category/:id
const readOne = async (req, res, next) => {
    const id = req.params.id;
    try {
        let category;
        category = await Category.findOne({ id });
        return res.status(200).json({ success: true, category });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, status: 500, message: 'Internal server error' });
    }
};

// [PUT] api/category/:id
const update = async (req, res, next) => {
    const id = Number(req.params.id);
    const bodyObj = req.body;
    const updateObj = {};

    Object.keys(bodyObj).forEach((key) => {
        if (bodyObj[key] !== undefined) {
            updateObj[key] = bodyObj[key];
        }
    });

    // Update category
    try {
        const newCagory = await Category.findOneAndUpdate({ id }, updateObj, {
            new: true,
        });
        return res.status(200).json({ success: true, category: newCagory });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, status: 500, message: 'Internal server error' });
    }
};

// [DELETE] api/category/:id
const destroy = async (req, res, next) => {
    if (!req.params.id) {
        return res.status(400).json({ success: false, status: 400, message: 'Missed id' });
    }

    try {
        await Category.delete({ id: req.params.id });
        return res.status(200).json({ success: true });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, status: 500, message: 'Internal server error' });
    }
};

module.exports = { read, create, readOne, update, destroy };
