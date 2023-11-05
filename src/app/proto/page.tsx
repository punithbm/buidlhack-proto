"use client";
import {
  ActivitiesList,
  PortfolioCard,
  PortfolioTabs,
} from "@/ui_components/proto";
import { getFromLocalStorage } from "@/utils";
import { useActivityList } from "@/utils/api/apiHooks/useActivityList";
import { useTokensList } from "@/utils/api/apiHooks/useTokensList";

function Root() {
  const address = getFromLocalStorage("address");
  const apiKey = process.env.NEXT_PUBLIC_DECOMMAS_API_ACCESS_KEY;
  const tokenParams = {
    "api-key": apiKey,
    networks: "all",
    verified: true,
    limit: 100,
  };
  const activityParams = {
    "api-key": apiKey,
    networks: "all",
    verified: true,
    limit: 100,
  };
  const { tokensList, tokensListLoader, tokenTotalUSD } = useTokensList(
    "0x06e70f295B6337c213DDe82D13cc198027687A7B",
    tokenParams
  );
  const { activityList, activityLoader } = useActivityList(
    "0x06e70f295B6337c213DDe82D13cc198027687A7B",
    activityParams
  );
  console.log(activityList, "activityList");

  return (
    <div className="h-full pt-12 pb-20">
      <PortfolioCard />
      <PortfolioTabs
        tokensList={tokensList}
        tokensListLoader={tokensListLoader}
        tokenTotalUSD={tokenTotalUSD}
      />
      <ActivitiesList activitiesList={activityList} loader={activityLoader} />
    </div>
  );
}

export default Root;
