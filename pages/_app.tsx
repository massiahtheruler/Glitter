import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import "../styles/globals.css";
import RouteSkeleton from "@/components/RouteSkeleton";
import Layout from "../components/layout";
// import Modal from "@/components/Modal";
import LoginModal from "@/components/modals/LoginModal";
import SignupModal from "@/components/modals/SignupModal";
import {Toaster} from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import EditModal from "@/components/modals/EditModal";
import DeeEmModal from "@/components/modals/DeeEmModal";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [isRouteLoading, setIsRouteLoading] = useState(false);
  const routeLoadStartedAt = useRef(0);

  useEffect(() => {
    const minimumVisibleMs = 800;

    const handleStart = () => {
      routeLoadStartedAt.current = Date.now();
      setIsRouteLoading(true);
    };

    const handleDone = () => {
      const elapsed = Date.now() - routeLoadStartedAt.current;
      const remaining = Math.max(0, minimumVisibleMs - elapsed);

      window.setTimeout(() => {
        setIsRouteLoading(false);
      }, remaining);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleDone);
    router.events.on("routeChangeError", handleDone);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleDone);
      router.events.off("routeChangeError", handleDone);
    };
  }, [router.events]);

  return (
    <SessionProvider session={pageProps.session}>
      <Toaster />
      {isRouteLoading ? <RouteSkeleton /> : null}
      <EditModal/>
      <DeeEmModal />
      {/* <Modal
        isOpen
        title="Test Modal"
        onClose={() => {}}
        onSubmit={() => {}}
        actionLabel="Submit"
        body={<div className="text-white">Testing modal</div>}
        footer={<div className="text-white">Footer test</div>}
      /> */}
      <SignupModal />
      <LoginModal />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
