import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Kantor = db.define('kode_kantor',{
    kode_kantor_kas:{
        type: DataTypes.STRING,
        // allowNull: false,
        // validate:{
        //     notEmpty: true,
        //     len: [3, 5]
        // }
    },
    kode_kantor:{
        type: DataTypes.STRING,
        // allowNull: false,
        // validate:{
        //     notEmpty: true,
        //     len: [3, 100]
        // }
    },
    nama_kantor:{
        type: DataTypes.STRING,
        // allowNull: false,
        // validate:{
        //     notEmpty: true,
        //     isEmail: true
        // }
    },
    alamat_kantor:{
        type: DataTypes.STRING,
        // allowNull: false,
        // validate:{
        //     notEmpty: true
        // }
    },
    status:{
        type: DataTypes.STRING,
        // allowNull: false,
        // validate:{
        //     notEmpty: true
        // }
    }
},{
    freezeTableName: true
});

export default Kantor;