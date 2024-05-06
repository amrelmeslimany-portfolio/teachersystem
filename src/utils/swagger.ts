import autgenSwagger from "swagger-autogen";

const doc = {
    info: {
        version: "v1.0.0",
        title: "Teacher System APIs",
        description:
            "creating teacher system APIs with clean code by Node js, express, posgresql, prisma orm, typescript , etc...",
    },
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
            },
        },
    },
};

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./src/routes/index.ts"];

autgenSwagger({ openapi: "3.0.0" })(outputFile, endpointsFiles, doc);
