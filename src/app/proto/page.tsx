import {
  ActivitiesList,
  PortfolioCard,
  PortfolioTabs,
} from "@/ui_components/proto";

function Root() {
  return (
    <div className="h-full pb-20">
      <PortfolioCard />
      <PortfolioTabs />
      <ActivitiesList />
    </div>
  );
}

export default Root;
