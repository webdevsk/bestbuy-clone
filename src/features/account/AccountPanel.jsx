import { useAuth0 } from "@auth0/auth0-react"
import { Typography } from "@material-tailwind/react"
import {
  IoIosInformationCircleOutline,
  IoIosLogIn,
  IoIosLogOut,
} from "react-icons/io"

const AccountPanel = () => {
  const { loginWithPopup, logout, user, isAuthenticated, isLoading } =
    useAuth0()

  // useAuth0()
  //   .getIdTokenClaims()
  //   .then((data) => console.log(data))
  return (
    <div
      className={`relative max-h-full w-72 max-w-full divide-y overflow-y-auto bg-white text-black shadow-md`}
    >
      {isLoading && (
        <div className="flex items-center gap-2 p-4">
          <div className="aspect-square w-12 animate-pulse rounded-full bg-gray-400" />

          <div className="w-1 grow">
            <Typography variant="h6"></Typography>
            <div className="mb-2 h-5 animate-pulse rounded-sm bg-gray-400"></div>
            <div className="h-5 animate-pulse rounded-sm bg-gray-400"></div>
            <Typography className="break-all"></Typography>
          </div>
        </div>
      )}
      {isAuthenticated && user && (
        <div className="flex items-center gap-2 p-4">
          <img
            src={user.picture ?? "images/avatar-placeholder-human.svg"}
            alt="user's profile picture"
            className="aspect-square w-12 rounded-full bg-center bg-no-repeat object-cover"
          />

          <div className="w-1 grow">
            <Typography variant="h6">
              {user.name === user.email
                ? user.nickname ?? user.name
                : user.name ?? user.email}
            </Typography>
            <Typography className="break-all">{user.email}</Typography>
          </div>
        </div>
      )}
      {!isAuthenticated && (
        <Typography variant="small" className="px-4 py-1">
          <IoIosInformationCircleOutline className="inline" /> Login to store
          cart information.
        </Typography>
      )}
      {!isAuthenticated && (
        <button
          className="block w-full px-4 py-3 transition-colors hover:bg-gray-100"
          onClick={() => loginWithPopup()}
        >
          <Typography
            variant="paragraph"
            className="flex items-center gap-2 uppercase"
          >
            <IoIosLogIn className="text-xl" />
            Log in
          </Typography>
        </button>
      )}
      {isAuthenticated && (
        <button
          className="block w-full px-4 py-3 transition-colors hover:bg-gray-100"
          onClick={() =>
            logout({ logoutParams: { returnTo: window.location.origin } })
          }
        >
          <Typography
            variant="paragraph"
            className="flex items-center gap-2 uppercase"
          >
            <IoIosLogOut className="text-xl" />
            Log Out
          </Typography>
        </button>
      )}
    </div>
  )
}

export default AccountPanel
