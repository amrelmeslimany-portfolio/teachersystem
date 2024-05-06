export class BaseReponse {
    static shorten = {
        id: true,
        title: true,
    };

    static shortenWithImg = {
        ...this.shorten,
        cover: true,
    };
}

export class StudentResponse extends BaseReponse {
    static BASE = {
        id: true,
        email: true,
        firstname: true,
        fathername: true,
        gender: true,
        isEmailVerified: true,
        picture: true,
        password: true,
        level: {
            select: this.shorten,
        },
    };

    static select = {
        id: true,
        firstname: true,
        fathername: true,
        picture: true,
        gender: true,
        level: { select: BaseReponse.shorten },
    };
}

export class QuizResponse {
    static selectQuestion = {
        id: true,
        body: true,
        questionType: true,
        optionA: true,
        optionB: true,
        optionC: true,
        optionD: true,
        grade: true,
    };

    static selectQuiz = {
        id: true,
        status: true,
        cover: true,
        description: true,
        startDate: true,
        endDate: true,
        title: true,
        duration: true,
        createdAt: true,
    };
}
