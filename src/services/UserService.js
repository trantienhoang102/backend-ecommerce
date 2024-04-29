const User = require("../models/UserModel")
const bcrypt = require("bcrypt")
const { genneralAccessToken, genneralRefreshToken } = require("./JwtService")

const createUser = (newUser) =>  {
    return new Promise( async(resolve, reject) => {
        const { name, email, password, confirmPassword, phone } = newUser
       try {
            const checkUser = await User.findOne({
                email: email
            })
            if (checkUser !== null) {
                resolve({
                    status: 'ERR',
                    message: 'The email is already use'
                })
            }
            const hash = bcrypt.hashSync(password, 10)
            const createdUser = await User.create({
                name,
                email,
                password: hash,
                phone
            })
            if (createdUser) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createdUser
                })
            }
       } catch (e){
           reject(e)
       }
    })   
}

const loginUser = (userLogin) =>  {
    return new Promise( async(resolve, reject) => {
        const {email, password} = userLogin
        try {
        //    console.log(userLogin)
            const checkUser = await User.findOne({
                email: email
            })
            // console.log(email)
            if (checkUser === null) {
                resolve({
                    status: 'ERR',
                    message: 'The user is not defined'
                })
            }
            const comparePassword = bcrypt.compareSync(password, checkUser.password)
            // console.log('comparePassword', comparePassword)
            if(!comparePassword) {
                resolve({
                    status: 'ERR',
                    message: 'The password or user is incorrect',
                })
            }
                const access_token = await genneralAccessToken({
                    id: checkUser.id,
                    isAdmin: checkUser.isAdmin
                })

                const refresh_token = await genneralRefreshToken({
                    id: checkUser.id,
                    isAdmin: checkUser.isAdmin
                })

                // console.log('access_token', access_token)
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    access_token,
                    refresh_token
                })
       } catch (e){
           reject(e)
       }
    })   
}

const updateUser = (userId,data) =>  {
    return new Promise( async(resolve, reject) => {
       try {
            const checkUser = await User.findOne({
                _id: userId
            })
            if (checkUser === null) {
                resolve({
                    status: 'OK',
                    message: 'The user is not defined',
                })
            }
            const updatedUser = await User.findByIdAndUpdate(userId, data, { new: true})
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updatedUser
            })
        } catch (e) {
            reject(e)
        }

    })   
}

const deleteUser = (userId) =>  {
    return new Promise( async(resolve, reject) => {
       try {
            const checkUser = await User.findOne({
                _id: userId
            })
            if (checkUser === null) {
                resolve({
                    status: 'OK',
                    message: 'The user is not defined',
                })
            }
            await User.findByIdAndDelete(userId)
            resolve({
                status: 'OK',
                message: 'DELETE USER SUCCESS',
            })
        } catch (e) {
            reject(e)
        }

    })   
}

const getAllUser = () =>  {
    return new Promise( async(resolve, reject) => {
       try {
            const allUser = await User.find()
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: allUser
            })
        } catch (e) {
            reject(e)
        }

    })   
}

const getDetailsUser = (userId) =>  {
    // console.log("userId", userId)
    return new Promise( async(resolve, reject) => {
       try {
            const user = await User.findOne({
                _id: userId
            })
            if (user === null) {
                resolve({
                    status: 'OK',
                    message: 'The user is not defined',
                })
            }
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: user
            })
        } catch (e) {
            reject(e)
        }

    })   
}


module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser,
    
}