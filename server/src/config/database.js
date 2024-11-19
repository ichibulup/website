const { Sequelize } = require("sequelize");

const sequelize = new Sequelize('wt_proj', 'root', 'Japtor@1999', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
});

// sequelize.sync({ force: true }).then(() => {
//     console.log("Database & tables created!");
// }).catch(error => {
//     console.log("Error syncing models:", error);
// });

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

module.exports = sequelize;