"use client";
import React, { FC } from "react";

import { IActionData, IActionsPropsType } from "./types";
import { Button } from ".";

const Actions: FC<IActionsPropsType> = (props) => {
  const { actionData, className, handleRoute, btnClassName } = props;

  return (
    <div className={`flex gap-4 lg:gap-5 items-center justify-between relative py-5 md:py-0 md:border-y-0 border-y border-y-secondary-100 dark:border-y-secondaryDark-100 ${className ?? ""}`}>
      <div className={`flex gap-12 w-full`}>
        {actionData &&
          actionData?.length > 0 &&
          actionData?.map((item: IActionData, key: number) => (
            <React.Fragment key={key}>
              <div className="grow w-full hidden md:flex rounded-lg">
                <Button className={`grow w-full rounded-lg font-semibold text-base ${item?.isEnabled ? "!bg-[#44484F] text-[#FFFFFF] pointer-events-none cursor-not-allowed" : "!bg-[#44484F] text-[#FFFFFF] pointer-events-none cursor-not-allowed"} ${btnClassName ?? ""}`} variant="primary" onClick={() => handleRoute?.(item?.url ?? (item?.onClick?.() as string))}>
                  <img src={item.icon} alt={item.title as string} height={24} width={24} />
                  <span className="hidden md:block">{item?.title}</span>
                </Button>
              </div>
            </React.Fragment>
          ))}
      </div>
    </div>
  );
};

export default Actions;
