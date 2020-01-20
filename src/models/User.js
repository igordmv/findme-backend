const mongoose = require('mongoose');
const PointSchema = require('./utils/PointSchema');
const bcrypt = require('bcryptjs');

 const userSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    password: 
    {
        type: String,
        required: true,
        select: false,
    },
    age: Number,
    bairro: String,
    user_type: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    location: {
        type: PointSchema,
        index: '2dsphere',
    },
    createdAt: {
        type: Date, 
        default: Date.now,
    },
    updatedAt: {
        type: Date, 
        default: Date.now,
    },
 });

 userSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash
    next()
 });

 module.exports = mongoose.model('User', userSchema);