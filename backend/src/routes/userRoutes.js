import express from "express";
import bcrypt from "bcrypt";
import user from "../schema/userSchema.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { StatusCodes } from "http-status-codes";
import authenticateToken from "../middleware/authMiddleware.js";
import userSchema from "../schema/userSchema.js";
const router = express.Router();
router.use(express.json());
router.use(cookieParser());

router.post("/login", async (req, res) => {
    try {
        let body = req.body;
        let u = await user.findOne({ email: body.email });
        if (u === null) {
            return res
                .json({
                    message: "Email is not registered",
                    success: false,
                })
                .status(StatusCodes.UNAUTHORIZED);
        }
        // else if (!u.verified) {
        //     return res
        //         .json({
        //             message: "Email is not verified",
        //             success: false,
        //         })
        //         .status(StatusCodes.UNAUTHORIZED);
        // }
        else if (await bcrypt.compare(body.password, u.password)) {
            const id = { id: u._id };
            // console.log(email);
            const accessToken = jwt.sign(id, process.env.ACCESS_TOKEN_SECRET);
            res.cookie("accessToken", accessToken);
            return res
                .json({
                    message: "Authentication Successful",
                    success: true,
                    accessToken: accessToken,
                })
                .status(StatusCodes.ACCEPTED);
        } else {
            return res
                .json({
                    message: "Authentication Failed",
                    success: false,
                })
                .status(StatusCodes.NOT_FOUND);
        }
    } catch (error) {
        console.log(error);
        return res
            .json({
                message: error.message,
                success: false,
            })
            .status(StatusCodes.INTERNAL_SERVER_ERROR);
    }
});

router.post("/signup", async (req, res) => {
    try {
        const body = req.body;
        const hashedPassword = await bcrypt.hash(body.password, 10);
        const u = new user({
            name: body.name,
            email: body.email,
            password: hashedPassword,
            verified: true,
            createdAt: Date.now(),
            lastModified: Date.now(),
        });
        await u.save();
        // let response = await sendVerificationEmail(u, res);
        return res
            .json({
                message: `User Created Successfully`,
                success: true,
            })
            .status(StatusCodes.CREATED);
    } catch (error) {
        console.log(error);
        if (error.code === 11000) {
            // console.log();
            if (error.message.search("username") !== -1) {
                return res
                    .json({
                        message: "Username already exists",
                        success: false,
                    })
                    .status(StatusCodes.BAD_REQUEST);
            } else {
                return res
                    .json({
                        message: "Email exists",
                        success: false,
                    })
                    .status(StatusCodes.BAD_REQUEST);
            }
        } else {
            return res
                .json({
                    message: error.message,
                    success: false,
                })
                .status(StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }
});

router.get("/checkAuth", authenticateToken, async (req, res) => {
    const user = await userSchema.findById(req.user.id);
    return res
        .json({
            message: "Authenticated successfully",
            success: true,
            userName: user.name,
        })
        .status(StatusCodes.OK);
});

router.get("/logout", authenticateToken, (req, res) => {
    res.clearCookie("accessToken");
    res.json({
        message: "Logged out",
        success: true
    }).status(StatusCodes.OK)
})
export default router;