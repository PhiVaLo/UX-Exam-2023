const {ApiRouterCore} = require("../ApiRouterCore");
const {getAllUniversityNames, addNewUniversity} = require("../data/databaseHandler");

module.exports.UniversityRouter = class UniversityRouter extends ApiRouterCore{
    setupRoutes(){
        this.router.get('/', this.getAllUniversities);
        this.router.put('/', this.addNewUniversity)
    }

    getAllUniversities(req, res){
        res.json(getAllUniversityNames());
    }

    addNewUniversity(req, res){
        addNewUniversity(req.body);
        res.sendStatus(200);
    }
}

