const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const logger = require('../logger')

const PostSchema = new Schema({
   postName: {
       type: String,
       required: true
   },
   desc: {
       type: Number,
       required: true
   },
   comments: {
       type:  String,
       required: true
   }
});


//------Instance Meathods----------//
PostSchema.methods.findSimilarTypes = function(vars) {
    return this.model('Post')
    .find({ type: this.type },vars)
    .then(
      console.log('success'),
      console.error('err')
    )
  };

//-----static meathods-------//
PostSchema.statics.findByName = function(postName) {
    return this.find({ postName: new RegExp(postName, 's') });
  }  

module.exports = Post = mongoose.model('post', PostSchema);