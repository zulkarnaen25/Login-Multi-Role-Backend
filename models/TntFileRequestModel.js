import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const TntFileRequest = db.define('tb_tnt_file_request',{
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
    file_id_tnt:{
        type: DataTypes.STRING,
    },
    file_nama:{
        type: DataTypes.STRING,
    }
},{
    freezeTableName: true
});

export default TntFileRequest;