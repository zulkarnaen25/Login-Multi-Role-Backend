import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Kantor = db.define('kode_kantor',{
    kode_kantor_kas:{
        type: DataTypes.STRING,
    },
    kode_kantor:{
        type: DataTypes.STRING,
    },
    nama_kantor:{
        type: DataTypes.STRING,
    },
    alamat_kantor:{
        type: DataTypes.STRING,
    },
    kota_kantor:{
        type: DataTypes.STRING,
    },
    status:{
        type: DataTypes.STRING,
    }
},{
    freezeTableName: true
});

export default Kantor;