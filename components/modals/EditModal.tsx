import useCurrentUser from "@/hooks/useCurrentUser";
import useEditModal from "@/hooks/useEditModal";
import useUser from "@/hooks/useUser";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { signOut } from "next-auth/react";
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
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const resetForm = useCallback(() => {
    setProfileImage(currentUser?.profileImage || "");
    setCoverImage(currentUser?.coverImage || "");
    setName(currentUser?.name || "");
    setUsername(currentUser?.username || "");
    setBio(currentUser?.bio || "");
    setEmail(currentUser?.email || "");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
  }, [
    currentUser?.bio,
    currentUser?.coverImage,
    currentUser?.email,
    currentUser?.name,
    currentUser?.profileImage,
    currentUser?.username,
  ]);

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  const handleClose = useCallback(() => {
    if (isLoading) {
      return;
    }

    resetForm();
    editModal.onClose();
  }, [editModal, isLoading, resetForm]);

  const onSubmit = useCallback(async () => {
    const trimmedEmail = email.trim();
    const isEmailChanged = trimmedEmail !== (currentUser?.email || "");
    const isPasswordChangeRequested = Boolean(newPassword || confirmNewPassword);
    const needsSecurityVerification = isEmailChanged || isPasswordChangeRequested;

    if (isPasswordChangeRequested && newPassword !== confirmNewPassword) {
      toast.error("New passwords do not match");
      return;
    }

    if (isPasswordChangeRequested && newPassword.length < 6) {
      toast.error("New password must be at least 6 characters");
      return;
    }

    if (needsSecurityVerification && !currentPassword) {
      toast.error("Current password is required for security changes");
      return;
    }

    try {
      setIsLoading(true);

      const { data } = await axios.patch("/api/edit", {
        name,
        username,
        bio,
        email: trimmedEmail,
        profileImage,
        coverImage,
        currentPassword,
        newPassword: newPassword || undefined,
      });

      editModal.onClose();

      if (data?.requiresReauth) {
        toast.success("Security settings updated. Please sign in again.");
        await signOut({ callbackUrl: "/" });
        return;
      }

      await Promise.all([mutateFetchedUser(), mutateCurrentUser()]);

      toast.success("Updated");
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.error
        : null;

      toast.error(message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [
    bio,
    currentPassword,
    currentUser?.email,
    editModal,
    email,
    mutateCurrentUser,
    mutateFetchedUser,
    name,
    newPassword,
    confirmNewPassword,
    profileImage,
    coverImage,
    username,
  ]);

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

      <div className="mt-4 rounded-2xl border border-neutral-800 bg-neutral-950/60 p-4">
        <div className="mb-4">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-300">
            Security
          </p>
          <p className="mt-2 text-sm text-neutral-400">
            Update your email or password here. Security changes require your current password and will sign you out after saving.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <Input
            placeholder="Email"
            type="email"
            value={email}
            disabled={isLoading}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Current password"
            type="password"
            value={currentPassword}
            disabled={isLoading}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <Input
            placeholder="New password"
            type="password"
            value={newPassword}
            disabled={isLoading}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Input
            placeholder="Confirm new password"
            type="password"
            value={confirmNewPassword}
            disabled={isLoading}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
        </div>
      </div>
      {/*
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
      secondaryAction={handleClose}
      secondaryActionLabel="Cancel"
      onClose={handleClose}
      onSubmit={onSubmit}
      body={bodyContent}
    />
  );
};

export default EditModal;
