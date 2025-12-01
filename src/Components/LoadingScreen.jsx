import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="min-h-screen bg-[#0a1128] text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8 animate-pulse">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
            <div className="w-32 h-8 bg-gray-700 rounded"></div>
          </div>
          <div className="w-24 h-10 bg-gray-700 rounded-lg"></div>
        </div>

        <div className="text-center mb-8 animate-pulse">
          <div className="w-96 h-10 bg-gray-700 rounded mx-auto mb-6"></div>
          <div className="flex gap-2 max-w-2xl mx-auto">
            <div className="flex-1 h-14 bg-gray-700 rounded-lg"></div>
            <div className="w-32 h-14 bg-gray-700 rounded-lg"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gray-800 rounded-3xl p-8 h-64 animate-pulse">
              <div className="w-48 h-6 bg-gray-700 rounded mb-2"></div>
              <div className="w-64 h-4 bg-gray-700 rounded mb-8"></div>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-gray-700 rounded-full"></div>
                <div className="w-32 h-20 bg-gray-700 rounded"></div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-pulse">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="bg-gray-800 rounded-2xl p-6 h-28">
                  <div className="w-20 h-4 bg-gray-700 rounded mb-3"></div>
                  <div className="w-16 h-8 bg-gray-700 rounded"></div>
                </div>
              ))}
            </div>

            <div className="animate-pulse">
              <div className="w-32 h-6 bg-gray-700 rounded mb-4"></div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                {[1, 2, 3, 4, 5, 6, 7].map(i => (
                  <div key={i} className="bg-gray-800 rounded-2xl p-4 h-36">
                    <div className="w-12 h-4 bg-gray-700 rounded mx-auto mb-3"></div>
                    <div className="w-8 h-8 bg-gray-700 rounded-full mx-auto mb-3"></div>
                    <div className="w-10 h-5 bg-gray-700 rounded mx-auto mb-2"></div>
                    <div className="w-10 h-4 bg-gray-700 rounded mx-auto"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-3xl p-6 animate-pulse">
            <div className="flex items-center justify-between mb-6">
              <div className="w-32 h-6 bg-gray-700 rounded"></div>
              <div className="w-24 h-10 bg-gray-700 rounded-lg"></div>
            </div>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                <div key={i} className="bg-gray-700 rounded-xl p-4 h-14 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-gray-600 rounded-full"></div>
                    <div className="w-16 h-4 bg-gray-600 rounded"></div>
                  </div>
                  <div className="w-12 h-5 bg-gray-600 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;