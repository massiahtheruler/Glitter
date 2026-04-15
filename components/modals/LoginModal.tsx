import BrandLoader from "@/components/BrandLoader";
import useLoginModal from "@/hooks/useLoginModal";
import { useCallback, useState } from "react";
import Input from "../Input";
import Modal from "../Modal";
import useSignupModal from "@/hooks/useSignupModal";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useRouter } from "next/router";

const LoginModal = () => {
  const signupModal = useSignupModal();
  const loginModal = useLoginModal();
  const { mutate: mutateCurrentUser } = useCurrentUser();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isWelcoming, setIsWelcoming] = useState(false);

  const onToggle = useCallback(() => {
    if (isLoading) {
      return;
    }

    

 
    loginModal.onClose();
    signupModal.onOpen();
  }, [isLoading, loginModal, signupModal]);

  const onSubmit = useCallback(async () => {
    try {
      if (!email.trim()) {
        toast.error("Email is required.");
        return;
      }

      if (!password) {
        toast.error("Password is required.");
        return;
      }

      setIsLoading(true);

      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (response?.error) {
        toast.error("Invalid email or password.");
        return;
      }

      await mutateCurrentUser();
      loginModal.onClose();
      signupModal.onClose();
      setIsWelcoming(true);
      await new Promise((resolve) => window.setTimeout(resolve, 800));
      toast.success("Welcome back!");
      await router.push("/");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    } finally {
      setIsWelcoming(false);
      setIsLoading(false);
    }
  }, [email, loginModal, mutateCurrentUser, password, router, signupModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
      placeholder="Email"
      onChange={(e) => setEmail(e.target.value)}
      value={email}
      disabled={isLoading}
      />
      <Input
      placeholder="Password"
      type="password"
      onChange={(e) => setPassword(e.target.value)}
      value={password}
      disabled={isLoading}
      />
    </div>
  );

  const footerContent = (
    <div className="mt-4 mb-4 font-light text-center text-neutral-500">
      <p>
        New to Glitter?
        <span
          onClick={onToggle}
          className="ml-1 text-blue-300 cursor-pointer hover:underline"
        >
          Create a New Account!
        </span>
      </p>
    </div>
  );

  return (
    <>
      {isWelcoming ? <BrandLoader overlay /> : null}
      <Modal
        disabled={isLoading || isWelcoming}
        isOpen={loginModal.isOpen}
        title="Login"
        actionLabel="Sign In"
        onClose={loginModal.onClose}
        onSubmit={onSubmit}
        body={bodyContent}
        footer={footerContent}
      />
    </>
  );
};

export default LoginModal
