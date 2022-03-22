import { FunctionComponent, MouseEventHandler, PropsWithChildren } from "react"
import styles from "./styles/Button.module.scss"

interface ButtonProps {
  width?: string
  className?: string
  highlightColor?: string
  higlightTextColor?: string
  onClick?: MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
  submitting?: boolean
  destructive?: boolean
}

const Button: FunctionComponent<PropsWithChildren<ButtonProps>> = ({
  children,
  className = "",
  onClick = () => {},
}) => {
  return (
    <button
      onClick={onClick}
      className={`${styles.button_filled} ${className}`}
    >
      {children}
    </button>
  )
}

export default Button
