import useDeeEmModal from "@/hooks/useDeeEmModal";

import MessageThreadPane from "@/components/messages/MessageThreadPane";

const DeeEmModal = () => {
  const deeEmModal = useDeeEmModal();

  if (!deeEmModal.isOpen || !deeEmModal.userId) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/75 px-4 backdrop-blur-sm"
      onClick={deeEmModal.onClose}
    >
      <div
        className="relative flex h-[min(82vh,720px)] w-full max-w-2xl flex-col overflow-hidden rounded-[32px] border border-neutral-800 bg-black shadow-[0_20px_80px_rgba(0,0,0,0.55)]"
        onClick={(event) => event.stopPropagation()}
      >
        <MessageThreadPane
          compact
          userId={deeEmModal.userId}
          onBack={deeEmModal.onClose}
        />
      </div>
    </div>
  );
};

export default DeeEmModal;
