import _ from "lodash";
import { validatorMiddleware } from "../../middlewares/validatior";
import { body } from "express-validator";
import { DBReused } from "../../classes/db-reused.class";
import { prismaClient } from "../..";

export class StudentValidation {
    static update = () => [
        body("studentIDs")
            .notEmpty()
            .withMessage("Enter students IDs")
            .isArray()
            .withMessage("Students IDs must be an array")
            .custom(async (IDs) => {
                const found = await prismaClient.student.count({ where: { id: { in: IDs } } });
                if (IDs && found != IDs.length) throw new Error("Some Invalid student IDs or not found");
                return true;
            }),
        body("levelId")
            .optional()
            .isUUID()
            .custom(async (id) => await DBReused.isIdFound(id, "level")),
        body("groupId")
            .optional()
            .isUUID()
            .custom(async (id) => await DBReused.isIdFound(id, "group")),
        validatorMiddleware,
    ];
}
