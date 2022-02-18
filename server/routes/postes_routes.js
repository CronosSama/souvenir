import express from 'express'
import {getPostes,getPoste,createPoste,putPoste,deletePoste,likePoste} from '../controllers/postes_controller.js'
const router = express.Router({
  mergeParams : true
})

router.route("/").get(getPostes).post(createPoste)
router.route("/:poste_id").get(getPoste).patch(putPoste).delete(deletePoste)
router.patch("/:poste_id/like",likePoste)



export default router;