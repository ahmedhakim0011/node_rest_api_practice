const User = require("../models/user");
const bcrypt = require('bcrypt');

const { user } = require("../routes/user");
const { setUser } = require("../services/auth");


async function handleUserSignup(req, res) {
    const { first_name, last_name, email, password, gender, jobTitle } = req.body;
    if (!first_name || !last_name || !email || !password || !gender || !jobTitle) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(200).json({ message: "Email is already in use" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await User.create({
            firstName: first_name,
            lastName: last_name,
            email: email,
            password: hashedPassword,
            gender: gender,
            jobTitle: jobTitle
        });

        console.log("result", result);
        return res.status(200).json({ status: true, message: "User created successfully", data: result });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
// login user
async function handleUserLogin(req, res) {
    const { email, password, } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = setUser(user);
        console.log("token", token);
        return res.status(200).json({ status: true, message: "User login successfully", data: { user, token } });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


async function handleGetAllUsers(req, res) {
    const allUsers = await User.find({});
    return res.json({ status: true, message: "All users fetched successfully", data: allUsers });
}

async function handleGetAllUsersById(req, res) {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ status: false, message: "User not found", data: null });
        }

        return res.json({ status: true, message: "Fetched user successfully", data: user });
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
}


async function handleDeleteUserById(req, res) {
    await User.findByIdAndDelete(req.params.id);
    return res.json({ status: true, message: "user deleted successfully", });
}

async function handleUpdateUserById(req, res) {
    const { first_name, last_name, email, gender, jobTitle } = req.body;


    const user = await User.findByIdAndUpdate(req.params.id, {
        firstName: first_name,
        lastName: last_name,
        email: email,
        gender: gender,
        jobTitle: jobTitle
    }, { new: true });
    if (!user) {
        return res.status(404).json({ status: false, message: 'User not found' });
    }
    return res.json({ status: true, message: 'User updated found', data: user });

}

module.exports = {
    handleUserSignup,
    handleUserLogin,
    handleGetAllUsers,
    handleGetAllUsersById,
    handleUpdateUserById,
    handleDeleteUserById,
}