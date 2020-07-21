import { useState, useEffect } from "react";
import { Provider } from "@ethersproject/providers";
import { getAddress } from "@ethersproject/address";

const lookupAddress = async (provider: Provider, address: string): Promise<string | null> => {
  try {
    // Accuracy of reverse resolution is not enforced.
    // We then manually ensure that the reported ens name resolves to address
    const reportedName = provider.lookupAddress(address);
    const resolvedAddress = await provider.resolveName(reportedName);
    if (getAddress(address) === getAddress(resolvedAddress)) {
      return reportedName;
    }
  } catch (e) {
    // Do nothing
  }
  return null;
};

const useLookupAddress = (provider: Provider, address: string): string | null => {
  const [ensName, setEnsName] = useState<string | null>(null);

  useEffect(() => {
    if (provider) {
      lookupAddress(provider, address).then(name => setEnsName(name));
    }
  }, [provider, address]);

  return ensName;
};

export default useLookupAddress;
