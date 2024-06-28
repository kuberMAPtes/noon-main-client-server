import { useEffect } from "react";


const SmallAlertStyle = () => {
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .small-alert {
        font-size: 0.9em;
      }
      .small-alert .swal2-title {
        font-size: 1.2em;
        padding: 0.5em;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return null;
};

export default SmallAlertStyle;