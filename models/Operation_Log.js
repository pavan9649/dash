const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const flightSchema= new Schema({
    Flight_Log_NO:{
        type: String,
        require: true
    },
    Drone_Id:{
        type: String,
        require: true
    },
    Payload_Type:{
        type: String,
        require: true
    },
    Take_Off_site:{
        type: String,
    },
    Operation_Start_Time:{
        type: String,
        require: true
    },
    Operation_End_Time:{
        type: String,
        require: true
    },
    Distance_Covered:{
        type: String,
        require: true
    },
    Duration:{
        type: String,
    },
    Remarks:{
        type: String,
    }

})

const OperationSchema = new Schema({
    Date:{
        type: String,
        require: true,
        unique: true
    },
    Crew_name:{
        type: String,

    },
    Raider_Incharge_name:{
        type: String,
        require: true
    },
    Flight_Supervisor:{
        type: String,
    },
    Pilot_name:{
        type: String,
        require: true
    },
    Crew_id:{
        type:String,

    },
    Designation:{
        type:String,
    },
    Flight_Supervisor_id:{
        type:String,
    },
    Pilot_id:{
        type:String,
    },
    Uin_DAN:{
        type:String,
    },
    Mobile_Number:{
        type:String,
        require: true
    },
    Authorized_By:{
        type:String,
    },
   Flight_Details:[flightSchema],
    createdAt: {
        type: Date,
        default: Date.now,
      },

})
const OperationLog = mongoose.model("OperationLog", OperationSchema);
  module.exports = { OperationLog };