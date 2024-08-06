import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "درس | الصفحة الرئيسية",
    description: "مرحبا بك في منصة درس",
};

const template = ({ children }: { children: React.ReactNode }) => {
    return children;
};

export default template;
