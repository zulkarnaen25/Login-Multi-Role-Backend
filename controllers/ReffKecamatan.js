import ReffKecamatan from "../models/ReffKecamatanModel.js";

export const getReffKecamatan = async(req, res) =>{
    try {
        const response = await ReffKecamatan.findAll({
            attributes:['id','KODE_KECAMATAN', 'KECAMATAN', 'ALAMAT', 'KODE_KANTOR', 'KODE_KANTOR_KAS'],
            order: [
                ['createdAt', 'DESC']
            ]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}


export const getReffKecamatanById = async(req, res) =>{
    try {
        const response = await ReffKecamatan.findOne({
            attributes:['id','KODE_KECAMATAN', 'KECAMATAN', 'ALAMAT', 'KODE_KANTOR', 'KODE_KANTOR_KAS'],
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getReffKecByKodeInstansi = async(req, res) =>{
    try {
        const response = await ReffKecamatan.findOne({
            where: {
                KODE_KECAMATAN: req.params.kodeinstansi
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}



export const createReffKecamatan = async(req, res) =>{
    const {kodekecamatan, kecamatan, alamat, kodekantor, kodekantorkas} = req.body;
    const kodekec = await ReffKecamatan.findOne({
        attributes:['KODE_KECAMATAN'],
        where: {
            KODE_KECAMATAN: kodekecamatan
        }
    });
    if(kodekec) return res.status(404).json({msg: "Kecamatan sudah ada!"});
    try {
        await ReffKecamatan.create({
            KODE_KECAMATAN : kodekecamatan,
            KECAMATAN : kecamatan,
            ALAMAT: alamat,
            KODE_KANTOR: kodekantor,
            KODE_KANTOR_KAS: kodekantorkas
        });
        res.status(201).json({msg: "Data Inserted"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const updateReffKecamatan = async(req, res) =>{
    const reffkecamatan = await ReffKecamatan.findOne({
        where: {
            id: req.params.id
        }
    });

    if(!reffkecamatan) return res.status(404).json({msg: "Desa tidak ditemukan"});
    const {kodekecamatan, kecamatan, alamat, kodekantor, kodekantorkas} = req.body;
    try {
        await ReffKecamatan.update({    
            KODE_KECAMATAN : kodekecamatan, 
            KECAMATAN : kecamatan,
            ALAMAT: alamat,
            KODE_KANTOR: kodekantor,
            KODE_KANTOR_KAS: kodekantorkas
        },{
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Data Updated"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const deleteReffKecamatan = async(req, res) =>{
    const reffkecamatan = await ReffKecamatan.findOne({
        where: {
            id: req.params.id
        }
    });
    if(!reffkecamatan) return res.status(404).json({msg: "Desa tidak ditemukan"});
    try {
        await ReffKecamatan.destroy({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Data Deleted"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}
