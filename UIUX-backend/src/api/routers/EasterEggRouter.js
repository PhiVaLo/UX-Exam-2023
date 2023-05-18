const {ApiRouterCore} = require("../ApiRouterCore");

module.exports.EasterEggRouter = class EasterEggRouter extends ApiRouterCore{
    setupRoutes(){
        this.router.get("/uwu", this.getUwu)
    }

    getUwu(req, res){
        res.send("Cat");
    }
}

