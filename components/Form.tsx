import axios from "axios";
import { motion } from "motion/react";
import { KeyboardEvent, useCallback, useState } from "react";
import { toast } from "react-hot-toast";

import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import usePost from "@/hooks/usePost";
import usePosts from "@/hooks/usePosts";
import useSignupModal from "@/hooks/useSignupModal";

import Avatar from "./Avatar";
import Button from "./Button";
import ImageUpload from "./ImageUpload";

interface FormProps {
  placeholder: string;
  isComment?: boolean;
  postId?: string;
}

const Form = ({ placeholder, isComment, postId }: FormProps) => {
  const signupModal = useSignupModal();
  const loginModal = useLoginModal();
  const { data: currentUser } = useCurrentUser();
  const { data: fetchedPosts, mutate: mutatePosts } = usePosts();
  const { data: fetchedPost, mutate: mutatePost } = usePost(postId);

  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    if (!currentUser) {
      toast.error("Please sign in to post.");
      loginModal.onOpen();
      return;
    }

    if (!content.trim() && !image) {
      toast.error("Post content is required.");
      return;
    }

    const previousPost = fetchedPost;

    try {
      setIsLoading(true);

      if (isComment) {
        const optimisticComment = {
          id: `optimistic-${Date.now()}`,
          content,
          createdAt: new Date().toISOString(),
          user: {
            id: currentUser.id,
            name: currentUser.name,
            username: currentUser.username,
          },
        };

        await mutatePost(
          (currentPost?: { comments?: (typeof optimisticComment)[] }) =>
            currentPost
              ? {
                  ...currentPost,
                  comments: [
                    ...(currentPost.comments || []),
                    optimisticComment,
                  ],
                }
              : currentPost,
          { revalidate: false },
        );

        await axios.post("/api/comments", { body: content, postId });
        await mutatePost();
        setContent("");
      } else {
        const optimisticPost = {
          id: `optimistic-post-${Date.now()}`,
          content,
          image: image || undefined,
          createdAt: new Date().toISOString(),
          likedIds: [],
          comments: [],
          user: {
            id: currentUser.id,
            name: currentUser.name,
            username: currentUser.username,
          },
        };

        await mutatePosts(
          (currentPosts?: (typeof optimisticPost)[]) =>
            currentPosts ? [optimisticPost, ...currentPosts] : [optimisticPost],
          { revalidate: false },
        );

        await axios.post("/api/posts", { content, image: image || undefined });
        await mutatePosts();
        setContent("");
        setImage("");
      }

      toast.success(isComment ? "Reply posted" : "Tweet posted");
    } catch (error) {
      if (isComment) {
        await mutatePost(previousPost, { revalidate: false });
      } else {
        await mutatePosts(fetchedPosts, { revalidate: false });
      }

      const message = axios.isAxiosError(error)
        ? error.response?.data?.error
        : null;

      toast.error(message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [
    content,
    currentUser,
    fetchedPost,
    fetchedPosts,
    image,
    isComment,
    loginModal,
    mutatePost,
    mutatePosts,
    postId,
  ]);

  const onKeyDown = useCallback(
    async (event: KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        await onSubmit();
      }
    },
    [onSubmit],
  );

  if (!currentUser) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="px-5 py-2 border-b border-neutral-800"
      >
        {" "}
        {currentUser ? (
          <div className="flex flex-row gap-4">
            <div>
              <Avatar userId={currentUser?.id} />
            </div>
            <div className="w-full">
              <textarea
                className="w-full 
               mt-3
               bg-neutral-950 
               resize-none 
               disabled:opacity-80 
               peer 
               ring-0 
               outline-0 
               text-[20px]
               placeholder-neutral-500
               text-white"
                placeholder={placeholder}
                disabled
                onChange={(e) => setContent(e.target.value)}
                value={content}
              ></textarea>
              <hr className="w-full h-px transition opacity-0 border-neutral-800 peer-focus:opacity-100" />
              <div className="flex flex-row justify-end mt-4">
                <Button disabled={isLoading} onClick={onSubmit} label="Geek" />
              </div>
            </div>
          </div>
        ) : (
          <div className="py-8">
            <h1 className="mb-4 text-2xl font-bold text-center text-white">
              Welcome to Glitter
            </h1>
            <div className="flex flex-row items-center justify-center gap-4">
              <Button onClick={loginModal.onOpen} label="Login" />
              <Button onClick={signupModal.onOpen} label="Register" />
            </div>
          </div>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="border-b border-neutral-800 bg-neutral-950 px-5 py-3"
    >
      <div className="flex flex-col gap-4">
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/70 px-4 py-3 transition focus-within:border-sky-500/40 focus-within:bg-neutral-900">
          <div className="flex items-start gap-3">
            <div className="shrink-0 pt-1">
              <Avatar userId={currentUser.id} />
            </div>

            <div className="min-w-0 flex-1">
              {!content && (
                <div className="pointer-events-none mb-2 flex items-center gap-2 text-neutral-500">
                  <span className="inline-block h-5 w-px animate-pulse bg-sky-400" />
                  <span>{placeholder}</span>
                </div>
              )}
              <textarea
                disabled={isLoading}
                onChange={(event) => setContent(event.target.value)}
                onKeyDown={onKeyDown}
                value={content}
                className="min-h-[56px] w-full resize-none bg-transparent text-lg leading-6 text-white outline-none placeholder:text-transparent transition-[min-height] duration-200 focus:min-h-[112px] disabled:cursor-not-allowed disabled:opacity-70"
                placeholder={placeholder}
              />

              {!isComment ? (
                <div className="mt-4">
                  <ImageUpload
                    label="Add an image"
                    value={image}
                    disabled={isLoading}
                    onChange={(base64) => setImage(base64)}
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            disabled={isLoading}
            onClick={onSubmit}
            label={isLoading ? "Posting..." : isComment ? "Reply" : "Geek"}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Form;
