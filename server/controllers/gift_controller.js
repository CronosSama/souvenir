import * as db from "../models/index.js"


export const create_gift = async(type_gift,number_gift,image_gift,gift,next) => {
  try {

    const newGift = await db.Gift.create({
      type_gift,
      number_gift,
      image_gift,
      gift
    })
    console.log(newGift)
    return newGift

  }
  catch(error) {
    return next(error)
  }
}
export const put_gift = async(gift_id,type_gift,number_gift,image_gift,gift,next) => {
  try {
    let gift_new_information = {type_gift,number_gift,image_gift,gift,next}
    const findGift = await db.Gift.findByIdAndUpdate(_id = gift_id,gift_new_information,{new:true})
    return findGift
  } catch (error) {
    return error
  }
}







