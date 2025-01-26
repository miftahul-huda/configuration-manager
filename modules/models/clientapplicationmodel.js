const { Model, DataTypes } = require('sequelize');

class ClientApplicationModel extends Model {
    static initialize(sequelize, force=false)
    { 
        super.init({
            appID: DataTypes.STRING,
            apiKey: DataTypes.STRING,
            description: DataTypes.TEXT,
            createdBy: DataTypes.STRING,
            appType: DataTypes.STRING,
            tag: DataTypes.STRING
        }, 
        { sequelize, modelName: 'clientapplication', tableName: 'clientapplication', force: force });
    }
}

module.exports = ClientApplicationModel;