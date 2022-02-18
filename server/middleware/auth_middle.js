import jwt from "jsonwebtoken"
const Authentification_Error = (next,message="UnAuthorized") => next({status : 401, message})

// export const Authentification = async(req,res,next) => {

//   try {
//     //we getting the token from the headers thanks to axios in client
//     const token = req.headers.authorization.split(" ")[1]
//     jwt.verify( token, process.env.TOKEN_KEY, (err,decoded)=> {
//       if (decoded){
//         return next()
//       }
//       else {
//          Authentification_Error(next)

//       }
//     })

//   } catch (error) {
//      Authentification_Error(next)
    
//   }

// }

// export const Authorization = async(req,res,next) => {

//   try {
//     //we getting the token from the headers thanks to axios in client
//     const token = req.headers.authorization.split(" ")[1]
//     jwt.verify( token, process.env.TOKEN_KEY, (err,decoded)=> {
//       if (decoded && decoded.id === req.params.user_id  ){
//         return next()
//       }
//       else {
//          Authorization_Error(next)

//       }
//     })

//   } catch (error) {
//      Authorization_Error(next)
    
//   }


// }





export const Authentication = async(req,res,next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]
    jwt.verify(token,process.env.TOKEN_KEY,(err,decoded)=> {
      if(decoded){
        return next()
      }
      else {

         Authentification_Error(next,"UnAuthenticated")

      }

    }) 
  } catch (error) {
    Authentification_Error(next,"UnAuthenticated")
  }


} 


export const Authorization = async(req,res,next) => {
  // try {
  //   const token = req.headers.authorization.split(" ")[1]

  //   jwt.verify(token,process.env.TOKEN_KEY,(err,decoded)=>{
  //     if(decoded){
  //       if(decoded.id == req.params.user_id){
  //         return next()
  //       }
  //       else {
  //         Authentification_Error()
  //       }

  //     }
  //     else {
  //       Authentification_Error()
  //     }
  //   })


  // } catch (error) {
  //   Authentification_Error()
  // }

  return next()
  }


