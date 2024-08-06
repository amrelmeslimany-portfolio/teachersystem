import AuthHeader from "@/features/auth/components/header";
import LoginTeacherForm from "@/features/auth/components/login-teacher-form";
import React from "react";

const page = () => {
    return (
        <div className="px-10 pt-[15%]">
            <AuthHeader intro="مرحبا بك مرة قم بتسجيل الدخول الي لوحة التحكم" />
            <LoginTeacherForm />
        </div>
    );
};

export default page;
