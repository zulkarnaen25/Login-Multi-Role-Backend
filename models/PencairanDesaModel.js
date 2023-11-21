import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const PencairanDesa = db.define('tb_pencairan_desa',{    
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    pencairan_id:{
        type: DataTypes.STRING,
    },
    no_spp:{
        type: DataTypes.STRING,
    },
    tgl_entry:{
        type: DataTypes.STRING,
    },
    kode_desa:{
        type: DataTypes.STRING,
    },
    nama_desa:{
        type: DataTypes.STRING,
    },
    norek_desa:{
        type: DataTypes.STRING,
    },
    alamat_desa:{
        type: DataTypes.STRING,
    },
    status_pencairan_desa:{
        type: DataTypes.STRING,
    },
    kode_kantor:{
        type: DataTypes.STRING,
    },
    kode_kantor_kas:{
        type: DataTypes.STRING,
    },
    keterangan:{
        type: DataTypes.STRING,
    },
    user_created:{
        type: DataTypes.STRING,
    },
    user_modified:{
        type: DataTypes.STRING,
    },
    status_internal:{
        type: DataTypes.STRING,
    },
    status_transfer:{
        type: DataTypes.STRING,
    },
    status_pajak:{
        type: DataTypes.STRING,
    },
    status_bpjs:{
        type: DataTypes.STRING,
    },
    status_trans_internal:{
        type: DataTypes.STRING,
    },
    status_trans_external:{
        type: DataTypes.STRING,
    },
    is_verified:{
        type: DataTypes.STRING,
    },
    is_lock:{
        type: DataTypes.STRING,
    }
},{
    freezeTableName: true
});

export default PencairanDesa;

