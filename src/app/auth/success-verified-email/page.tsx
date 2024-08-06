import CheckEmailVerified from "@/features/auth/components/check-email-validation";
import ProtectWrapper from "@/features/auth/components/protect-routes";
import { Users } from "@/lib/enums";
import React from "react";

const SuccessVerificationEmailPage = () => {
    return (
        <ProtectWrapper role={Users.STUDENT}>
            <div className="text-center">
                <CheckEmailVerified />
            </div>
        </ProtectWrapper>
    );
};

export default SuccessVerificationEmailPage;
