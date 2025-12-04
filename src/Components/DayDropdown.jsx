import React from "react";

const DayDropdown = ({ days, selectedDay, onSelect, isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="absolute top-14  right-0 w-45 border-[0.1rem] border-[hsl(243,23%,30%)] bg-[hsl(243,27%,20%)] flex flex-col gap-1 rounded-xl p-1 z-55 shadow-[0_4px_10px_hsl(243,27%,20%)] max-[375px]:right-3">

      {days.map((day) => (
        <button
          key={day}
          onClick={() => onSelect(day)}
          className={`w-full text-left px-3 py-2 font-medium text-gray-300 rounded-lg text-sm cursor-pointer transition-colors
            ${
              selectedDay === day
                ? "bg-[hsl(243,23%,30%)]"
                : "hover:bg-[hsla(243,23%,30%,0.5)]"
            }
          `}
        >
          {day}
        </button>
      ))}
    </div>
  );
};

export default DayDropdown;
