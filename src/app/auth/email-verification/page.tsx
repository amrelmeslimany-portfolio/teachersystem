import IconAvatar from "@/components/ui/icon-avatar";
import EmailVerifiecation from "@/features/auth/components/email-verification";
import ProtectWrapper from "@/features/auth/components/protect-routes";
import { Users } from "@/lib/enums";
import { Mail } from "lucide-react";
import React from "react";

const VerificationEmailPage = () => {
    return (
        <ProtectWrapper role={Users.STUDENT}>
            <div className="text-center">
                <IconAvatar
                    icon={<Mail className="w-14 h-14 text-primary" />}
                    wrapperClassName="w-24 h-24 mx-auto bg-primary/5"
                />
                <EmailVerifiecation />
            </div>
        </ProtectWrapper>
    );
};

export default VerificationEmailPage;
