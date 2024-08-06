export enum ErrorsMessage {
    SERVER_ERROR = "هناك مشكلة في الموقع",
    NOT_ALLOWED = "ليس لديك الصلاحية للوصول الي هذة الصفحة",
    LOGIN_FIRST = "يجب تسجيل الدخول",
    JWT_EXPIRED = "JWT expired",
    UNAUTHORIZED_ACCESS = "Unauthorized access",
    UNAUTHENTICATED = "Not Authenticated",
    EMIAL_NOT_VERIFIED = "Email Verification Unauthorized",
    EMAIL_ALREADY_VERIFIED = "Already verified email",
}

// enum Status {
//     Puplish
//     Hidden
//   }

export enum Status {
    Open = "متاح",
    Close = "مغلق",
}

//   enum QuestionType {
//     Mcq
//     YesOrNo
//   }

export enum Gender {
    Male = "ذكر",
    Female = "انثي",
}

export enum Users {
    TEACHER = "Teacher",
    STUDENT = "Student",
}

export enum Modes {
    DARK = "dark",
    LIGHT = "light",
    SYSTEM = "system",
}
