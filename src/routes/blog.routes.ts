import express from 'express';
import { createBlog, getBlogs, deleteBlog, updateBlog } from '../controllers/blog.controller';

const router = express.Router();

router.post('/', createBlog);
router.get('/', getBlogs);
router.delete('/:id', deleteBlog);
router.put('/:id', updateBlog);

export default router;
