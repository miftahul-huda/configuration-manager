//const LoggerModel  = require( './modules/models/loggermodel')

const { Sequelize, Model, DataTypes } = require('sequelize');
const ClientApplicationModel = require('./modules/models/clientapplicationmodel');
const AppKeyValueModel = require('./modules/models/appkeyvaluemodel');



const sequelize = new Sequelize(process.env.DBNAME, process.env.DBUSER, process.env.DBPASSWORD, {
    host: process.env.DBHOST,
    dialect: process.env.DBENGINE,
    logging:false
});


class Initialization {
    static async initializeDatabase(){

        let force = false;
        ClientApplicationModel.initialize(sequelize, force);
        AppKeyValueModel.initialize(sequelize, force);
        await sequelize.sync();
    }
}

module.exports = Initialization



