const sequelize = require("../../config/db");
const { DataTypes } = require("sequelize");


const Categories = sequelize.define("categories", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  available: { type: DataTypes.BOOLEAN, defaultValue: true },
});

const Contact = sequelize.define("contact", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  phone: { type: DataTypes.INTEGER },
  adres: { type: DataTypes.STRING },
  phone: { type: DataTypes.STRING },
  adres: { type: DataTypes.STRING },
});

const Dish = sequelize.define("dish", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  available: { type: DataTypes.BOOLEAN, defaultValue: true },
  dascription: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  img: { type: DataTypes.INTEGER, allowNull: false },
  weight: { type: DataTypes.STRING },
  top: { type: DataTypes.BOOLEAN },
});

Categories.hasMany(Dish);
Dish.belongsTo(Categories);

module.exports = { Categories, Contact, Dish };