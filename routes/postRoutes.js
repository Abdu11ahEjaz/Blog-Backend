import express from 'express';
import { createBlog,updateBlog,deleteBlog, getBlog, getBlogs, } from '../controllers/blogController.js';

const router = express.Router();

router.post('/', createBlog);

router.put('/:id',updateBlog);

router.get('/',getBlogs);

router.get('/:id',getBlog);

router.delete('/:id',deleteBlog);

export default router;


