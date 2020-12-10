import jwt from "jsonwebtoken";
import AuthResponse from "../input-types/auth.response";
import User from "../models/user.model";
import config from "../config";
import CreateRecordResponse from "../input-types/create-record.response";
import Record from "../models/record.model";

export default class CustomUtils {
    static capitalize(word: string): string {
        return word.length > 0 ? word[0].toUpperCase() + word.slice(1).toLowerCase() : word;
    }

    static generateToken(id: number): string {
        const signed = jwt.sign(
            { id },
            config.jwtSecret, { expiresIn: "7d" });

        return signed;
    }

    static getAuthResponse(user: User): AuthResponse {
        return {
            token: CustomUtils.generateToken(user.id),
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            createdAt: user.createdAt
        };
    }

    static createRecordResponse(fetchedRecord: Record): CreateRecordResponse {
        return {
            id: fetchedRecord!.id,
            title: fetchedRecord!.title,
            user: {
                id: fetchedRecord!.user.id,
                firstName: fetchedRecord!.user.firstName,
                lastName: fetchedRecord!.user.lastName
            },
            createdAt: fetchedRecord!.createdAt
        };
    }
}
