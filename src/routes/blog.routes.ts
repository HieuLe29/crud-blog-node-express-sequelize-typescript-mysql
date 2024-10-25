import express from 'express';
import { createBlog, getBlogs,getBlogById, deleteBlog, updateBlog, searchBlogsByTitle } from '../controllers/blog.controller';
import { authenticate } from '../middleware/AuthMiddleware';

const router = express.Router();

router.post('/', authenticate, createBlog);
router.get('/', getBlogs);
router.get('/:id/findById', getBlogById); 
router.delete('/:id', authenticate, deleteBlog);
router.put('/:id', authenticate,updateBlog);
router.get('/searchByTitle', searchBlogsByTitle);

export default router;
