import {
  useCallback,
  useEffect,
  useId,
  type MouseEvent,
  type ReactElement,
} from "react";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
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
  secondaryActionLabel?: string;
  secondaryAction?: () => void;
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
  secondaryActionLabel,
  secondaryAction,
  disabled,
}: ModalProps) => {
  const titleId = useId();

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

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }

    secondaryAction();
  }, [disabled, secondaryAction]);

  const handleKeyDown = useCallback(
    (event: ReactKeyboardEvent<HTMLDivElement>) => {
      if (event.key !== "Enter" || disabled) {
        return;
      }

      event.preventDefault();
      handleSubmit();
    },
    [disabled, handleSubmit],
  );

  const handleBackdropMouseDown = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (event.target !== event.currentTarget) {
        return;
      }

      handleClose();
    },
    [handleClose],
  );

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") {
        return;
      }

      handleClose();
    };

    window.addEventListener("keydown", handleEscapeKey);

    return () => {
      window.removeEventListener("keydown", handleEscapeKey);
    };
  }, [handleClose, isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      aria-labelledby={titleId}
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto bg-neutral-800/70 outline-none focus:outline-none"
      onKeyDown={handleKeyDown}
      onMouseDown={handleBackdropMouseDown}
      role="dialog"
    >
      <div className="relative w-full h-full my-6 lg:h-auto lg:w-3/6 lg:max-w-3xl">
        <div className="relative flex flex-col w-full h-full bg-black border rounded-lg shadow-lg outline-none focus:outline-none lg:h-auto">
          <div className="flex items-center justify-between p-10 rounded-t ">
            <h2 className="text-3xl font-semibold text-white" id={titleId}>
              {title}
            </h2>
            <button
              aria-label="Close modal"
              type="button"
              onClick={handleClose}
              className="p-1 ml-auto text-white transition border-0 rounded-full hover:bg-white/10"
            >
              <AiOutlineClose size={20} />
            </button>
          </div>
          <div className="relative flex-auto p-10">{body}</div>
          <div className="flex flex-col gap-2 p-10">
            {secondaryActionLabel && secondaryAction ? (
              <Button
                onClick={handleSecondaryAction}
                disabled={disabled}
                label={secondaryActionLabel}
                outline
                fullWidth
                large
              />
            ) : null}
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
