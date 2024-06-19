import { Button, Form, InputGroup } from "react-bootstrap";

/**
 * @param {{
 *   typeCallback: (text: string) => void
 *   searchCallback: () => void
 * }} prop
 * @returns JSX.Element
 */
export default function SearchBar({typeCallback, searchCallback}) {

  return (
    <InputGroup className="mb-3">
      <Form.Control
          onChange={(e) => typeCallback(e.target.value)}
      />
      <Button type="button" onClick={() => searchCallback()}>검색</Button>
    </InputGroup>
  );
}
