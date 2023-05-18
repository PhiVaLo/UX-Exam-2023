const {ApiRouterCore} = require("../ApiRouterCore");
const {addUser, getUser} = require("../data/databaseHandler");

module.exports.UserRouter = class extends ApiRouterCore{
    setupRoutes(){
        this.router.get("/:userId", this.getUserById);
        this.router.post("/add", this.addNewUser);
    }

    getUserById(req, res){
        const user = getUser(req.params.userId);
        res.json(user);
    }

    addNewUser(req, res){
        const user = req.body;
        console.log(user);
        addUser(user);
        res.sendStatus(200);
    }
}

