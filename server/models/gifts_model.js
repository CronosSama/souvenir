import mongoose from "mongoose"


const giftSchema = new mongoose.Schema({
  type_gift : {
    type : String,

  },
  number_gift : {
    type : String
  },
  image_gift : {
    type : String
  },
  gift : [String],
  CreatedAt : {
    type : Date,
    default: new Date()
  }
})

const Gift = mongoose.model("Gift",giftSchema)
export default Gift;