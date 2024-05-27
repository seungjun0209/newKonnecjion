import { useState } from "react";
import "./ToolTip.css";

export default function ToolTip() {
  const [visible, setVisible] = useState(false);

  return (
    <div className="ui-tooltip">
      <button
        className="button-ico button-set"
        data-tooltip-id="help"
        onClick={() => {
          setVisible(!visible);
        }}
      />
      {visible && (
        <div data-tooltip-id="help">
          <span className="span-text">
            DeepL AI에 의한 번역이
            <br /> 자동으로 제공됩니다.
          </span>
        </div>
      )}
    </div>
  );
}
