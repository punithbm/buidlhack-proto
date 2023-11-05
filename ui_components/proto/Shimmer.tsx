import { FC } from "react";

type TShimmerTypes = {
  type: "activity";

  actionButtonCount?: number;
  isMobile?: boolean;
};

const Shimmer: FC<TShimmerTypes> = (props) => {
  const { type } = props;

  return (
    <>
      {/* {type === "activity" && (
        <>
          {[...Array(8).keys()].map((key) => {
            return (
              <TableRow
                key={key}
                className="first:border-none border-t border-secondary-100 animate-pulse"
              >
                <div className="grid flex-1 w-full items-center relative py-3.5 grid-cols-mobActivitiesTable md:grid-cols-activitiesTable">
                  <TableCell>
                    <div className="flex gap-2">
                      <div className="h-6 w-6 md:h-9 md:w-9 rounded-full bg-secondary-900/10 dark:bg-secondaryDark-200" />
                      <div className={``}>
                        <div className="h-4 w-20 mb-2 rounded bg-secondary-900/10 dark:bg-secondaryDark-200" />
                        <div className="h-4 w-30 rounded bg-secondary-900/10 dark:bg-secondaryDark-200" />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="pl-3 md:pl-0 !text-right w-[170px] xs:w-[240px] sm:w-[300px] md:w-auto !px-0">
                    <div className="flex gap-2">
                      <div className="h-9 w-9 rounded-full bg-secondary-900/10 dark:bg-secondaryDark-200 hidden md:block" />
                      <div className={``}>
                        <div className="h-4 w-30 xs:w-40 md:w-60 mb-2 rounded bg-secondary-900/10 dark:bg-secondaryDark-200" />
                        <div className="h-4 w-25 xs:w-30 md:w-40 rounded bg-secondary-900/10 dark:bg-secondaryDark-200" />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="h-4 w-40  rounded bg-secondary-900/10 dark:bg-secondaryDark-200" />
                  </TableCell>
                  <TableCell>
                    <div className="h-4 w-full rounded bg-secondary-900/10 dark:bg-secondaryDark-200" />
                  </TableCell>
                </div>
              </TableRow>
            );
          })}
        </>
      )} */}
    </>
  );
};

export default Shimmer;
