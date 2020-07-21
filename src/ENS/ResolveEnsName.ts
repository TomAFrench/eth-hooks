import { useState, useEffect } from "react";
import { Provider } from "@ethersproject/providers";

const useResolveEnsName = (provider: Provider, ensName: string): string | null => {
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    if (provider) {
      provider.resolveName(ensName).then((resolvedAddress: string) => setAddress(resolvedAddress));
    }
  }, [provider, ensName]);

  return address;
};

export default useResolveEnsName;
