import noteRepository from "./note.repository.js";
import userRepository from "../user/user.repository.js";


async function createNote(noteData, userId) {
    const user = await userRepository.getUserById(userId);
    if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }
    return noteRepository.createNote({ ...noteData, userId });
}


async function updateNote(noteId, userId, noteData) {
    const user = await userRepository.getUserById(userId);
    if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }
    const note = await noteRepository.findNoteById(noteId);
    if (!note) {
        const error = new Error("Note not found");
        error.statusCode = 404;
        throw error;
    }
    if (note.userId.toString() !== userId.toString()) {
        const error = new Error("You are not authorized to update this note");
        error.statusCode = 403;
        throw error;
    }

    return await noteRepository.updateNote(noteId, noteData);
}


async function replaceNote(noteId, userId, noteData) {
    const user = await userRepository.getUserById(userId);
    if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }

    const note = await noteRepository.findNoteById(noteId);
    if (!note) {
        const error = new Error("Note not found");
        error.statusCode = 404;
        throw error;
    }
    if (note.userId.toString() !== userId.toString()) {
        const error = new Error("You are not authorized to replace this note");
        error.statusCode = 403;
        throw error;
    }
    return await noteRepository.replaceNoteById(noteId, {
        title: noteData.title,
        content: noteData.content,
        userId: note.userId,
    });
}


async function updateAllNotesTitle(userId, title) {
    const user = await userRepository.getUserById(userId);
    if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }

    return await noteRepository.updateAllNotesTitle(userId, title);
}


async function deleteNote(noteId, userId) {
    const user = await userRepository.getUserById(userId);
    if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }

    const note = await noteRepository.findNoteById(noteId);
    if (!note) {
        const error = new Error("Note not found");
        error.statusCode = 404;
        throw error;
    }
    if (note.userId.toString() !== userId.toString()) {
        const error = new Error("You are not authorized to delete this note");
        error.statusCode = 403;
        throw error;
    }
    return await noteRepository.deleteNoteById(noteId);
}

async function getPaginatedNotes(userId, page, limit) {
    const user = await userRepository.findUserById(userId);

    if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }

    return noteRepository.getPaginatedNotes(userId, page, limit);
}


async function getNoteById(noteId, userId) {
    const user = await userRepository.getUserById(userId);
    if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }
    const note = await noteRepository.getNoteById(noteId);
    if (!note) {
        const error = new Error("Note not found");
        error.statusCode = 404;
        throw error;
    }
    if (note.userId.toString() !== userId.toString()) {
        const error = new Error("You are not authorized to get this note");
        error.statusCode = 403;
        throw error;
    }
    return note;
}


async function getNoteByContent(content, userId) {
    const user = await userRepository.getUserById(userId);
    if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }
    const notes = await noteRepository.findNoteByContent(content, userId);
    if (!notes.length) {
        const error = new Error("Note not found");
        error.statusCode = 404;
        throw error;
    }
    return notes;
}


async function getNotesWithUser() {
    return noteRepository.getNotesWithUser();
}

async function getNotesWithUserAggregate(title) {
    return noteRepository.getNotesWithUserAggregate(title);
}

async function deleteAllNotes(userId) {
    const user = await userRepository.getUserById(userId);
    if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }
    return noteRepository.deleteAllNotes(userId);
}

export default { createNote, updateNote, replaceNote, updateAllNotesTitle, deleteNote, getPaginatedNotes, getNoteById, getNoteByContent, getNotesWithUser, getNotesWithUserAggregate, deleteAllNotes };