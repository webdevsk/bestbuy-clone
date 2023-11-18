const BadgeCounter = ({ children, className, icon }) => {
  return (
    <div className="relative">
      {icon}
      <div
        className={`${
          icon
            ? "absolute left-full top-1/2 -translate-x-1/2 -translate-y-full"
            : ""
        } badge  min-h-[20px] min-w-[20px] rounded-full bg-accent p-0.5 text-center font-serif text-xs font-bold text-body antialiased ${
          className ?? ""
        }`}
      >
        {children}
      </div>
    </div>
  )
}

export default BadgeCounter
