import { icons } from "@/utils/images";
import Image from "next/image";
import { FC } from "react";
import Actions from "../shared/Actions";
import { IActionData } from "../shared/types";
import { AvatarGroup } from "../shared";

const PortfolioCard: FC = (props) => {
  const portfolioActionData: IActionData[] = [
    {
      title: "Send",
      icon: icons.sendIcon.src,
      url: "/send",
      isEnabled: false,
    },
    {
      title: "Receive",
      icon: icons.receiveIcon.src,
      url: "/receive",
      isEnabled: false,
    },
    {
      title: "Swap",
      icon: icons.swapIcon.src,
      url: "/swap",
      isEnabled: false,
    },
    {
      title: "Buy / Sell",
      icon: icons.buyIcon.src,
      url: "/buy",
      isEnabled: false,
    },
  ];
  return (
    <div className="relative bg-[#1C1C1F] rounded-3xl p-5 mt-8">
      <div className="md:flex md:justify-center mb-7">
        <div className="portfolioNetWorth md:w-2/6 bg-[#F3FFA8] pb-6 py-10 px-[30px] rounded-3xl">
          <div className="mb-2.5">
            <AvatarGroup />
          </div>
          <p className="text-base text-[#474E66] font-normal">Networth</p>
          <p className="text-[32px] font-black text-[#0A0D14] mb-5">
            $255.<span className="font-semibold opacity-50">20</span>
          </p>
          <ul>
            <li className="flex items-center justify-between mb-4 last:mb-0">
              <p className="text-[#464E59] text-sm font-normal">
                Total Investment
              </p>

              <p
                className={`font-medium text-sm text-[#0A0D14] flex items-center `}
              >
                $1,782.08
              </p>
            </li>
            <li className="flex items-center justify-between mb-4 last:mb-0">
              <p className="text-[#464E59] text-sm font-normal">Rewards</p>

              <p
                className={`font-medium text-sm text-[#0A0D14] flex items-center `}
              >
                $1,782.08
              </p>
            </li>
            <li className="flex items-center justify-between mb-4 last:mb-0">
              <p className="text-[#464E59] text-sm font-normal">P&L</p>

              <p
                className={`font-medium text-sm text-[#0A0D14] flex items-center `}
              >
                $1,782.08
              </p>
            </li>
          </ul>
        </div>
        <div className="md:w-4/6 px-8">
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
      <div role={"presentation"} className="">
        <Actions
          actionData={portfolioActionData}
          className="mb-2"
          // handleRoute={(data) => {
          //   if (data) {
          //     router.push(`/${data}`);
          //   }
          // }}
        />
      </div>
    </div>
  );
};

export default PortfolioCard;
