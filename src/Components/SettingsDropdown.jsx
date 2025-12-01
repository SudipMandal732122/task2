import React from "react";
import { Check } from "lucide-react";

const SettingsDropdown = ({ units, setUnits, isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="absolute right-8 top-20 w-72 bg-[hsl(243,27%,20%)] rounded-xl shadow-2xl p-4 z-50 overflow-auto">

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
        className="w-full bg-[#2b2f4a] hover:bg-[#363b63] text-sm py-2 rounded-lg mb-4 transition-colors"
      >
        Switch to {units.temp === "celsius" ? "Imperial" : "Metric"}
      </button>

      {/* Temperature */}
      <div className="mb-4">
        <p className="text-sm text-gray-400 mb-2">Temperature</p>

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
      <div className="mb-4">
        <p className="text-sm text-gray-400 mb-2">Wind Speed</p>

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
        <p className="text-sm text-gray-400 mb-2">Precipitation</p>

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
      className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-colors mb-2 
      ${active ? "bg-[#2d3256]" : "hover:bg-[#2a2f4f]"}`}
    >
      <span className="text-sm">{label}</span>

      {active && (
        <Check size={18} className="text-blue-500" />
      )}
    </div>
  );
}

export default SettingsDropdown;
