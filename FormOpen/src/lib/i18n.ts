import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      landing: {
        heroTitle: "Find the insurance plan that connects with you!",
        heroSubtitle:
          "Compare offers in just a few clicks and discover the ideal plan with experts in protection and savings.",
        bullets: [
          "Compare quotes from several insurance providers.",
          "Get insurance prices quickly.",
          "Choose the plan that best fits your budget.",
        ],
        zipPrompt: "Enter your ZIP Code to quote plans",
        zipPlaceholder: "Enter your ZIP Code",
        zipButton: "Start Quote",
        zipButtonLoading: "Loading...",
        familyAlt: "Happy family protected by insurance",
      },
      form: {
        titles: {
          zip: "ZIP Code",
          contact: "Contact Information",
          thanks: "Thank you!",
        },
        messages: {
          success: "We will contact you soon.",
          submitError: "Failed to submit the form. Please try again.",
          thankYouTitle: "Thank you for sharing your information!",
          thankYouSubtitle: "We will reach out soon.",
          whatsappInvite:
            "One of our agents is preparing a tailored quote and will contact you shortly.",
          restart: "Send another response",
        },
        labels: {
          zip: "ZIP Code",
          firstName: "First name",
          lastName: "Last name",
          countryCode: "Country code (IDD)",
          phone: "Phone number",
          email: "Email",
        },
        placeholders: {
          zip: "12345",
          firstName: "Enter your first name",
          lastName: "Enter your last name",
          phone: "(123) 456-7890",
          email: "you@example.com",
          countryCode: "Select a country code",
        },
        buttons: {
          back: "Back",
          next: "Next",
          submit: "Submit",
          submitting: "Sending...",
          whatsapp: "Go to WhatsApp",
        },
        header: {
          title: "Quote Form",
        },
        footer: {
          privacy: "Privacy Policy",
          terms: "Terms of Use",
          notice: "All rights reserved © 2025 2easy Insurance",
        },
        insurance: {
          title: "Which insurance products would you like to quote?",
          options: {
            "1002": "Life",
            "1006": "Health",
            "1003": "Vision / Dental",
            "1016": "Auto",
            "1008": "Other Insurance",
          },
        },
        summary: {
          title: "Referral details",
          zip: "ZIP Code",
          insurances: "Insurance products",
          referral: "Referral",
          referralId: "Referral ID",
          referralCode: "Referral code",
          vendorCode: "Vendor code",
        },
        errors: {
          zipRequired: "ZIP Code is required.",
          zipInvalid: "ZIP Code must be exactly 5 digits.",
          firstNameRequired: "First name is required.",
          lastNameRequired: "Last name is required.",
          countryCodeRequired: "Select a country code.",
          emailRequired: "Email is required.",
          emailInvalid: "Please enter a valid email address.",
          phoneRequired: "Phone number is required.",
          phoneLength:
            "Phone number must have {{range}} digits for the selected country.",
          insuranceRequired: "Select at least one insurance product.",
        },
        countryOptions: {
          usca: "US / Canada (+1)",
          mexico: "Mexico (+52)",
          brazil: "Brazil (+55)",
        },
      },
    },
  },
  br: {
    translation: {
      landing: {
        heroTitle: "Encontre o seguro mais conectado com você!",
        heroSubtitle:
          "Compare ofertas em poucos cliques e descubra o plano ideal com quem entende de proteção e economia.",
        bullets: [
          "Compare cotações de diversas seguradoras.",
          "Obtenha preços de seguro rapidamente.",
          "Escolha o plano que cabe no seu bolso.",
        ],
        zipPrompt: "Digite seu ZIP Code para cotar os planos",
        zipPlaceholder: "Digite seu ZIP Code",
        zipButton: "Iniciar cotação",
        zipButtonLoading: "Carregando...",
        familyAlt: "Família feliz protegida por um seguro",
      },
      form: {
        titles: {
          zip: "ZIP Code",
          contact: "Informações de contato",
          thanks: "Obrigado!",
        },
        messages: {
          success: "Entraremos em contato em breve.",
          submitError: "Não foi possível enviar o formulário. Tente novamente.",
          thankYouTitle: "Obrigado por compartilhar suas informações!",
          thankYouSubtitle: "Entraremos em contato em breve.",
          whatsappInvite:
            "Um de nossos agentes está preparando uma cotação personalizada e falará com você em breve.",
          restart: "Enviar outra resposta",
        },
        labels: {
          zip: "ZIP Code",
          firstName: "Nome",
          lastName: "Sobrenome",
          countryCode: "Código do país (DDI)",
          phone: "Telefone",
          email: "Email",
        },
        placeholders: {
          zip: "12345",
          firstName: "Digite seu nome",
          lastName: "Digite seu sobrenome",
          phone: "(11) 91234-5678",
          email: "voce@exemplo.com",
          countryCode: "Selecione um código do país",
        },
        buttons: {
          back: "Voltar",
          next: "Próximo",
          submit: "Enviar",
          submitting: "Enviando...",
          whatsapp: "Ir para WhatsApp",
        },
        header: {
          title: "Formulário de Cotação",
        },
        footer: {
          privacy: "Política de Privacidade",
          terms: "Termos de Uso",
          notice: "Todos os direitos reservados © 2025 2easy Insurance",
        },
        summary: {
          title: "Dados do atendimento",
          zip: "ZIP Code",
          insurances: "Seguros desejados",
          referral: "Indicador",
          referralId: "ID do indicador",
          referralCode: "Código de referral",
          vendorCode: "Código do vendedor",
        },
        errors: {
          zipRequired: "ZIP Code é obrigatório.",
          zipInvalid: "ZIP Code deve ter exatamente 5 dígitos.",
          firstNameRequired: "Nome é obrigatório.",
          lastNameRequired: "Sobrenome é obrigatório.",
          countryCodeRequired: "Selecione um código do país.",
          emailRequired: "Email é obrigatório.",
          emailInvalid: "Digite um email válido.",
          phoneRequired: "Telefone é obrigatório.",
          phoneLength:
            "O telefone deve ter {{range}} dígitos para o país selecionado.",
          insuranceRequired: "Selecione pelo menos um seguro.",
        },
        countryOptions: {
          usca: "EUA / Canadá (+1)",
          mexico: "México (+52)",
          brazil: "Brasil (+55)",
        },
        insurance: {
          title: "Quais seguros voce deseja cotar?",
          options: {
            "1002": "Vida",
            "1006": "Saude",
            "1003": "Visao / Odontologico",
            "1016": "Automovel",
            "1008": "Outros Seguros",
          },
        },
      },
    },
  },
  es: {
    translation: {
      landing: {
        heroTitle: "Encuentra el seguro que se conecta contigo!",
        heroSubtitle:
          "Compara ofertas en pocos clics y descubre el plan ideal con expertos en proteccion y ahorro.",
        bullets: [
          "Compara cotizaciones de varias aseguradoras.",
          "Obten precios de seguro rapidamente.",
          "Elige el plan que mejor se ajuste a tu presupuesto.",
        ],
        zipPrompt: "Ingresa tu codigo ZIP para cotizar los planes",
        zipPlaceholder: "Ingresa tu codigo ZIP",
        zipButton: "Iniciar cotizacion",
        zipButtonLoading: "Cargando...",
        familyAlt: "Familia feliz protegida por un seguro",
      },
      form: {
        titles: {
          zip: "Codigo ZIP",
          contact: "Informacion de contacto",
          thanks: "Gracias!",
        },
        messages: {
          success: "Nos pondremos en contacto pronto.",
          submitError: "No se pudo enviar el formulario. Intentalo nuevamente.",
          thankYouTitle: "Gracias por compartir tu informacion!",
          thankYouSubtitle: "Nos comunicaremos contigo pronto.",
          whatsappInvite:
            "Un agente está preparando una cotización personalizada y se comunicará contigo en breve.",
          restart: "Enviar otra respuesta",
        },
        labels: {
          zip: "Codigo ZIP",
          firstName: "Nombre",
          lastName: "Apellido",
          countryCode: "Codigo de pais (IDD)",
          phone: "Telefono",
          email: "Correo electronico",
        },
        placeholders: {
          zip: "12345",
          firstName: "Ingresa tu nombre",
          lastName: "Ingresa tu apellido",
          phone: "(55) 1234-5678",
          email: "tucorreo@ejemplo.com",
          countryCode: "Selecciona un codigo de pais",
        },
        buttons: {
          back: "Volver",
          next: "Siguiente",
          submit: "Enviar",
          submitting: "Enviando...",
          whatsapp: "Ir a WhatsApp",
        },
        header: {
          title: "Formulario de Cotizacion",
        },
        footer: {
          privacy: "Política de Privacidad",
          terms: "Términos de Uso",
          notice: "Todos los derechos reservados © 2025 2easy Insurance",
        },
        summary: {
          title: "Datos del agente",
          zip: "Codigo ZIP",
          insurances: "Seguros seleccionados",
          referral: "Referido",
          referralId: "ID del referido",
          referralCode: "Codigo de referencia",
          vendorCode: "Codigo del vendedor",
        },
        errors: {
          zipRequired: "El codigo ZIP es obligatorio.",
          zipInvalid: "El codigo ZIP debe tener exactamente 5 digitos.",
          firstNameRequired: "El nombre es obligatorio.",
          lastNameRequired: "El apellido es obligatorio.",
          countryCodeRequired: "Selecciona un codigo de pais.",
          emailRequired: "El correo electronico es obligatorio.",
          emailInvalid: "Ingresa un correo electronico valido.",
          phoneRequired: "El telefono es obligatorio.",
          phoneLength:
            "El telefono debe tener {{range}} digitos para el pais seleccionado.",
          insuranceRequired: "Selecciona al menos un seguro.",
        },
        countryOptions: {
          usca: "EUA / Canada (+1)",
          mexico: "Mexico (+52)",
          brazil: "Brasil (+55)",
        },
        insurance: {
          title: "Que seguros deseas cotizar?",
          options: {
            "1002": "Vida",
            "1006": "Salud",
            "1003": "Vision / Dental",
            "1016": "Automovil",
            "1008": "Otros Seguros",
          },
        },
      },
    },
  },
};

void i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
