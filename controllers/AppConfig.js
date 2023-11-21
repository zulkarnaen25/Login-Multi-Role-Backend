import AppConfig from "../models/AppConfigModel.js";

export const getConfig = async(req, res) =>{
    try {
        const response = await AppConfig.findAll({
            attributes:['id','keyname','keyvalue','deskripsi']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getConfigById = async(req, res) =>{
    try {
        const response = await AppConfig.findOne({
            attributes:['id', 'keyname','keyvalue','deskripsi'],
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getConfigByKeyname = async(req, res) =>{
    try {
        const response = await AppConfig.findOne({
            attributes:['keyvalue', 'deskripsi'],
            where: {
                keyname: req.params.keyname
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}


export const createConfig = async(req, res) =>{
    const {keyname, keyvalue, deskripsi} = req.body;
    try {
        await AppConfig.create({
            keyname: keyname,
            keyvalue: keyvalue,
            deskripsi : deskripsi,
        });
        res.status(201).json({msg: "Input Berhasil"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const updateConfig = async(req, res) =>{
    const config = await AppConfig.findOne({
        where: {
            id: req.params.id
        }
    });
    if(!config) return res.status(404).json({msg: "Not Found"});
    const {keyname, keyvalue, deskripsi} = req.body;
    try {
        await AppConfig.update({
            // keyname: keyname,
            keyvalue: keyvalue,
            deskripsi : deskripsi,
        },{
            where:{
                id: config.id
            }
        });
        res.status(200).json({msg: "Config Updated"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const deleteConfig = async(req, res) =>{
    const config = await AppConfig.findOne({
        where: {
            id: req.params.id
        }
    });
    if(!config) return res.status(404).json({msg: "Not Found"});
    try {
        await AppConfig.destroy({
            where:{
                id: config.id
            }
        });
        res.status(200).json({msg: "Config Deleted"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}