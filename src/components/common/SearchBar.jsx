import { useEffect, useRef } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";

export const PARAM_KEY_SEARCH_KEYWORD = "search-keyword";

/**
 * @param {{
 *   typeCallback: (text: string) => void
 *   searchCallback: () => void
 * }} prop
 * @returns JSX.Element
 */
export default function SearchBar({typeCallback, searchCallback}) {
  const [queryParams, setQueryParams] = useSearchParams();

  const searchKeywordInputRef = useRef(null);

  useEffect(() => {
    if (queryParams.has(PARAM_KEY_SEARCH_KEYWORD)) {
      searchCallback();
      searchKeywordInputRef.current.value = queryParams.get(PARAM_KEY_SEARCH_KEYWORD);
    }
  }, []);

  return (
    <InputGroup className="mb-3 search-bar-container">
      <Form.Control
          onChange={(e) => typeCallback(e.target.value)}
          ref={searchKeywordInputRef}
      />
      <Button type="button" onClick={() => searchCallback()}>검색</Button>
    </InputGroup>
  );
}
