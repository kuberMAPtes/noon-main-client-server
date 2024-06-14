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
export default function ButtonGroup({
  currentSelectedId,
  buttonInfos,
  onButtonClick
}) {
  return (
    <div>
      {
        buttonInfos.map((data, idx) => (
          <button type="button" key={`button-${data.id}-${idx}`}
              onClick={() => onButtonClick(data.id)}
          >
            {data.title}
            {
              currentSelectedId === data.id ? "선택됨" : ""
            }
          </button>
        ))
      }
    </div>
  );
}
