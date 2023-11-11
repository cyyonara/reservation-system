import { useState, memo } from "react";
import { RiArrowDropRightLine, RiArrowDropLeftLine } from "react-icons/ri";
import { getLastDayOfMonth } from "../../utils/getLastDayOfMonth";

interface IDate {
  date: Date;
  display: boolean;
}

const getNextDay = (): Date => {
  const dt = new Date();
  dt.setDate(dt.getDate() + 1);
  return dt;
};

const getStartAndEndOfTheDay = (dt: Date): { start: Date; end: Date } => {
  const startOfTheDay = new Date(dt);
  const endOfTheDay = new Date(dt);

  startOfTheDay.setHours(0);
  startOfTheDay.setMinutes(0);
  startOfTheDay.setSeconds(1);

  endOfTheDay.setHours(23);
  endOfTheDay.setSeconds(59);
  endOfTheDay.setMinutes(59);

  return { start: startOfTheDay, end: endOfTheDay };
};

const Datepicker: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(getNextDay());

  const months: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const handlePrevious = (): void => {
    const dt = new Date(currentDate);
    dt.setMonth(dt.getMonth() - 1);
    setCurrentDate(dt);
  };

  const handleNext = (): void => {
    const dt = new Date(currentDate);
    dt.setMonth(dt.getMonth() + 1);
    setCurrentDate(dt);
  };

  const fillDates = (_: null, _i: number): IDate => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), _i + 1);
    date.setHours(12);
    return { date, display: true };
  };

  const dates: IDate[] = new Array(getLastDayOfMonth(currentDate)).fill(null).map(fillDates);

  const dummyDate: IDate[] = new Array(dates[0].date.getDay())
    .fill(null)
    .map(() => ({ date: new Date(), display: false }));

  for (const dt of dummyDate) {
    dates.unshift(dt);
  }

  return (
    <div className="flex flex-col border border-gray-300 w-full lg:max-w-[371px] rounded-lg shadow-none lg:shadow-[0_0_8px_var(--shadow-clr)]">
      <div className="flex items-center p-4 justify-between">
        <button
          className="bg-gray-100 duration-150 rounded-full hover:bg-gray-200"
          onClick={handlePrevious}
        >
          <RiArrowDropLeftLine size={24} className="text-gray-700" />
        </button>
        <span className="text-sm text-gray-700">{`${
          months[currentDate.getMonth()]
        } ${currentDate.getFullYear()}`}</span>
        <button className="bg-gray-100 duration-150 rounded-full" onClick={handleNext}>
          <RiArrowDropRightLine size={24} className="text-gray-700" />
        </button>
      </div>
      <div className="grid w-full gap-1 justify-center grid-cols-[repeat(7,9vw)] lg:grid-cols-[repeat(7,45px)] mt-2 px-4 mx-auto">
        {days.map((day) => (
          <span key={day} className="text-center p-2 text-xs text-c-blue">
            {day}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-[repeat(7,9vw)] lg:grid-cols-[repeat(7,45px)] justify-center auto-rows-[9vw] lg:auto-rows-[45px] w-full mt-2 gap-1 p-4 mx-auto">
        {dates.map((dt, _i) => (
          <button
            key={_i}
            className={`p-2 text-xs flex items-center justify-center rounded-full duration-100 text-gray-700 border-c-blue disabled:bg-gray-100 disabled:text-gray-500 ${
              !(new Date() > dt.date) && dt.display ? "hover:border" : "hover:border-none"
            } ${
              dt.date > getStartAndEndOfTheDay(selectedDate).start &&
              dt.date < getStartAndEndOfTheDay(selectedDate).end &&
              dt.display
                ? "bg-c-blue text-white"
                : "bg-transparent"
            }`}
            onClick={() => setSelectedDate(dt.date)}
            disabled={new Date() > dt.date && dt.display}
          >
            {dt.display && dt.date.getDate()}
          </button>
        ))}
      </div>
      <div className="items-center hidden lg:flex p-3 border-t border-gray-300 mt-2">
        <button className="bg-c-blue text-white rounded-lg flex-1 text-xs py-[10px] uppercase duration-150 hover:bg-blue-400">
          Reserve
        </button>
      </div>
    </div>
  );
};

export default memo(Datepicker);
