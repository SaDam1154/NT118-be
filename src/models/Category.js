const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;

const CategoryTypeSchema = new Schema(
    {
        id: {
            type: Number,
            unique: true,
        },
        name: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

CategoryTypeSchema.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });
CategoryTypeSchema.plugin(AutoIncrement, { id: 'categories', inc_field: 'id' });

module.exports = mongoose.model('categories', CategoryTypeSchema);
