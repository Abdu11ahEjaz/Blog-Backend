import mongoose, { mongo } from "mongoose";

const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        match:/^[A-Za-z0-9][A-Za-z0-9\s\-:,.'()!?]{4,99}$/,
    },
    category:{
        type:String,
        required:true,
    },
    publishedDate:{
        type:Date,
        default:Date.now,
    },
    thumbnail:{
        data:Buffer,
        contentType:String,
    },
    description:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true
    },
    ytvidlink:{
        type:String,
        validate: {
      validator: function(v) {
        // Simple regex for URL validation (can be more complex)
        return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(v); 
      },
      message: props => `${props.value} is not a valid URL!`
    }
  },
  ytdescription:{
    type:String,

  },
  authorname:{
    type:String,
    required:true,
  },
  authorrole:{
    type:String,
    required:true,
  },
  authorimg:{
    data:Buffer,
    contentType:String,
  },
});

export default mongoose.model('Blog',blogSchema);