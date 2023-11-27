import { Fragment } from "react"
import { localeCurrencyFormatter } from "../../main"

const LocaleCurrency = ({ children, as: Tag = Fragment, ...rest }) => {
  return (
    <Tag {...rest}>
      {typeof children === "number"
        ? localeCurrencyFormatter.format(children)
        : children}
    </Tag>
  )
}

export default LocaleCurrency
