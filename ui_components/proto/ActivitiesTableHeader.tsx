import { FC } from "react";

const ActivitiesTableHeader: FC = () => {
  return (
    <>
      <div
        className={`tableHeaderCell px-8 py-3 text-xs text-[#666780] group text-left`}
      >
        <p className=" support_text">Transaction Type</p>
      </div>
      <div
        className={`tableHeaderCell px-8 py-3 text-xs text-[#666780] group text-left`}
      >
        <p className=" support_text"> Details</p>
      </div>
      <div
        className={`tableHeaderCell px-8 py-3 text-xs text-[#666780] group text-left`}
      >
        <p className=" support_text">Status</p>
      </div>
    </>
  );
};

export default ActivitiesTableHeader;
