import { StatusCodes } from "http-status-codes";
import { addJobToQueue } from "../MQ/queue.js";
import AudioSchema from "../schema/audio.schema.js";

const uploadFile = async (req, res) => {
    if (!req.file) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "No file uploaded",
            success: false,
        });
    }

    req.file.originalname = `${Date.now()}` + (req.file.originalname === "blob" ? "-blob" : req.file.originalname);
    req.file.originalname = req.file.originalname.replace(/\s+/g, '_');

    const audio = new AudioSchema({
        name: req.file.originalname,
        filePath: req.file.path,
        lastModified: Date.now(),
        createdAt: Date.now(),
        uid: req.user ? req.user.id : undefined,
    });

    await audio.save();

    await addJobToQueue("transcription", {
        filePath: req.file.path,
        fileName: req.file.originalname,
        id: audio._id
    });

    return res.status(StatusCodes.OK).json({
        message: "File uploaded successfully",
        success: true,
        fileName: req.file.originalname
    });
}

const getTranscript = (req, res) => {
    return res.status(StatusCodes.OK).json({
        message: "Sent Successfully",
        success: true,
        transcript: "Hello This is Bhavya"
    })
}

const getProgress = async (req, res) => {
    const { id } = req.params;

    try {
        const audio = await AudioSchema.findOne({ name: id });
        if (!audio) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "Audio not found",
                success: false,
            });
        }
        return res.status(StatusCodes.OK).json({
            message: "Progress retrieved successfully",
            success: true,
            progress: audio.progress,
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "An error occurred while retrieving progress",
            success: false,
            error: error.message,
        });
    }
}
export { uploadFile, getTranscript, getProgress };