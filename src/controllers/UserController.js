const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
        })
}

module.exports = {
async index(request, response) {
    const users = await User.find();
    return response.json(users);
},
 
async auth(request, response) {
    const {email, password} = request.body;
    const user = await User.findOne( { email }).select('+password');
    if(user){
        if (await bcrypt.compare(password, user.password)) {
            user.password = undefined;
            const token = generateToken({id: user.id})
            return response.status(200).send({user: user, token: token});
        } else {
              return response.status(400).send( {error: "Bad password"});
        }
    }
    return response.status(400).send( {error: "User not found"});
},

async store(request, response) {
        const { name, email, password, age, bairro, user_type, latitude, longitude } = request.body;
        
        const location = {
            type: 'Point',
            coordinates: [longitude, latitude]
        };
        try {
            let user = await User.findOne( { email });

            if(!user) {
                user = await User.create({
                    name,
                    email,
                    password,
                    age,
                    bairro,
                    user_type,
                    location
                });
            }
            
            const token = generateToken({id: user.id})
            return response.status(200).send( {user: user, token: token});
        } catch (err){
            return response.status(400).send({error : 'Registration failed'});
        }
    }
};