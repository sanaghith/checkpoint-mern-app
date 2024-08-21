var jwt = require('jsonwebtoken');


const isAuthenticated = (req,res,next) => {
    try {
        const token = req.header('access-token');
        if(!token){
            return res.status(401).json('Unauthorized')
        }

        jwt.verify(
            token,
            process.env.ACCESS_TOKEN_KEY,
            (err,user)=>{
                if(err){
                    return res.status(401).json('Unauthorized')
                } 
                req.user = user
                next()
            }    
        )
    } catch (error) {
        console.log('error', error)
        return res.status(500).json('error occurred')
    }
}

module.exports = isAuthenticated