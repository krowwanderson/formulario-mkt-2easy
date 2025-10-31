import React from "react";
import { useTranslation } from "react-i18next";
import { CheckCircle2 } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import LanguageSwitcher from "@/components/LanguageSwitcher";

import logo from "@/assets/2easyicon.svg";
import family from "@/assets/family.svg";

import ambetterLogo from "@/assets/ambetter.svg";
import blueLogo from "@/assets/blue.svg";
import floridaLogo from "@/assets/florida.svg";
import molinaLogo from "@/assets/molina.png";
import oscarLogo from "@/assets/oscar.svg";
import deltaLogo from "@/assets/delta.svg";
import obamacareLogo from "@/assets/obamacare.svg";
import cigma from "@/assets/cigna.svg";

export interface LandingPageProps {
  zipValue: string;
  onZipChange: (value: string) => void;
  onSubmitZip: () => void;
  zipError?: string;
  isSubmitting?: boolean;
}

const partnerLogos = [
  { src: deltaLogo, alt: "Delta Dental logo" },
  { src: floridaLogo, alt: "Florida Blue logo" },
  { src: blueLogo, alt: "Blue California logo" },
  { src: ambetterLogo, alt: "Ambetter Health logo" },
  { src: molinaLogo, alt: "Molina Healthcare logo" },
  { src: oscarLogo, alt: "Oscar Health logo" },
  { src: obamacareLogo, alt: "Obamacare logo" },
  { src: cigma, alt: "Cigna logo" },
];

const LandingPage: React.FC<LandingPageProps> = ({
  zipValue,
  onZipChange,
  onSubmitZip,
  zipError,
  isSubmitting,
}) => {
  const { t } = useTranslation();
  const autoplay = React.useRef(
    Autoplay({ delay: 2500, stopOnInteraction: false })
  );

  const handleZipChange = (value: string) => {
    const sanitized = value.replace(/\D/g, "").slice(0, 5);
    onZipChange(sanitized);
  };

  const benefits = t("landing.bullets", {
    returnObjects: true,
  }) as string[];

  return (
    <div className="item flex min-h-screen flex-col justify-between bg-white">
      <header className="mx-auto flex max-md:flex-col h-20 w-full max-w-7xl items-center justify-between px-6 md:px-16 max-md:mt-5">
        <a
          href="https://2easyinsurance.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={logo} alt="2easy Insurance logo" className="h-10 w-auto" />
        </a>
        <LanguageSwitcher />
      </header>

      <main className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-6 py-6 md:flex-row md:items-center md:justify-between md:px-16 md:py-16">
        <section className="flex max-w-xl flex-col gap-10 pt-10 md:pt-0">
          <div>
            <h1 className="text-3xl font-bold text-[#461AA5] md:text-4xl">
              {t("landing.heroTitle")}
            </h1>
            <p className="mt-4 text-base text-[#2D2A45] md:text-lg">
              {t("landing.heroSubtitle")}
            </p>
          </div>

          <ul className="flex flex-col gap-3 text-sm text-[#2D2A45] md:text-base">
            {benefits.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-[#51C37A]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="rounded-2xl border border-[#E6E0F8] bg-[#F8F6FF] p-6 shadow-sm">
            <p className="text-sm font-semibold text-[#461AA5] md:text-base">
              {t("landing.zipPrompt")}
            </p>
            <form
              className="mt-4 flex flex-col gap-3 sm:flex-row"
              onSubmit={(event) => {
                event.preventDefault();
                onSubmitZip();
              }}
            >
              <div className="flex-1">
                <Input
                  type="text"
                  inputMode="numeric"
                  pattern="\d*"
                  value={zipValue}
                  onChange={(event) => handleZipChange(event.target.value)}
                  placeholder={t("landing.zipPlaceholder")}
                  maxLength={5}
                  className={`h-12 rounded-lg border-2 bg-white text-base shadow-sm placeholder:text-[#9C90CC] focus-visible:ring-[#461AA5] ${
                    zipError ? "border-red-500 focus-visible:ring-red-500" : ""
                  }`}
                />
                {zipError && (
                  <p className="mt-1 text-xs text-red-600" role="alert">
                    {zipError}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                className="h-12 rounded-lg bg-[#461AA5] px-6 text-base font-semibold hover:bg-[#37158A]"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? t("landing.zipButtonLoading")
                  : t("landing.zipButton")}
              </Button>
            </form>
          </div>
        </section>

        <aside className="flex w-full justify-center md:w-auto max-md:hidden">
          <img
            src={family}
            alt={t("landing.familyAlt")}
            className="max-h-[420px] w-full max-w-md object-contain"
          />
        </aside>
      </main>

      <footer className="mt-auto bg-[#461AA5] py-6">
        <div className="relative w-full overflow-hidden">
          <Carousel
            className="mx-auto w-full"
            opts={{ loop: true, align: "start" }}
            plugins={[autoplay.current]}
            onMouseEnter={autoplay.current.stop}
            onMouseLeave={autoplay.current.reset}
          >
            <CarouselContent className="items-center">
              {partnerLogos.concat(partnerLogos).map((logoData, index) => (
                <CarouselItem
                  key={`${logoData.alt}-${index}`}
                  className="basis-40 sm:basis-48 md:basis-52 lg:basis-60"
                >
                  <div className="flex h-16 items-center justify-center px-6">
                    <img
                      src={logoData.src}
                      alt={logoData.alt}
                      className="h-8 w-auto max-w-[120px] grayscale select-none md:h-10"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
