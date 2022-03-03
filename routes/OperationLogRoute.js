const opUserController = require("../controller/OperationLogController");
const express = require("express");
const router = express.Router();
const multer = require("multer");
//const upload = multer({ dest: "uploads/" });
const { awsUpload, getFileStream,awsMultipartUpload } = require("../s3");
const fs = require("fs");
const { OperationLog } = require("../models/Operation_Log");
const upload = multer({ dest: "upload/" }).array("files", 3);

const {
  auth,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middleware/middle");

router.get("/images/:key", (req, res) => {
  console.log(req.params);
  const key = req.params.key;
  const readStream = getFileStream(key);

  readStream.pipe(res);
});

router.post(
  "/Add_Details",
  upload,
  awsMultipartUpload,
  async (req, res, next) => {
    const {
      User_Id,
      Date,
      Crew_name,
      Raider_Incharge_name,
      Flight_Supervisor,
      Pilot_name,
      Crew_id,
      Designation,
      Flight_Supervisor_id,
      Pilot_id,
      Uin_DAN,
      Mobile_Number,
      Authorized_By,
    
      
    } = req.body
    let Flight_Details=req.body.Flight_Details
    //console.log(req.body.Flight_Details,88)
  console.log(JSON.parse(Flight_Details));
  Flight_Details = JSON.parse((Flight_Details));
  /*for(let i=0;i<Flight_Details.length;i++)
   {
     Flight_Details[i].Image=req.body.links[i];
   }*/
    const operation_Log = await OperationLog.create({
      User_Id,
      Date,
      Crew_name,
      Raider_Incharge_name,
      Flight_Supervisor,
      Pilot_name,
      Crew_id,
      Designation,
      Flight_Supervisor_id,
      Pilot_id,
      Uin_DAN,
      Mobile_Number,
      Authorized_By,
      Flight_Details,
    });
    console.log(operation_Log, 78);
    if (!operation_Log)
      return res
        .status(400)
        .send({ message: "the operation user cannot be created!" });
    res.status(201).json({
      success: true,
      operation_Log,
    });
  }
);

//router.post("/Add_Details", opUserController.OperationUser);
router.post("/Find_Details", auth, opUserController.OperationUserFind);
router.put("/Update_Details", auth, opUserController.OperationUserUpdate);
module.exports = router;
