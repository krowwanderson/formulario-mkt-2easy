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
import { Label } from "@/components/ui/label";
import InputField from "./InputField";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FormHeader from "./FormHeader";
import {
  Car,
  Eye,
  HeartPulse,
  SendIcon,
  Shield,
  Stethoscope,
  type LucideIcon,
} from "lucide-react";
import logo from "@/assets/final.png";

interface FormData {
  zip: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneCode: string;
  phone: string;
  insuranceId: string | null;
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

const formatMexicoPhone = (digits: string): string => {
  if (digits.length === 0) return "";
  if (digits.length <= 2) return digits;
  if (digits.length <= 6) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6, 10)}`;
};

const formatBrazilPhone = (digits: string): string => {
  if (digits.length === 0) return "";
  if (digits.length <= 2) return digits;
  if (digits.length <= 7) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
};

const PHONE_CONFIG: Record<string, PhoneConfig> = {
  "+1": {
    minDigits: 10,
    maxDigits: 10,
    format: formatUsCaPhone,
    placeholder: "(123) 456-7890",
  },
  "+52": {
    minDigits: 10,
    maxDigits: 10,
    format: formatMexicoPhone,
    placeholder: "(55) 1234-5678",
  },
  "+55": {
    minDigits: 11,
    maxDigits: 11,
    format: formatBrazilPhone,
    placeholder: "(11) 91234-5678",
  },
};

const getPhoneConfig = (code: string): PhoneConfig =>
  PHONE_CONFIG[code] ?? PHONE_CONFIG["+1"];

const formatPhoneNumber = (digits: string, code: string): string => {
  const config = getPhoneConfig(code);
  return config.format(digits);
};

const getPhonePlaceholder = (code: string): string =>
  getPhoneConfig(code).placeholder;

type InsuranceOption = {
  id: string;
  icon: LucideIcon;
};

const INSURANCE_OPTIONS: InsuranceOption[] = [
  { id: "1002", icon: HeartPulse },
  { id: "1006", icon: Stethoscope },
  { id: "1003", icon: Eye },
  { id: "1016", icon: Car },
  { id: "1008", icon: Shield },
];

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
  referralName,
  referralCode,
  vendorCode,
}) => {
  const { t, i18n } = useTranslation();

  const wizardTitles = useMemo(
    () => [t("form.titles.zip"), t("form.titles.contact"), undefined],
    [i18n.language, t]
  );

  const initialStep = startAtContact ? 1 : 0;
  const [formData, setFormData] = useState<FormData>({
    zip: initialZip,
    firstName: "",
    lastName: "",
    email: "",
    phoneCode: "+1",
    phone: "",
    insuranceId: null,
  });
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const currentZip = formData.zip || initialZip;
  const summaryEntries = [
    currentZip && {
      key: "zip",
      label: t("form.summary.zip"),
      value: currentZip,
    },
    formData.insuranceId && {
      key: "insuranceId",
      label: t("form.summary.insurances"),
      value: t(`form.insurance.options.${formData.insuranceId}`),
    },
    referralName && {
      key: "referralName",
      label: t("form.summary.referral"),
      value: referralName,
    },
    referralCode && {
      key: "referralCode",
      label: t("form.summary.referralCode"),
      value: referralCode,
    },
    vendorCode && {
      key: "vendorCode",
      label: t("form.summary.vendorCode"),
      value: vendorCode,
    },
  ].filter(
    (
      entry
    ): entry is {
      key: string;
      label: string;
      value: string;
    } => Boolean(entry)
  );

  const cardTitle = wizardTitles[currentStep] ?? "";

  const emailRegex = /^[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}$/;
  const phoneConfigForValidation = getPhoneConfig(formData.phoneCode);
  const sanitizedPhoneForValidation = formData.phone.replace(/\D/g, "");
  const isZipValid = /^\d{5}$/.test(formData.zip.trim());
  const isContactStepComplete = Boolean(
    formData.firstName.trim() &&
      formData.lastName.trim() &&
      formData.phoneCode.trim() &&
      formData.email.trim() &&
      emailRegex.test(formData.email.trim()) &&
      sanitizedPhoneForValidation.length >=
        phoneConfigForValidation.minDigits &&
      sanitizedPhoneForValidation.length <=
        phoneConfigForValidation.maxDigits &&
      formData.insuranceId
  );
  const isPrimaryActionDisabled =
    currentStep === 0 ? !isZipValid : loading || !isContactStepComplete;

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

    if (field === "phoneCode") {
      const config = getPhoneConfig(value);
      const digits = formData.phone
        .replace(/\D/g, "")
        .slice(0, config.maxDigits);
      const formattedPhone = formatPhoneNumber(digits, value);
      const phoneLengthError = getPhoneLengthError(digits, value);

      setFormData((prev) => ({
        ...prev,
        phoneCode: value,
        phone: formattedPhone,
      }));

      setErrors((prev) => {
        const next = { ...prev };
        delete next.phoneCode;
        if (phoneLengthError) {
          next.phone = phoneLengthError;
        } else {
          delete next.phone;
        }
        return next;
      });
      return;
    }

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

  const toggleInsurance = (insuranceId: string) => {
    setFormData((prev) => ({
      ...prev,
      insuranceId: prev.insuranceId === insuranceId ? null : insuranceId,
    }));

    setErrors((prev) => {
      if (!prev.insuranceId) {
        return prev;
      }
      const { insuranceId: _removed, ...rest } = prev;
      return rest;
    });
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
        if (!formData.phoneCode.trim()) {
          validationErrors.phoneCode = t("form.errors.countryCodeRequired");
        }
        if (!formData.email.trim()) {
          validationErrors.email = t("form.errors.emailRequired");
        } else if (!/^[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(formData.email)) {
          validationErrors.email = t("form.errors.emailInvalid");
        }

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

        if (!formData.insuranceId) {
          validationErrors.insuranceId = t("form.errors.insuranceRequired");
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
          ...(referralCode ? { referral_code: referralCode } : {}),
          ...(vendorCode ? { campaign_id: vendorCode } : {}),
        },
      };

      await axios.post(baseUrl, params);
      setSuccessMessage(t("form.messages.success"));
      goToStep(2);
      setFormData({
        zip: "",
        firstName: "",
        lastName: "",
        email: "",
        phoneCode: "+1",
        phone: "",
        insuranceId: null,
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
      case 0:
        return (
          <InputField
            id="zip"
            label={t("form.labels.zip")}
            value={formData.zip}
            placeholder={t("form.placeholders.zip")}
            onChange={(value) => handleFieldChange("zip", value)}
            error={errors.zip}
          />
        );
      case 1:
        return (
          <>
            <div className="grid w-full gap-4 md:grid-cols-2">
              <InputField
                id="firstName"
                label={t("form.labels.firstName")}
                value={formData.firstName}
                placeholder={t("form.placeholders.firstName")}
                onChange={(value) => handleFieldChange("firstName", value)}
                error={errors.firstName}
              />
              <InputField
                id="lastName"
                label={t("form.labels.lastName")}
                value={formData.lastName}
                placeholder={t("form.placeholders.lastName")}
                onChange={(value) => handleFieldChange("lastName", value)}
                error={errors.lastName}
              />
              <div className="flex flex-col gap-1">
                <Label htmlFor="phoneCode">
                  {t("form.labels.countryCode")}
                </Label>
                <Select
                  value={formData.phoneCode}
                  onValueChange={(value) =>
                    handleFieldChange("phoneCode", value)
                  }
                >
                  <SelectTrigger
                    id="phoneCode"
                    className={`w-full ${
                      errors.phoneCode
                        ? "border-red-500 ring-1 ring-red-500 focus-visible:ring-red-500"
                        : ""
                    }`}
                  >
                    <SelectValue
                      placeholder={t("form.placeholders.countryCode")}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="+1">
                      {t("form.countryOptions.usca")}
                    </SelectItem>
                    <SelectItem value="+52">
                      {t("form.countryOptions.mexico")}
                    </SelectItem>
                    <SelectItem value="+55">
                      {t("form.countryOptions.brazil")}
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.phoneCode && (
                  <span className="mt-1 text-xs text-red-600" role="alert">
                    {errors.phoneCode}
                  </span>
                )}
              </div>
              <InputField
                id="phone"
                label={t("form.labels.phone")}
                value={formData.phone}
                placeholder={getPhonePlaceholder(formData.phoneCode)}
                onChange={(value) => handleFieldChange("phone", value)}
                error={errors.phone}
              />
              <InputField
                id="email"
                label={t("form.labels.email")}
                type="email"
                value={formData.email}
                placeholder={t("form.placeholders.email")}
                onChange={(value) => handleFieldChange("email", value)}
                error={errors.email}
              />
            </div>
            <div className="mt-6">
              <p className="text-sm font-semibold">
                {t("form.insurance.title")}
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {INSURANCE_OPTIONS.map((option) => {
                  const Icon = option.icon;
                  const isSelected = formData.insuranceId === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => toggleInsurance(option.id)}
                      aria-pressed={isSelected}
                      className={`group flex h-full flex-col items-center gap-3 rounded-lg border p-4 text-center transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                        isSelected
                          ? "border-primary bg-primary/10 text-primary shadow-sm"
                          : "border-border hover:border-primary/60"
                      }`}
                    >
                      <span
                        className={`flex h-12 w-12 items-center justify-center rounded-md border text-primary ${
                          isSelected
                            ? "border-primary bg-primary/20"
                            : "border-muted-foreground/20 bg-muted"
                        }`}
                      >
                        <Icon className="h-6 w-6" />
                      </span>
                      <span className="text-xs font-medium uppercase tracking-wide">
                        {t(`form.insurance.options.${option.id}`)}
                      </span>
                    </button>
                  );
                })}
              </div>
              {errors.insuranceId && (
                <span className="mt-2 block text-xs text-red-600" role="alert">
                  {errors.insuranceId}
                </span>
              )}
            </div>
          </>
        );
      case 2:
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
            <a
              href="https://api.whatsapp.com/send/?phone=13213441199"
              target="_blank"
              rel="noreferrer"
            >
              <Button type="button" className="min-w-48 mb-4">
                <SendIcon className="h-4 w-4" />
                {t("form.buttons.whatsapp")}
              </Button>
            </a>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <FormHeader />
      {summaryEntries.length > 0 && (
        <div className="mx-auto mt-6 max-w-2xl max-sm:px-6">
          <h1 className="mb-4 font-bold text-2xl text-center text-primary">
            {t("form.header.title")}
          </h1>
          <div className="rounded-lg border border-primary/20 bg-primary/10 px-6 py-4 text-primary">
            <h2 className="font-bold uppercase tracking-wide">
              {t("form.summary.title")}
            </h2>
            <dl className="mt-3 grid gap-2 text-sm">
              {summaryEntries.map((entry) => (
                <div
                  key={entry.key}
                  className="flex items-start justify-between gap-4"
                >
                  <dt className="font-medium">{entry.label}</dt>
                  <dd className="text-right">{entry.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      )}
      <Card className="mx-auto mt-8 max-w-2xl max-sm:mx-6">
        <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="flex flex-col items-center justify-center mx-auto">
            <img
              src={logo}
              alt="2easy Insurance logo"
              hidden={currentStep !== 2}
              className="h-80 w-auto mx-auto"
            />

            {cardTitle}
          </CardTitle>
        </CardHeader>
        {currentStep < 2 ? (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (currentStep === 0) {
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
              <Button type="submit" disabled={isPrimaryActionDisabled}>
                {currentStep === 0
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
