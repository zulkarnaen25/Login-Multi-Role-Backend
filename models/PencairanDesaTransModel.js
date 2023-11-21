import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const PencairanDesaTrans = db.define('tb_pencairan_desa_trans',{    
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
    norek_sumber:{
        type: DataTypes.STRING,
    },
    nama_sumber:{
        type: DataTypes.STRING,
    },
    kantor_sumber:{
        type: DataTypes.STRING,
    },
    jenis_transaksi:{
        type: DataTypes.STRING,
    },
    bank_tujuan:{
        type: DataTypes.STRING,
    },
    norek_tujuan:{
        type: DataTypes.STRING,
    },
    nama_tujuan:{
        type: DataTypes.STRING,
    },
    nominal_ob:{
        type: DataTypes.STRING,
    },
    user_created:{
        type: DataTypes.STRING,
    },
    keterangan:{
        type: DataTypes.STRING,
    },
    tgl_entry:{
        type: DataTypes.STRING,
    },
    tgl_trans:{
        type: DataTypes.STRING,
    },
    jam_trans:{
        type: DataTypes.STRING,
    },
    status_trans:{
        type: DataTypes.STRING,
    },
    id_biling:{
        type: DataTypes.STRING,
    },
    jenis_pajak:{
        type: DataTypes.STRING,
    },
    masa_pajak:{
        type: DataTypes.STRING,
    },
    nomor_virtual_account:{
        type: DataTypes.STRING,
    },
    perihal:{
        type: DataTypes.STRING,
    },
    kode_bank_umum:{
        type: DataTypes.STRING,
    },
    tnt_id:{
        type: DataTypes.STRING,
    },
    urut_excel:{
        type: DataTypes.STRING,
    }
},{
    freezeTableName: true
});

export default PencairanDesaTrans;

