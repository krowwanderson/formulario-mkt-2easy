import { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LandingPage from "@/components/LandingPage";
import BasicForm from "@/components/form/BasicForm";
import { useReferralAgent } from "@/hooks/useReferralAgent";

function App() {
  const { t } = useTranslation();
  const location = useLocation();
  const [zip, setZip] = useState("");
  const [zipError, setZipError] = useState<string | undefined>();
  const [showWizard, setShowWizard] = useState(false);

  const pathSegments = useMemo(() => {
    if (!location.pathname) return [];
    return location.pathname
      .split("/")
      .map((segment: string) => segment.trim())
      .filter(Boolean);
  }, [location.pathname]);

  const referralCode = pathSegments[0] ?? null;
  const { referral } = useReferralAgent({ referralCode });

  const handleZipChange = (value: string) => {
    setZip(value);
    if (zipError) {
      setZipError(undefined);
    }
  };

  const handleZipSubmit = () => {
    if (zip.length !== 5) {
      setZipError(t("form.errors.zipInvalid"));
      return;
    }
    setShowWizard(true);
  };

  if (showWizard) {
    return (
      <BasicForm
        initialZip={zip}
        startAtContact
        onReturnToLanding={() => setShowWizard(false)}
        referralName={referral?.name}
      />
    );
  }

  return (
    <LandingPage
      zipValue={zip}
      onZipChange={handleZipChange}
      onSubmitZip={handleZipSubmit}
      zipError={zipError}
    />
  );
}

export default App;
