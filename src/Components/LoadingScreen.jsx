import React from "react";

const LoadingScreen = () => {
  return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8 animate-pulse">

          {/* LEFT SIDE (2/3) */}
          <div className="lg:col-span-2 space-y-6">

            {/* MAIN BIG CARD */}
            <div className="bg-[hsl(243,27%,20%)] h-50 rounded-3xl flex flex-col items-center justify-center">
              <div className="flex gap-2 mb-3">
                <div className="w-2 h-2 bg-gray-200 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-200 rounded-full -mt-1"></div>
                <div className="w-2 h-2 bg-gray-200 rounded-full"></div>
              </div>
              <p className="text-gray-300 text-sm">Loading...</p>
            </div>

            {/* WEATHER DETAILS (Feels like, humidity, etc.) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['Feels Like', "Humidity", "Wind", "Precipitation"].map((value,idx) => (
                <div
                  key={idx}
                  className="bg-[hsl(243,27%,20%)] h-24 ps-4 rounded-2xl flex flex-col justify-center items-start gap-3"
                >
                  
                  <div >{value}</div>
                  <div>_</div>
                </div>
              ))}
            </div>

            {/* DAILY FORECAST */}
            <div>
              <div className="w-32 h-5 text-gray-100 text-xl mb-6">Daily forecast</div>
        
              <div className="grid grid-cols-7 gap-3">
                {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                  <div
                    key={i}
                    className="bg-[hsl(243,27%,20%)] h-40  rounded-2xl flex flex-col items-center"
                  >
                
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE – HOURLY FORECAST */}
          <div className="bg-[hsl(243,27%,20%)] p-6 rounded-3xl h-[34.1rem]">
            <div className="flex justify-between mb-4">
              <div className="w-32 h-5 "> Hourly forecast</div>
              <div className="w-10 h-6 flex items-center justify-center gap-2 p-2  bg-[hsl(243,23%,24%)] rounded">
                <p>-</p>
                <img  className="h-[0.35rem]" src="./assets/icon-dropdown.svg"/>
              </div>
            </div>

            <div className="space-y-3">
              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <div
                  key={i}
                  className="bg-[hsl(243,23%,24%)] rounded-xl h-14 p-4 flex justify-between items-center"
                >
                  
                </div>
              ))}
            </div>
          </div>

        </div>

  );
};

export default LoadingScreen;
