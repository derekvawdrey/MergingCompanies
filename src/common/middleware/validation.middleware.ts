import type { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

/**
 * Middleware that returns 400 with validation errors if any validators failed.
 * Place after express-validator middleware (e.g. checkSchema).
 */
export function handleValidationErrors(
    req: Request,
    res: Response,
    next: NextFunction
): void {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    next();
}
