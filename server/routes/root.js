const express = require("express");
const router = express.Router();
const handleSignUp = require("../controllers/user/signupController.js");
const handleSignin = require("../controllers/user/authController.js");
const handleLogout = require("../controllers/user/logoutController.js");
const handleRefreshToken = require("../controllers/refreshController.js");
const {handleOTP, handleVerifyOTP} = require("../controllers/user/OTPController.js");
const { handleAddBill, handleDeleteBill } = require("../controllers/bill/add-delete.js");
const { handleBillByID, handleBills } = require("../controllers/bill/getBills.js");
const {
  handleGetDetails,
  handlePostDetails,
  handlePutDetails,
  handleDeleteDetails,
} = require("../controllers/company/companyDetails.js");
const verifyJWT = require("../middlewares/verifyJWT.js");

router.get("/", (req, res) => {
  res.json({"msg": "Testing Home Route"});
});

router.post("/signin", handleSignin);
router.post("/signup", handleSignUp);
router.get("/logout", handleLogout);
router.get("/refresh", handleRefreshToken);

router.get("/generateOTP", handleOTP);
router.get("/verifyOTP", handleVerifyOTP);

router.use(verifyJWT);

router.post("/addBill", handleAddBill);
router.delete("/deleteBill", handleDeleteBill);

router.get("/bills", handleBills);
router.get("/bill", handleBillByID);

router
  .route("/details")
  .get(handleGetDetails)
  .post(handlePostDetails)
  .put(handlePutDetails)
  .delete(handleDeleteDetails);

module.exports = router;
