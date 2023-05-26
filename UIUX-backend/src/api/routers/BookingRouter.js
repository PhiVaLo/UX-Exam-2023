const {ApiRouterCore} = require("../ApiRouterCore");
const {addBooking, addNewBookingDetail, getUsersInBooking} = require("../data/databaseHandler");

module.exports.BookingRouter = class BookingRouter extends ApiRouterCore{
    setupRoutes(){
        this.router.post("/", this.addNewBooking);
        this.router.post('/details', this.addNewDetail);
        this.router.get('/details/:bookingId', this.getUsersInBooking);
    }

    addNewBooking(req, res){
        res.headers = addBooking(req.body);
        res.sendStatus(200);
    }

    addNewDetail(req, res){
        addNewBookingDetail(req.body);
        res.sendStatus(200);
    }

    getUsersInBooking(req, res){
        res.json(getUsersInBooking(req.params.bookingId));
    }

}

