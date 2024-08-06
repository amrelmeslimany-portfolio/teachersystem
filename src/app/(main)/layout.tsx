import Navbar from "@/components/layouts/main/navbar";
import React from "react";

const StudentLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Navbar />
            <main>{children}</main>
        </>
    );
};

export default StudentLayout;
