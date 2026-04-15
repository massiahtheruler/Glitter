import BrandLoader from "@/components/BrandLoader";
import Header from "@/components/Header";
import useMinimumLoading from "@/hooks/useMinimumLoading";
import UserHero from "@/components/users/UserHero";
import useUser from "@/hooks/useUser";
import { useRouter } from "next/router";
import UserBio from "@/components/users/UserBio";
import PostFeed from "@/components/posts/PostFeed";

const UserView = () => {
  const router = useRouter();
  const { userId } = router.query;
  const userIdString = typeof userId === "string" ? userId : undefined;
  const { data: fetchedUser, isLoading, error } = useUser(userIdString);
  const showLoading = useMinimumLoading(isLoading, 500);

  if (showLoading) {
    return <BrandLoader compact />;
  }

  if (error || !fetchedUser) {
    return (
      <>
        <Header label="User not found" showBackArrow />
        <div className="p-5 border-b border-neutral-800">
          <p className="text-white">We couldn&apos;t find that user.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Header
        label={fetchedUser?.name || fetchedUser?.username || "User Profile"}
        showBackArrow
      />

      <UserHero userId={fetchedUser.id} />
      <UserBio userId={fetchedUser.id} />
      <PostFeed userId={fetchedUser.id} />
    </>
  );
};

export default UserView;
