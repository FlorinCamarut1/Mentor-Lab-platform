import AuthWrapper from "@/components/auth/AuthWrapper";
import LoginForm from "@/components/auth/LoginForm";
import React from "react";

const LoginPage = () => {
  return (
    <AuthWrapper isOnLogin={true}>
      <LoginForm />
    </AuthWrapper>
  );
};

export default LoginPage;
