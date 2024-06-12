/**
 * @param {{
 *   buttonInfos: {
 *     id: string;
 *     title: string;
 *   }[],
 *   onButtonClick: (id: string) => void;
 * }} props
 */
export default function ButtonGroup({
  buttonInfos,
  onButtonClick
}) {
  return (
    <div>
      {
        buttonInfos.map((data, idx) => (
          <button type="button" key={`button-group-${data.id}-${idx}`}
              onClick={() => onButtonClick(data.id)} />
        ))
      }
    </div>
  );
}
