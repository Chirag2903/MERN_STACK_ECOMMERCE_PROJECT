const express = require("express");
const { getAllProducts, createProduct,updateProduct,deleteProduct,getProductDetails, createProductReview, getProductReviews, deleteReview, getAdminProducts} = require("../controller/productcontroller");
const {isauthenticateduser,authorizerole}= require("../middleware/auth")
const router = express.Router();

router.route("/products").get(getAllProducts);

router.route("/admin/products").get(isauthenticateduser,authorizerole("admin"),getAdminProducts);

router.route("/admin/product/new").post(isauthenticateduser, authorizerole("admin"), createProduct);

router.route("/admin/product/:id").put(isauthenticateduser,authorizerole("admin"),updateProduct).delete(isauthenticateduser,authorizerole("admin"),deleteProduct);

router.route('/product/:id').get(getProductDetails);

router.route("/review").put(isauthenticateduser,createProductReview);

router.route("/reviews").get(getProductReviews).delete(isauthenticateduser,deleteReview);


module.exports= router;