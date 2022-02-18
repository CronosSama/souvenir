import express from "express"
import { createDonation, getAllDonation, getDonation, modifyDonation, deleteDonation } from "../controllers/donation_controller.js"
import {Authentication,Authorization} from "../middleware/auth_middle.js"

const router = express.Router({
  mergeParams : true
})

router.route("/donation").get(getAllDonation).post(Authentication,createDonation)
router.route("/auth/:user_id/donation/:donation_id").patch(Authentication,Authorization,modifyDonation).delete(Authentication,Authorization,deleteDonation)
router.get("/donation/:donation_id",getDonation)
export default router;