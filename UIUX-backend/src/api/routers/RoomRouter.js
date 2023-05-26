const {ApiRouterCore} = require("../ApiRouterCore");
const {getRoom, addRoom, getAllBookingsByRoom} = require("../data/databaseHandler");

module.exports.RoomRouter = class RoomRouter extends ApiRouterCore{
    setupRoutes(){
        this.router.get('/:roomId', this.getRoom);
        this.router.post('/', this.addRoom);
        this.router.get('/:roomId/bookings', this.getAllRoomBookings);
    }

    getRoom(req, res){
        const room = getRoom(req.params.roomId);
        res.json(room);
    }

    addRoom(req, res){
        addRoom(req.body);
        res.sendStatus(200);
    }

    getAllRoomBookings(req, res){
        res.json(getAllBookingsByRoom(req.params.roomId));
    }

    getRoomBooking(req, res){
        res.json(req.params.roomId, req.params.userId);
    }
}

