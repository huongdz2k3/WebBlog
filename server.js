const dotenv = require('dotenv')
dotenv.config({ path: './config.env' })
const app = require('./app')
require('dotenv').config();
const DB = process.env.DATABASE
const { Sequelize } = require('sequelize');
// connect Database
const sequelize = new Sequelize('webblog', 'root', null, {
    host: 'localhost',
    dialect: 'mysql'
});

// Check connect DB
async function check() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
check()

// Check connect with server
const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`App running on port ${port}`)
})