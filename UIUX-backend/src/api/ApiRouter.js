const {ApiRouterCore} = require("./ApiRouterCore");
const {BookingRouter} = require("./routers/BookingRouter");
const {RoomRouter} = require("./routers/RoomRouter");
const {UserRouter} = require("./routers/UserRouter");
const {EasterEggRouter} = require("./routers/EasterEggRouter");
const {UniversityRouter} = require("./routers/UniversityRouter");
const {LoginRouter} = require("./routers/LoginRouter");

module.exports.ApiRouter = class extends ApiRouterCore{
    setupRoutes() {
        super.setupRoutes();
        this.router.use('/bookings', (new BookingRouter().getRouter()));
        this.router.use('/rooms', (new RoomRouter().getRouter()));
        this.router.use('/users', (new UserRouter().getRouter()));
        this.router.use('/easter', (new EasterEggRouter().getRouter()));
        this.router.use('/universities', (new UniversityRouter().getRouter()));
        this.router.use('/login', (new LoginRouter().getRouter()));
    }
}
