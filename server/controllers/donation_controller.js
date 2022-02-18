import * as db from "../models/index.js"


export const getAllDonation = async(req,res,next) => {
  try {
    const findDonations = await db.Donation.find()

    res.json(findDonations).status(200)
    
  } catch (error) {
    return next(error.message)
  }
}


export const createDonation = async(req,res,next) => {
  try {
    console.log(req.body.number_gifts)
    const createDonation = await db.Donation.create(req.body)
    res.json(createDonation)
  } catch (error) {
    return next(error.message)
  }
}


export const getDonation = async(req,res,next) => {
  try {
    const findDonation = await db.Donation.findById(req.params.donation_id)

    res.json(findDonation).status(201)
    
  } catch (error) {
    return next(error.message)
  }
}


export const modifyDonation = async(req,res,next) => {
  try {
    const {location,type_gift,number_gift,image_gift,gift,title,message} = req.body
    const findDonation = await db.Donation.findByIdAndUpdate({
      _id : req.params.donation_id},
      {location,type_gift,number_gift,image_gift,gift,title,message},
      {new:true}
    )
      res.json(findDonation).status(200)
    
  } catch (error) {
    return next(error.message)
  }
}

export const modifyStateDonation = async(req,res,next) => {
  try {
    
    
  } catch (error) {
    return next(error.message)
  }
}

export const deleteDonation = async(req,res,next) => {
  try {
    const findDonation = await db.Donation.findByIdAndRemove(req.params.donation_id)
    res.json(findDonation).status(200)
  } catch (error) {
    return next(error.message)
  }
}


















