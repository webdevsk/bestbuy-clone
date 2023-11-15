import { Typography } from "@material-tailwind/react"
import { Popover } from "@headlessui/react"
import {
  HigherOrderFloat,
  HigherOrderPanel,
} from "../../components/common/HigherOrderFloat"
import AccountPanel from "./AccountPanel"
import { useAuth0 } from "@auth0/auth0-react"

export const Account = () => {
  const { user, isAuthenticated, isLoading } = useAuth0()
  console.log(user)
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
              <Typography
                className="group-[.floating]/header:hidden lg:group-[.floating]/header:block"
                variant="h6"
              >
                Account
              </Typography>
            </>
          )}
          {isAuthenticated && user && (
            <>
              <img
                src={user.picture ?? "images/avatar-placeholder-human.svg"}
                className="aspect-square w-8 rounded-full border-2 border-white transition-shadow group-hover:border-accent"
              />
              <Typography
                variant="h6"
                className="max-w-[7rem] overflow-hidden text-ellipsis whitespace-nowrap group-[.floating]/header:hidden lg:group-[.floating]/header:block"
              >
                {user.name ?? user.nickname}
              </Typography>
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
