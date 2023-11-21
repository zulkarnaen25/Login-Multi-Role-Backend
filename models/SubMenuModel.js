import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const SubMenu = db.define('tb_daftar_sub_menu',{
  
    id_menu:{
        type: DataTypes.STRING,
    },
    nama_sub_menu:{
        type: DataTypes.STRING,
    },
    key_active_sub_menu:{
        type: DataTypes.STRING,
    },
    icon_sub_menu:{
        type: DataTypes.STRING,
    }
},{
    freezeTableName: true
});

export default SubMenu;

