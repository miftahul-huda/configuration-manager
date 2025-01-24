const { Model, DataTypes } = require('sequelize');

class AppKeyValue extends Model {
    static initialize(sequelize, force=false)
    { 
        super.init({
            appID: DataTypes.STRING,
            key: DataTypes.STRING,
            value: DataTypes.TEXT,
            description: DataTypes.TEXT
        }, 
        { sequelize, modelName: 'appkeyvalue', tableName: 'appkeyvalue', force: force });
    }
}

module.exports = AppKeyValue;