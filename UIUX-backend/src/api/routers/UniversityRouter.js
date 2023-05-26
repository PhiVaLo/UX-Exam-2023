const {ApiRouterCore} = require("../ApiRouterCore");
const {getAllUniversityNames, addNewUniversity, getAmountOfBookingsByUniversity, getBookingByUniversity,
    getAllLocationsInUniversity, addLocation, getRoomsInLocation
} = require("../data/databaseHandler");

module.exports.UniversityRouter = class UniversityRouter extends ApiRouterCore{
    setupRoutes(){
        this.router.get('/', this.getAllUniversities);
        this.router.post('/', this.addNewUniversity);
        this.router.get('/bookings/:bookingId', this.getBookingByUniversity);
        this.router.get('/locations/:universityId', this.getAllLocations)
        this.router.post('/locations', this.addLocation)
        this.router.get('/locations/:locationId/rooms', this.getRoomsInLocation)
    }

    getAllUniversities(req, res){
        res.json(getAllUniversityNames());
    }

    addNewUniversity(req, res){
        addNewUniversity(req.body);
        res.sendStatus(200);
    }

    getAmountOfBookingsByUniversity(req, res) {
        res.json(getAmountOfBookingsByUniversity(req.params.bookingId));
    }

    getBookingByUniversity(req, res) {
        res.json(getBookingByUniversity(req.params.bookingId));
    }

    getAllLocations(req, res){
        res.json(getAllLocationsInUniversity(req.params.universityId));
    }

    getRoomsInLocation(req, res){
        res.json(getRoomsInLocation(req.params.locationId));
    }

    addLocation(req, res){
        addLocation(req.body);
        res.sendStatus(200);
    }
}

