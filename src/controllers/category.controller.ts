import { Request, Response } from "express";
import Category from "../models/category";
import { Op } from "sequelize";
import { Blog } from "../models";

export const createCategory = async (req: Request, res: Response) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (error) {
    res.status(400).json(error);
  }
};

//Hiển thị chủ đề theo Id
export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const category = await Category.findByPk(id);
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching category" });
  }
};

// Cập nhật thông tin chủ đề
export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const category = await Category.findByPk(id);
    if (category) {
      await category.update({ name });
      res.status(200).json(category);
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating category" });
  }
};

// Xóa chủ đề
export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);
    if (category) {
      await category.destroy();
      res.status(200).json({ message: "Category deleted successfully" });
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting category" });
  }
};

export const findCategoriesByName = async (req: Request, res: Response) => {
  try {
    const name = req.query.name;
    const categories = await Category.findAll({
      where: {
        name: { [Op.like]: `%${name}%` },
      },
    });
    if (categories) {
      res.status(200).json(categories);
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  } catch (error) {
    res.status(500).json({ mesage: "Error finding category" });
  }
};

export const findBlogsByCategoryId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const category = await Category.findByPk(id, {
      attributes: ["id", "name"],
      include: [
        {
          model: Blog,
          attributes: ["id", "title", "content"],
          through: {attributes: []},
          as: "blogs"
        }
      ]
    })
     res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: "Error finding blog" });
  }
};
