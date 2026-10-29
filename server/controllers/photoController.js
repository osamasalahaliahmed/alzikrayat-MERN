import { validateIdParams } from "../middleware/validation.js";
import Photo from "../models/Photo.js";
export const getAll = async (req, res) => {
  try {
    const Photos = await Photo.find().sort({ dateTime: -1 });
    return res.status(200).json({ message: "success get all", Photos });
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
    return res.status(200).json({message:'success getOne',foundPhoto})   }

catch (error) {
    return res.status(500).json("database error");
  }
};
