import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const ReffKecamatan = db.define('tb_reff_kecamatan',{
    KODE_KECAMATAN:{
        type: DataTypes.STRING,
    },
    KECAMATAN:{
        type: DataTypes.STRING,
    },
    ALAMAT:{
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

export default ReffKecamatan;