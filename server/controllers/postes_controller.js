import * as db from "../models/index.js"
import {create_gift} from "./gift_controller.js"

// /api/postes
export const getPostes = async(req,res,next)=>{
  try {
    const findPostes = await db.Post.find({})
    res.json(findPostes).status(200)
  } catch (error) {
    return next(error)
  }}
// /api/postes
export const createPoste = async(req,res,next) => {
    try {
      const {title,message,creator,tags,selectedFile} = req.body
      const {type_gift,number_gift,gift} = req.body
      let image_gift = selectedFile
      const addPoste = await db.Post.create({title,message,creator,tags,selectedFile})
      // const addGift = await create_gift(type_gift,number_gift,image_gift,gift,next=next)
      const addGift = await db.Gift.create({number_gift,image_gift,gift})

      addPoste.gift = addGift._id
      console.log(addGift)
      addPoste.save()
      res.json({addPoste,addGift}).status(200)
    } catch (error) {
      return next(error)
    }
  }

// /api/postes/:poste_id
export const getPoste = async(req,res,next)=>{
  try {
    const findPoste = await db.Post.findById(req.params.poste_id)
    const findGift = await db.Gift.findById(findPoste.gift)
    res.json({findPoste,findGift}).status(200)
  } catch (error) {
    return next(error)
  }
}


export const putPoste = async(req,res,next)=>{
  try {
    let {title,message,creator,tags,selectedFile} = req.body

    const modifyPoste = await db.Post.findByIdAndUpdate({
      _id : req.params.poste_id
    },{title,message,creator,tags,selectedFile},{new:true})
    res.json(modifyPoste).status(200)
  } catch (error) {
    return next(error)
  }
}

export const likePoste = async(req,res,next)=>{
  try {
    const findPost = await db.Post.findById(req.params.poste_id)
    findPost.likeCount +=1
    await findPost.save()
    res.json(findPost).status(200)
    
  } catch (error) {
    return next(error)
  }
}

export const deletePoste = async(req,res,next)=>{
  try {
    const deletePost = await db.Post.findById(req.params.poste_id)
    await deletePost.remove()
    res.json(deletePost).status(200)
  } catch (error) {
    return next(error)
  }
}

export const puut = async(req,res,next)=>{
  try{
    const findMemo = await db.Post.findByIdAndUpdate(_id = req.params.poste_id,{new : true})
    findMemo = req.body
    await findMemo.save()
    res.json(findMemo).status(200)

  }
  catch(e){

    return next(e)
  }


}













