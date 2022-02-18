import mongoose from 'mongoose'
import {compare,hashing} from '../helpers/Password_management.js'
const userSchema = new mongoose.Schema({

  username : {
    type : String,
    required : "YOU NEED TO SPECIFY USERNAME !!!",
    unique : "the username is already used !!"
  },
  email : {
    type : String,
    required : "YOU NEED TO SPECIFY EMAIL !!!",
    unique : "the email is already used !!"
  },

  image : {
    type : String,

  },

  domicile : {
    type : String
  },
  password : {
    type : String,
    required : "YOU NEED TO SPECIFY PASSWORD !!!"
  },
  salt : {
    type : String,
  },
  role : {
    type : String,
    enum : ["admin","volunteer","contributor"],
    default : "contributor"
  },
  createdAt : {
    type : Date,
    default : new Date()
  }


})

userSchema.pre("save",async function(next){
  try {
    if (!this.isModified("password")){
      return next()
  }
  const { salt, password } = await hashing(this.password)
  this.password = password
  this.salt = salt

    
  } catch (error) {
    return next(error)
  }
})

userSchema.methods.comparePassword = async function(input_password,next){
  try {
    console.log("we here")
    const isMatch = await compare(input_password,this.salt,this.password)
    return isMatch
  } catch (error) {
    return next(error)
  }
}


const User = mongoose.model("User",userSchema)

export default User;

