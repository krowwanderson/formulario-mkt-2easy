import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";

import { cn } from "@/lib/utils";

type CarouselApi = EmblaCarouselType;
type CarouselProps = React.HTMLAttributes<HTMLDivElement> & {
  opts?: EmblaOptionsType;
  plugins?: Parameters<typeof useEmblaCarousel>[1];
  orientation?: "horizontal" | "vertical";
};

type CarouselContextValue = {
  carouselRef: (node?: HTMLElement | null | undefined) => void;
  api: CarouselApi | undefined;
  orientation: "horizontal" | "vertical";
};

const CarouselContext = React.createContext<CarouselContextValue | null>(null);

const useCarouselContext = () => {
  const context = React.useContext(CarouselContext);
  if (!context) {
    throw new Error("Carousel components must be wrapped in <Carousel />");
  }
  return context;
};

export const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  (
    {
      orientation = "horizontal",
      opts,
      plugins,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        axis: orientation === "horizontal" ? "x" : "y",
        ...opts,
      },
      plugins
    );

    return (
      <CarouselContext.Provider
        value={
          {
            carouselRef,
            api,
            orientation,
          } as CarouselContextValue
        }
      >
        <div
          ref={ref}
          className={cn("relative w-full", className)}
          data-orientation={orientation}
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    );
  }
);
Carousel.displayName = "Carousel";

export const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { carouselRef, orientation } = useCarouselContext();

  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        ref={ref}
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-2" : "-mt-2 flex-col",
          className
        )}
        data-orientation={orientation}
        {...props}
      >
        {React.Children.map(children, (child) => child)}
      </div>
    </div>
  );
});
CarouselContent.displayName = "CarouselContent";

export const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarouselContext();
  return (
    <div
      ref={ref}
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-2" : "pt-2",
        className
      )}
      {...props}
    />
  );
});
CarouselItem.displayName = "CarouselItem";
