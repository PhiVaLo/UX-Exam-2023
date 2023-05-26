const {ApiRouterCore} = require("../ApiRouterCore");
const {getAllUniversityNames, addNewUniversity} = require("../data/databaseHandler");

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
}

