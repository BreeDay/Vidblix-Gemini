"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Steps from "@/components/Steps";
import { ReactNode } from "react";
import useAuth from "@/lib/hooks/useAuth";
import LoginModal from "@/components/LoginModal";

const Layout = ({ children }: { children: ReactNode }) => {
  const isAuthenticated = useAuth();
  return isAuthenticated ? (
    <MaxWidthWrapper className="flex-1 flex flex-col">
      <Steps />
      {children}
    </MaxWidthWrapper>
  ) : (
    <LoginModal />
  );
};

export default Layout;
