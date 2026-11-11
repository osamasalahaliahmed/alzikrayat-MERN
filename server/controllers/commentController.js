import { validateIdParams, validateComment } from "../middleware/validation.js";
import Comment from "../models/Comment.js";
import Photo from "../models/Photo.js";

export const create = async (req, res) => {
  const { error: idError } = validateIdParams(req.params);
  if (idError) {
    return res.status(400).json({ message: idError.details[0].message });
  }

  const { error, value } = validateComment(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const foundPhoto = await Photo.findById(req.params.id);
    if (!foundPhoto) {
      return res.status(404).json({ message: "Photo not found" });
    }

    const newComment = new Comment({
      photoId: foundPhoto._id,
      userId: req.session.userId,
      comment: value.comment,
    });

    await newComment.save();
    await newComment.populate("userId", "firstName lastName");
    return res.status(201).json({
      message: "Comment created successfully",
      comment: newComment,
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to create comment" });
  }
};
