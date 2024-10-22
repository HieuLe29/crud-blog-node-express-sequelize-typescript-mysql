import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database/database";

class Category extends Model {
  public id!: number;
  public name!: string;
}

Category.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notNull: { msg: "Name is required" },
      notEmpty: { msg: "Name is required" },
      is: {
        args: ["^[a-zA-Z]+$"],
        msg: "Name can only contain letters and numbers",
      },
    },
  },
}, {
          sequelize,
          tableName: "categories",
          modelName: "Category",
});

export default Category;
