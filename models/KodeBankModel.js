import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const KodeBankUmum = db.define('kode_bank_umum',{
    nama_bank:{
        type: DataTypes.STRING,
        // allowNull: false,
        // validate:{
        //     notEmpty: true,
        //     len: [3, 100]
        // }
    },
    kode_bank:{
        type: DataTypes.STRING,
        // allowNull: false,
        // validate:{
        //     notEmpty: true,
        //     isEmail: true
        // }
    }
},{
    freezeTableName: true
});

export default KodeBankUmum;