import { ErrorsMessage } from "./enums";

export function errorValidations(error: any, form: any) {
    error.data.details.map((item: any) => {
        Object.entries(item).map(([key, value]) => {
            if (key == "startDate" || key == "endDate") {
                return form.setError("rangeDate", {
                    message: value as any,
                });
            }
            form.setError(key as any, { message: value as any });
        });
    });
}

export const isValidationError = (error: any): boolean => error.status == 422 && error.data.details?.length > 0;

export const errorDescription = (error: any): any => error.data?.message || ErrorsMessage.SERVER_ERROR;

export const errorHandling = (error: any, toast: any, form?: any) => {
    if (isValidationError(error) && form) {
        toast({ description: "خطأ في صلاحيه البيانات", variant: "destructive", className: "py-4" });
        errorValidations(error, form as any);
        return;
    }
    console.log(error);
    toast({ description: errorDescription(error), variant: "destructive", className: "py-4" });
};
