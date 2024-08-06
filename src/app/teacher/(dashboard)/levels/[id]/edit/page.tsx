import ProtectWrapper from "@/features/auth/components/protect-routes";
import EditDetails from "@/features/level/components/edit-details";

import { Users } from "@/lib/enums";
import React from "react";

const Page = ({ params }: { params: { id: string } }) => {
    const levelId = params.id;
    return (
        <ProtectWrapper role={Users.TEACHER}>
            <EditDetails id={levelId} />
        </ProtectWrapper>
    );
};

export default Page;
