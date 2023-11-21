import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

export const AppConfig = db.define('tb_config',{
    keyname:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    keyvalue:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    deskripsi:{
        type: DataTypes.STRING,
        // allowNull: false
        // validate:{
        //     notEmpty: true
        // }
    }
},{
    freezeTableName: true
});


export default AppConfig;