import ProtectWrapper from "@/features/auth/components/protect-routes";
import StatesSection from "@/features/dashboard/components/states-section";
import TeacherBanner from "@/features/dashboard/components/teacher-banner";
import { Users } from "@/lib/enums";
import React from "react";

const StatesPage = () => {
    return (
        <ProtectWrapper role={Users.STUDENT}>
            <div className="container">
                <div className="grid grid-cols-2">
                    <TeacherBanner />
                    <div />
                </div>
                <StatesSection />
            </div>
        </ProtectWrapper>
    );
};

export default StatesPage;
