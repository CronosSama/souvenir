import express from "express"
import { signup, login } from "../controllers/auth_controller.js"
const router = express.Router({
  mergeParams : true
})



//signup
router.post("/signup",signup)

// sigin
router.post("/signin",login)

//change info
// router.patch("/change/:user_id")


export default router;






