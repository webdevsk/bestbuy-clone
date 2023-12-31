import { Popover } from "@headlessui/react"
import { HigherOrderFloat, HigherOrderPanel } from "../common/HigherOrderFloat"
import { useAuth0 } from "@auth0/auth0-react"
import {
  IoIosInformationCircleOutline,
  IoIosLogIn,
  IoIosLogOut,
} from "react-icons/io"
import { useStickyHeaderContext } from "../../hooks/useStickyHeaderContext"

export const Account = () => {
  const { user, isAuthenticated, isLoading } = useAuth0()
  const isSticking = useStickyHeaderContext()
  return (
    <Popover className="relative">
      <HigherOrderFloat offset={16} shift={{ crossAxis: true }}>
        <Popover.Button className="group flex flex-wrap items-end gap-2 p-0 text-white hover:bg-transparent hover:text-accent focus-visible:outline-none active:bg-transparent">
          {isLoading && (
            <>
              <div className="aspect-square h-7 w-7 animate-pulse rounded-full bg-gray-400"></div>
              <div className="grow animate-pulse rounded-sm bg-gray-400 leading-5 text-transparent">
                Account
              </div>
            </>
          )}
          {!isAuthenticated && !isLoading && (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-7 w-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <h6 className={isSticking ? "hidden lg:block" : ""}>Account</h6>
            </>
          )}
          {isAuthenticated && user && (
            <>
              <img
                src={user.picture ?? "images/avatar-placeholder-human.svg"}
                className="aspect-square w-8 rounded-full border-2 border-white transition-shadow group-hover:border-accent"
              />
              <h6
                className={`max-w-[7rem] overflow-hidden text-ellipsis whitespace-nowrap ${
                  isSticking ? "hidden lg:block " : ""
                }`}
              >
                {user.name ?? user.nickname}
              </h6>
            </>
          )}
        </Popover.Button>
        <HigherOrderPanel overlay={false}>
          <AccountPanel />
        </HigherOrderPanel>
      </HigherOrderFloat>
    </Popover>
  )
}

const AccountPanel = () => {
  const { loginWithPopup, logout, user, isAuthenticated, isLoading } =
    useAuth0()
  // console.log(user)
  return (
    <div
      className={`relative max-h-full w-72 max-w-full divide-y overflow-y-auto bg-white text-black shadow-md`}
    >
      {isLoading && (
        <div className="flex items-center gap-2 p-4">
          <div className="aspect-square w-12 animate-pulse rounded-full bg-gray-400" />

          <div className="w-1 grow">
            <h6></h6>
            <div className="mb-2 h-5 animate-pulse rounded-sm bg-gray-400"></div>
            <div className="h-5 animate-pulse rounded-sm bg-gray-400"></div>
            <p className="break-all"></p>
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
            <h6>
              {user.name === user.email
                ? user.nickname ?? user.name
                : user.name ?? user.email}
            </h6>
            <p className="break-all">{user.email}</p>
          </div>
        </div>
      )}
      {!isAuthenticated && (
        <small className="px-4 py-1">
          <IoIosInformationCircleOutline className="inline" /> Login to store
          cart information.
        </small>
      )}
      {!isAuthenticated && (
        <button
          className="block w-full px-4 py-3 transition-colors hover:bg-gray-100"
          onClick={() => loginWithPopup()}
        >
          <p className="flex items-center gap-2 uppercase">
            <IoIosLogIn className="text-xl" />
            Log in
          </p>
        </button>
      )}
      {isAuthenticated && (
        <button
          className="block w-full px-4 py-3 transition-colors hover:bg-gray-100"
          onClick={() =>
            logout({ logoutParams: { returnTo: window.location.origin } })
          }
        >
          <p className="flex items-center gap-2 uppercase">
            <IoIosLogOut className="text-xl" />
            Log Out
          </p>
        </button>
      )}
    </div>
  )
}
