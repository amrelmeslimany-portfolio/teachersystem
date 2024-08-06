import { BreadcrumbItemProp, GlobalBreadcrumb } from "@/components/shared/global-breadcrubm";
import ProtectWrapper from "@/features/auth/components/protect-routes";
import EditDetails from "@/features/term/components/edit-details";
import TermFrom from "@/features/term/components/term-form/term-from";
import { Users } from "@/lib/enums";
import { Routes } from "@/lib/routes";
import Head from "next/head";
import React from "react";

const Page = ({ params }: { params: { id: string } }) => {
    const termId = params.id;
    return (
        <ProtectWrapper role={Users.TEACHER}>
            <EditDetails id={termId} />
        </ProtectWrapper>
    );
};

export default Page;
