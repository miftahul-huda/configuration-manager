const CrudRouter = require("./crudrouter");

class EnvRouter {

    static getRouter(logic)
    {
        var express = require('express');
        var router = express.Router();
        router.logic = logic;
        let me = this;

        router.post("/:appID", (req, res)=>{

            const appID = req.params.appID;
            const apiKey = req.body.apiKey;

            logic.getByKey(appID, apiKey).then((result)=>{
                res.send(result);
            }).catch((err)=>{
                res.send(err);
            })
        });

        return router;
    }

}

module.exports = EnvRouter;