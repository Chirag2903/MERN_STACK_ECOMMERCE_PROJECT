const express= require("express");
const {isauthenticateduser,authorizerole}= require("../middleware/auth");
const { neworder, getsingleorder, myorders, getallorders, updateorder, deleteorder } = require("../controller/ordercontroller");
const router = express.Router();


router.route("/order/new").post(isauthenticateduser, neworder);

router.route("/order/:id").get(isauthenticateduser,getsingleorder);

router.route("/orders/me").get(isauthenticateduser, myorders );

router.route("/admin/orders").get(isauthenticateduser,authorizerole("admin"), getallorders );

router.route("/admin/order/:id").put(isauthenticateduser,authorizerole("admin"),updateorder).delete(isauthenticateduser, authorizerole("admin"), deleteorder );



module.exports = router;