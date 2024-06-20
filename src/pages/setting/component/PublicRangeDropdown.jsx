import { useState } from "react";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "react-bootstrap";

/**
 * @param {{
 *   currentSelectedId: string;
 *   buttonInfos: {
 *     id: string;
 *     title: string;
 *   }[],
 *   onButtonClick: (id: string) => void;
 * }} props
 */
export default function PublicRangeDropdown({
  currentSelectedId,
  buttonInfos,
  onButtonClick
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const currentSelected = buttonInfos.filter((elem) => elem.id === currentSelectedId)[0];
  return (
    <Dropdown
        isOpen={dropdownOpen}
        toggle={() => setDropdownOpen((prevState) => !prevState)}
        direction="down"
        className="pg-dropdown"
    >
      <DropdownToggle caret>{currentSelected.title}</DropdownToggle>
      <DropdownMenu>
        {
          buttonInfos.map((btn) => (
            <DropdownItem
                onClick={() => onButtonClick(btn.id)}
                disabled={btn.id === currentSelectedId}>{btn.title}</DropdownItem>
          ))
        }
      </DropdownMenu>
    </Dropdown>
  );
}
