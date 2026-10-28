import noteService from "./note.service.js";

async function createNote(req, res, next) {
    try {
        const noteData = req.body;
        const userId = req.query.userId;
        const note = await noteService.createNote(noteData, userId);
        res.status(201).json({ message: "Note created successfully", note: note, success: true });
    } catch (error) {
        next(error);
    }
}

async function updateNote(req, res, next) {
    try {
        const noteId = req.params.noteId;
        const userId = req.query.userId;
        const noteData = req.body;
        const note = await noteService.updateNote(noteId, userId, noteData);
        res.status(200).json({ message: "Note updated successfully", note: note, success: true });
    } catch (error) {
        next(error);
    }
}


async function replaceNote(req, res, next) {
    try {
        const noteId = req.params.noteId;
        const userId = req.query.userId;
        const noteData = req.body;
        const note = await noteService.replaceNote(noteId, userId, noteData);
        res.status(200).json({ message: "Note replaced successfully", note: note, success: true });
    } catch (error) {
        next(error);
    }
}


async function updateAllNotesTitle(req, res, next) {
    try {
        const userId = req.query.userId;
        const title = req.body.title;
        const notes = await noteService.updateAllNotesTitle(userId, title);
        res.status(200).json({ message: "All notes title updated successfully", notes: notes, success: true });
    } catch (error) {
        next(error);
    }
}

async function deleteNote(req, res, next) {
    try {
        const noteId = req.params.noteId;
        const userId = req.query.userId;
        const note = await noteService.deleteNote(noteId, userId);
        res.status(200).json({ message: "Note deleted successfully", note: note, success: true });
    } catch (error) {
        next(error);
    }
}

async function getPaginatedNotes(req, res, next) {
    try {
        const userId = req.query.userId;
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 3;
        const notes = await noteService.getPaginatedNotes(userId, page, limit);
        res.status(200).json({ message: "Paginated notes fetched successfully", notes: notes, success: true });
    } catch (error) {
        next(error);
    }
}

async function getNoteById(req, res, next) {
    try {
        const noteId = req.params.noteId;
        const userId = req.query.userId;
        const note = await noteService.getNoteById(noteId, userId);
        res.status(200).json({ message: "Note fetched successfully", note: note, success: true });
    } catch (error) {
        next(error);
    }
}

async function getNoteByContent(req, res, next) {
    try {
        const content = req.query.content;
        const userId = req.query.userId;
        const notes = await noteService.getNoteByContent(content, userId);
        res.status(200).json({ message: "Note fetched successfully", notes: notes, success: true });
    } catch (error) {
        next(error);
    }
}

async function getNotesWithUser(req, res, next) {
    try {
        const notes = await noteService.getNotesWithUser();
        res.status(200).json({ message: "Notes with user fetched successfully", notes: notes, success: true });
    } catch (error) {
        next(error);
    }
}


async function getNotesWithUserAggregate(req, res, next) {
    try {
        const { title } = req.query;

        const notes = await noteService.getNotesWithUserAggregate(title);

        res.status(200).json({
            message: "Notes fetched successfully",
            notes,
            success: true,
        });
    } catch (error) {
        next(error);
    }
}


async function deleteAllNotes(req, res, next) {
    try {
        const userId = req.query.userId;
        const result = await noteService.deleteAllNotes(userId);
        res.status(200).json({ message: "All notes deleted successfully", result: result, success: true });
    } catch (error) {
        next(error);
    }
}

export default { createNote, updateNote, replaceNote, updateAllNotesTitle, deleteNote, getPaginatedNotes, getNoteById, getNoteByContent, getNotesWithUser, getNotesWithUserAggregate, deleteAllNotes };
