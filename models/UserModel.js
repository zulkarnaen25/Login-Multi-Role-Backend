import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const User = db.define('users',{
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    kode_user_cbs:{
        type: DataTypes.STRING,
    },
    nama_user_cbs:{
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
    nama_kecamatan:{
        type: DataTypes.STRING,
    },
    email:{
        type: DataTypes.STRING,
    },
    password:{
        type: DataTypes.STRING,
        // allowNull: false,
        // validate:{
        //     notEmpty: true
        // }
    },
    role:{
        type: DataTypes.STRING,
        // allowNull: false,
        // validate:{
        //     notEmpty: true
        // }
    },
    refreshToken:{
        type: DataTypes.TEXT,
        // allowNull: true,
        // validate:{
        //     notEmpty: false
        // }
    },
    flag:{
        type: DataTypes.STRING,
        // allowNull: true,
        // validate:{
        //     notEmpty: false
        // }
    },
    wrong_pass:{
        type: DataTypes.INTEGER,
        // allowNull: true,
        // validate:{
        //     notEmpty: false
        // }
    },
    kode_kantor:{
        type: DataTypes.STRING,
        // allowNull: true,
        // validate:{
        //     notEmpty: false
        // }
    },
    kode_kantor_kas:{
        type: DataTypes.STRING,
        // allowNull: true,
        // validate:{
        //     notEmpty: false
        // }
    },
    is_login:{
        type: DataTypes.STRING,
        // allowNull: true,
        // validate:{
        //     notEmpty: false
        // }
    },
    is_tnt:{
        type: DataTypes.STRING,
        // allowNull: true,
        // validate:{
        //     notEmpty: false
        // }
    },
    menu:{
        type: DataTypes.STRING,
        // allowNull: true,
        // validate:{
        //     notEmpty: false
        // }
    },
    type_user:{
        type: DataTypes.STRING,
    }
},{
    freezeTableName: true
});

export default User;