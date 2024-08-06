import ProtectWrapper from "@/features/auth/components/protect-routes";
import { Users } from "@/lib/enums";
import React from "react";

const HomeTeacher = () => {
    return (
        <ProtectWrapper role={Users.TEACHER}>
            <h1>Teacher</h1>
        </ProtectWrapper>
    );
};

export default HomeTeacher;
