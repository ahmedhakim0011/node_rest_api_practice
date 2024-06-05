const express = require("express");
const User = require("../models/user");
const { handleCreateUser, handleGetAllUsers, handleGetAllUsersById, handleUpdateUserById, handleDeleteUserById } = require("../controllers/user");
const router = express.Router();



router.route(`/`)
    .get(handleGetAllUsers)
    .post(handleCreateUser);

router.route(`/:id`)
    .get(handleGetAllUsersById)
    .patch(handleUpdateUserById)
    .delete(handleDeleteUserById);


module.exports = router;