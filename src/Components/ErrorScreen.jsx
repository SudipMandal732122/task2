import React from 'react';


const ErrorScreen = ({ onRetry ,showSettings ,setShowSettings }) => {
  return (


    <div className="min-h-screen bg-[hsl(243,96%,9%)] flex pt-6 justify-center">
      

      <div className=" max-w-[34vw] text-center">
        <div className="text-6xl mb-4 flex justify-center">
          <img className='h-6' src='./assets/icon-error.svg'/>
        </div>
        <h1 className="text-white text-3xl font-bold mb-4">Something went wrong</h1>
        <p className="text-gray-300 mb-6">
          We couldn't connect to the server (API error). Please try again in a few moments.
        </p>
        <button 
          onClick={onRetry}
          className="bg-[hsl(243,23%,24%)] text-white px-3 py-2 rounded-lg hover:bg-[hsl(243,27%,20%)] transition-colors cursor-pointer"
        ><div className='flex gap-2'>
          <img src="./assets/icon-retry.svg"/> 
          <span>Retry</span>
        </div>
          
        </button>
      </div>
    </div>
    

  );
};

export default ErrorScreen;