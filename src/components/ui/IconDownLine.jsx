const IconDownLine = ({ open, className = "h-5 w-5" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={3}
      stroke="currentColor"
      className={`${className} ${
        open ? "rotate-180" : ""
      } mr-4 mt-1 text-inherit transition-transform ui-open:rotate-180`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  )
}

export default IconDownLine
