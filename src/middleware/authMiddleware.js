const jwt = require('jsonwebtoken')
const dontenv = require('dotenv')
dontenv.config()

const authMiddleWare = (req, res, next) => {
    const token = req.headers.token.split(' ')[1]
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(404).json({
                message: 'The authentication',
                status: 'ERROR',
                err: err
            })
        }
        const  payload  = user
        if (payload.isAdmin) {
            next();
        } else {
            return res.status(404).json({
                message: 'The authentication',
                status: 'ERROR'
            })
        }
    })
}

const authUserMiddleWare = (req, res, next) => {
    const token = req.headers.token.split(' ')[1]
    console.log("token",token)

    const userId = req.params.id
    console.log("userId",userId)
    
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(404).json({
                message: 'The authentication',
                status: 'ERROR'
            })
        }
            next();
        // const payload  = user
        // console.log("user",user)
        // // console.log("payload",payload)
        
        // if (payload?.isAdmin || payload?.id == userId) {
        //     next();
        // } else {
        //     console.log("authUserMiddleWare",payload?.isAdmin)
        //     return res.status(404).json({
        //         message: 'The authentication',
        //         status: 'ERROR'
        //     })
        // }
    })
}


module.exports = {
    authMiddleWare,
    authUserMiddleWare
}