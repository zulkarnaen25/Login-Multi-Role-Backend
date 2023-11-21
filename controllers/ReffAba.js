import Aba from "../models/AbaModel.js";

export const getReffAba = async(req, res) =>{
    try {
        const response = await Aba.findAll({
            order: [
                ['id', 'DESC']
            ]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}


export const getReffAbaById = async(req, res) =>{
    try {
        const response = await Aba.findOne({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}


export const getReffAbaByNorek = async(req, res) =>{
    try {
        const response = await Aba.findOne({
            where: {
                norek_aba: req.params.norek
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}


export const createReffAba = async(req, res) =>{
    const {norekaba, namaaba, jenisaba, noalternatif} = req.body;
    const aba = await Aba.findOne({
        attributes:['norek_aba'],
        where: {
            norek_aba: norekaba
        }
    });
    if(aba) return res.status(404).json({msg: "No. Rekening ABA sudah ada!"});
    try {
        await Aba.create({
            norek_aba : norekaba,
            nama_aba : namaaba,
            jenis_aba: jenisaba,
            no_alternatif: noalternatif
        });
        res.status(201).json({msg: "Data Inserted"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const updateReffAba = async(req, res) =>{
    const aba = await Aba.findOne({
        where: {
            id: req.params.id
        }
    });

    if(!aba) return res.status(404).json({msg: "No. Rekening ABA tidak ditemukan"});
    const {norekaba, namaaba, jenisaba, noalternatif} = req.body;
    try {
        await Aba.update({     
            norek_aba : norekaba,
            nama_aba : namaaba,
            jenis_aba: jenisaba,
            no_alternatif: noalternatif
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

export const deleteReffAba = async(req, res) =>{
    const aba = await Aba.findOne({
        where: {
            id: req.params.id
        }
    });
    if(!aba) return res.status(404).json({msg: "No. Rekening ABA tidak ditemukan"});
    try {
        await Aba.destroy({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Data Deleted"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}
