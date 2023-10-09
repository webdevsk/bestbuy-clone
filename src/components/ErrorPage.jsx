import { Link, useRouteError } from "react-router-dom"

export default function ErrorPage() {
  const error = useRouteError()
  console.error(error)

  return (
    <div id="error-page" className="grid h-[100dvh] place-items-center">
      <div className="text-center">
        <h1 className="mb-4 text-5xl font-bold text-gray-400">Oops!</h1>
        <h4 className="text-xl font-semibold">
          Sorry, an unexpected error has occurred.
        </h4>
        <p className="font-semibold italic text-red-500">
          {error.error?.message ?? error.statusText}
        </p>
        <Link
          className="block translate-y-40 p-4 font-semibold text-blue-400 underline transition-colors hover:text-blue-300"
          to={"/"}
        >
          Go Home?
        </Link>
      </div>
    </div>
  )
}
