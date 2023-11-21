import ReffDesa from "../models/ReffDesaModel.js";
import { Sequelize } from "sequelize";

export const getReffDesa = async(req, res) =>{
    try {
        const response = await ReffDesa.findAll({
            attributes:['id', 'KODE_DESA','DESA', 'KODE_KECAMATAN', 'KECAMATAN', 'NO_REKENING', 'KODE_KANTOR', 'KODE_KANTOR_KAS' ],
            order: [
                ['createdAt', 'DESC']
            ]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}


export const getReffDesaById = async(req, res) =>{
    try {
        const response = await ReffDesa.findOne({
            attributes:['id', 'KODE_DESA','DESA', 'KODE_KECAMATAN', 'KECAMATAN', 'NO_REKENING', 'KODE_KANTOR', 'KODE_KANTOR_KAS' ],
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getReffDesaByNorek = async(req, res) =>{
    try {
        const response = await ReffDesa.findOne({
            where: {
                NO_REKENING: req.params.norek
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}





export const createReffDesa = async(req, res) =>{
    const {kodedesa, desa, kodekecamatan, kecamatan, norekening, kodekantor, kodekantorkas} = req.body;
    const kodedes = await ReffDesa.findOne({
        attributes:['KODE_DESA'],
        where: {
            KODE_DESA: kodedesa
        }
    });
    if(kodedes) return res.status(404).json({msg: "Desa sudah ada!"});
    try {
        await ReffDesa.create({
            KODE_DESA : kodedesa,
            DESA : desa,
            KODE_KECAMATAN : kodekecamatan,
            KECAMATAN : kecamatan,
            NO_REKENING : norekening,
            KODE_KANTOR : kodekantor,
            KODE_KANTOR_KAS : kodekantorkas

        });
        res.status(201).json({msg: "Data Inserted"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const updateReffDesa = async(req, res) =>{
    const reffdesa = await ReffDesa.findOne({
        where: {
            id: req.params.id
        }
    });

    if(!reffdesa) return res.status(404).json({msg: "Desa tidak ditemukan"});
    const {kodedesa, desa, kodekecamatan, kecamatan, norekening, kodekantor, kodekantorkas} = req.body;
    try {
        await ReffDesa.update({     
            KODE_DESA : kodedesa,
            DESA : desa,
            KODE_KECAMATAN : kodekecamatan,
            KECAMATAN : kecamatan,
            NO_REKENING : norekening,
            KODE_KANTOR : kodekantor,
            KODE_KANTOR_KAS : kodekantorkas
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

export const deleteReffDesa = async(req, res) =>{
    const reffdesa = await ReffDesa.findOne({
        where: {
            id: req.params.id
        }
    });
    if(!reffdesa) return res.status(404).json({msg: "Desa tidak ditemukan"});
    try {
        await ReffDesa.destroy({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Data Deleted"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}


export const getKodeDesByKec = async(req, res) =>{
    try {
        const response = await ReffDesa.findAll({
            attributes:['KODE_DESA', 'DESA', 'KECAMATAN'],
            where: {
                KODE_KECAMATAN: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getKodeDesByKas = async(req, res) =>{
    try {
        const response = await ReffDesa.findAll({
            attributes:['KODE_DESA', 'DESA', 'KECAMATAN'],
            where: {
                KODE_KANTOR_KAS: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}