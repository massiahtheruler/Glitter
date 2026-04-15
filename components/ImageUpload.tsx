import Image from "next/image";
import { MouseEvent, useCallback, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FiImage } from "react-icons/fi";
import { MdOutlineAdd } from "react-icons/md";
import { useDropzone } from "react-dropzone";

interface ImageUploadProps {
  onChange: (base64: string) => void;
  label: string;
  value?: string;
  disabled?: boolean;
}

const ImageUpload = ({ onChange, label, value, disabled }: ImageUploadProps) => {
  const [base64, setBase64] = useState(value);

  useEffect(() => {
    setBase64(value);
  }, [value]);

  const handleChange = useCallback(
    (base64: string) => {
      onChange(base64);
    },
    [onChange],
  );

  const handleDrop = useCallback(
    (files: File[]) => {
      const file = files[0];

      if (!file) {
        return;
      }

      const reader = new FileReader();

      reader.onload = () => {
        const result = reader.result;

        if (typeof result !== "string") {
          return;
        }

        setBase64(result);
        handleChange(result);
      };

      reader.readAsDataURL(file);
    },
    [handleChange],
  );

  const handleRemove = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      event.stopPropagation();
      setBase64("");
      handleChange("");
    },
    [handleChange],
  );

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDrop: handleDrop,
    disabled,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
  });

  return (
    <div
      {...getRootProps({
        className:
          `group w-full p-1 text-white transition ${
            disabled
              ? "cursor-not-allowed opacity-60"
              : "cursor-pointer"
          }`,
      })}
    >
      <input {...getInputProps()} />
      {base64 ? (
        <div className="relative flex items-center justify-center">
          <Image
            src={base64}
            height={100}
            width={100}
            unoptimized
            alt="uploaded image"
            className="rounded-xl object-cover"
          />
          <button
            type="button"
            onClick={handleRemove}
            disabled={disabled}
            aria-label="Remove image"
            className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/75 text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
          >
            <AiOutlineClose size={16} />
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-center lg:justify-start">
          <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-neutral-700 bg-neutral-900/80 transition duration-300 group-hover:border-sky-500/40 group-hover:bg-neutral-900 group-hover:shadow-[0_0_24px_rgba(56,189,248,0.14)]">
            <FiImage size={24} className="text-neutral-200" />
            <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-sky-500 text-white shadow-[0_0_0_3px_rgba(10,10,10,0.95)]">
              <MdOutlineAdd size={16} />
            </span>
          </div>
          <div className="ml-3 min-w-0 text-left max-[500px]:hidden">
            <p className="text-sm font-medium text-neutral-200 opacity-0 transition duration-300 group-hover:translate-x-0.5 group-hover:opacity-100">
              {label}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
