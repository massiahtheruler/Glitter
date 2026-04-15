import useCurrentUser from "@/hooks/useCurrentUser";
import useSignupModal from "@/hooks/useSignupModal";
import { useRouter } from "next/router";
import BrandMark from "../BrandMark";

const SidebarTweet = () => {
  const router = useRouter();
  const signupModal = useSignupModal();
  const { data: userData } = useCurrentUser();

  const onClick = () => {
    if (userData) {
      router.push("/");
      return;
    }

    signupModal.onOpen();
  };

  return (
    <div onClick={onClick}>
      <div
        className="
        mt-6 
        flex 
        h-14
        w-14
        p-4
        items-center 
        justify-center
        rounded-full 
        bg-sky-500 
        text-white
        cursor-pointer
        transition
        hover:bg-sky-600
        lg:hidden"
      >
        <BrandMark className="absolute w-16" />
      </div>
      <div
        className="
                mt-6 
                hidden 
                lg:block 
                px-4 
                py-2 
                rounded-full 
                bg-sky-500 
                hover:bg-sky-600
                cursor-pointer 
                transition"
      >
        <p
          className="
                    hidden
                    lg:block
                    text-center
                    font-semibold
                    text-white
                    text-[20px]
                    "
        >
          {userData ? "Geek" : "Sign Up"}
        </p>
      </div>
    </div>
  );
};

export default SidebarTweet;
