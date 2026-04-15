import { useCallback, type ReactElement } from "react";
import type { KeyboardEvent } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Button from "./Button";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: ReactElement;
  footer?: ReactElement;
  actionLabel: string;
  disabled?: boolean;
}

const Modal = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
}: ModalProps) => {
  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }

    onClose();
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [disabled, onSubmit]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key !== "Enter" || disabled) {
        return;
      }

      event.preventDefault();
      handleSubmit();
    },
    [disabled, handleSubmit],
  );

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none bg-neutral-800/70 focus:outline-none"
      onKeyDown={handleKeyDown}
    >
      <div className="relative w-full h-full my-6 lg:h-auto lg:w-3/6 lg:max-w-3xl">
        <div className="relative flex flex-col w-full h-full bg-black border rounded-lg shadow-lg outline-none focus:outline-none lg:h-auto">
          <div className="flex items-center justify-between p-10 rounded-t ">
            <h2 className="text-3xl font-semibold text-white">{title}</h2>
            <button
              type="button"
              onClick={handleClose}
              className="p-1 ml-auto text-white transition border-0 rounded-full hover:bg-white/10"
            >
              <AiOutlineClose size={20} />
            </button>
          </div>
          <div className="relative flex-auto p-10">{body}</div>
          <div className="flex flex-col gap-2 p-10">
            <Button
              onClick={handleSubmit}
              disabled={disabled}
              label={actionLabel}
              secondary
              fullWidth
              large
            />
          </div>
          {footer}
        </div>
      </div>
    </div>
  );
};

export default Modal;
