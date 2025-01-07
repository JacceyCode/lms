"use client";

import { useClerk, useUser } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  BookOpen,
  Briefcase,
  DollarSign,
  LogOut,
  PanelLeft,
  Settings,
  User,
} from "lucide-react";
import Loading from "./Loading";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";

const AppSidebar = () => {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const pathname = usePathname();
  const { toggleSidebar } = useSidebar();
  const router = useRouter();

  const navLinks = {
    student: [
      { icon: BookOpen, label: "Courses", href: "/user/courses" },
      { icon: Briefcase, label: "Billings", href: "/user/billing" },
      { icon: User, label: "Profile", href: "/user/profile" },
      { icon: Settings, label: "Settings", href: "/user/settings" },
    ],
    teacher: [
      { icon: BookOpen, label: "Courses", href: "/teacher/courses" },
      { icon: DollarSign, label: "Billings", href: "/teacher/billing" },
      { icon: User, label: "Profile", href: "/teacher/profile" },
      { icon: Settings, label: "Settings", href: "/teacher/settings" },
    ],
  };

  if (!isLoaded) return <Loading />;
  if (!user) return <section>User not found</section>;

  const userType =
    (user.publicMetadata.userType as "student" | "teacher") || "student";
  const curNavLinks = navLinks[userType];

  return (
    <Sidebar
      collapsible="icon"
      style={{ height: "100vh" }}
      className="bg-customgreys-primarybg border-none shadow-lg"
    >
      <SidebarHeader>
        <SidebarMenu className="app-sidebar__menu">
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              onClick={toggleSidebar}
              className="group hover:bg-customgreys-secondarybg"
            >
              <section className="app-sidebar__logo-container group">
                <section className="app-sidebar__logo-wrapper">
                  <Image
                    src="/logo.svg"
                    alt="logo"
                    width={25}
                    height={20}
                    className="app-sidebar__logo"
                  />
                  <p
                    className="app-sidebar__title"
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push("/", { scroll: false });
                    }}
                  >
                    JCYLM
                  </p>
                </section>
                <PanelLeft className="app-sidebar__collapse-icon" />
              </section>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu className="app-sidebar__nav-menu">
          {curNavLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <SidebarMenuItem
                key={link.href}
                className={cn(
                  "app-sidebar__nav-item",
                  isActive && "bg-gray-800"
                )}
              >
                <SidebarMenuButton
                  asChild
                  size="lg"
                  className={cn(
                    "app-sidebar__nav-button",
                    !isActive && "text-customgreys-dirtyGrey"
                  )}
                >
                  <Link
                    href={link.href}
                    className="app-sidebar__nav-link"
                    scroll={false}
                  >
                    <link.icon
                      className={isActive ? "text-white-50" : "text-gray-500"}
                    />
                    <span
                      className={cn(
                        "app-sidebar__nav-text",
                        isActive ? "text-white-50" : "text-gray-500"
                      )}
                    >
                      {link.label}
                    </span>
                  </Link>
                </SidebarMenuButton>
                {isActive && (
                  <section className="app-sidebar__active-indicator" />
                )}
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <button
                onClick={() => signOut()}
                className="app-sidebar__signout"
              >
                <LogOut className="mr-2 h-6 w-6" />
                <span>Sign out</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
