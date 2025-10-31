import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface InputFieldProps {
  id: string;
  label: string;
  type?: React.HTMLInputTypeAttribute;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  /** Mensagem de erro opcional */
  error?: string;
  /** Classes extras para customização */
  className?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  type = "text",
  value,
  placeholder,
  onChange,
  error,
  className,
}) => {
  const inputClasses = `${
    error ? "border-red-500 ring-1 ring-red-500 focus-visible:ring-red-500" : ""
  } ${className ?? ""}`;

  return (
    <div className="flex flex-col gap-1 w-full">
      <Label htmlFor={id}>{label}</Label>
      {/* O Input do shadcn/ui recebe type e placeholder conforme exemplo:contentReference[oaicite:2]{index=2} */}
      <Input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={inputClasses.trim() || undefined}
      />
      {error && (
        <span className="text-red-600 text-xs mt-1" role="alert">
          {error}
        </span>
      )}
    </div>
  );
};

export default InputField;
