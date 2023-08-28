const IconDownLine = ({ open, className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={3}
      className={`${className} ${
        open ? "rotate-180" : ""
      } mr-4 mt-1 h-5 w-5 stroke-gray-700 transition-transform group-hover:stroke-theme`}
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
