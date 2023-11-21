import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Tnt = db.define('tb_tnt',{
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    tnt_id:{
        type: DataTypes.STRING,
    },
    sandi_kantor:{
        type: DataTypes.STRING,
    },
    sandi_cabang:{
        type: DataTypes.STRING,
    },
    jenis_tnt:{
        type: DataTypes.STRING,
    },
    nama_nasabah:{
        type: DataTypes.STRING,
    },
    alamat_nasabah:{
        type: DataTypes.STRING,
    },
    norek_nasabah:{
        type: DataTypes.STRING,
    },
    bank_tujuan:{
        type: DataTypes.STRING,
    },
    norek_tujuan:{
        type: DataTypes.STRING,
    },
    nama_pemilik_rekening_tujuan:{
        type: DataTypes.STRING,
    },
    jumlah_disetor:{
        type: DataTypes.DECIMAL(18,2),
    },
    perihal:{
        type: DataTypes.STRING,
    },
    catatan:{
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
    id_biling:{
        type: DataTypes.STRING,
    },
    note_petugas:{
        type: DataTypes.STRING,
    },
    norek_aba:{
        type: DataTypes.STRING,
    },
    no_alternatif_aba:{
        type: DataTypes.STRING,
    },
    nama_aba:{
        type: DataTypes.STRING,
    },
    jenis_aba:{
        type: DataTypes.STRING,
    },
    user_processed:{
        type: DataTypes.STRING,
    },
    processed_at:{
        type: DataTypes.STRING,
        allowNull: true
    },
    user_created:{
        type: DataTypes.STRING,
    },
    created_at:{
        type: DataTypes.DATE,
    },
    user_modified:{
        type: DataTypes.STRING,
    },
    modified_at:{
        type: DataTypes.DATE,
    },
    status:{
        type: DataTypes.STRING,
    },
    is_lock:{
        type: DataTypes.STRING,
    },
    tgl_permohonan:{
        type: DataTypes.DATE,
    },
    user_finished:{
        type: DataTypes.STRING,
    },
    finished_at:{
        type: DataTypes.DATE,
    },
    pencairan_id:{
        type: DataTypes.STRING,
    }
},{
    freezeTableName: true
});

export default Tnt;