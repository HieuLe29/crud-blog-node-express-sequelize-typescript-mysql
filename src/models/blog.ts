import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database/database";
import User from "./user";

class Blog extends Model {
  public id!: number;
  public title!: string;
  public content!: string;
  public userId!: number;
}

Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true, // Tự động tăng
      primaryKey: true, // Đặt làm khóa chính
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Blog",
  }
);

// Relationship
User.hasMany(Blog, { foreignKey: "userId" });
Blog.belongsTo(User, { foreignKey: "userId" });

export default Blog;
