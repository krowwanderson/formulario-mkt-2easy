import React from "react";
import { useTranslation } from "react-i18next";
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
  variant?: "default" | "lp02" | "lp03";
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
  variant = "default",
}) => {
  const { t } = useTranslation();
  const autoplay = React.useRef(
    Autoplay({ delay: 2500, stopOnInteraction: false })
  );

  const handleZipChange = (value: string) => {
    const sanitized = value.replace(/\D/g, "").slice(0, 5);
    onZipChange(sanitized);
  };

  // Definir as chaves de tradução baseado na variant
  const heroTitleKey = variant === "lp02" 
    ? "landing.heroTitleLp02" 
    : variant === "lp03" 
    ? "landing.heroTitleLp03" 
    : "landing.heroTitle";

  const heroSubtitleKey = variant === "lp02" 
    ? "landing.heroSubtitleLp02" 
    : variant === "lp03" 
    ? "landing.heroSubtitleLp03" 
    : "landing.heroSubtitle";

  return (
    <div className="item flex min-h-screen flex-col justify-between bg-white">
      <header className="mx-auto flex max-md:flex-col h-20 w-full max-w-7xl items-center justify-between px-6 md:px-16 max-md:mt-5">
        <a
          href="#"
          rel="noreferrer"
        >
          <img src={logo} alt="2easy Insurance logo" className="h-10 w-auto" />
        </a>
        <LanguageSwitcher />
      </header>

      <main className="mx-auto flex w-full max-w-2xl flex-col items-center justify-center px-6 py-12 md:py-16">
        {/* Textos no topo */}
        <div className="w-full max-w-2xl space-y-6 text-center mb-8">
          <h2 
            className="text-1xl font-bold text-[#461AA5] md:text-3xl leading-relaxed"
            dangerouslySetInnerHTML={{ 
              __html: t(heroTitleKey)
                .replace(/os 3 Planos de Saúde/g, '<span class="underline decoration-2">os 3 Planos de Saúde</span>')
                .replace(/Custo-Benefício/g, '<span class="underline decoration-2">Custo-Benefício</span>')
                .replace(/ECONOMIZAR/g, '<span class="underline decoration-2">ECONOMIZAR</span>')
                .replace(/Cobertura Total/g, '<span class="underline decoration-2">Cobertura Total</span>')
                .replace(/the 3 Health Plans/g, '<span class="underline decoration-2">the 3 Health Plans</span>')
                .replace(/Cost-Benefit/g, '<span class="underline decoration-2">Cost-Benefit</span>')
                .replace(/SAVE/g, '<span class="underline decoration-2">SAVE</span>')
                .replace(/Full Coverage/g, '<span class="underline decoration-2">Full Coverage</span>')
                .replace(/los 3 Planes de Salud/g, '<span class="underline decoration-2">los 3 Planes de Salud</span>')
                .replace(/Relación Calidad-Precio/g, '<span class="underline decoration-2">Relación Calidad-Precio</span>')
                .replace(/AHORRAR/g, '<span class="underline decoration-2">AHORRAR</span>')
                .replace(/planos de saúde com o melhor custo-benefício/g, '<span class="underline decoration-2">planos de saúde com o melhor custo-benefício</span>')
                .replace(/health plans with the best cost-benefit/g, '<span class="underline decoration-2">health plans with the best cost-benefit</span>')
                .replace(/planes de salud con la mejor relación calidad-precio/g, '<span class="underline decoration-2">planes de salud con la mejor relación calidad-precio</span>')
                .replace(/plano de saúde com o melhor custo-benefício/g, '<span class="underline decoration-2">plano de saúde com o melhor custo-benefício</span>')
                .replace(/health plan with the best cost-benefit/g, '<span class="underline decoration-2">health plan with the best cost-benefit</span>')
                .replace(/plan de salud con la mejor relación calidad-precio/g, '<span class="underline decoration-2">plan de salud con la mejor relación calidad-precio</span>')
            }}
          />
          
          <p 
            className="text-base text-[#2D2A45] md:text-lg"
            dangerouslySetInnerHTML={{ __html: t(heroSubtitleKey) }}
          />
        </div>

        {/* Título do input */}
        <p className="text-lg text-primary text-center mb-6">
          {t("landing.conversational.zip")}
        </p>

        {/* Input ZIP CODE centralizado */}
        <div className="w-full max-w-md">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              onSubmitZip();
            }}
          >
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
              <p className="mt-1 text-xs text-red-600 text-center" role="alert">
                {zipError}
              </p>
            )}
            <Button
              type="submit"
              className="w-full mt-4 h-12 rounded-lg bg-[#461AA5] text-base font-semibold hover:bg-[#37158A]"
              disabled={isSubmitting || zipValue.length !== 5}
            >
              {isSubmitting
                ? t("landing.zipButtonLoading")
                : t("landing.zipButton")}
            </Button>
          </form>
        </div>
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
