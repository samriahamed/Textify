import aj from "../lib/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";
import { ENV } from "../lib/env.js";

export const arcjetProtection = async (req, res, next) => {
    try {

        //✅ ADD THIS HERE (TOP)
        //if (ENV.NODE_ENV === "development") {
        //    return next();
        //}
        
        const decision = await aj.protect(req)

        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                res.status(429).send({ error: "Rate limit exceeded. Please try again later." });
            } else if (decision.reason.isBot()) {
               return res.status(403).send({ error: "Bot traffic is not allowed." });  
            } else {
            return res.status(403).json({
                message: "Access denied by security policy.",
            });
        }
     }
    
     //check for spoofed bot
    if (decision.results.some(isSpoofedBot)) { 
        return res.status(403).json({
            error: "Spoofed bot detected",
            message: "Malicious bot activity detected",
        });
    }
        next();

    } catch (error) {
        console.log("Arcjet Protection Error:", error);
        next();
    }
}