// Utilitário para o Facebook Pixel
declare global {
  interface Window {
    fbq: (
      action: string,
      event: string,
      params?: Record<string, unknown>
    ) => void;
  }
}

/**
 * Dispara um evento do Facebook Pixel
 */
export const trackFacebookPixel = (
  event: string,
  params?: Record<string, unknown>
): void => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", event, params);
  }
};

/**
 * Dispara o evento Lead quando o formulário é enviado com sucesso
 */
export const trackLead = (formData?: {
  firstName?: string;
  lastName?: string;
  email?: string;
  zipcode?: string;
}): void => {
  trackFacebookPixel("Lead", {
    content_name: "Insurance Form Submission",
    content_category: "Lead Generation",
    value: 0.0,
    currency: "USD",
    ...(formData && {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      zipcode: formData.zipcode,
    }),
  });
};
