// category
// brand
// price
// rating

import {
  Accordion,
  AccordionBody,
  AccordionHeader,
} from "@material-tailwind/react"
import { useState } from "react"

const Filters = ({ products }) => {
  const [open, setOpen] = useState(1)
  const handleOpen = (value) => setOpen(open === value ? 0 : value)

  return (
    <>
      <Accordion open={open === 1}>
        <AccordionHeader onClick={() => handleOpen(1)}>
          Category
        </AccordionHeader>
        <AccordionBody>Hello world</AccordionBody>
      </Accordion>
    </>
  )
}

export default Filters
