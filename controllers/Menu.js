import Menu from "../models/MenuModel.js";
import SubMenu from "../models/SubMenuModel.js";
import { Sequelize } from "sequelize";


export const getMenuId = async(req, res) =>{
    const valKey = req.params.id.split(',').map(Number);

    try {

        const menu = await Menu.findAll({
            where: {
                id: {
                    [Sequelize.Op.in]: valKey
                } 
            },
            order: [
             ['id', 'ASC']
           ]
        });

        const formattedMenu = await Promise.all(
            menu.map(async (mn) => {
              const submenu = await SubMenu.findAll({
                where: {
                    id_menu: mn.id,
                },
                order: [
                    ['id', 'ASC']
                ]
              });
          
              return {
                namamenu: mn.nama_menu,
                iconmenu: mn.icon_menu,
                keyactivemenu: mn.key_active,
                datasubmenu: submenu.map((dtsubmenu) => ({
                    namasubmenu: dtsubmenu.nama_sub_menu,
                    idmenu: dtsubmenu.id_menu,
                    iconsubmenu: dtsubmenu.icon_sub_menu,
                    keyactivesubmenu: dtsubmenu.key_active_sub_menu,
                })),
              };
            })
          );



        res.status(200).json(formattedMenu);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }


}


export const getReffMenu = async(req, res) =>{
    try {
        const response = await Menu.findAll({
            attributes:['id','nama_menu',],
            order: [
                    ['id', 'ASC']
                ]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}





