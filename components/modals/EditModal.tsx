import useCurrentUser from "@/hooks/useCurrentUser";
import useEditModal from "@/hooks/useEditModal";
import useUser from "@/hooks/useUser";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import Modal from "../Modal";
import Input from "../Input";
import ImageUpload from "../ImageUpload";

const EditModal = () => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { mutate: mutateFetchedUser } = useUser(currentUser?.id);
  const editModal = useEditModal();
  const [profileImage, setProfileImage] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setProfileImage(currentUser?.profileImage || "");
    setCoverImage(currentUser?.coverImage || "");
    setName(currentUser?.name || "");
    setUsername(currentUser?.username || "");
    setBio(currentUser?.bio || "");
  }, [currentUser]);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      await axios.patch("/api/edit", {
        name,
        username,
        bio,
        profileImage,
        coverImage,
      });

      await Promise.all([
        mutateFetchedUser(),
        mutateCurrentUser(),
      ]);

      toast.success("Updated");

      editModal.onClose();
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.error
        : null;

      toast.error(message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [bio, name, username, profileImage, coverImage, editModal, mutateFetchedUser, mutateCurrentUser]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <ImageUpload
        value={profileImage}
        disabled={isLoading}
        onChange={(image) => setProfileImage(image)}
        label="Upload profile image"
      />
      <ImageUpload
        value={coverImage}
        disabled={isLoading}
        onChange={(image) => setCoverImage(image)}
        label="Upload cover image"
      />

      <Input
        placeholder="Name"
        value={name}
        disabled={isLoading}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        placeholder="Username"
        value={username}
        disabled={isLoading}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        placeholder="Bio"
        value={bio}
        disabled={isLoading}
        onChange={(e) => setBio(e.target.value)}
      />
      {/* <Input
        placeholder="Profile Image URL"
        value={profileImage}
        disabled={isLoading}
        onChange={(e) => setProfileImage(e.target.value)}
      />
      <Input
        placeholder="Cover Image URL"
        value={coverImage}
        disabled={isLoading}
        onChange={(e) => setCoverImage(e.target.value)}
      /> */}
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={editModal.isOpen}
      title="Edit your Profile"
      actionLabel="Save"
      onClose={editModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
    />
  );
};

export default EditModal;
