import { FC } from "react";

type TShimmerTypes = {
  type: "activity" | "tokenList";

  actionButtonCount?: number;
  isMobile?: boolean;
};

const Shimmer: FC<TShimmerTypes> = (props) => {
  const { type } = props;

  return (
    <>
      {type === "activity" && (
        <>
          {[...Array(8).keys()].map((key) => {
            return (
              <div
                role="presentation"
                className="grid flex-1 w-full items-center relative py-4 md:py-3.5 grid-cols-2 md:grid-cols-3 lg:grid-cols-activitiesTable animate-pulse"
              >
                <div
                  className={`tableBodyCell px-8 text-left flex items-center gap-2`}
                >
                  <div className="h-9 w-9 rounded-full bg-secondary-900/10 dark:bg-secondaryDark-200" />
                  <div>
                    <div className="h-4 w-40 mb-2 rounded bg-secondary-900/10 dark:bg-secondaryDark-200" />
                    <div className="h-4 w-20 mb-2 rounded bg-secondary-900/10 dark:bg-secondaryDark-200" />
                  </div>
                </div>
                <div
                  className={`tableBodyCell px-8 text-left flex items-center gap-2`}
                >
                  <div className="h-9 w-9 rounded-full bg-secondary-900/10 dark:bg-secondaryDark-200" />
                  <div>
                    <div className="h-4 w-40 mb-2 rounded bg-secondary-900/10 dark:bg-secondaryDark-200" />
                    <div className="h-4 w-20 mb-2 rounded bg-secondary-900/10 dark:bg-secondaryDark-200" />
                  </div>
                </div>
                <div
                  className={`tableBodyCell px-8 text-left flex items-center gap-1`}
                >
                  <div className="h-4 w-20 mb-2 rounded bg-secondary-900/10 dark:bg-secondaryDark-200" />
                </div>
              </div>
            );
          })}
        </>
      )}
      {type === "tokenList" && (
        <>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-5 mb-5 ">
            {[...Array(10).keys()].map((key) => {
              return (
                <div
                  key={key}
                  role="presentation"
                  className="relative py-3 px-4 rounded-lg border border-secondary-200 overflow-hidden opacity-[0.4] hover:opacity-[1] group animate-pulse"
                >
                  <div className="flex items-center gap-2 pb-2">
                    <div className="h-9 w-9 rounded-full bg-secondary-900/10 dark:bg-secondaryDark-200" />
                    <div className="flex flex-col">
                      <div className="h-4 w-20 mb-2 rounded bg-secondary-900/10 dark:bg-secondaryDark-200" />
                      <div className="flex items-center">
                        <div className="h-6 w-6 rounded-full bg-secondary-900/10 dark:bg-secondaryDark-200" />
                      </div>
                    </div>
                  </div>
                  <div className="pb-3">
                    <div className="h-4 w-40 mb-2 rounded bg-secondary-900/10 dark:bg-secondaryDark-200" />
                    <div className="flex gap-4 justify-between items-center">
                      <div className="h-4 w-20 mb-2 rounded bg-secondary-900/10 dark:bg-secondaryDark-200" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full bg-secondary-100 dark:bg-secondaryDark-100 py-2">
                    <div className="h-2 w-20 ml-4 rounded bg-secondary-900/10 dark:bg-secondaryDark-200" />
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default Shimmer;
