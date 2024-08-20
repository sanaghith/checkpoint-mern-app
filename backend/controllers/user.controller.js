const User = require("../models/user.schema")
const { validationResult } = require("express-validator")
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const userCtrl = {
    register : async (req,res) => {
        try {
            const {firstName,lastName,email,password} = req.body

            const error = validationResult(req)

            if(!error.isEmpty()){
                return res.status(400).json({error:error.mapped()})
            }

            const emailExist = await User.findOne({email:email})

            if(emailExist){
                return res.status(400).json('Email already exist')
            }
            
            const hashedPassword = await bcrypt.hash(password,10)

            const newUser = new User({
                firstName,lastName,email,password:hashedPassword
            })

            const registeredUser = await newUser.save()

            console.log('registeredUser', registeredUser)

            const payload = {
                id : registeredUser._id ,
                role : registeredUser.role,
            }

            const accessToken = await jwt.sign(
                payload,
                process.env.ACCESS_TOKEN_KEY,
                {expiresIn:"1d"}
            )

           
            return res.status(200).json(
                {
                    token : accessToken
                }
            )

        } catch (error) {
            console.log('err', error)   
            return res.status(500).json(error)
        }
    }
}


module.exports = userCtrl