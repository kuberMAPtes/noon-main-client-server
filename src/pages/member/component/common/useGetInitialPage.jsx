import React from "react";
import { useSearchParams } from "react-router-dom";

const useGetInitialPage = () => {
  const [searchParams] = useSearchParams();

  const initialPage = searchParams.get("page") || 0;

  return { initialPage };
};

export default useGetInitialPage;
