import AuthWrapper from "@/components/auth/AuthWrapper";
import RegisterForm from "@/components/auth/RegisterForm";
import React from "react";

const RegisterPage = () => {
  return (
    <AuthWrapper>
      <RegisterForm />
    </AuthWrapper>
  );
};

export default RegisterPage;
