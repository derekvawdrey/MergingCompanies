/**
 * Error that carries an HTTP status code for the response.
 * Throw this from services or controllers when you want a specific status (e.g. 404, 400).
 */
export class HttpError extends Error {
    constructor(
        public readonly status: number,
        message: string
    ) {
        super(message);
        this.name = "HttpError";
        Object.setPrototypeOf(this, HttpError.prototype);
    }
}
