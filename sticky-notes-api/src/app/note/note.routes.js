import express from "express";
import noteController from "./note.controller.js";

const router = express.Router();

router.post("/", noteController.createNote);
router.get("/paginate-sort", noteController.getPaginatedNotes);
router.get("/content", noteController.getNoteByContent);
router.get("/aggregate", noteController.getNotesWithUserAggregate);
router.get("/with-user", noteController.getNotesWithUser);
router.get("/:noteId", noteController.getNoteById);
router.patch("/all", noteController.updateAllNotesTitle);
router.patch("/:noteId", noteController.updateNote);
router.put("/:noteId", noteController.replaceNote);
router.delete("/all", noteController.deleteAllNotes);
router.delete("/:noteId", noteController.deleteNote);
export default router;
