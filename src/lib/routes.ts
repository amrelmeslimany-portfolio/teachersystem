export class Routes {
    static readonly TEACHER_PRFIX = "/teacher";

    static readonly student = {
        auth: {
            login: "/auth/login",
            emailVerfication: "/auth/email-verification",
        },
        dashboard: "/dashboard",
        lessons: "/lessons",
        quizzes: "/quizzes",
        notes: "/notes",
        pdfs: "/pdfs",
        levels: "/levels",
        groups: "/groups",
        units: "/units",
        terms: "/terms",
    };

    static readonly teacher = {
        auth: { login: "/teacher/auth/login" },
        home: this.TEACHER_PRFIX,
        weekdays: {
            home: this.TEACHER_PRFIX + "/weekdays",
            add: this.TEACHER_PRFIX + "/weekdays/add",
        },

        quizzes: {
            home: this.TEACHER_PRFIX + "/quizzes",
            add: this.TEACHER_PRFIX + "/quizzes/add",
        },

        groups: {
            home: this.TEACHER_PRFIX + "/groups",
            add: this.TEACHER_PRFIX + "/groups/add",
        },

        levels: {
            home: this.TEACHER_PRFIX + "/levels",
            add: this.TEACHER_PRFIX + "/levels/add",
        },

        terms: {
            home: this.TEACHER_PRFIX + "/terms",
            add: this.TEACHER_PRFIX + "/terms/add",
        },
        units: {
            home: this.TEACHER_PRFIX + "/units",
            add: this.TEACHER_PRFIX + "/units/add",
        },

        lessons: {
            home: this.TEACHER_PRFIX + "/lessons",
            add: this.TEACHER_PRFIX + "/lessons/add",
        },

        pdfs: {
            home: this.TEACHER_PRFIX + "/pdfs",
            add: this.TEACHER_PRFIX + "/pdfs/add",
        },

        notes: {
            home: this.TEACHER_PRFIX + "/notes",
            add: this.TEACHER_PRFIX + "/notes/add",
        },

        students: {
            home: this.TEACHER_PRFIX + "/students",
        },
    };
}
