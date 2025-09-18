import jwt from "jsonwebtoken";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/User.js";


export const authMiddleware = asyncHandler(async (req, _, next) => {
    const token = 
        req.cookies?.accessToken || 
        req.body?.accessToken || 
        req.header("Authorization")?.replace("Bearer ", "");

    console.log("Token from request:", token);

    if (!token) {
        throw new ApiError(401, "Unauthorized: No token provided");
    }

    try {
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        console.log("Decoded token payload:", decodedToken);

        const userId = decodedToken._id || decodedToken.id || decodedToken.userId;
        if (!userId) {
            throw new ApiError(401, "Unauthorized: Invalid token payload");
        }

        const user = await User.findById(userId).select("-password -refreshToken");
        if (!user) {
            throw new ApiError(401, "Unauthorized: User not found");
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("JWT verification error:", error);
        throw new ApiError(401, error?.message || "Invalid AccessToken");
    }
});

