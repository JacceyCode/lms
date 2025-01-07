import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="auth-layout">
      <main className="auth-layout__main">{children}</main>
    </section>
  );
};

export default Layout;
