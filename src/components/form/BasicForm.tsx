import React, { useMemo, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import InputField from "./InputField";
import FormHeader from "./FormHeader";
import logo from "@/assets/final.png";
import { trackLead } from "@/utils/facebookPixel";


interface FormData {
  zip: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneCode: string;
  phone: string;
  insuranceId: string | null;
  consentToMessages: boolean;
  survey: string; // Novo campo
}

type FormErrors = Partial<Record<keyof FormData, string>>;

type PhoneConfig = {
  minDigits: number;
  maxDigits: number;
  format: (digits: string) => string;
  placeholder: string;
};

const formatUsCaPhone = (digits: string): string => {
  if (digits.length === 0) return "";
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  }
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
};

const PHONE_CONFIG: Record<string, PhoneConfig> = {
  "+1": {
    minDigits: 10,
    maxDigits: 10,
    format: formatUsCaPhone,
    placeholder: "(123) 456-7890",
  },
};

const getPhoneConfig = (code: string): PhoneConfig =>
  PHONE_CONFIG[code] ?? PHONE_CONFIG["+1"];

const formatPhoneNumber = (digits: string, code: string): string => {
  const config = getPhoneConfig(code);
  return config.format(digits);
};

interface BasicFormProps {
  initialZip?: string;
  startAtContact?: boolean;
  onReturnToLanding?: () => void;
  referralName?: string;
  agentId?: string;
  referralCode?: string | null;
  vendorCode?: string | null;
}

const BasicForm: React.FC<BasicFormProps> = ({
  initialZip = "",
  startAtContact = false,
  onReturnToLanding,
  referralName: _referralName,
  referralCode: _referralCode,
  vendorCode,
}) => {
  const { t, i18n } = useTranslation();

  // Mensagens conversacionais para cada step - usando tradução
  const conversationalMessages = useMemo(() => {
    return {
      0: t("form.conversational.zip"),
      1: t("form.conversational.name"),
      2: t("form.conversational.phone"),
      3: t("form.conversational.survey"), // Novo
      4: t("form.conversational.email"),
    };
  }, [t, i18n.language]); // Adicionar dependências para re-traduzir quando mudar idioma

  const initialStep = startAtContact ? 1 : 0;
  const [formData, setFormData] = useState<FormData>({
    zip: initialZip,
    firstName: "",
    lastName: "",
    email: "",
    phoneCode: "+1",
    phone: "",
    insuranceId: "1006",
    consentToMessages: true,
    survey: "", // Novo campo
  });

  const [currentStep, setCurrentStep] = useState(initialStep);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const emailRegex = /^[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}$/;
  const phoneConfigForValidation = getPhoneConfig(formData.phoneCode);
  const sanitizedPhoneForValidation = formData.phone.replace(/\D/g, "");

  const isCurrentStepValid = useMemo(() => {
    switch (currentStep) {
      case 0:
        return /^\d{5}$/.test(formData.zip.trim());
      case 1:
        return Boolean(
          formData.firstName.trim() && formData.lastName.trim()
        );
      case 2:
        return (
          sanitizedPhoneForValidation.length >= phoneConfigForValidation.minDigits &&
          sanitizedPhoneForValidation.length <= phoneConfigForValidation.maxDigits
        );
      case 3:
        return Boolean(formData.survey.trim()); // Validação do survey
      case 4:
        return Boolean(
          formData.email.trim() && emailRegex.test(formData.email.trim())
        );
      default:
        return false;
    }
  }, [currentStep, formData, sanitizedPhoneForValidation, phoneConfigForValidation, emailRegex]);

  const handleFieldChange = (field: keyof FormData, value: string) => {
    const getPhoneLengthError = (
      digits: string,
      code: string
    ): string | undefined => {
      if (!digits) {
        return undefined;
      }

      const config = getPhoneConfig(code);
      if (
        digits.length >= config.minDigits &&
        digits.length <= config.maxDigits
      ) {
        return undefined;
      }

      const rangeLabel =
        config.minDigits === config.maxDigits
          ? `${config.minDigits}`
          : `${config.minDigits}-${config.maxDigits}`;

      return t("form.errors.phoneLength", { range: rangeLabel });
    };

    let nextValue = value;

    if (field === "zip") {
      nextValue = value.replace(/\D/g, "").slice(0, 5);
    }

    if (field === "phone") {
      const config = getPhoneConfig(formData.phoneCode);
      const digits = value.replace(/\D/g, "").slice(0, config.maxDigits);
      nextValue = formatPhoneNumber(digits, formData.phoneCode);

      const phoneLengthError = getPhoneLengthError(digits, formData.phoneCode);
      setErrors((prev) => {
        const next = { ...prev };
        if (phoneLengthError) {
          next.phone = phoneLengthError;
        } else {
          delete next.phone;
        }
        return next;
      });
    }

    setFormData((prev) => ({ ...prev, [field]: nextValue }));
  };

  const resetMessages = () => {
    setSuccessMessage("");
    setErrorMessage("");
  };

  const stepValidation = (stepToValidate: number): FormErrors => {
    const validationErrors: FormErrors = {};

    switch (stepToValidate) {
      case 0:
        if (!formData.zip.trim()) {
          validationErrors.zip = t("form.errors.zipRequired");
        } else if (!/^\d{5}$/.test(formData.zip.trim())) {
          validationErrors.zip = t("form.errors.zipInvalid");
        }
        break;
      case 1:
        if (!formData.firstName.trim()) {
          validationErrors.firstName = t("form.errors.firstNameRequired");
        }
        if (!formData.lastName.trim()) {
          validationErrors.lastName = t("form.errors.lastNameRequired");
        }
        break;
      case 2:
        const phoneConfig = getPhoneConfig(formData.phoneCode);
        const sanitizedPhone = formData.phone.replace(/\D/g, "");
        if (!sanitizedPhone) {
          validationErrors.phone = t("form.errors.phoneRequired");
        } else if (
          sanitizedPhone.length < phoneConfig.minDigits ||
          sanitizedPhone.length > phoneConfig.maxDigits
        ) {
          const rangeLabel =
            phoneConfig.minDigits === phoneConfig.maxDigits
              ? `${phoneConfig.minDigits}`
              : `${phoneConfig.minDigits}-${phoneConfig.maxDigits}`;
          validationErrors.phone = t("form.errors.phoneLength", {
            range: rangeLabel,
          });
        }
        break;
      case 3:
        // Survey não precisa validação pois é seleção direta
        break;
      case 4:
        if (!formData.email.trim()) {
          validationErrors.email = t("form.errors.emailRequired");
        } else if (!/^[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(formData.email)) {
          validationErrors.email = t("form.errors.emailInvalid");
        }
        break;
      default:
        break;
    }

    return validationErrors;
  };

  const goToStep = (nextStep: number) => {
    setCurrentStep(nextStep);
    setErrors({});
  };

  const handleNext = () => {
    resetMessages();
    const validationErrors = stepValidation(currentStep);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    goToStep(currentStep + 1);
  };

  const handleBack = () => {
    resetMessages();
    if (currentStep === initialStep) {
      if (startAtContact && onReturnToLanding) {
        onReturnToLanding();
        return;
      }
      if (currentStep === 0) return;
    }
    goToStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    resetMessages();
    const validationErrors = stepValidation(currentStep);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      if (i18n.language !== "en") {
        const baseUrl = "https://admin.2easyinsurance.com/api/post/lead";
        const params = {
          parameters: {
            firstname: formData.firstName.trim(),
            lastname: formData.lastName.trim(),
            language: i18n.language,
            phone: formData.phone.replace(/\D/g, ""),
            phone_code: formData.phoneCode,
            email: formData.email.trim(),
            zipcode: formData.zip,
            insurance_type_id: formData.insuranceId,
            referral_code: "qoZ6fJaARbzDf2x",
            ...(vendorCode ? { campaign_id: vendorCode } : {}),
          },
        };

        await axios.post(baseUrl, params);
      }
      
      const webhookUrl = "https://primary-production-2441.up.railway.app/webhook/site_campanha";
      const webhookPayload = {
        firstname: formData.firstName.trim(),
        lastname: formData.lastName.trim(),
        language: i18n.language,
        phone: formData.phone.replace(/\D/g, ""),
        phone_code: formData.phoneCode,
        email: formData.email.trim(),
        zipcode: formData.zip,
        insurance_type_id: formData.insuranceId,
        referral_code: "qoZ6fJaARbzDf2x",
        consent_to_messages: true,
        pesquisa: formData.survey, // Novo campo
        ...(vendorCode ? { campaign_id: vendorCode } : {}),
      };
      
      axios.post(webhookUrl, webhookPayload).catch((error) => {
        console.warn("Webhook failed (non-critical):", error);
      });
      
      trackLead({
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        zipcode: formData.zip,
      });
      
      setSuccessMessage(t("form.messages.success"));
      goToStep(5); // Atualizar para step 5
      setFormData({
        zip: "",
        firstName: "",
        lastName: "",
        email: "",
        phoneCode: "+1",
        phone: "",
        insuranceId: "1006",
        consentToMessages: true,
        survey: "", // Reset survey
      });
    } catch (error: unknown) {
      console.error("Error submitting form:", error);
      setErrorMessage(t("form.messages.submitError"));
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // ZIP
        return (
          <div className="space-y-4">
            <p className="text-lg text-primary text-center mb-6">
              {conversationalMessages[0]}
            </p>
            <InputField
              id="zip"
              label=""
              value={formData.zip}
              placeholder={t("form.placeholders.zip")}
              onChange={(value) => handleFieldChange("zip", value)}
              error={errors.zip}
            />
          </div>
        );

      case 1: // Nome/Sobrenome
        return (
          <div className="space-y-4">
            <p className="text-lg text-primary text-center mb-6">
              {conversationalMessages[1]}
            </p>
            <div className="grid w-full gap-4 md:grid-cols-2">
              <InputField
                id="firstName"
                label=""
                value={formData.firstName}
                placeholder={t("form.placeholders.firstName")}
                onChange={(value) => handleFieldChange("firstName", value)}
                error={errors.firstName}
              />
              <InputField
                id="lastName"
                label=""
                value={formData.lastName}
                placeholder={t("form.placeholders.lastName")}
                onChange={(value) => handleFieldChange("lastName", value)}
                error={errors.lastName}
              />
            </div>
          </div>
        );

      case 2: // Telefone
        return (
          <div className="space-y-4">
            <p className="text-lg text-primary text-center mb-6">
              {conversationalMessages[2]}
            </p>
            <div className="flex gap-2">
              <div className="flex items-center justify-center px-4 py-2 border border-input bg-muted rounded-md text-muted-foreground font-medium">
                +1
              </div>
              <div className="flex-1">
                <InputField
                  id="phone"
                  label=""
                  value={formData.phone}
                  placeholder={phoneConfigForValidation.placeholder}
                  onChange={(value) => handleFieldChange("phone", value)}
                  error={errors.phone}
                />
              </div>
            </div>
          </div>
        );

      case 3: // Pesquisa (NOVO)
        return (
          <div className="space-y-4">
            <p className="text-lg text-primary text-center mb-6">
              {conversationalMessages[3]}
            </p>
            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={() => {
                  handleFieldChange("survey", t("form.survey.option1"));
                  handleNext();
                }}
                className="w-full p-4 text-left rounded-lg border-2 border-primary/20 bg-white hover:bg-primary/5 hover:border-primary transition-all"
              >
                <span className="text-base">✅ {t("form.survey.option1")}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  handleFieldChange("survey", t("form.survey.option2"));
                  handleNext();
                }}
                className="w-full p-4 text-left rounded-lg border-2 border-primary/20 bg-white hover:bg-primary/5 hover:border-primary transition-all"
              >
                <span className="text-base">🏥 {t("form.survey.option2")}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  handleFieldChange("survey", t("form.survey.option3"));
                  handleNext();
                }}
                className="w-full p-4 text-left rounded-lg border-2 border-primary/20 bg-white hover:bg-primary/5 hover:border-primary transition-all"
              >
                <span className="text-base">👨‍👩‍👧‍👦 {t("form.survey.option3")}</span>
              </button>
            </div>
          </div>
        );

      case 4: // Email
        return (
          <div className="space-y-4">
            <p className="text-lg text-primary text-center mb-6">
              {conversationalMessages[4]}
            </p>
            <InputField
              id="email"
              label=""
              type="email"
              value={formData.email}
              placeholder={t("form.placeholders.email")}
              onChange={(value) => handleFieldChange("email", value)}
              error={errors.email}
            />
          </div>
        );

      case 5: // Sucesso
        return (
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex flex-col gap-2">
              <p className="text-lg font-semibold">
                {t("form.messages.thankYouTitle")}
              </p>
              <p className="text-sm text-muted-foreground" role="status">
                {successMessage || t("form.messages.whatsappInvite")}
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <FormHeader />
      <Card className="mx-auto mt-8 max-w-2xl max-sm:mx-6">
        <CardHeader className="flex flex-col gap-3">
          <CardTitle className="flex flex-col items-center justify-center mx-auto">
            <img
              src={logo}
              alt="2easy Insurance logo"
              hidden={currentStep !== 5}
              className="h-80 w-auto mx-auto"
            />
          </CardTitle>
        </CardHeader>
        {currentStep < 5 ? (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (currentStep < 4) {
                handleNext();
              } else {
                void handleSubmit();
              }
            }}
            className="w-full"
          >
            <CardContent className="flex flex-col gap-6">
              {renderStepContent()}
              {errorMessage && (
                <>
                  <Separator />
                  <p className="text-sm text-red-600" role="alert">
                    {errorMessage}
                  </p>
                </>
              )}
            </CardContent>
            <CardFooter className="mt-8 flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 0 && !startAtContact}
              >
                {t("form.buttons.back")}
              </Button>
              <Button type="submit" disabled={loading || !isCurrentStepValid}>
                {currentStep < 4
                  ? t("form.buttons.next")
                  : loading
                  ? t("form.buttons.submitting")
                  : t("form.buttons.submit")}
              </Button>
            </CardFooter>
          </form>
        ) : (
          <div className="w-full">
            <CardContent className="flex flex-col gap-6">
              {renderStepContent()}
            </CardContent>
          </div>
        )}
      </Card>
      <CardFooter className="mx-auto mt-12 max-w-4xl px-6 mb-10 flex flex-col text-center text-xs text-muted-foreground">
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-center sm:gap-6">
          <a
            href="https://2easyinsurance.com/institucional/politicas-de-privacidade.html"
            target="_blank"
            rel="noreferrer"
            className="underline hover:text-primary"
          >
            {t("form.footer.privacy")}
          </a>
          <a
            href="https://2easyinsurance.com/institucional/terms-of-use.html"
            target="_blank"
            rel="noreferrer"
            className="underline hover:text-primary"
          >
            {t("form.footer.terms")}
          </a>
        </div>
        <p className="mt-4 leading-relaxed">{t("form.footer.notice")}</p>
      </CardFooter>
    </>
  );
};

export default BasicForm;
