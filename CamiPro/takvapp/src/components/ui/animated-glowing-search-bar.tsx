import React from "react";

const SearchComponent = () => {
  return (
    <div className="relative flex items-center justify-center">
      <div className="absolute z-[-1] h-min-screen w-full" />
      <div id="poda" className="group relative flex items-center justify-center">
        <div className="absolute z-[-1] h-full w-full max-h-[70px] max-w-[314px] overflow-hidden rounded-xl blur-[3px] before:absolute before:left-1/2 before:top-1/2 before:z-[-2] before:h-[999px] before:w-[999px] before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-[60deg] before:bg-[conic-gradient(#000,#402fb5_5%,#000_38%,#000_50%,#cf30aa_60%,#000_87%)] before:bg-no-repeat before:transition-all before:duration-[2000ms] group-focus-within:before:rotate-[420deg] group-focus-within:before:duration-[4000ms] group-hover:before:-rotate-[120deg]" />
        <div className="absolute z-[-1] h-full w-full max-h-[65px] max-w-[312px] overflow-hidden rounded-xl blur-[3px] before:absolute before:left-1/2 before:top-1/2 before:z-[-2] before:h-[600px] before:w-[600px] before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-[82deg] before:bg-[conic-gradient(rgba(0,0,0,0),#18116a,rgba(0,0,0,0)_10%,rgba(0,0,0,0)_50%,#6e1b60,rgba(0,0,0,0)_60%)] before:bg-no-repeat before:transition-all before:duration-[2000ms] group-focus-within:before:rotate-[442deg] group-focus-within:before:duration-[4000ms] group-hover:before:-rotate-[98deg]" />
        <div className="absolute z-[-1] h-full w-full max-h-[65px] max-w-[312px] overflow-hidden rounded-xl blur-[3px] before:absolute before:left-1/2 before:top-1/2 before:z-[-2] before:h-[600px] before:w-[600px] before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-[82deg] before:bg-[conic-gradient(rgba(0,0,0,0),#18116a,rgba(0,0,0,0)_10%,rgba(0,0,0,0)_50%,#6e1b60,rgba(0,0,0,0)_60%)] before:bg-no-repeat before:transition-all before:duration-[2000ms] group-focus-within:before:rotate-[442deg] group-focus-within:before:duration-[4000ms] group-hover:before:-rotate-[98deg]" />
        <div className="absolute z-[-1] h-full w-full max-h-[65px] max-w-[312px] overflow-hidden rounded-xl blur-[3px] before:absolute before:left-1/2 before:top-1/2 before:z-[-2] before:h-[600px] before:w-[600px] before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-[82deg] before:bg-[conic-gradient(rgba(0,0,0,0),#18116a,rgba(0,0,0,0)_10%,rgba(0,0,0,0)_50%,#6e1b60,rgba(0,0,0,0)_60%)] before:bg-no-repeat before:transition-all before:duration-[2000ms] group-focus-within:before:rotate-[442deg] group-focus-within:before:duration-[4000ms] group-hover:before:-rotate-[98deg]" />

        <div className="absolute z-[-1] h-full w-full max-h-[63px] max-w-[307px] overflow-hidden rounded-lg blur-[2px] before:absolute before:left-1/2 before:top-1/2 before:z-[-2] before:h-[600px] before:w-[600px] before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-[83deg] before:bg-[conic-gradient(rgba(0,0,0,0)_0%,#a099d8,rgba(0,0,0,0)_8%,rgba(0,0,0,0)_50%,#dfa2da,rgba(0,0,0,0)_58%)] before:bg-no-repeat before:brightness-[1.4] before:transition-all before:duration-[2000ms] group-focus-within:before:rotate-[443deg] group-focus-within:before:duration-[4000ms] group-hover:before:-rotate-[97deg]" />

        <div className="absolute z-[-1] h-full w-full max-h-[59px] max-w-[303px] overflow-hidden rounded-xl blur-[0.5px] before:absolute before:left-1/2 before:top-1/2 before:z-[-2] before:h-[600px] before:w-[600px] before:-translate-x-1/2 before:-translate-y-1/2 before:-rotate-[70deg] before:bg-[conic-gradient(#1c191c,#402fb5_5%,#1c191c_14%,#1c191c_50%,#cf30aa_60%,#1c191c_64%)] before:bg-no-repeat before:brightness-[1.3] before:transition-all before:duration-[2000ms] group-focus-within:before:rotate-[430deg] group-focus-within:before:duration-[4000ms] group-hover:before:-rotate-[110deg]" />

        <div id="main" className="group relative">
          <input
            placeholder="Search..."
            type="text"
            name="text"
            className="h-[56px] w-[301px] rounded-lg border-none bg-[#010201] px-[59px] text-lg text-white placeholder-gray-400 focus:outline-none"
          />
          <div
            id="input-mask"
            className="pointer-events-none absolute left-[70px] top-[18px] h-[20px] w-[100px] bg-gradient-to-r from-transparent to-black group-focus-within:hidden"
          />
          <div
            id="pink-mask"
            className="pointer-events-none absolute left-[5px] top-[10px] h-[20px] w-[30px] bg-[#cf30aa] blur-2xl opacity-80 transition-all duration-[2000ms] group-hover:opacity-0"
          />
          <div className="absolute right-[7px] top-[7px] h-[42px] w-[40px] overflow-hidden rounded-lg before:absolute before:left-1/2 before:top-1/2 before:h-[600px] before:w-[600px] before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-90 before:bg-[conic-gradient(rgba(0,0,0,0),#3d3a4f,rgba(0,0,0,0)_50%,rgba(0,0,0,0)_50%,#3d3a4f,rgba(0,0,0,0)_100%)] before:bg-no-repeat before:brightness-[1.35] before:animate-[spin_8s_linear_infinite]" />
          <div
            id="filter-icon"
            className="absolute right-2 top-2 z-[2] flex h-full max-h-10 w-full max-w-[38px] items-center justify-center overflow-hidden rounded-lg border border-transparent bg-gradient-to-b from-[#161329] via-black to-[#1d1b4b] [isolation:isolate]"
          >
            <svg
              preserveAspectRatio="none"
              height="27"
              width="27"
              viewBox="4.8 4.56 14.832 15.408"
              fill="none"
            >
              <path
                d="M8.16 6.65002H15.83C16.47 6.65002 16.99 7.17002 16.99 7.81002V9.09002C16.99 9.56002 16.7 10.14 16.41 10.43L13.91 12.64C13.56 12.93 13.33 13.51 13.33 13.98V16.48C13.33 16.83 13.1 17.29 12.81 17.47L12 17.98C11.24 18.45 10.2 17.92 10.2 16.99V13.91C10.2 13.5 9.97 12.98 9.73 12.69L7.52 10.36C7.23 10.08 7 9.55002 7 9.20002V7.87002C7 7.17002 7.52 6.65002 8.16 6.65002Z"
                stroke="#d6d6e6"
                strokeWidth="1"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div id="search-icon" className="absolute left-5 top-[15px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              className="feather feather-search"
            >
              <circle stroke="url(#search)" r="8" cy="11" cx="11" />
              <line stroke="url(#searchl)" y2="16.65" x2="16.65" y1="22" x1="22" />
              <defs>
                <linearGradient gradientTransform="rotate(50)" id="search">
                  <stop stopColor="#f8e7f8" offset="0%" />
                  <stop stopColor="#b6a9b7" offset="50%" />
                </linearGradient>
                <linearGradient id="searchl">
                  <stop stopColor="#b6a9b7" offset="0%" />
                  <stop stopColor="#837484" offset="50%" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchComponent;
