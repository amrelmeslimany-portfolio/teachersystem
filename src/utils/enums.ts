export enum UserTypesEnum {
    Teacher = "teacher",
    Student = "student",
}

export enum CookieKeysEnum {
    RefreshToken = "refresh_token",
    AccessToken = "access_token",
}

export enum EnvironmentEnum {
    Development = "development",
    Production = "production",
}

export enum ValidtionErrorsEnum {
    LONGER_DATE = "End date must be greater than the starting date",
    REPTEAD_RANGE = "This term date range exists",
    WEEKDAY_APPOINT_EXIST = "Weekday with Appointime exist",
}

export enum CorrectAnswer {
    OptionA = "optionA",
    OptionB = "optionB",
    OptionC = "optionC",
    OptionD = "optionD",
    Yes = "yes",
    No = "no",
}
