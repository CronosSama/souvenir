import {User} from "../models/index.js"
import jwt from "jsonwebtoken"
import { hashing } from "../../../web/Server/helpers/Hashing.js"

// export const signup = async(req,res,next) => {
//   try {
//     // await User.deleteOne({email : req.body.email})

//     let { username, email, _id, image, role } = await User.create({...req.body,role : "normal"})
//     const token = jwt.sign({
//       username,
//       _id,
//       role
//     },process.env.TOKEN_KEY)

//     res.json({ username, email, _id, token, role }).status(200)

    
//   }catch(error){
//       if(error.code === 11000){
//           error.message = "Sorry the Email/Username is taken !!"
//       }
//       authorization_error(next)
// }
// }

// const authorization_error = (next, message=null, status=null) => next({ status : status || 400, message : message || "Invalid Email/Password" })


// export const signin = async(req,res,next)=> {
//   try {
//     //you can't use the User model, you need to use uset instance to get access to methods and the schema of that specifc user
//     const findUser = await User.findOne({username : req.body.username } || { email : req.body.email})
//     let isMatch = await findUser.comparePassword(req.body.password)
//     console.log(isMatch)
//     if (isMatch) {
//       const { username, id, role } = findUser
//       const token = jwt.sign({
//         username,
//         id,
//         role
//       },process.env.TOKEN_KEY)

//       res.json({ username, id, token}).status(200)
//     }
//     else {
//       authorization_error(next)
//     }

//   } catch (error) {
//     authorization_error(next)
//   }
// }

// export const modifyUserPassword = async(req,res,next)=>{
//   try {

//     const findUser = await User.findById(req.params.user_id)
//     const { password, newPassword, reNewPassword } = req.body 
//     //Provide us with the old Password
//     //check the password is the actual one

//     //when modifying anything, we need to provide the password
//     const isMatch = await findUser.comparePassword(password)
//     if(isMatch ){
//       var change = {}
//       if(newPassword && reNewPassword){
//         if(newPassword === reNewPassword ){
//           const {password,salt} = await hashing(newPassword)
//           change["password"] = password
//           change["salt"] = salt
//         }
//         else {
//           authorization_error(next,"password Mismatch !!")
//         }
//       }
//       const tabo = {role:'',password:'',salt:'',Post:'',newPassword : '',reNewPassword : ''}
//       for (let key in req.body){
//         if(req.body[key] === findUser[key] || key in tabo){
//           continue
//         }
//         else {
//           change[key] = req.body[key]
//         }

//       }
//       change = {...change, role : "normal" }
//       let { username, id, role } = await User.findByIdAndUpdate(findUser.id,change,{new : true})
//       const token = jwt.sign({username, id, role},process.env.TOKEN_KEY)

//       res.json({username,id,token}).status(200)


//     }
//     else {
//       authorization_error(next, "Invalid Password !!")
//     }

//   } catch (error) {
//       authorization_error(next, "Invalid Password !!")
    
//   }
// }



export const signup = async(req,res,next) => {
  try {
    const findUserAndDelete = await User.findOneAndDelete({email : req.body.email})
    const user = await User.create(
      req.body
    )

    const { _id, username, email,role } = user
    const token = f_token( {_id,email,username,role} )

    res.json({token, _id, username, email, role}).status(200)



  }catch(error) {
    if(error.code == 11000){
      return next({
        message : "Used Email/Username",
        status : 400
      })
    }
    return next(error)

  }

}

const f_token = (userData) => jwt.sign(userData,process.env.TOKEN_KEY,{'expiresIn' : '1h'})





export const login = async(req,res,next) => {

  try{
    const findUser = await User.findOne({ email : req.body.email })
    console.log(findUser)
    if(findUser){
      const { password } = req.body
      const isMatch = await findUser.comparePassword(password)
      console.log(isMatch)
      if(isMatch){
      const { _id,email, username,role, image, domicile } = findUser
      console.log(findUser)      
      const token = f_token( {_id,email,username,role,} )
          
        res.json({ _id,email, username,role, image, domicile , token }).status(200)
      }

      else {
        return next({
          message : "Invalid Password",
          status : 400
        })
      }

    }
    
  }catch(error){
    return next({
      message : "Invalid Email/Password",
      status : 400
    })
  }



}

