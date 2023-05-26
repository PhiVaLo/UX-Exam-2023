const {ApiRouterCore} = require("../ApiRouterCore");
const {userExist} = require("../data/databaseHandler");

module.exports.LoginRouter = class LoginRouter extends ApiRouterCore{
    setupRoutes(){
        this.router.get("/:email&:passcode", this.validateLogin)
    }

    validateLogin(req, res) {
        const user = userExist(req.params.email, req.params.passcode);
        res.json(user);
    }
}
