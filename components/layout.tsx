import type { ReactNode } from "react";
import Footer from "./layout/Footer";
import Sidebar from "./layout/Sidebar";
import FollowBar from "./layout/FollowBar";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <div className="mx-auto min-h-screen w-full max-w-[1400px] px-3 md:px-5 xl:px-8">
        <div className="grid min-h-screen grid-cols-4 gap-4 xl:gap-6">
          <Sidebar />
          <div className="col-span-3 flex min-h-screen flex-col border-x-[1px] border-neutral-700 lg:col-span-2">
            <div className="flex-1">{children}</div>
            <Footer />
          </div>
          <FollowBar />
        </div>
      </div>
    </div>
  );
};

export default Layout;
