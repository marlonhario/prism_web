import React from "react";

export interface LoginModalPublicProps {
    setShowLogin: (showLogin: boolean) => void;
}

export interface LoginModalCalcedProps {
    expand: boolean;
    error: boolean;
    password: string;
    setPassword: (password: string) => void;
    handleLogin: (e: React.FormEvent<HTMLFormElement>) => void;
}

export type LoginModalProps = LoginModalPublicProps & LoginModalCalcedProps;