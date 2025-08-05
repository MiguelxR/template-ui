import React from "react";
import Header from "./Header";
import Footer from "./Footer";

type CoreLayoutProps = {
  children: React.ReactNode;
};

const CoreLayout = ({ children }: CoreLayoutProps) => {
  return (
    <div>
      CoreLayout
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default CoreLayout;
