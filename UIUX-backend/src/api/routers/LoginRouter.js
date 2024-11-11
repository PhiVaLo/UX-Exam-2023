const {ApiRouterCore} = require("../ApiRouterCore");
const {userExist} = require("../data/databaseHandler");

module.exports.LoginRouter = class LoginRouter extends ApiRouterCore{
    setupRoutes(){
        this.router.post("/", this.validateLogin)
    }

    validateLogin(req, res) {
        const user = userExist(req.body.email, req.body.password);

        res.set('Login-status', user !== undefined ? 1 : 0);
        res.set('Access-Control-Expose-Headers', 'Login-status')
        res.sendStatus(200);
    }
}
