import { useState, useEffect } from "react";
import { Provider } from "@ethersproject/providers";

const resolveName = async (provider: Provider, name: string) => {
  try {
    return await provider.resolveName(name);
  } catch {
    // Name resolution has failed.
    return null;
  }
};

const useResolveEnsName = (provider: Provider, ensName?: string): string | null => {
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    if (provider) {
      resolveName(provider, ensName || "").then(newAddress => setAddress(newAddress));
    }
  }, [provider, ensName]);

  return address;
};

export default useResolveEnsName;
