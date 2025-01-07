"use client";

import AppSidebar from "@/components/AppSidebar";
import Loading from "@/components/Loading";
import Navbar from "@/components/Navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ChaptersSidebar from "./user/courses/[courseId]/ChaptersSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [courseId, setCourseId] = useState<string | null>(null);
  const { user, isLoaded } = useUser();
  const router = useRouter();

  //handle isCoursePage with useEffect
  const isCoursePage = /^\/user\/courses\/[^\/]+(?:\/chapters\/[^\/]+)?$/.test(
    pathname
  );

  useEffect(() => {
    // Ensure users can only access users route
    if (
      (user?.publicMetadata?.userType as "student" | "teacher") === "student" &&
      pathname.includes("teacher")
    ) {
      router.push("/user/courses", { scroll: false });
    }

    // Ensure teachers can only access teachers route
    if (
      (user?.publicMetadata?.userType as "student" | "teacher") === "teacher" &&
      pathname.includes("user")
    ) {
      router.push("/teacher/courses", { scroll: false });
    }
  }, [user, pathname, router]);

  useEffect(() => {
    if (isCoursePage) {
      const match = pathname.match(/\/user\/courses\/([^\/]+)/);
      setCourseId(match ? match[1] : null);
    } else {
      setCourseId(null);
    }
  }, [isCoursePage, pathname]);

  if (!isLoaded) return <Loading />;
  if (!user) return <section>Please sign in to access this page.</section>;

  return (
    <SidebarProvider>
      <section className="dashboard">
        <AppSidebar />
        <section className="dashboard__content">
          {courseId && <ChaptersSidebar />}
          <section
            className={cn(
              "dashboard__main",
              isCoursePage && "dashboard__main--not-course"
            )}
            style={{ height: "100vh" }}
          >
            <Navbar isCoursePage={isCoursePage} />
            <main className="dashboard__body">{children}</main>
          </section>
        </section>
      </section>
    </SidebarProvider>
  );
}
