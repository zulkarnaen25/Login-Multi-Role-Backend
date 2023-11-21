import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const ReffDesa = db.define('tb_reff_desa',{
    KODE_DESA:{
        type: DataTypes.STRING,
    },
    DESA:{
        type: DataTypes.STRING,
    },
    KODE_KECAMATAN:{
        type: DataTypes.STRING,
    },
    KECAMATAN:{
        type: DataTypes.STRING,
    },
    NO_REKENING:{
        type: DataTypes.STRING,
    },
    KODE_KANTOR:{
        type: DataTypes.STRING,
    },
    KODE_KANTOR_KAS:{
        type: DataTypes.STRING,
    }
},{
    freezeTableName: true
});

export default ReffDesa;