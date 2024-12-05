import { ButtonHTMLAttributes, ReactNode } from "react";

export type LoginState = {
  email: string;
  password: string;
};

export type ClockInData = {
  id: number;
  employeeId: number;
  clockInTime: string;
  clockOutTime: string | null;
  report: string | null;
};

export type UserData = {
  data: {
    name: string;
    role: string;
    access_token: string;
  };
};

export interface ContentfulData {
  items: any[];
}

export interface FormValues {
  email: string;
  password: string;
}

export interface MainLayout {
  children?: React.ReactNode;
}

export interface DashboardProps {
  employeeData: ClockInData[];
  isAuthenticated: boolean;
}

export interface InputProps {
  name: string;
  type: string;
  placeholder: string;
  label: string;
  isPassword?: boolean;
}

export interface MenuCardProps {
  imageSrc: string;
  title: string;
  description: string;
  buttonText: string;
  onClick: () => void;
}

export interface MainCardProps {
  children?: ReactNode
}

export interface NavbarProps {
  name: string;
  profilePicture?: any;
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: "primary" | "secondary";
}
