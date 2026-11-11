import { validateIdParams, validatePhoto } from "../middleware/validation.js";
import Photo from "../models/Photo.js";
import Comment from "../models/Comment.js";
import path from "node:path";
import { unlink } from "node:fs/promises";

const deleteFile = async (fileName) => {
  try {
    await unlink(path.join("uploads", path.basename(fileName)));
  } catch (error) {
    if (error.code !== "ENOENT") {
      throw error;
    }
  }
};

export const getAll = async (req, res) => {
  try {
    const photos = await Photo.find().sort({ dateTime: -1 });
    return res.status(200).json({ message: "success get all", photos });
  } catch (error) {
    return res.status(500).json("failed to get all photos");
  }
};

export const getOne = async (req, res) => {
  const { error, value } = validateIdParams(req.params);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  try {
    const foundPhoto = await Photo.findById(value.id)
    if (!foundPhoto) {
      return res.status(404).json("failed to find photo");
    }
    const comments = await Comment.find({ photoId: value.id })
      .populate("userId", "firstName lastName")
      .sort({ dateTime: 1 });
    return res.status(200).json({ message: "success getOne", foundPhoto, comments });
  }

catch (error) {
    return res.status(500).json("database error");
  }
};

export const create = async (req, res) => {
  try {
    const { error, value } = validatePhoto(req.body);
    if (error) {
      if (req.file) {
        await deleteFile(req.file.filename);
      }
      return res.status(400).json({ message: error.details[0].message });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Please upload a photo" });
    }

    const newPhoto = new Photo({
      title: value.title,
      description: value.description,
      fileName: req.file.filename,
      userId: req.session.userId,
    });

    await newPhoto.save();
    return res.status(201).json({
      message: "Photo created successfully",
      photo: newPhoto,
    });
  }
  catch (error) {
    if (req.file) {
      await deleteFile(req.file.filename);
    }
    return res.status(500).json({ message: "Failed to create photo" });
  }
};

export const remove = async (req, res) => {
  const { error, value } = validateIdParams(req.params);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const foundPhoto = await Photo.findById(value.id);
    if (!foundPhoto) {
      return res.status(404).json({ message: "Photo not found" });
    }

    if (foundPhoto.userId.toString() !== req.session.userId) {
      return res.status(403).json({ message: "You can only delete your own photos" });
    }

    await deleteFile(foundPhoto.fileName);
    await Comment.deleteMany({ photoId: foundPhoto._id });
    await foundPhoto.deleteOne();
    return res.status(200).json({ message: "Photo deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete photo" });
  }
};
