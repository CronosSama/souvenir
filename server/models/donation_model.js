import mongoose from "mongoose";


const donationSchema = new mongoose.Schema({
  location : {
    type : String
  },
  meet_date : {
    type : String
  },
  user : {
    type : mongoose.Schema.Types.Mixed
  },
  state : {
    type : String,
    enum : ["init","checked","approuved"],
    default : "approuved"
  },
  title : String,
  message: String,
  type_gift : {
    type : String,

  },
  number_gifts : {
    type : String
  },
  image_gift : {
    type : String
  },
  gift : [String],
  CreatedAt : {
    type : Date,
    default: new Date()
  },

})


const Donation = mongoose.model("Donation",donationSchema)


export default Donation
