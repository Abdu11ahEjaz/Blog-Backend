import blog from "../models/blog.js";
import multer from "multer";
import {check,validationResult} from 'express-validator';

const validateBlog = [
    check('title','Title is required').notEmpty(),
    check('content','Title is required').notEmpty(),
    // check('category','Title is required').notEmpty(),
    // check('description','Title is required').notEmpty(),
    // check('ytvidlink','Title is required').notEmpty(),
    // check('authorname','Title is required').notEmpty(),
    // check('authorrole','Title is required').notEmpty(),
    // check('authorimg','Title is required').notEmpty(),
];

const storage = multer.memoryStorage();
const upload=multer({storage:storage});


const createBlog = [
     upload.fields([
      { name: 'thumbnail', maxCount: 1 },
      { name: 'authorimg', maxCount: 1 }
    ]),
    validateBlog,
    async (req,res) => {
      const errors = validationResult(req);
      if(!errors.isEmpty()) return res.status(400).json({message:'Validation errors',errors});
      
      try {
         const blogPost = new blog({
            title:req.body.title,
            category:req.body.category,
            publishedDate:req.body.publishedDate,
            thumbnail: req.files.thumbnail ?{
                data:req.files.thumbnail[0].buffer,
                contentType:req.files.thumbnail[0].mimetype
            } : null,
            description:req.body.description,
            content:req.body.content,
            ytvidlink:req.body.ytvidlink,
            ytdescription:req.body.ytdescription,
            authorname:req.body.authorname,
            authorrole:req.body.authorrole,
            authorimg: req.files.authorimg ? {
                data:req.files.authorimg[0].buffer,
                contentType:req.files.authorimg[0].mimetype,
            } : null,
         });

         const Post = await blogPost.save();
         res.status(200).json({message:'Blog created Succesfully',Post});

      } catch (error) {
        
console.error("Error creating blog:", error); // full stack
  res.status(500).json({
    message: 'Blog not created',
    error: error.message || error.toString(), // show error details
  });
      }
       
    }
];

const updateBlog = [
    validateBlog,
    async (req,res) => {
        const errors = validationResult(req);
        if(errors) return res.status(400).json({message:'Validation errors',errors})

        try {
            const post = await blog.findById(req.params.id);
            if(!post) return res.status(400).json({message:'Blog Not found'});

            post.title = req.body.title || post.title;
            post.category = req.body.category || post.title;
            post.thumbnail = req.files.thumbnail ?{
                data:req.files.thumbnail[0].buffer,
                contentType:req.files.thumbnail[0].mimetype
            } : null || post.thumbnail;
            post.description = req.body.description || post.description;
            post.content = req.body.content || post.content;
            post.ytvidlink = req.body.ytvidlink || post.ytvidlink;
            post.ytdescription = req.body.description || post.description;
            post.authorname = req.body.authorimg || post.description;
            post.authorrole = req.body.authorrole || post.authorrole;
            post.authorimg = req.files.authorimg ?{
                data:req.files.authorimg[0].buffer,
                contentType:req.files.thumbnail[0].mimetype,
            } : null || post.authorimg ;


            const Post = await post.save();
            res.status(200).json({message:'Blog Updated',Post});
            
        } catch (error) {
           res.status(400).json({message:'Blog not Updated'}) 
        }    
    }
];


const deleteBlog = async (req,res) => {
    
    try {
        const post = await blog.findById(req.params.id);
        if(!post) return res.status(400).json({message:'Blog Not Found'})

        await post.deleteOne();
        res.status(400).json({message:'Blog deleted Succesfully'})
            
    } catch (error) {
        res.status(400).json({message:'Blog not deleted'})
    }
}

const getBlogs = async (req,res) => {
    try {
        const {page=1, limit=10 , search=''} = req.query; // current page 1 , limit of post per page 10 , search empty
        const query = search
           ?{ title: { $regex:search, $options:'i'}} // search regex will find out in mongodb schema , options (i) means case sensitive search
           :{};

      const posts = await postSchema.find(query)  //find(query) get matching posts
      .populate('author','name') // fetches name of the post author
      .limit(limit*1) // limits the result
      .skip((page-1)*limit) //skip records based on current page
      .sort({createdAt: -1}); //sort by the newest post
      
      const total = await postSchema.countDocuments(query);  // counting total doc based on query 

      // returning paginated response
      res.json({
        posts,   // paginated result set 
        totalPages:Math.ceil(total/limit), 
        currentPage:page*1,
      });

    } catch (error) {
       res.status(400).json({message:'No posts Available'}); 
    }
    
};

const getBlog = async (req,res) => {
    try {
        const post = await blog.findById(req.params.id).populate('title','name');
        if(!post) return res.status(400).json({message:'no Blog found',error});
        res.json(post);

    } catch (error) {
       res.status(400).json({message:'No Blog Available',error}); 
    }
}


export {createBlog,updateBlog,deleteBlog,getBlogs,getBlog};