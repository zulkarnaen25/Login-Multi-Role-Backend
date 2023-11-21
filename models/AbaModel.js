import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Aba = db.define('tb_aba',{

    norek_aba:{
        type: DataTypes.STRING,
    },
    nama_aba:{
        type: DataTypes.STRING,
    },
    jenis_aba:{
        type: DataTypes.STRING,
    },
    no_alternatif:{
        type: DataTypes.STRING,
    }
},{
    freezeTableName: true
});

export default Aba;

