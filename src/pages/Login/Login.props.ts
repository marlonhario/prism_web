export interface UserLogin {
  username: string;
  password: string;
}

export interface LoginPublicProps {
}

export interface LoginCalcedProps {
  login: UserLogin;
  handleChange: (field: keyof UserLogin, value: string) => void;
  handleLogin: () => void;
}

export type LoginProps = LoginPublicProps & LoginCalcedProps;
