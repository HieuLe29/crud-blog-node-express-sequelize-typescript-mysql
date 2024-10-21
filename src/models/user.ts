import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database/database";

class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
}

User.init(
  {
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
        notNull: {msg: "Name is required"},
        notEmpty: {msg: "Name is required"},
        is: {args: ["^[a-zA-Z]+$", "i"], msg: "Name can only contain letters and numbers"},
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {msg: "Email is required"},
        notEmpty: {msg: "Email is required"},
        isEmail: {msg: "Email is invalid"},
      }
    },
  },
  {
    sequelize,
    modelName: "User",
  }
);

export default User;
