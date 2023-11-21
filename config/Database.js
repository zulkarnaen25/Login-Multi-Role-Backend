import {Sequelize} from "sequelize";

const db = new Sequelize('db_tntd', 'root', 'btb160316', {
    host: "localhost",
    dialect: "mysql",
    timezone: '+07:00',
    decimalNumbers: true
});

export default db;