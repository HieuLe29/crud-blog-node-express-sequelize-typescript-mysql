import express from 'express';
import { createBlog, getBlogs,getBlogById, deleteBlog, updateBlog } from '../controllers/blog.controller';

const router = express.Router();

router.post('/', createBlog);
router.get('/', getBlogs);
router.get('/:id/findById', getBlogById); 
router.delete('/:id', deleteBlog);
router.put('/:id', updateBlog);

export default router;
