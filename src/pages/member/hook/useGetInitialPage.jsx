import React from "react";
import { useSearchParams } from "react-router-dom";

const useGetInitialPage = () => {
  const [searchParams] = useSearchParams();

  const initialPage = Number(searchParams.get("page")) || Number(0);
  // alert(`useGetInitialPage: initialPage=${initialPage}`);
  console.log(`useGetInitialPage: initialPage=${initialPage}`);

  return { initialPage };
};

export default useGetInitialPage;
