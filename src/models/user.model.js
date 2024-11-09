import { model, Schema } from "mongoose";

const authSchema = new Schema({
    fullname: {
        type: String,
        required: true,
        minLength: [5, "Fullname must be minimum 5 characters!"]
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        minLength: [8, "Password must be minimum 8 characters!"],
        required: true,
    },
    role: {
        type: String,
        enum: ["user", "admin", "superAdmin"],
        default: "user"
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

export const Auth = model("Auth", authSchema)