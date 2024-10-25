import { Request, Response } from "express";
import {User, Blog} from "../models";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";
import { RequestWithUser } from "../middleware/AuthMiddleware";



export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedPassword });

    const token =jwt.sign({ id: user.id, name: user.name, email: user.email}, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '1h' });

    res.send({name: user.name, email: user.email, token: token});

  } catch (error) {
    res.status(400).json(error);
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    
    if (user && (await bcrypt.compare(password, user.password))) {
      const token =jwt.sign({ id: user.id, name: user.name, email: user.email}, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '1h' });
      res.json({ token });
      return;
    }

    res.status(400).json({ message: 'Invalid email or password' });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    
    const user = await User.findByPk(id);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching user" });
  }
};

// Cập nhật thông tin người dùng
export const updateUser = async (req: RequestWithUser, res: Response) => {
  try {
    const id = req.user?.id;
    const { name, email } = req.body;
    const user = await User.findByPk(id);
    if (user) {
      await user.update({ name, email });
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating user" });
  }
};

// Xóa người dùng
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (user) {
      await user.destroy();
      res.status(200).json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting user" });
  }
};

export const getBlogsByUserId = async (req: Request, res: Response) => {
  try {
    const {id} = req.params;
    const user = await User.findByPk(id);
    if (user) {
      const blogs = await Blog.findAll({where: {userId: id}});
      if (blogs.length === 0) {
        res.status(404).json({ message: "Blogs not found" });
      } else {
        const numberOfBlogs = blogs.length;
        res.status(200).json({numberOfBlogs, blogs});
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching blogs" });
  }
}

export const searchUsersByNameAndEmail = async (req: Request, res: Response) => {
  const { name, email } = req.query;

  try {
      const whereClause: any = {};

      if (name) {
          whereClause.name = { [Op.like]: `%${name}%` };
      }
      if (email) {
          whereClause.email = { [Op.like]: `%${email}%` };
      }

      const users = await User.findAll({ where: whereClause });

      if (users.length > 0) {
        res.status(200).json(users);
      } else {
          res.status(404).json({ message: "User not found" });
      }
  } catch (error) {
      res.status(500).json({ message: "Error users" });
  }
};
