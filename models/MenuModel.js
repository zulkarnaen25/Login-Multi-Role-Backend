import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Menu = db.define('tb_daftar_menu',{

    nama_menu:{
        type: DataTypes.STRING,
    },
    icon_menu:{
        type: DataTypes.STRING,
    },
    key_active:{
        type: DataTypes.STRING,
    }
},{
    freezeTableName: true
});

export default Menu;

