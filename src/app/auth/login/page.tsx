import React from "react";
import LoginForm from "@/features/auth/components/login-form";
import AuthHeader from "@/features/auth/components/header";

const StudentLogin = () => {
    return (
        <div>
            <AuthHeader intro="مرحبا بك في منصتنا مرة اخري" />
            <LoginForm />
        </div>
    );
};

export default StudentLogin;
