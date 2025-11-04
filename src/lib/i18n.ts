import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      landing: {
        heroTitle: "These are the 3 Health Plans with the Best Cost-Benefit that Brazilians Most Seek in Open Enrollment When They Want to SAVE and Guarantee Full Coverage",
        heroSubtitle: "Tell us what you want most in your plan, and in less than 2 minutes we'll send you the best options for your profile. (100% Free)",
        heroTitleLp02: "Want to discover the health plans with the best cost-benefit for Brazilians during Open Enrollment?",
        heroSubtitleLp02: "Enter your Zip Code below, then your name and number so we can send you the best options for your profile in less than 2 minutes. (100% Free)",
        heroTitleLp03: "Looking for a health plan with the best cost-benefit for you and your family during Open Enrollment?",
        heroSubtitleLp03: "Enter your Zip Code below, then your name and number so we can send you the best options for your profile in less than 2 minutes. (100% Free)",
        conversational: {
          zip: "",
        },
        zipPrompt: "Enter your ZIP Code to quote plans",
        zipPlaceholder: "Enter your ZIP Code",
        zipButton: "I want to see the best plan for me.",
        zipButtonLoading: "Loading...",
        familyAlt: "Happy family protected by insurance",
      },
      form: {
        titles: {
          zip: "ZIP Code",
          contact: "Contact Information",
          thanks: "Thank you!",
        },
        conversational: {
          zip: "",
          name: "Now tell me your name.",
          phone: "What's your phone number?",
          survey: "What best represents your situation today?",
          email: "To finish, give me your main email.",
        },
        survey: {
          option1: "I want to save on my current plan",
          option2: "I don't have a plan and need coverage",
          option3: "I want to find an ideal plan for my family",
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
          consentRequired: "You must agree to receive messages to continue.",
        },
        consent: {
          message: "I authorize 2 Easy Insurance LLC to contact me via WhatsApp about health plans and services related to my request. I can cancel at any time",
          termsLink: "Terms of acceptance",
          modalTitle: "Messaging Terms – 2 Easy Insurance LLC",
          modalContent: "By submitting this form, I authorize 2 Easy Insurance LLC to contact me via WhatsApp about my health plan request and related services. Message frequency may vary. Carrier charges may apply. I can cancel at any time by replying \"STOP\". My consent is not a condition of purchase.",
          modalOk: "Ok",
          modalCancel: "Cancel",
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
        heroTitle: "Esses são os 3 Planos de Saúde com Melhor Custo-Benefício que Brasileiros Mais Procuram no Open Enrollment Quando Querem ECONOMIZAR e Garantir Cobertura Total",
        heroSubtitle: "Nos fale o que você mais quer no seu plano, e em menos de 2 minutos enviaremos as melhores opções para o seu perfil. (100% Gratuito)",
        heroTitleLp02: "Quer descobrir os planos de saúde com o melhor custo-benefício para brasileiros durante o Open Enrollment?",
        heroSubtitleLp02: "Coloque seu Zip Code abaixo, e depois seu nome e número para enviarmos as melhores opções para o seu perfil, em menos de 2 minutos. (100% Gratuito)",
        heroTitleLp03: "Procurando um plano de saúde com o melhor custo-benefício para você e para sua família durante o Open Enrollment?",
        heroSubtitleLp03: "Coloque seu Zip Code abaixo, e depois seu nome e número para enviarmos as melhores opções para o seu perfil, em menos de 2 minutos. (100% Gratuito)",
        conversational: {
          zip: "",
        },
        zipPrompt: "Digite seu ZIP Code para cotar os planos",
        zipPlaceholder: "Digite seu ZIP Code",
        zipButton: "Quero ver o melhor plano para mim.",
        zipButtonLoading: "Carregando...",
        familyAlt: "Família feliz protegida por um seguro",
      },
      form: {
        titles: {
          zip: "ZIP Code",
          contact: "Informações de contato",
          thanks: "Obrigado!",
        },
        conversational: {
          zip: "Me passe seu ZIP Code para cotarmos o melhor plano pra você.",
          name: "Como podemos te chamar?",
          phone: "Qual número podemos usar para enviar suas opções de personalizadas de plano?",
          survey: "O que mais representa sua situação hoje?",
          email: "Agora, só me fala seu melhor e-mail pra garantir que você receba tudo certinho.",
        },
        survey: {
          option1: "Quero economizar no meu plano atual",
          option2: "Estou sem plano e preciso de cobertura",
          option3: "Quero encontrar um plano ideal pra minha família",
        },
        messages: {
          success: "Nossa equipe está analisando agora mesmo suas respostas! E em até 2 minutos você receberá as melhores opções de plano para seu perfil.",
          submitError: "Não foi possível enviar o formulário. Tente novamente.",
          thankYouTitle: "Obrigado!",
          thankYouSubtitle: "Nossa equipe está analisando agora mesmo suas respostas! E em até 2 minutos você receberá as melhores opções de plano para seu perfil.",
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
          insurances: "Tipo deSeguro",
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
          consentRequired: "Você deve concordar em receber mensagens para continuar.",
        },
        consent: {
          message: "Autorizo a 2 Easy Insurance LLC a me contatar pelo WhatsApp sobre planos de saúde e serviços relacionados ao meu pedido. Posso cancelar a qualquer momento",
          termsLink: "Termos de aceite",
          modalTitle: "Termos de mensagens – 2 Easy Insurance LLC",
          modalContent: "Ao enviar este formulário, autorizo a 2 Easy Insurance LLC a entrar em contato comigo pelo WhatsApp sobre minha solicitação de plano de saúde e serviços relacionados. A frequência das mensagens pode variar. Podem ser aplicadas tarifas da operadora. Posso cancelar a qualquer momento respondendo \"STOP\". Meu consentimento não é condição para contratar.",
          modalOk: "Ok",
          modalCancel: "Cancelar",
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
        heroTitle: "Estos son los 3 Planes de Salud con Mejor Relación Calidad-Precio que los Brasileños Más Buscan en Open Enrollment Cuando Quieren AHORRAR y Garantizar Cobertura Total",
        heroSubtitle: "Díganos qué es lo que más desea en su plan, y en menos de 2 minutos le enviaremos las mejores opciones para su perfil. (100% Gratis)",
        heroTitleLp02: "¿Quieres descubrir los planes de salud con la mejor relación calidad-precio para brasileños durante Open Enrollment?",
        heroSubtitleLp02: "Ingresa tu Código ZIP abajo, luego tu nombre y número para enviarte las mejores opciones para tu perfil en menos de 2 minutos. (100% Gratis)",
        heroTitleLp03: "¿Buscas un plan de salud con la mejor relación calidad-precio para ti y tu familia durante Open Enrollment?",
        heroSubtitleLp03: "Ingresa tu Código ZIP abajo, luego tu nombre y número para enviarte las mejores opciones para tu perfil en menos de 2 minutos. (100% Gratis)",
       conversational: {
          zip: "",
        },
        zipPrompt: "Ingresa tu codigo ZIP para cotizar los planes",
        zipPlaceholder: "Ingresa tu codigo ZIP",
        zipButton: "Quiero ver el mejor plan para mí.",
        zipButtonLoading: "Cargando...",
        familyAlt: "Familia feliz protegida por un seguro",
      },
      form: {
        titles: {
          zip: "Codigo ZIP",
          contact: "Informacion de contacto",
          thanks: "Gracias!",
        },
        conversational: {
          zip: "",
          name: "Ahora dime tu nombre.",
          phone: "¿Cuál es tu teléfono?",
          survey: "¿Qué representa mejor tu situación hoy?",
          email: "Para finalizar, dame tu correo electrónico principal.",
        },
        survey: {
          option1: "Quiero ahorrar en mi plan actual",
          option2: "Estoy sin plan y necesito cobertura",
          option3: "Quiero encontrar un plan ideal para mi familia",
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
          consentRequired: "Debe aceptar recibir mensajes para continuar.",
        },
        consent: {
          message: "Autorizo a 2 Easy Insurance LLC a contactarme por WhatsApp sobre planes de salud y servicios relacionados con mi solicitud. Puedo cancelar en cualquier momento",
          termsLink: "Términos de aceptación",
          modalTitle: "Términos de mensajería – 2 Easy Insurance LLC",
          modalContent: "Al enviar este formulario, autorizo a 2 Easy Insurance LLC a contactarme por WhatsApp sobre mi solicitud de plan de salud y serviços relacionados. La frecuencia de los mensajes puede variar. Pueden aplicarse cargos del operador. Puedo cancelar en cualquier momento respondiendo \"STOP\". Mi consentimiento no es condición para contratar.",
          modalOk: "Ok",
          modalCancel: "Cancelar",
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

// Função para detectar o idioma do navegador e mapear para os idiomas suportados
const detectLanguage = (): string => {
  // Pega o idioma do navegador (ex: "pt-BR", "en-US", "es-ES")
  const browserLang = navigator.language || (navigator as any).userLanguage || "en";
  
  // Extrai apenas o código principal (ex: "pt-BR" -> "pt")
  const langCode = browserLang.split("-")[0].toLowerCase();
  
  // Mapeia os códigos para os idiomas suportados
  const languageMap: Record<string, string> = {
    "pt": "br",  // Português -> Português BR
    "es": "es",  // Espanhol -> Espanhol
    "en": "en",  // Inglês -> Inglês
  };
  
  // Retorna o idioma mapeado ou "en" como padrão
  return languageMap[langCode] || "en";
};

void i18n.use(initReactI18next).init({
  resources,
  lng: detectLanguage(), // Detecta automaticamente o idioma do navegador
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
