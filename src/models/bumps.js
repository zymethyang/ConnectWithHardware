const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var statusChema = new Schema({
    controlCalender:{
      type:Boolean,
      required:true
    },
    controlHand:{
      type:Boolean,
      required:true
    },
    controlHumidity:{
      type:Boolean,
      required:true
    },
    controlTemp:{
      type:Boolean,
      required:true
    },
    humidity:{
      type:Number,
      required:false
    },
    temp:{
      type:Number,
      required:false
    },
    time:{
      type:Number,
      required:false
    },
    duration:{
      type:Number,
      required:true
    },
    finishedTime:{
      type:Number,
      required:true
    },
    bump:{
      type:Object,
      required:true
    }
})

var bumpsSchema = new Schema({
    startedAt:  {
        type: Number,
        required: true
    },
    status:  {
        type: statusChema,
        required:false
    },
    uid: {
        type: String,
        required:true
    },
    updatedAt:  {
        type: Number,
        required: true
    }
});




var Bumps = mongoose.model('Bump', bumpsSchema);
module.exports = Bumps;
