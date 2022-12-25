import { Menu, Popover, Transition } from '@headlessui/react';
import {
  CogIcon,
  ColorSwatchIcon,
  DesktopComputerIcon,
  MenuIcon,
  MoonIcon,
  SunIcon,
  XIcon
} from '@heroicons/react/outline';
import { WalletDisconnectButton, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React, { Fragment, memo, useState } from 'react';
import { useAppDispatch, useAppState } from '../../context/AppContext';
import useTheme from '../../hooks/useTheme';
import useUser from '../../hooks/useUser';
import { useRouter } from 'next/router';

const Search = dynamic(() => import('./search'));
const NavSidebar = dynamic(() => import('./nav-sidebar'));

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function TopBar({ setSearch }) {
  const { isAdmin = false, connected } = useUser();
  const [editModeNotificationOn, setEditModeNotificationOn] = useState(false);
  const [editModeNotificationOff, setEditModeNotificationOff] = useState(false);
  let { mode, setSetting } = useTheme();
  const appDispatch = useAppDispatch();
  const appState = useAppState();
  const router = useRouter();

  // Change edit mode state send notification
  const onEditMode = () => {
    appDispatch({ type: 'editMode', payload: !appState.editMode });

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
            open && 'fixed inset-0 z-40 overflow-y-auto',
            'bg-white shadow-sm dark:bg-gray-800 lg:static lg:overflow-y-visible'
          )
        }
      >
        {({ open }) => (
          <>
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between">
                {/* Logo */}
                <div className="hidden sm:inline-flex">
                  <Link href="/" passHref className="flex content-center">
                    {mode === 'light' && (
                      <Image src="/logoblack.svg" alt="SolDev Logo" height="50" width="120" />
                    )}
                    {mode === 'dark' && (
                      <Image src="/logowhite.svg" alt="SolDev Logo" height="50" width="120" />
                    )}
                  </Link>
                </div>

                {/* Search Bar */}
                <Search setSearch={setSearch} />

                {/*  Mobile Menu, only visible in small screens*/}
                <div className="flex items-center pl-2 lg:absolute lg:inset-y-0 lg:right-0 lg:hidden">
                  {/* Mobile menu button */}
                  <Popover.Button className="-mx-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500 dark:text-gray-300 dark:hover:bg-gray-600">
                    <span className="sr-only">Open menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Popover.Button>
                </div>

                <div className="flex items-center gap-6">
                  {/* Theme Settings*/}
                  <div className="hidden md:flex">
                    <Menu as="div" className="relative ml-5 flex-shrink-0">
                      <div>
                        <Menu.Button className="flex rounded-full hover:outline-none hover:ring-2 hover:ring-green-500 hover:ring-offset-2">
                          <span className="sr-only">Open Theme menu</span>
                          <ColorSwatchIcon className="h-7 w-7 text-gray-600 hover:opacity-80 dark:text-gray-300" />
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
                        <Menu.Items className="absolute right-0 z-10 mx-auto mt-2 w-36 origin-top-right space-y-3 rounded-xl border border-gray-300 bg-white py-2 pl-4 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:border-gray-600 dark:bg-gray-800">
                          <Menu.Item onClick={() => setSetting('light')}>
                            <button className="flex gap-2 text-gray-700 hover:opacity-70 dark:text-gray-300">
                              <SunIcon className=" h-6 w-6" />
                              <span>Light</span>
                            </button>
                          </Menu.Item>
                          <Menu.Item onClick={() => setSetting('dark')}>
                            <button className="flex gap-2 text-gray-700 hover:opacity-70 dark:text-gray-300">
                              <MoonIcon className="h-6 w-6" />
                              <span className="">Dark</span>
                            </button>
                          </Menu.Item>
                          <Menu.Item onClick={() => setSetting('system')}>
                            <button className="flex gap-2 text-gray-700 hover:opacity-70 dark:text-gray-300">
                              <DesktopComputerIcon className="h-6 w-6" />
                              <span>System</span>
                            </button>
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>

                  {/*  Profile Button */}
                  <div className="hidden lg:flex">
                    {connected ? (
                      <Menu as="div" className="relative flex-shrink-0">
                        <div>
                          <Menu.Button className="flex rounded-full hover:outline-none hover:ring-2 hover:ring-green-500 hover:ring-offset-2">
                            <span className="sr-only">Open user menu</span>
                            <Image
                              className="rounded-full"
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
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-60 origin-top-right rounded-xl border border-gray-300 bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:border-gray-600 dark:bg-gray-800">
                            {isAdmin && (
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    onClick={() => onEditMode()}
                                    className={classNames(
                                      active && 'bg-gray-100 hover:opacity-80 dark:bg-gray-700',
                                      'text-md block flex w-full px-4 py-2 text-gray-700 dark:text-gray-300'
                                    )}
                                  >
                                    <CogIcon
                                      className="block h-7 w-7 text-gray-700 dark:text-gray-300"
                                      aria-hidden="true"
                                    />
                                    <span className="pl-2">
                                      {appState.editMode
                                        ? 'Disable Admin Mode'
                                        : 'Activate Admin Mode'}
                                    </span>
                                  </button>
                                )}
                              </Menu.Item>
                            )}
                            <Menu.Item>
                              {({ active }) => (
                                <WalletDisconnectButton className="wallet-disconnect-btn" />
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    ) : (
                      <div className="items-center">
                        <WalletMultiButton className="wallet-multi-btn" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Menu*/}
            <Popover.Panel as="nav" className="lg:hidden" aria-label="Global">
              {({ close }) => (
                <div className="mx-auto max-w-3xl space-y-1 px-2 pt-2 pb-3 sm:px-4">
                  <NavSidebar closeMobileMenu={close} />
                </div>
              )}
            </Popover.Panel>
          </>
        )}
      </Popover>
    </>
  );
}

TopBar.propTypes = {
  setSearch: PropTypes.func.isRequired
};

export default memo(TopBar);
