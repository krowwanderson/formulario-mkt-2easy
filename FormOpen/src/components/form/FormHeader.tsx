import React from "react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import logo from "@/assets/2easyicon.svg";

const FormHeader: React.FC = () => {
  return (
    <header className="w-full border-b border-[#E6E0F8] bg-white">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-4 px-6 py-4 items-center sm:flex-row sm:items-center sm:justify-between">
        <a href="https://2easyinsurance.com" target="_blank">
          <img src={logo} alt="2easy Insurance logo" className="h-10 w-auto" />
        </a>
        <LanguageSwitcher />
      </div>
    </header>
  );
};

export default FormHeader;
