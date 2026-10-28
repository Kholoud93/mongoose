import note from "./note.model.js";


async function createNote(noteData) {
    return await note.create(noteData);
}

async function findNoteById(noteId) {
    return await note.findById(noteId);
}

async function updateNote(noteId, noteData) {
    return await note.findByIdAndUpdate(noteId, noteData, { new: true, runValidators: true });
}


async function replaceNoteById(noteId, noteData) {
    return await note.findOneAndReplace({ _id: noteId }, noteData, { new: true, runValidators: true });
}


async function updateAllNotesTitle(userId, title) {
    return await note.updateMany({ userId }, { $set: { title } }, { runValidators: true });
}


async function deleteNoteById(noteId) {
    return await note.findByIdAndDelete(noteId);
}

async function getPaginatedNotes(userId, page, limit) {
    return await note.find({ userId })
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 });
}


async function getNoteById(noteId) {
    return await note.findById(noteId);
}

async function findNoteByContent(content, userId) {
    return await note.find({ content, userId });
}


async function getNotesWithUser() {
    return note.find().select('title userId createdAt').populate('userId', 'email');
}


async function getNotesWithUserAggregate(title) {
    const pipeline = [
        {
            $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "_id",
                as: "user",
            },
        },
        {
            $unwind: "$user",
        },
    ];

    if (title) {
        pipeline.push({
            $match: {
                title: { $regex: title, $options: "i" },
            },
        });
    }

    pipeline.push({
        $project: {
            title: 1,
            content: 1,
            createdAt: 1,
            "user.name": 1,
            "user.email": 1,
        },
    });

    return note.aggregate(pipeline);
}


async function deleteAllNotes(userId) {
    return await note.deleteMany({ userId });
}

export default { createNote, findNoteById, updateNote, replaceNoteById, updateAllNotesTitle, deleteNoteById, getPaginatedNotes, getNoteById, findNoteByContent, getNotesWithUser, getNotesWithUserAggregate, deleteAllNotes };