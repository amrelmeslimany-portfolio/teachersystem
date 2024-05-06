export class AppException extends Error {
    constructor(public message: string, public statusCode: number, public details?: any) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.details = details;
        Object.setPrototypeOf(this, AppException.prototype); // set instance check working
    }
}

export class BadRequestException extends AppException {
    constructor(public message: string) {
        super(message, 400);
    }
}

export class NotFoundException extends AppException {
    constructor(public message: string) {
        super(message, 404);
    }
}

export class ValidationException extends AppException {
    constructor(public message: string, public details?: any) {
        super(message, 422, details);
    }
}

export class AuthException extends AppException {
    constructor(message?: string) {
        super(message || "Not Authenticated", 401);
    }
}
export class TokenException extends AppException {
    constructor(public message: string) {
        super(message, 403);
    }
}
