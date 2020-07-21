import { useState } from "react";
import { JsonRpcProvider } from "@ethersproject/providers";
import { Token, WETH, Fetcher, Route } from "@uniswap/sdk";
import usePoller from "./Poller";
import { DAI_ADDRESS } from "./constants";

const useEthPrice = (provider: JsonRpcProvider, pollTime: number): number => {
  const [price, setPrice] = useState(0);

  const pollPrice = () => {
    async function getPrice() {
      const DAI = new Token(provider.network.chainId, DAI_ADDRESS, 18);
      const pair = await Fetcher.fetchPairData(DAI, WETH[DAI.chainId]);
      const route = new Route([pair], WETH[DAI.chainId]);
      setPrice(parseFloat(route.midPrice.toSignificant(6)));
    }
    getPrice();
  };
  usePoller(pollPrice, pollTime || 9777);

  return price;
};

export default useEthPrice;
