"use client";
import React from "react";
import {
  FaBangladeshiTakaSign,
  FaHandHoldingDollar,
  FaUnlockKeyhole,
} from "react-icons/fa6";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { TiShoppingCart } from "react-icons/ti";
import SidebarLinkGroup from "./SidebarLinkGroup";
import { GrStorage } from "react-icons/gr";
import { BsBoxes } from "react-icons/bs";
import { MdOutlineDashboard } from "react-icons/md";
import { HiOutlineLogout } from "react-icons/hi";
import { LuFileStack } from "react-icons/lu";
import Link from "next/link";
import SignOutButton from "../master/signOutButton";
import Image from "next/image";
import { RefObject } from "react";
import { ADMIN_MENU } from "@/lib/constants";

interface OwnerSideBarProps {
  pathname: string;
  sidebar: RefObject<HTMLDivElement>;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  trigger: RefObject<HTMLButtonElement>;
  sidebarExpanded: boolean;
  setSidebarExpanded: (expanded: boolean) => void;
}

function OwnerSideBar({
  pathname,
  sidebar,
  sidebarOpen,
  setSidebarOpen,
  trigger,
  sidebarExpanded,
  setSidebarExpanded,
}: OwnerSideBarProps) {
  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-10 flex h-screen w-72.5 flex-col overflow-y-hidden bg-white transition-all duration-300 ease-linear dark:bg-gray-900 lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <Link href="/">
          <Image src="/logo.webp" alt="Logo" width={100} height={40} />
        </Link>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto transition-all duration-300 ease-linear">
        <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-gray-500 dark:text-gray-400">
              MENU
            </h3>
            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Dashboard --> */}

              <li>
                <Link
                  href={ADMIN_MENU.DASHBOARD}
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-gray-700 transition-all duration-300 ease-in-out hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-800 ${
                    pathname.includes("dashboard") &&
                    "bg-gray-200 dark:bg-gray-800"
                  }`}
                >
                  <MdOutlineDashboard />
                  Dashboard
                </Link>
              </li>

              {/* <!-- Menu Item Dashboard --> */}

              {/* <!-- Menu Item Products --> */}
              <SidebarLinkGroup
                activeCondition={
                  pathname === "/admin/products" ||
                  pathname.includes("products")
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-gray-700 transition-all duration-300 ease-in-out hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-800 ${
                          (pathname === "/admin/products" ||
                            pathname.includes("products")) &&
                          "bg-gray-200 dark:bg-gray-800"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <BsBoxes />
                        Product
                        <svg
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && "rotate-180"
                          }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </Link>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`transform transition-all ${
                          !open && "hidden"
                        }`}
                      >
                        <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                          <li>
                            <Link
                              href="/admin/brands"
                              className={
                                "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-gray-500 transition-all duration-300 ease-in-out hover:text-gray-900 dark:text-gray-400 dark:hover:text-white " +
                                (pathname === "/admin/brands"
                                  ? "!text-gray-900 dark:!text-white"
                                  : "")
                              }
                            >
                              Brands
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/admin/category"
                              className={
                                "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-gray-500 transition-all duration-300 ease-in-out hover:text-gray-900 dark:text-gray-400 dark:hover:text-white " +
                                (pathname === "/admin/category"
                                  ? "!text-gray-900 dark:!text-white"
                                  : "")
                              }
                            >
                              Category
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/admin/attribute"
                              className={
                                "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-gray-500 transition-all duration-300 ease-in-out hover:text-gray-900 dark:text-gray-400 dark:hover:text-white " +
                                (pathname === "/admin/attribute"
                                  ? "!text-gray-900 dark:!text-white"
                                  : "")
                              }
                            >
                              Attribute
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/admin/attribute-value"
                              className={
                                "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-gray-500 transition-all duration-300 ease-in-out hover:text-gray-900 dark:text-gray-400 dark:hover:text-white " +
                                (pathname === "/admin/attribute-value"
                                  ? "!text-gray-900 dark:!text-white"
                                  : "")
                              }
                            >
                              Attribute Value
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/admin/products"
                              className={
                                "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-gray-500 transition-all duration-300 ease-in-out hover:text-gray-900 dark:text-gray-400 dark:hover:text-white " +
                                (pathname === "/admin/products"
                                  ? "!text-gray-900 dark:!text-white"
                                  : "")
                              }
                            >
                              Products
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/products/attribute"
                              className={
                                "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-gray-500 transition-all duration-300 ease-in-out hover:text-gray-900 dark:text-gray-400 dark:hover:text-white " +
                                (pathname === "/products/attribute"
                                  ? "!text-gray-900 dark:!text-white"
                                  : "")
                              }
                            >
                              Manage Product
                            </Link>
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* <!-- Menu Item Products --> */}

              {/* <!-- Menu Item Storage --> */}
              <li>
                <Link
                  href="/storage"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-gray-700 transition-all duration-300 ease-in-out hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-800 ${
                    pathname.includes("storage") &&
                    "bg-gray-200 dark:bg-gray-800"
                  }`}
                >
                  <GrStorage />
                  Storage
                </Link>
              </li>
              {/* <!-- Menu Item Storage --> */}

              {/* <!-- Menu Item People --> */}
              <SidebarLinkGroup
                activeCondition={
                  pathname === "/people" || pathname.includes("people")
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-gray-700 transition-all duration-300 ease-in-out hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-800 ${
                          (pathname === "/people" ||
                            pathname.includes("people")) &&
                          "bg-gray-200 dark:bg-gray-800"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <svg
                          className="fill-current"
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9.0002 7.79065C11.0814 7.79065 12.7689 6.1594 12.7689 4.1344C12.7689 2.1094 11.0814 0.478149 9.0002 0.478149C6.91895 0.478149 5.23145 2.1094 5.23145 4.1344C5.23145 6.1594 6.91895 7.79065 9.0002 7.79065ZM9.0002 1.7719C10.3783 1.7719 11.5033 2.84065 11.5033 4.16252C11.5033 5.4844 10.3783 6.55315 9.0002 6.55315C7.62207 6.55315 6.49707 5.4844 6.49707 4.16252C6.49707 2.84065 7.62207 1.7719 9.0002 1.7719Z"
                            fill=""
                          />
                          <path
                            d="M10.8283 9.05627H7.17207C4.16269 9.05627 1.71582 11.5313 1.71582 14.5406V16.875C1.71582 17.2125 1.99707 17.5219 2.3627 17.5219C2.72832 17.5219 3.00957 17.2407 3.00957 16.875V14.5406C3.00957 12.2344 4.89394 10.3219 7.22832 10.3219H10.8564C13.1627 10.3219 15.0752 12.2063 15.0752 14.5406V16.875C15.0752 17.2125 15.3564 17.5219 15.7221 17.5219C16.0877 17.5219 16.3689 17.2407 16.3689 16.875V14.5406C16.2846 11.5313 13.8377 9.05627 10.8283 9.05627Z"
                            fill=""
                          />
                        </svg>
                        People
                        <svg
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && "rotate-180"
                          }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </Link>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`transform transition-all ${
                          !open && "hidden"
                        }`}
                      >
                        <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                          <li>
                            <Link
                              href="/people/customers"
                              className={
                                "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-gray-500 transition-all duration-300 ease-in-out hover:text-gray-900 dark:text-gray-400 dark:hover:text-white " +
                                (pathname === "/people/customers"
                                  ? "!text-gray-900 dark:!text-white"
                                  : "")
                              }
                            >
                              Customers
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/people/suppliers"
                              className={
                                "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-gray-500 transition-all duration-300 ease-in-out hover:text-gray-900 dark:text-gray-400 dark:hover:text-white " +
                                (pathname === "/people/suppliers"
                                  ? "!text-gray-900 dark:!text-white"
                                  : "")
                              }
                            >
                              Suppliers
                            </Link>
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

              {/* <!-- Menu Item People --> */}

              {/* <!-- Menu Item purchases --> */}
              <li>
                <Link
                  href="/purchases"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-gray-700 transition-all duration-300 ease-in-out hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-800 ${
                    pathname.includes("purchases") &&
                    "bg-gray-200 dark:bg-gray-800"
                  }`}
                >
                  <TiShoppingCart />
                  Purchase
                </Link>
              </li>
              {/* <!-- Menu Item purchases --> */}
              {/* <!-- Menu Item Sales --> */}
              <li>
                <Link
                  href="/sales"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-gray-700 transition-all duration-300 ease-in-out hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-800 ${
                    pathname.includes("sales") && "bg-gray-200 dark:bg-gray-800"
                  }`}
                >
                  <FaBangladeshiTakaSign />
                  Sales
                </Link>
              </li>
              {/* <!-- Menu Item sales --> */}
              {/* <!-- Menu Item Expenses --> */}
              <li>
                <Link
                  href="/expenses"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-gray-700 transition-all duration-300 ease-in-out hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-800 ${
                    pathname.includes("expenses") &&
                    "bg-gray-200 dark:bg-gray-800"
                  }`}
                >
                  <FaHandHoldingDollar />
                  Expenses
                </Link>
              </li>
              {/* <!-- Menu Item Expenses --> */}

              {/* <!-- Menu Item Branches --> */}
              <li>
                <Link
                  href="/branches"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-gray-700 transition-all duration-300 ease-in-out hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-800 ${
                    pathname.includes("branches") &&
                    "bg-gray-200 dark:bg-gray-800"
                  }`}
                >
                  <HiOutlineBuildingOffice2 />
                  Branch
                </Link>
              </li>
              {/* <!-- Menu Item Branches --> */}
            </ul>
          </div>
          {/* Finicial Report */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-gray-500 dark:text-gray-400">
              FINANCIAL REPORT
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Auth Pages --> */}
              <SidebarLinkGroup
                activeCondition={
                  pathname === "/transactions" ||
                  pathname.includes("transactions")
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-gray-700 transition-all duration-300 ease-in-out hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-800 ${
                          (pathname === "/transactions" ||
                            pathname.includes("transactions")) &&
                          "bg-gray-200 dark:bg-gray-800"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <LuFileStack />
                        Transactions
                        <svg
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && "rotate-180"
                          }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </Link>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`transform transition-all ${
                          !open && "hidden"
                        }`}
                      >
                        <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                          <li>
                            <Link
                              href="/transactions"
                              className={
                                "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-gray-500 transition-all duration-300 ease-in-out hover:text-gray-900 dark:text-gray-400 dark:hover:text-white " +
                                (pathname === "/transactions"
                                  ? "!text-gray-900 dark:!text-white"
                                  : "")
                              }
                            >
                              Transactions
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/incomeStatement"
                              className={
                                "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-gray-500 transition-all duration-300 ease-in-out hover:text-gray-900 dark:text-gray-400 dark:hover:text-white " +
                                (pathname === "/incomeStatement"
                                  ? "!text-gray-900 dark:!text-white"
                                  : "")
                              }
                            >
                              Income Statement
                            </Link>
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* <!-- Menu Item Auth Pages --> */}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-gray-500 dark:text-gray-400">
              ACCOUNTS
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Auth Pages --> */}
              <SidebarLinkGroup
                activeCondition={
                  pathname === "/admin/chart-of-accounting" ||
                  pathname.includes("chart-of-accounting")
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-gray-700 transition-all duration-300 ease-in-out hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-800 ${
                          (pathname === "/chart-of-accounting" ||
                            pathname.includes("chart-of-accounting")) &&
                          "bg-gray-200 dark:bg-gray-800"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <LuFileStack />
                        Accounting
                        <svg
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && "rotate-180"
                          }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </Link>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`transform transition-all ${
                          !open && "hidden"
                        }`}
                      >
                        <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                          <li>
                            <Link
                              href="/admin/chart-of-accounting"
                              className={
                                "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-gray-500 transition-all duration-300 ease-in-out hover:text-gray-900 dark:text-gray-400 dark:hover:text-white " +
                                (pathname === "/admin/chart-of-accounting"
                                  ? "!text-gray-900 dark:!text-white"
                                  : "")
                              }
                            >
                              Chart of accounting
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/admin/bank-accounts"
                              className={
                                "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-gray-500 transition-all duration-300 ease-in-out hover:text-gray-900 dark:text-gray-400 dark:hover:text-white " +
                                (pathname === "/admin/bank-accounts"
                                  ? "!text-gray-900 dark:!text-white"
                                  : "")
                              }
                            >
                              Bank Accounts
                            </Link>
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* <!-- Menu Item Auth Pages --> */}
            </ul>
          </div>
          {/* <!-- Others Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-gray-500 dark:text-gray-400">
              OTHERS
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Auth Pages --> */}
              <SidebarLinkGroup
                activeCondition={
                  pathname === "/users" || pathname.includes("users")
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-gray-700 transition-all duration-300 ease-in-out hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-800 ${
                          (pathname === "/users" ||
                            pathname.includes("users")) &&
                          "bg-gray-200 dark:bg-gray-800"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <FaUnlockKeyhole />
                        Authentication
                        <svg
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && "rotate-180"
                          }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </Link>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`transform transition-all ${
                          !open && "hidden"
                        }`}
                      >
                        <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                          <li>
                            <Link
                              href={ADMIN_MENU.USERS}
                              className={
                                "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-gray-500 transition-all duration-300 ease-in-out hover:text-gray-900 dark:text-gray-400 dark:hover:text-white " +
                                (pathname === ADMIN_MENU.USERS
                                  ? "!text-gray-900 dark:!text-white"
                                  : "")
                              }
                            >
                              Users
                            </Link>
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* <!-- Menu Item Auth Pages --> */}

              {/* <!-- Menu Item Logout --> */}
              <li className="group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-gray-500 transition-all duration-300 ease-in-out hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                <HiOutlineLogout className="text-2xl" />
                <SignOutButton />
              </li>
              {/* <!-- Menu Item Logout --> */}
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
}

export default OwnerSideBar;
