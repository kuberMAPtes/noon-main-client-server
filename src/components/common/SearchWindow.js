/**
 * @param {{
 *   typeCallback: (text: string) => void
 *   searchCallback: () => void
 * }} prop
 * @returns JSX.Element
 */
export default function SearchWindow({typeCallback, searchCallback}) {

  return (
    <div style={{ display: "flex" }}>
      <input type="text" onChange={(e) => typeCallback(e.target.value)} />
      <button type="button" onClick={() => searchCallback()}>검색</button>
    </div>
  );
}
