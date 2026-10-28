import bcrypt from "bcrypt";
import userRepository from "./user.repository.js";

async function signup(userData) {
    const existingUser = await userRepository.findUserByEmail(userData.email);

    if (existingUser) {
        const error = new Error("User already exists");
        error.statusCode = 409;
        throw error;
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await userRepository.createUser({
        ...userData,
        password: hashedPassword,
    });
    return user;


}



async function login(userData) {
    const user = await userRepository.findUserByEmailAndPassword(userData.email);
    if (!user) {
        const error = new Error("Invalid email or password");
        error.statusCode = 401;
        throw error;
    }

    const isPasswordValid = await bcrypt.compare(userData.password, user.password);
    if (!isPasswordValid) {
        const error = new Error("Invalid email or password");
        error.statusCode = 401;
        throw error;
    }
    return user;
}

async function updateUser(userId, userData) {
    const existingUser = await userRepository.findUserById(userId);
    if (!existingUser) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }

    const { password, ...updateData } = userData;

    if (updateData.email && updateData.email !== existingUser.email) {
        const emailExists = await userRepository.findUserByEmail(updateData.email);
        if (emailExists) {
            const error = new Error("Email already exists");
            error.statusCode = 409;
            throw error;
        }
    }

    const updatedUser = await userRepository.updateUser(userId, updateData);
    return updatedUser;
}


async function deleteUser(userId) {
    const existingUser = await userRepository.findUserById(userId);
    if (!existingUser) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }
    return await userRepository.deleteUser(userId);
}

async function getUserById(userId) {
    const user = await userRepository.getUserById(userId);
    if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }
    return user;
}

export default { signup, login, updateUser, deleteUser, getUserById };