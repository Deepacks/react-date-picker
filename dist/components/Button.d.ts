import { FunctionComponent, MouseEventHandler, PropsWithChildren } from "react";
interface ButtonProps {
    width?: string;
    className?: string;
    highlightColor?: string;
    higlightTextColor?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
    submitting?: boolean;
    destructive?: boolean;
}
declare const Button: FunctionComponent<PropsWithChildren<ButtonProps>>;
export default Button;
