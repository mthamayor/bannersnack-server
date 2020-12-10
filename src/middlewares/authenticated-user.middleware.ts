import IContext from "../interfaces/context.interface";
import { MiddlewareFn } from "type-graphql";
import { verify } from "jsonwebtoken";
import config from "../config";

export const authenticatedUser: MiddlewareFn<IContext> = ({ context }, next) => {
    const authorization = context.req.headers["authorization"];

    if (!authorization) {
        throw new Error("Not Authorized");
    }

    try {
        const token = authorization.split(" ")[1];
        const payload = verify(token, config.jwtSecret);
        context.payload = payload as any;
    } catch (err) {
        console.log(err);
        throw new Error("Not Authorized");
    }
    return next();
}
