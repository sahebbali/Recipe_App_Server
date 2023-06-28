
const  express =  require("express");
const UsersController = require('../controller/UsersControllers.js')

const router = express.Router();

router.post("/register", UsersController.RegisterUser);

router.post("/login", UsersController.LoginUser);

module.exports=router;

