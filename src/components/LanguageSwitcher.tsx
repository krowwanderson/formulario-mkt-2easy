import React from "react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

import flagUs from "@/assets/united-states.svg";
import flagBrazil from "@/assets/brazil.svg";
import flagSpain from "@/assets/spain.svg";

const languages = [
  { code: "en", label: "English", flag: flagUs },
  { code: "br", label: "Português", flag: flagBrazil },
  { code: "es", label: "Español", flag: flagSpain },
];

interface LanguageSwitcherProps {
  className?: string;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className }) => {
  const { i18n } = useTranslation();

  const changeLanguage = (code: string) => {
    if (i18n.language !== code) {
      void i18n.changeLanguage(code);
    }
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {languages.map((lang) => {
        const isActive =
          i18n.language === lang.code ||
          i18n.language.startsWith(`${lang.code}-`);

        return (
          <button
            key={lang.code}
            type="button"
            onClick={() => changeLanguage(lang.code)}
            className={cn(
              "flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold transition-colors",
              isActive
                ? "border-[#461AA5] bg-[#461aa5] text-white shadow"
                : "border-[#E6E0F8] bg-white text-[#461AA5] hover:bg-[#F3EDFF]"
            )}
            aria-pressed={isActive}
          >
            <img src={lang.flag} alt="" className="h-4 w-4" />
            <span>{lang.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default LanguageSwitcher;
