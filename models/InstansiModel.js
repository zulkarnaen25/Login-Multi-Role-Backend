import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Instansi = db.define('tb_instansi',{
    instansi_logo:{
        type: DataTypes.STRING,     
    },
    instansi_nama:{
        type: DataTypes.INTEGER,
    },
    instansi_alamat:{
        type: DataTypes.INTEGER,
    },
    instansi_telp:{
        type: DataTypes.STRING,
    },
    warna_slip:{
        type: DataTypes.STRING,
    }
},{
    freezeTableName: true
});


export default Instansi;