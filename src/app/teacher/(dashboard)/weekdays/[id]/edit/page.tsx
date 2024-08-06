import ProtectWrapper from "@/features/auth/components/protect-routes";
import EditDetails from "@/features/weekdays/components/form/edit-details";

import { Users } from "@/lib/enums";
import React from "react";

const Page = ({ params }: { params: { id: string } }) => {
    const weekdaysId = params.id;
    return (
        <ProtectWrapper role={Users.TEACHER}>
            <EditDetails id={weekdaysId} />
        </ProtectWrapper>
    );
};

export default Page;
