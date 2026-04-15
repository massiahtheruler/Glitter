import useSignupModal from "@/hooks/useSignupModal";
import { useCallback, useState } from "react";
import axios from "axios";
import Input from "../Input";
import Modal from "../Modal";
import useLoginModal from "@/hooks/useLoginModal";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useRouter } from "next/router";

const SignupModal = () => {
  const loginModal = useLoginModal();
  const signupModal = useSignupModal();
  const { mutate: mutateCurrentUser } = useCurrentUser();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onToggle = useCallback(() => {
    if (isLoading) {
      return;
    }

    signupModal.onClose();
    loginModal.onOpen();
  }, [isLoading, loginModal, signupModal]);

  const onSubmit = useCallback(async () => {
    try {
      if (!email.trim()) {
        toast.error("Email is required.");
        return;
      }

      if (!name.trim()) {
        toast.error("Name is required.");
        return;
      }

      if (!username.trim()) {
        toast.error("Username is required.");
        return;
      }

      if (!password) {
        toast.error("Password is required.");
        return;
      }

      setIsLoading(true);

      await axios.post("/api/register", {
        email,
        password,
        username,
        name,
      });

      toast.success("Account created successfully!");

      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (response?.error) {
        toast.error("Account created, but login failed.");
        return;
      }

      await mutateCurrentUser();
      signupModal.onClose();
      loginModal.onClose();
      router.push("/");
    } catch (error) {
      console.log(error);

      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message;

        if (message) {
          toast.error(message);
          return;
        }
      }

      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  }, [email, loginModal, mutateCurrentUser, name, password, router, signupModal, username]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
      placeholder="Email"
      onChange={(e) => setEmail(e.target.value)}
      value={email}
      disabled={isLoading}
      />
      <Input
      placeholder="Name"
      onChange={(e) => setName(e.target.value)}
      value={name}
      disabled={isLoading}
      />
      <Input
      placeholder="Username"
      onChange={(e) => setUsername(e.target.value)}
      value={username}
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
  )

  const footerContent = (
    <div className="mt-4 mb-4 font-light text-center text-neutral-500">
      <p>Already have an account? 
        <span 
        onClick={onToggle} 
        className="ml-1 text-blue-300 cursor-pointer hover:underline">
          Sign In
        </span>
      </p>
    </div>
  )
    return (
      <Modal 
      disabled={isLoading} 
      isOpen={signupModal.isOpen} 
      title="Sign Up to Glitter!" 
      actionLabel="Create Account" 
      onClose={signupModal.onClose} 
      onSubmit={onSubmit} 
      body={bodyContent}
      footer={footerContent} />
  )
}

export default SignupModal
