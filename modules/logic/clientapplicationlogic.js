const { Sequelize, Model, DataTypes } = require('sequelize');
const { Op } = require("sequelize");

const CrudLogic = require("./crudlogic");

class ClientApplicationLogic extends CrudLogic {

    static getModel()
    {
        const model = require("../models/clientapplicationmodel");
        return model;
    }

    static getPk(){
        return "appID";
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


    static async get(appID)
    {
        try
        {
            let result = await super.get(appID);
            let app = result.payload;
            app = JSON.parse(JSON.stringify(app))
            let keyValueModel = require("../models/appkeyvaluemodel");
            let where = { appID: appID };
            let keyValues = await keyValueModel.findAll({ where: where });
            
            app.keyValues = keyValues;
            result.payload = app;
            return result;

        }
        catch(e)
        {
            throw e;
        }
    }

    static async create(o)
    {
        try
        {
            let  result = await super.create(o);
            let app = result.payload;

            let keyValues = o.keyValues;
            keyValues.map((kv)=>{
                kv.appID = app.appID;
            })

            let keyValueModel = require("../models/appkeyvaluemodel");
            await keyValueModel.bulkCreate(keyValues);


            return result;
        }
        catch(e)
        {
            throw e;
        }
    }

    static async update(appID,  o)
    {
        try
        {
            let  result = await super.update(appID, o);
            let keyValues = o.keyValues;
            keyValues.map((kv)=>{
                kv.appID = appID;
            })

            let keyValueModel = require("../models/appkeyvaluemodel");
            await keyValueModel.destroy({ where: { appID: appID } });
            await keyValueModel.bulkCreate(keyValues);
            return result;
        }
        catch(e)
        {
            console.log(e)
            throw e;
        }
    }

    static async delete(appID)
    {
        try
        {
            let  result = await super.delete(appID);
            let keyValueModel = require("../models/appkeyvaluemodel");
            await keyValueModel.destroy({ where: { appID: appID } });
            return result;

        }
        catch(e)
        {
            throw e;
        }
    }
}

module.exports = ClientApplicationLogic;