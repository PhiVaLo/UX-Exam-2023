const {Router} =  require("express");

// abstract class
module.exports.ApiRouterCore = class ApiRouterCore{
    router;

    constructor() {
        this.router = Router();
        console.log("Setting up routes");
        this.setupRoutes();
    }

    setupRoutes(){}

    getRouter(){
        return this.router;
    }
}
