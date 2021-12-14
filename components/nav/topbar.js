import { Menu, Popover, Transition } from "@headlessui/react";
import { SearchIcon } from "@heroicons/react/solid";
import { CogIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import PropTypes from "prop-types";
import React, { Fragment, memo } from "react";
import Image from "next/image";
import Link from "next/link";
import useUser from "../../hooks/useUser";
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { useState } from "react";
import { useAppDispatch, useAppState } from "../../context/AppContext";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function TopBar({ navigation, categories }) {
  const { user, isAdmin = false, connected, error } = useUser();
  const [editModeNotificationOn, setEditModeNotificationOn] = useState(false);
  const [editModeNotificationOff, setEditModeNotificationOff] = useState(false);
  const appDispatch = useAppDispatch();
  const appState = useAppState();

  // Change edit mode state send notification
  const onEditMode = () => {
    appDispatch({ type: "editMode", payload: !appState.editMode });

    if (!appState.editMode) {
      setEditModeNotificationOn(true);
      setTimeout(() => {
        setEditModeNotificationOn(false);
      }, 3000);
    } else {
      setEditModeNotificationOff(true);
      setTimeout(() => {
        setEditModeNotificationOff(false);
      }, 3000);
    }
  };

  return (
    <>
      {/* When the mobile menu is open, add `overflow-hidden` to the `body` element to prevent double scrollbars */}
      <Popover
        as="header"
        className={({ open }) =>
          classNames(
            open ? "fixed inset-0 z-40 overflow-y-auto" : "",
            "bg-white shadow-sm lg:static lg:overflow-y-visible"
          )
        }
      >
        {({ open }) => (
          <>
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
              <div className="relative flex justify-between xl:grid xl:grid-cols-12 lg:gap-8">
                {/* Logo */}
                <div className="flex md:absolute md:left-0 md:inset-y-0 lg:static xl:col-span-2">
                  <Link href="/" passHref>
                    <a className="mt-1 -ml-1">
                      {/* TODO: This Logo could use some improvements */}
                      <Image
                        src="/logo.png"
                        alt="SolDev Logo"
                        height="60"
                        width="150"
                      />
                    </a>
                  </Link>
                </div>

                {/* Search Bar */}
                <div className="min-w-0 max-w-xl flex-1 md:px-8 lg:px-0 xl:col-span-8 xl:col-start-5 xl:col-end-11">
                  <div className="flex items-center px-6 py-3 md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0 xl:px-0">
                    <div className="w-full">
                      <label htmlFor="search" className="sr-only">
                        Search
                      </label>
                      <div className="relative ">
                        <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                          <SearchIcon
                            className="h-6 w-6 text-gray-700"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="mt-1 relative flex items-center">
                          <input
                            id="search"
                            name="search"
                            disabled
                            className="disabled:opacity-70 block w-full bg-white border border-gray-300 rounded-md py-3 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-rose-500 focus:border-rose-500 sm:text-sm"
                            placeholder="Quick search for anything coming soon"
                            type="search"
                          />
                          <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
                            <kbd className="inline-flex items-center border border-gray-200 rounded px-2 text-sm font-sans font-medium text-gray-400">
                              ⌘K
                            </kbd>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/*  Mobile Menu, only visible in small screens*/}
                <div className="flex items-center md:absolute md:right-0 md:inset-y-0 lg:hidden">
                  {/* Mobile menu button */}
                  <Popover.Button className="-mx-2 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-rose-500">
                    <span className="sr-only">Open menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Popover.Button>
                </div>

                {/*  Profile Actions */}
                <div className="hidden lg:flex lg:items-center lg:justify-end xl:col-span-2">
                  {/* Profile dropdown */}
                  {connected ? (
                    <Menu as="div" className="flex-shrink-0 relative ml-5">
                      <div>
                        <Menu.Button className="bg-white rounded-full flex hover:outline-none hover:ring-2 hover:ring-offset-2 hover:ring-rose-500">
                          <span className="sr-only">Open user menu</span>
                          <Image
                            className="h-8 w-8 rounded-full"
                            src="/avatar.svg"
                            height="32px"
                            width="32px"
                            alt="avatar"
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        {/*  Desktop Profile Actions */}
                        <Menu.Items className="origin-top-right absolute z-10 right-0 mt-2 w-60 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 focus:outline-none">
                          {isAdmin && (
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  onClick={() => onEditMode()}
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-md text-gray-700 w-full flex"
                                  )}
                                >
                                  <CogIcon
                                    className="block h-7 w-7"
                                    aria-hidden="true"
                                    color={appState.editMode ? "red" : "black"}
                                  />
                                  <span className="pl-2">
                                    {appState.editMode
                                      ? "Disable Admin Mode"
                                      : "Activate Admin Mode"}
                                  </span>
                                </button>
                              )}
                            </Menu.Item>
                          )}
                          <Menu.Item>
                            {({ active }) => (
                              <WalletDisconnectButton
                                style={{
                                  background: "none",
                                  color: "black",
                                  lineHeight: "1.25rem",
                                  fontFamily: "inherit",
                                }}
                              />
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  ) : (
                    <div className="items-center">
                      <WalletMultiButton
                        style={{
                          backgroundColor: "#10B981",
                          height: "40px",
                          fontSize: "15px",
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Mobile Menu*/}
            <Popover.Panel as="nav" className="lg:hidden" aria-label="Global">
              <div className="max-w-3xl mx-auto px-2 pt-2 pb-3 space-y-1 sm:px-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? "page" : undefined}
                    className={classNames(
                      item.current
                        ? "bg-gray-100 text-gray-900"
                        : "hover:bg-gray-50",
                      "block rounded-md py-2 px-3 text-base font-medium"
                    )}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="border-t max-w-3xl mx-auto px-2 space-y-1 sm:px-4">
                {categories.map((item) => {
                  // We don't render Submitted and Inactive in the mobile version
                  if (item.name === "Submitted" || item.name === "Inactive") {
                    return;
                  }

                  return (
                    <Link key={item.name} href={item.href} passHref>
                      <a className="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900">
                        {item.name}
                      </a>
                    </Link>
                  );
                })}
              </div>
            </Popover.Panel>
          </>
        )}
      </Popover>
    </>
  );
}

TopBar.propTypes = {
  navigation: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
};

export default memo(TopBar);
