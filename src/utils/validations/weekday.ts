import { body } from "express-validator";
import { validatorMiddleware } from "../../middlewares/validatior";

export class WeekdayValidation {
    static create = () => [
        body("SA").isBoolean().optional(),
        body("SU").isBoolean().optional(),
        body("MO").isBoolean().optional(),
        body("TU").isBoolean().optional(),
        body("WE").isBoolean().optional(),
        body("TH").isBoolean().optional(),
        body("FR").isBoolean().optional(),

        validatorMiddleware,
    ];
}
