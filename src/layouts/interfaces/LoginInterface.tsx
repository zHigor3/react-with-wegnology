import { ReactNode } from "react";
import light from "../../styles/themes/light";
import dark from "../../styles/themes/dark";

export interface LoginProps {
   children: ReactNode
   toggleTheme: (theme: string) => void
}