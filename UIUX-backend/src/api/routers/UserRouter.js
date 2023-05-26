const {ApiRouterCore} = require("../ApiRouterCore");
const {addUser, getUser, getUserEmail, getUserEmailAndPasscode, userEmailExist, userExist} = require("../data/databaseHandler");

module.exports.UserRouter = class extends ApiRouterCore{
    setupRoutes(){
        this.router.get("/:userId", this.getUserById);
        this.router.get("/:userId/bookings", this.getBookingsByUserID);
        this.router.get("/:userId/bookings/:bookingId", this.getBookingByUserID);
        this.router.post("/add/", this.addNewUser);
        this.router.delete('/:userId', this.deleteUserById);
        this.router.get("/email/:userEmail", this.userWithEmailExist);
    }

    getUserById(req, res){
        const user = getUser(req.params.userId);
        res.json(user);
    }

    getBookingsByUserID(req, res) {
        res.json(getBookingsByUserID(req.params.userId));
    }

    getBookingByUserID(req, res) {
        res.json(getBookingByUserID(req.params.userId, req.params.bookingId));
    }

    deleteUserById(req, res){
        deleteUserByID(req.params.userId);
        res.sendStatus(200);
    }

    addNewUser(req, res){
        const user = req.body;
        console.log(user);
        addUser(user);
        res.sendStatus(200);
    }

    userWithEmailExist (req, res) {
        const emailExist = userEmailExist(req.params.userEmail);
        res.sendStatus(200);
    }

}

