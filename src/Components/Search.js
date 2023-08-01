"use client";
import { useState } from "react";

export default function Search({
  setUsers,
  setSearchProg,
  setDataLoading,
  fetchUsers,
}) {
  const [searchInput, setSearchInput] = useState("");

  const fetchSearchedUser = async (searchInput) => {
    try {
      setDataLoading(true);
      const response = await fetch(`/api/users/findUser/${searchInput}`);
      const data = await response.json();
      setDataLoading(false);
      Array.isArray(data) ? setUsers(data) : setUsers([data]);
    } catch (error) {
      console.log("failed to get quotes", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSearchProg(true);
    if (searchInput === "") {
      fetchUsers();
    } else {
      fetchSearchedUser(searchInput);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex items-center justify-between p-2 border-2 border-slate-700 rounded-lg"
    >
      <input
        type="text"
        className="bg-transparent outline-none"
        placeholder="Search Users"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <button className="p-2" type="submit">
        <svg
          className="w-4 h-4 text-gray-400 dark:text-gray-300"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
      </button>
      {/* <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              value={searchInput}
              onChange={(e)=>setSearchInput(e.target.value)}
              className="block w-full sm:p-2 p-2 pl-8 sm:pl-14 sm:text-lg text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-16"
              placeholder="Search Users"
            />
            <button
              type="submit"
              className="text-white absolute right-2.5 bottom-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:px-4 sm:py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:h-10"
            >
              Search
            </button>
          </div> */}
    </form>
  );
}
