import * as React from "react";
import { DateRange } from "react-date-range";

export default function IndexDate({ date, onChangeDate, setIsShowed }) {
  const refDate = React.useRef(null);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (refDate.current && !refDate.current.contains(event.target)) {
        setIsShowed(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsShowed]);

  const handleRangeFocusChange = (focus) => {
    if (focus.indexOf(1) < 0) {
      setIsShowed(false);
    }
  };

  return (
    <div className="position-absolute" style={{ zIndex: 1 }} ref={refDate}>
      <DateRange
        editableDateInputs={true}
        onChange={onChangeDate}
        moveRangeOnFirstSelection={false}
        onRangeFocusChange={handleRangeFocusChange}
        ranges={[date]}
        maxDate={new Date()}
      />
    </div>
  );
}
