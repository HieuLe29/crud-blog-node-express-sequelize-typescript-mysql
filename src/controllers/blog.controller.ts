import { Request, Response } from 'express';
import Blog from '../models/blog';

export const createBlog = async (req: Request, res: Response) => {
  try {
    const blog = await Blog.create(req.body);
    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ error: 'Error creating blog' });
  }
};

export const getBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await Blog.findAll();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching blogs' });
  }
};  

export const updateBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const blog = await Blog.findByPk(id);
    if (blog) {
      await blog.update({ title, content });
    res.status(200).json(blog);
    } else {
       res.status(404).json({ message: 'Blog not found' });
    }
    
  } catch (error) {
    res.status(500).json({ message: 'Error updating blog' });
  }
};

// Xóa blog
export const deleteBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByPk(id);
    if (blog) {
      await blog.destroy();
      res.status(200).json({ message: 'Blog deleted successfully' });
    } else {
      res.status(404).json({ message: 'Blog not found' });
    }
    
  } catch (error) {
    res.status(500).json({ message: 'Error deleting blog' });
  }
};