import { Sequelize, DataTypes } from 'sequelize'

const database = ''
const username = ''
const password = ''
const host = ''

const sequelize = new Sequelize(database, username, password, {
  host: host,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
        require: true,
        rejectUnauthorized: false
    }
 }
});

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, { tableName: 'users' });

//await User.sync({ force: true }); console.log("The table for the User model was just (re)created!");

await User.create({ name: "Jane", email: "jane@test.com", password: "jane123" });
await User.create({ name: "John", email: "john@test.com", password: "john123" });
await User.create({ name: "Peter", email: "peter@test.com", password: "peter123" });

const users = await User.findAll()
console.log(users)