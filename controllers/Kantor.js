import Kantor from "../models/KantorModel.js";

export const getKantor = async(req, res) =>{
    try {
        const response = await Kantor.findAll({
            attributes:['id','kode_kantor_kas', 'kode_kantor', 'nama_kantor', 'alamat_kantor', 'status']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getKantorCabang = async(req, res) =>{
    try {
        const response = await Kantor.findAll({
            attributes:['id','kode_kantor_kas', 'kode_kantor', 'nama_kantor', 'alamat_kantor', 'status'],
            where: {
                status: "cabang"
            }  
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getKantorById = async(req, res) =>{
    try {
        const response = await Kantor.findOne({
            attributes:['id', 'kode_kantor_kas', 'kode_kantor', 'nama_kantor', 'alamat_kantor', 'status'],
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getKantorByKodeCabang = async(req, res) =>{
    try {
        const response = await Kantor.findAll({
            attributes:['id', 'kode_kantor_kas', 'kode_kantor', 'nama_kantor', 'alamat_kantor', 'status'],
            where: {
                kode_cabang: req.params.kode_cabang
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}


export const createKantor = async(req, res) =>{
    const {kodekantorkas, kodekantor, namakantor, alamatkantor, status} = req.body;
    const kodekas = await Kantor.findOne({
        attributes:['kode_kantor_kas'],
        where: {
            kode_kantor_kas: kodekantorkas
        }
    });
    if(kodekas) return res.status(404).json({msg: "Kantor kas sudah ada!"});
    
    try {
        await Kantor.create({
            kode_kantor_kas: kodekantorkas,
            kode_kantor: kodekantor,
            nama_kantor: namakantor,
            alamat_kantor : alamatkantor,
            status : status
        });
        res.status(201).json({msg: "Berhasil"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const updateKantor = async(req, res) =>{
    const kantor = await Kantor.findOne({
        where: {
            id: req.params.id
        }
    });
    if(!kantor) return res.status(404).json({msg: "Kantor tidak ditemukan"});
    const {kodekantorkas, kodekantor, namakantor, alamatkantor, status} = req.body;
    try {
        await Kantor.update({
            kode_kantor_kas: kodekantorkas,
            kode_kantor: kodekantor,
            nama_kantor: namakantor,
            alamat_kantor : alamatkantor,
            status : status
        },{
            where:{
                id: kantor.id
            }
        });
        res.status(200).json({msg: "Kantor Updated"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const deleteKantor = async(req, res) =>{
  
    const kantor = await Kantor.findOne({
        where: {
            id: req.params.id
        }
    });
    if(!kantor) return res.status(404).json({msg: "Kantor tidak ditemukan"});
    try {
        await Kantor.destroy({
            where:{
                id: kantor.id
            }
        });
        res.status(200).json({msg: "Kantor Deleted"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

