const routeExpress = require("express");
const routeRouter = routeExpress.Router();

const controller = require("../controller/appController");

routeRouter.route("/register").post(controller.register); // register user
// routeRouter.route('/registerMail').post(registerMail); // send the email
routeRouter.route("/authenticate").post((req: any, res: any) => res.end()); // authenticate user
// routeRouter.route('/logien').post(controller.verifyUser,controller.login); // login in app

/** GET Methods */
routeRouter.route("/user/:usrname").get(controller.getUser); // user with username
// routeRouter.route('/generateOTP').get(controller.verifyUser, localVariables, controller.generateOTP) // generate random OTP
routeRouter.route("/verifyOTP").get(controller.verifyOTP); // verify generated OTP
routeRouter.route("/createResetSession").get(controller.createResetSession); // reset all the variables

/** PUT Methods */
// routeRouter.route('/updateuser').put(Auth, controller.updateUser); // is use to update the user profile
// routeRouter.route('/resetPassword').put(controller.verifyUser, controller.resetPassword); // use to reset password

module.exports = routeRouter;
