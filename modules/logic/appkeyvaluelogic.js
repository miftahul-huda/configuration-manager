const { Sequelize, Model, DataTypes } = require('sequelize');
const { Op } = require("sequelize");

const CrudLogic = require("./crudlogic");

class AppKeyValueLogic extends CrudLogic {

    static getModel()
    {
        const model = require("../models/appkeyvaluemodel");
        return model;
    }

    static getPk(){
        return "id";
    }

    static getWhere(search)
    {
        let where = {
            appID : {
                [Op.like] : "%" + search + "%"
            } 
        }
        return where;
    }

    static getOrder()
    {
        let order = [['createdAt', 'DESC']];
        return order;
    }

    static async getByKey(appID, apiKey)
    {
        try
        {

            const clientAppModel = require("../models/clientapplicationmodel");
            let app = await clientAppModel.findOne({
                where: {
                    [Op.and]:[
                        {
                            appID: appID
                        },
                        {
                            apiKey: apiKey
                        }
                    ]
                }
            })

            if(app != null)
            {
                
                const CurrentModel = this.getModel();
                let where = { appID: appID };
                let items = await CurrentModel.findAll({ where: where });
                return { success: true, payload: items }
                
            }
            else
            {
                return { success: false, payload: null, message: "No such app" };
            }
            

        }
        catch(e)
        {
            throw e;
        }
    }
}

module.exports = AppKeyValueLogic;