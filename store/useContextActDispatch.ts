import { useCallback, useContext } from "react";

import { GlobalContext } from ".";
import { ACTIONS } from "./GlobalContext";

function useContextActDispatch() {
  const { state, dispatch } = useContext(GlobalContext);

  return {
    state,
  };
}

export { useContextActDispatch };
