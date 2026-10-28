import user from "./user.model.js";

async function findUserByEmail(email) {
    return await user.findOne({ email });

}

async function findUserByEmailAndPassword(email) {
    return await user.findOne({ email }).select("+password");
}


async function findUserById(id) {
    return await user.findById(id);
}





async function createUser(userData) {
    return await user.create(userData);
}


async function updateUser(id, userData) {
    return await user.findByIdAndUpdate(id, userData,
        { new: true, runValidators: true });
}


async function deleteUser(id) {
    return await user.findByIdAndDelete(id);
}


async function getUserById(id) {
    return await user.findById(id);
}


export default { findUserByEmail, findUserByEmailAndPassword, createUser, findUserById, updateUser, deleteUser, getUserById };
