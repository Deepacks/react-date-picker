import { FunctionComponent } from "react"
import { IconType } from "react-icons/lib"
import styles from "./styles/IconButton.module.scss"

interface IconButtonProps {
  Icon: IconType
  onClick?: () => void
}

const IconButton: FunctionComponent<IconButtonProps> = ({
  Icon,
  onClick = () => {},
}) => {
  return (
    <button className={styles.iconButton_button_simple} onClick={onClick}>
      <Icon />
    </button>
  )
}

export default IconButton
