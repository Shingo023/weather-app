import { getCurrentTimeAndDate } from "@/utils/dateUtils";
import React from "react";

const DateAndTime = ({
  timeZone,
  className,
}: {
  timeZone: string;
  className: string;
}) => {
  const currentDateTime = getCurrentTimeAndDate(timeZone);

  return <div className={className}>{currentDateTime}</div>;
};

export default React.memo(DateAndTime);
