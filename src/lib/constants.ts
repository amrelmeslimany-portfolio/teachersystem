import { arEG } from "date-fns/locale";

export const ADMIN_TITLE = (title: string) => ` ${title} | لوحة التحكم `;

export const WEEKDAYS_TRANSLATION = {
    SA: "السبت",
    SU: "الأحد",
    MO: "الأثنين",
    TU: "الثلاثاء",
    WE: "الأربعاء",
    TH: "الخميس",
    FR: "الجمعة",
};

export const DATE_SETTINGS = { locale: arEG };
