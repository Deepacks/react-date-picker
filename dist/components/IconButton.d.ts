import { FunctionComponent } from "react";
import { IconType } from "react-icons/lib";
interface IconButtonProps {
    Icon: IconType;
    onClick?: () => void;
}
declare const IconButton: FunctionComponent<IconButtonProps>;
export default IconButton;
