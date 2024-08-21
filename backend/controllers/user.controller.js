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
    },

    login : async (req,res) => {
        try {
            const {email , password} = req.body

            const existUser = await User.findOne({email})
          
            if(!existUser){
                return res.status(404).json('Email not found')
            }

            const passwordMatch = await bcrypt.compare(password , existUser.password)
            
            if(!passwordMatch){
                return res.status(400).json('Wrong password')
            }

            const payload = {
                id:existUser._id,
                role:existUser.role
            } 

            const accessToken = await jwt.sign(
                payload,
                process.env.ACCESS_TOKEN_KEY,
                {expiresIn:"1d"}
            )

            return res.status(200).json(
                {token : accessToken}
            )

        } catch (error) {
            console.log('error', error)
        }
    },

    getMe : async (req,res) => {
        try {
            const userId = req.user.id
            const user = await User.findOne({_id:userId}).select({password:0})
            res.status(200).json(user)
        } catch (error) {
            console.log('error', error)
        }
    }
}


module.exports = userCtrl