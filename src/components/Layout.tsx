import React from "react";
import PageTransition from "./PageTransition";

// Layout component props
interface LayoutProps {
  children: React.ReactNode;
}

// Layout component
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    // Wrap the content with PageTransition component
    <PageTransition>{children}</PageTransition>
  );
};

// Export Layout component as default
export default Layout;
