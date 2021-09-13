const sequelize = require("../../config/db");
const { DataTypes } = require("sequelize");

const Categories = sequelize.define("categories", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV1,
    allowNull: false,
  },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  available: { type: DataTypes.BOOLEAN, defaultValue: true },
});

const Contact = sequelize.define("contact", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV1,
    allowNull: false,
  },
  phone: { type: DataTypes.STRING },
  address: { type: DataTypes.STRING },
});

const Dish = sequelize.define("dish", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV1,
    allowNull: false,
  },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  available: { type: DataTypes.BOOLEAN, defaultValue: true },
  dascription: { type: DataTypes.STRING, allowNull: false },
  top: { type: DataTypes.BOOLEAN, defaultValue: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  img: { type: DataTypes.STRING, allowNull: false },
  weight: { type: DataTypes.STRING },
});

Categories.hasMany(Dish);
Dish.belongsTo(Categories);

module.exports = { Categories, Contact, Dish };
