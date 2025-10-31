import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/**
 * Props para o PhoneInputField. Recebe valor controlado e trata a formatação.
 */
export interface PhoneInputFieldProps {
  id: string;
  label: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  error?: string;
  className?: string;
}

/**
 * Formata uma sequência de dígitos no padrão de telefone dos EUA.
 * O formato vai evoluindo conforme mais dígitos são digitados,
 * melhorando a usabilidade:contentReference[oaicite:2]{index=2}.
 */
const formatPhoneNumber = (value: string): string => {
  const digits = value.replace(/\D/g, "");
  if (digits.length === 0) return "";

  if (digits.length <= 3) {
    return `(${digits}`;
  }
  if (digits.length <= 6) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  }
  // limita a 10 dígitos padrão
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
};

/**
 * Campo de entrada com máscara para telefone. Usa `onChange` para
 * aplicar a formatação e repassar o valor formatado ao pai:contentReference[oaicite:3]{index=3}.
 */
const PhoneInputField: React.FC<PhoneInputFieldProps> = ({
  id,
  label,
  value,
  placeholder,
  onChange,
  error,
  className,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const formattedValue = formatPhoneNumber(rawValue);
    onChange(formattedValue);
  };

  const inputClasses = `${
    error ? "border-red-500 ring-1 ring-red-500 focus-visible:ring-red-500" : ""
  } ${className ?? ""}`;

  return (
    <div className="flex flex-col gap-1 w-full">
      <Label htmlFor={id}>{label}</Label>
      {/* Mantém o tipo tel para abrir teclado numérico em dispositivos móveis */}
      <Input
        id={id}
        type="tel"
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
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

export default PhoneInputField;
