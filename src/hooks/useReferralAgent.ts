import { useEffect, useState } from "react";

interface ReferralAgent {
  name: string;
  id: string;
}

interface UseReferralAgentOptions {
  referralCode?: string | null;
}

const fetchReferralAgent = async (
  referralCode: string
): Promise<ReferralAgent | null> => {
  try {
    const endpoint = `https://admin.2easyinsurance.com/api/get/referral/code/${encodeURIComponent(
      referralCode
    )}`;
    const response = await fetch(endpoint);
    if (!response.ok) {
      console.warn("Referral API returned non-200 status", response.status);
      return null;
    }
    const payload = (await response.json()) as {
      status: boolean;
      data?: Array<{ referral_name: string; id: string }>;
    };
    if (!payload.status || !payload.data?.length) {
      return null;
    }
    const [agent] = payload.data;
    return { name: agent.referral_name, id: agent.id };
  } catch (error) {
    console.error("Failed to load referral agent data", error);
    return null;
  }
};

export const useReferralAgent = ({
  referralCode,
}: UseReferralAgentOptions): {
  referral: ReferralAgent | null;
  loading: boolean;
  error: boolean;
} => {
  const [referral, setReferral] = useState<ReferralAgent | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!referralCode) {
      setReferral(null);
      return;
    }

    let cancelled = false;
    const run = async () => {
      setLoading(true);
      setError(false);
      const result = await fetchReferralAgent(referralCode);
      if (!cancelled) {
        setReferral(result);
        setError(!result);
        setLoading(false);
      }
    };
    void run();

    return () => {
      cancelled = true;
    };
  }, [referralCode]);

  return { referral, loading, error };
};
