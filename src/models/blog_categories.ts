import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/database";
import Blog from "./blog";
import Category from "./category";

class BlogCategories extends Model {
  public id!: number;
  public blogId!: number;
  public categoryId!: number;
}

BlogCategories.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true, // Tự động tăng
      primaryKey: true, // Đặt làm khóa chính
    },
    blogId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Blog,
        key: "id",
      },
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Category,
        key: "id",
      },
    },
  },
  {
    sequelize,
    tableName: "blog_categories",
    modelName: "BlogCategories",
  }
);

// Thiết lập mối quan hệ
Blog.belongsToMany(Category, { through: BlogCategories, as: "categories", foreignKey: "blogId" });
Category.belongsToMany(Blog, { through: BlogCategories, as: "blogs", foreignKey: "categoryId" });

export default BlogCategories;
