import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const LogUser = db.define('log_user',{
    UUID:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        // allowNull: false,
        // validate:{
        //     notEmpty: true
        // }
    },
    user_ibs:{
        type: DataTypes.STRING,
        // allowNull: false,
        // validate:{
        //     notEmpty: true,
        // }
    },
    ip_address:{
        type: DataTypes.STRING,
        // allowNull: false,
        // validate:{
        //     notEmpty: true
        // }
    },
    action:{
        type: DataTypes.STRING,
        // allowNull: false,
        // validate:{
        //     notEmpty: true
        // }
    },
    table_name:{
        type: DataTypes.STRING,
        // allowNull: false,
        // validate:{
        //     notEmpty: true
        // }
    }
},{
    freezeTableName: true
});

export default LogUser;

