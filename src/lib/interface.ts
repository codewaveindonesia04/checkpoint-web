import React from "react";

export interface MainLayout {
  children?: React.ReactNode;
}

export interface InputProps {
  name: string;
  type: string;
  placeholder: string;
  label: string;
  isPassword?: boolean;
}
