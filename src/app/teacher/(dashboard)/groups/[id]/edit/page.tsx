import ProtectWrapper from "@/features/auth/components/protect-routes";
import EditDetails from "@/features/groups/components/form/edit-details";

import { Users } from "@/lib/enums";
import React from "react";

const Page = ({ params }: { params: { id: string } }) => {
    const groupId = params.id;
    return (
        <ProtectWrapper role={Users.TEACHER}>
            <EditDetails id={groupId} />
        </ProtectWrapper>
    );
};

export default Page;
