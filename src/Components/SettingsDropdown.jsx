import React from "react";


const SettingsDropdown = ({ units, setUnits, isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="absolute right-0 top-13 w-50  border-[1.4px] border-[hsl(243,23%,30%)] bg-[hsl(243,27%,20%)] rounded-xl  p-[0.4rem] z-50 overflow-auto">

      {/* Switch Button */}
      <button
        onClick={() =>
          setUnits({
            ...units,
            temp: units.temp === "celsius" ? "fahrenheit" : "celsius",
            wind: units.wind === "kmh" ? "mph" : "kmh",
            precip: units.precip === "mm" ? "in" : "mm"
          })
        }
        className="w-full bg-[hsl(243,23%,30%)] hover:bg-[hsla(243,23%,30%,0.5)]  text-sm py-2 rounded-lg mb-2 transition-colors cursor-pointer text-start ps-2 focus:outline-[0.01rem] focus:outline-offset-[0.05rem]"
      >
        Switch to {units.temp === "celsius" ? "Imperial" : "Metric"}
      </button>

      {/* Temperature */}
      <div className="mb-1 pb-1 border-b border-[hsl(243,23%,30%)]">
        <p className="text-sm text-gray-400 mb-1">Temperature</p>

        <UnitRow
          label="Celsius (°C)"
          active={units.temp === "celsius"}
          onClick={() => setUnits({ ...units, temp: "celsius" })}
        />

        <UnitRow
          label="Fahrenheit (°F)"
          active={units.temp === "fahrenheit"}
          onClick={() => setUnits({ ...units, temp: "fahrenheit" })}
        />
      </div>

      {/* Wind Speed */}
      <div className="mb-1 border-b border-[hsl(243,23%,30%)]">
        <p className="text-sm text-gray-400 mb-1">Wind Speed</p>

        <UnitRow
          label="km/h"
          active={units.wind === "kmh"}
          onClick={() => setUnits({ ...units, wind: "kmh" })}
        />

        <UnitRow
          label="mph"
          active={units.wind === "mph"}
          onClick={() => setUnits({ ...units, wind: "mph" })}
        />
      </div>

      {/* Precipitation */}
      <div>
        <p className="text-sm text-gray-400 mb-1">Precipitation</p>

        <UnitRow
          label="Millimeters (mm)"
          active={units.precip === "mm"}
          onClick={() => setUnits({ ...units, precip: "mm" })}
        />

        <UnitRow
          label="Inches (in)"
          active={units.precip === "in"}
          onClick={() => setUnits({ ...units, precip: "in" })}
        />
      </div>
    </div>
  );
};


// ✅ Row Component
function UnitRow({ label, active, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center justify-between px-3 py-[0.38rem] rounded-lg cursor-pointer transition-colors mb-1 
      ${active ? "bg-[hsl(243,23%,30%)]" : "hover:bg-[hsla(243,23%,30%,0.5)]"}`}
    >
      <span className="text-sm">{label}</span>

      {active && (
        <img src="./assets/icon-checkmark.svg"/>
      
      )}
    </div>
  );
}

export default SettingsDropdown;
