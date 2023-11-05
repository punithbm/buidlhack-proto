"use client";
import { IActivityListFormatted } from "@/utils/api/apiTypes";
import { FC } from "react";
import { ActivitiesTableHeader, Shimmer } from ".";
import Image from "next/image";
import { icons } from "@/utils/images";

export interface IActivitiesTablePropsType {
  activitiesList?: IActivityListFormatted[];
  isLoading?: boolean;
}

const ActivitiesList: FC<IActivitiesTablePropsType> = ({
  activitiesList,
  isLoading,
}) => {
  return (
    <div
      className={`gridTable grid overflow-x-hidden hide-scrollbar md:overflow-visible md:relative border border-[#B6B6B6] rounded-2xl`}
    >
      <p className="py-6 px-8 font-semibold text-base text-black">Activities</p>
      <div
        className={`tableHeader grid flex-1 w-full border-y support_text border-[#CCCCCC] grid-cols-2 md:grid-cols-3 lg:grid-cols-activitiesTable md:sticky md:top-16 md:z-9 z-[1]`}
      >
        <ActivitiesTableHeader />
      </div>
      <div className={`tableBody md:overflow-hidden lg:overflow-auto`}>
        {/* {activitiesList?.map((_item, key) => ( */}
        <div
          className={`tableRow relative w-full flex first:border-none border-t border-secondary-100`}
        >
          <div
            role="presentation"
            className="grid flex-1 w-full items-center relative py-4 md:py-3.5 grid-cols-2 md:grid-cols-3 lg:grid-cols-activitiesTable hover:bg-base-500 "
          >
            <div
              className={`tableBodyCell px-8 text-left flex items-center gap-2`}
            >
              <Image src={icons.sent} alt="sent" />
              <div>
                <p className="text-black mb-1 text-sm">Sent</p>
                <p className="text-[#666780] text-xs">To: 09cj...67vh8</p>
              </div>
            </div>
            <div
              className={`tableBodyCell px-8 text-left flex items-center gap-2`}
            >
              <Image src={icons.sent} alt="sent" />
              <div>
                <p className="text-black mb-1 text-sm">0.11 ETH</p>
                <p className="text-[#666780] text-xs">$1,897.00</p>
              </div>
            </div>
            <div
              className={`tableBodyCell px-8 text-left flex items-center gap-1`}
            >
              <p className="text-sm text-[#18935F]">Success</p>
            </div>
          </div>
        </div>
        {/* ))} */}
        {/* {isLoading ? <Shimmer type="activity" /> : null} */}
        {isLoading ? <p>Loading...</p> : null}
      </div>
    </div>
  );
};

export default ActivitiesList;
