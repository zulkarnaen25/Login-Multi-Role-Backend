import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const UserExt = db.define('users_ext',{
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    kode_instansi:{
        type: DataTypes.STRING,
    },
    name:{
        type: DataTypes.STRING,
    },
    alamat:{
        type: DataTypes.STRING,
    },
    norek:{
        type: DataTypes.STRING,
    },
    nama_user_cbs:{
        type: DataTypes.STRING,
    },
    nama_kecamatan:{
        type: DataTypes.STRING,
    },
    email:{
        type: DataTypes.STRING,
    },
    password:{
        type: DataTypes.STRING,
    },
    role:{
        type: DataTypes.STRING,
    },
    refreshToken:{
        type: DataTypes.STRING,
    },
    flag:{
        type: DataTypes.STRING,
    },
    wrong_pass:{
        type: DataTypes.STRING,
    },
    kode_kantor:{
        type: DataTypes.STRING,
    },
    kode_kantor_kas:{
        type: DataTypes.STRING,
    },
    is_login:{
        type: DataTypes.STRING,
    },
    otp:{
        type: DataTypes.STRING,
    },
    menu:{
        type: DataTypes.STRING,
    },
    is_tnt:{
        type: DataTypes.STRING,
    },
    type_user:{
        type: DataTypes.STRING,
    }
},{
    freezeTableName: true
});

export default UserExt;