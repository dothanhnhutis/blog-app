import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import React from "react";
type Props = {
  children: React.ReactNode;
};
const DefaultLayout = ({ children }: Props) => {
  return (
    <>
      <NavBar />
      {children}
      <Footer />
    </>
  );
};

export default DefaultLayout;
