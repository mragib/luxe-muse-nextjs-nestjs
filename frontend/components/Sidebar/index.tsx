"use client";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

import AdminSideBar from "./AdminSideBar";
import OwnerSideBar from "./OwnerSideBar";
import ManagerSideBar from "./ManagerSideBar";
import SalesManSideBar from "./SalesManSideBar";
import { Role } from "@/lib/type";

const Sidebar = ({
  sidebarOpen,
  setSidebarOpen,
  role,
}: {
  sidebarOpen: boolean;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
  role: Role;
}) => {
  const pathname = usePathname();

  const trigger = useRef<HTMLButtonElement>(null);
  const sidebar = useRef<HTMLDivElement>(null);

  const [sidebarExpanded, setSidebarExpanded] = useState<boolean>(false);

  // Initialize sidebar expanded state from localStorage
  useEffect(() => {
    const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
    setSidebarExpanded(
      storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
    );
  }, []);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target as Node) ||
        trigger.current.contains(target as Node)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  // Persist sidebar expanded state to localStorage and update body class
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
      if (sidebarExpanded) {
        document.querySelector("body")?.classList.add("sidebar-expanded");
      } else {
        document.querySelector("body")?.classList.remove("sidebar-expanded");
      }
    }
  }, [sidebarExpanded]);

  if (role === Role.SUPERADMIN)
    return (
      <AdminSideBar
        pathname={pathname}
        setSidebarExpanded={setSidebarExpanded}
        setSidebarOpen={setSidebarOpen}
        sidebar={sidebar}
        trigger={trigger}
        sidebarExpanded={sidebarExpanded}
        sidebarOpen={sidebarOpen}
      />
    );

  if (role === Role.ADMIN)
    return (
      <OwnerSideBar
        pathname={pathname}
        setSidebarExpanded={setSidebarExpanded}
        setSidebarOpen={setSidebarOpen}
        sidebar={sidebar}
        trigger={trigger}
        sidebarExpanded={sidebarExpanded}
        sidebarOpen={sidebarOpen}
      />
    );
  // if (role === Role.MANAGER)
  //   return (
  //     <ManagerSideBar
  //       logo={logo}
  //       pathname={pathname}
  //       setSidebarExpanded={setSidebarExpanded}
  //       setSidebarOpen={setSidebarOpen}
  //       sidebar={sidebar}
  //       trigger={trigger}
  //       sidebarExpanded={sidebarExpanded}
  //       sidebarOpen={sidebarOpen}
  //     />
  //   );

  // if (role === "sales")
  //   return (
  //     <SalesManSideBar
  //       logo={logo}
  //       pathname={pathname}
  //       setSidebarExpanded={setSidebarExpanded}
  //       setSidebarOpen={setSidebarOpen}
  //       sidebar={sidebar}
  //       trigger={trigger}
  //       sidebarExpanded={sidebarExpanded}
  //       sidebarOpen={sidebarOpen}
  //     />
  //   );
};

export default Sidebar;
