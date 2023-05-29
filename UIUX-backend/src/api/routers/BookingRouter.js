const {ApiRouterCore} = require("../ApiRouterCore");
const {addBooking, addNewBookingDetail, getUsersInBooking, getBooking} = require("../data/databaseHandler");

module.exports.BookingRouter = class BookingRouter extends ApiRouterCore{
    setupRoutes(){
        this.router.post("/", this.addNewBooking);
        this.router.get("/:bookingId", this.getBookingById);
        this.router.post('/details', this.addNewDetail);
        this.router.get('/details/:bookingId', this.getUsersInBooking);
    }

    getBookingById(req, res){
        const booking = getBooking(req.params.bookingId);

        if (booking === undefined){
            res.sendStatus(200);
            return;
        }

        res.json(booking);
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

