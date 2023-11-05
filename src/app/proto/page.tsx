"use client";
import {
  ActivitiesList,
  PortfolioCard,
  PortfolioTabs,
} from "@/ui_components/proto";
import { getFromLocalStorage } from "@/utils";
import { useTokensList } from "@/utils/api/apiHooks/useTokensList";

function Root() {
  const address = getFromLocalStorage("address");
  const tokenParams = {
    "api-key": process.env.NEXT_PUBLIC_DECOMMAS_API_ACCESS_KEY,
    networks: "all",
    verified: true,
    limit: 100,
  };
  const { tokensList, tokensListLoader, tokenTotalUSD } = useTokensList(
    address,
    tokenParams
  );

  return (
    <div className="h-full pb-20">
      <PortfolioCard />
      <PortfolioTabs
        tokensList={tokensList}
        tokensListLoader={true}
        tokenTotalUSD={tokenTotalUSD}
      />
      <ActivitiesList />
    </div>
  );
}

export default Root;
