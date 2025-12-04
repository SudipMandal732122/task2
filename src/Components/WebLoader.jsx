import react from "react";
import LoadingScreen from "./LoadingScreen";
import Header from "./Header";
import SettingsDropdown from "./SettingsDropdown";
import SearchBar from "./SearchBar";

export default function WebLoader({props}){

    return(
        <div className="min-h-screen bg-[hsl(243,96%,9%)] text-white md:p-6">
      <div className="max-w-7xl min-[375px]:px-14 min-[375px]:pb-10 p-4 mx-auto">
        
        <div className="relative">
          <Header onSettingsClick={() => props.setShowSettings(!(props.showSettings))} />
          <SettingsDropdown 
            units={props.units}
            setUnits={props.setUnits}
            isVisible={props.showSettings}
          />
        </div>

        <SearchBar 
          searchQuery={props.searchQuery}
          setSearchQuery={props.setSearchQuery}
          onSearch={props.handleSearch}
          error={props.error}
        />
        {/* <div className="h-4 w-12 bg-gray-400"></div> */}
        {/* Render loading skeleton for the grid */}
        <LoadingScreen />
      </div>
    </div>
    )
}