
type Props = {
    children: string;
}

function Button({ children }: Props) {
  return (
    <li className="categories-btn">{children}</li>
  )
}

export default Button