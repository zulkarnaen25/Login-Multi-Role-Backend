import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const PencairanFile = db.define('tb_pencairan_desa_file',{
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    file_id:{
        type: DataTypes.STRING,
    },
    file_id_pencairan:{
        type: DataTypes.STRING,
    },
    file_nama:{
        type: DataTypes.STRING,
    }
},{
    freezeTableName: true
});

export default PencairanFile;