import { icons } from "@/utils/images";
import Image from "next/image";
import { FC } from "react";
import Actions from "../shared/Actions";
import { IActionData } from "../shared/types";

const PortfolioCard: FC = (props) => {
  const portfolioActionData: IActionData[] = [
    {
      title: "Send",
      icon: icons.sendIcon,
      url: "/send",
      isEnabled: false,
    },
    {
      title: "Swap",
      icon: icons.swapIcon,
      url: "/swap",
      isEnabled: false,
    },
    {
      title: "Bridge",
      icon: icons.bridgeIcon,

      url: "/bridge",
      isEnabled: true,
    },
  ];
  return (
    <div className="portfolioCard mb-6 mt-6">
      <div className="relative bg-[#1C1C1F]  border border-solid rounded-lg !shadow-[none] !border-[#CCCCCC] !p-0">
        <div className="md:flex md:justify-center overflow-hidden overflow-x-auto hide-scrollbar md:border-b md:border-[#CCCCCC]">
          <div className="portfolioNetWorth md:w-2/6 border-r border-[#CCCCCC] p-8">
            <p className="heading3_medium leading-6 mb-2 text-[#81858C] font-normal">
              Networth
            </p>
            <p className="heading1 text-[#fafcff] mb-4 md:mb-9">$0 </p>
          </div>
          <div className="md:w-4/6 p-8">
            <div className="hidden md:block">
              <div className="relative md:mt-0">
                <Image alt="logo" src={icons.logo} className="w-10" />
                {/* <div className="absolute top-5 left-5 lg:left-7">
                  <p className="paragraph_bold pb-1 text-text-500  tracking-[0.2px]">
                    Performance graph of your assets
                  </p>
                  <p className="paragraph text-text-300">
                    You have the option to view a specific chain or all the
                    <br />
                    chains collectively in our bundle view.
                  </p>
                </div> */}
              </div>
            </div>
          </div>
        </div>
        <div role={"presentation"} className="md:mx-8 my-6">
          <Actions
            actionData={portfolioActionData}
            className="test"
            // handleRoute={(data) => {
            //   if (data) {
            //     router.push(`/${data}`);
            //   }
            // }}
          />
        </div>
      </div>
    </div>
  );
};

export default PortfolioCard;
