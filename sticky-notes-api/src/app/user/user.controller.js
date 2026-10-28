import userService from "./user.service.js";

async function signup(req, res, next) {
    try {
        const { name, email, password, phone, age } = req.body;
        const userData = await userService.signup({ name, email, password, phone, age });
        const userDataResponse = userData.toObject();
        delete userDataResponse.password;
        res.status(201).json({ message: "User created successfully", user: userDataResponse, success: true });
    } catch (error) {
        next(error);
    }
}



async function login(req, res, next) {
    try {
        const { email, password } = req.body;
        const userData = await userService.login({ email, password });
        const userDataResponse = userData.toObject();
        delete userDataResponse.password;
        res.status(200).json({ message: "Login successful", user: userDataResponse, success: true });
    } catch (error) {
        next(error);
    }
}


async function updateUser(req, res, next) {
    try {
        const userId = req.params.id;
        const userData = req.body;
        const updatedUser = await userService.updateUser(userId, userData);
        const updatedUserData = updatedUser.toObject();
        delete updatedUserData.password;
        res.status(200).json({ message: "User updated successfully", user: updatedUserData, success: true });
    } catch (error) {
        next(error);
    }

}


async function deleteUser(req, res, next) {
    try {
        const userId = req.params.id;
        const deletedUser = await userService.deleteUser(userId);
        res.status(200).json({ message: "User deleted successfully", user: deletedUser, success: true });
    } catch (error) {
        next(error);
    }
}


async function getUserById(req, res, next) {
    try {
        const userId = req.params.id;
        const user = await userService.getUserById(userId);
        res.status(200).json({ message: "User fetched successfully", user: user, success: true });
    } catch (error) {
        next(error);
    }
}

export default { signup, login, updateUser, deleteUser, getUserById };