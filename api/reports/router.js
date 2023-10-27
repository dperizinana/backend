const multer = require("multer");
const storage = multer.diskStorage({});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      // Accept PDF files
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed!"), false);
    }
  },
});
const express = require("express");
const {
  createReport,
  getAllReport,
  deleteOneReport,
  updateOneReport,
  getOneReport
} = require("./controller");



const router = express.Router();

router.get("/",getAllReport);
router.put("/:id",upload.single("file"),updateOneReport)
router.get("/:id",getOneReport)
router.delete("/:id",deleteOneReport)
router.post("/",upload.single("file"),createReport)

module.exports = router