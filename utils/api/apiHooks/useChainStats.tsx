// import useSWR from "swr";

// import { fetchChainStats } from "..";
// import { IChainStatsResp } from "../apiTypes";

// const fetchChainStatsHelper = () => fetchChainStats().then((rs) => rs.data);

// const useChainStats = (onSuccess?: (data: IChainStatsResp) => void) => {
//   const { data: chainStats, isValidating: chainStatsLoader } = useSWR(
//     "chain-stats",
//     fetchChainStatsHelper,
//     {
//       onSuccess: (data) => {
//         if (data) {
//           onSuccess?.(data);
//         }
//       },
//       revalidateIfStale: false,
//       shouldRetryOnError: false,
//       revalidateOnFocus: false,
//     }
//   );
//   return { chainStats, chainStatsLoader };
// };

// export { useChainStats };
