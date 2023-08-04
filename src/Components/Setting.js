"use client";
import { useState, useRef, useEffect } from "react";
import Loading from "../Components/Loading";
import { toast } from "react-toastify";
export default function Setting({ handleLogOut, user, id }) {
  // States
  const [image, setImage] = useState("");
  const [currentUser, setCurrentUser] = useState(user);
  const [usernameExists, setUsernameExists] = useState(null);

  // Ref
  const timerRef = useRef(null);
  const imageRef = useRef();

  // Handling Image Uploading
  const handleImageChange = (e) => {
    const file = URL.createObjectURL(e.target.files[0]);
    setImage(file);
    setCurrentUser({ ...currentUser, image: image });
  };

  // Handling Image click
  const handleImageClick = () => {
    imageRef.current.click();
  };

  // Function to check if the username exists
  const checkUsernameExists = async (username) => {
    try {
      const response = await fetch(`/api/users/checkusername/byusername/${username}`);
      const data = await response.json()
      if (data.foundUsername) {
        setUsernameExists(true); // Username exist
      } else {
        setUsernameExists(false); // Username does not exists
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Handling username change
  const handleUserNameChange = (e) => {
    const newUsername = e.target.value;
    setCurrentUser({ ...currentUser, username: newUsername });

    // Clear the previous timer
    clearTimeout(timerRef.current);

    if (newUsername !== user.username) {
      // Set a new timer to delay API call
      timerRef.current = setTimeout(() => {
        checkUsernameExists(newUsername);
      }, 500); // Adjust the delay time as needed
    }
    else{
      setUsernameExists(null);
    }
  };

  // Updating information
  const updateUserInfo = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/users/updateUser/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          username: currentUser.username,
          email: currentUser.email,
          image: currentUser.image,
          given_name: currentUser.given_name,
          family_name: currentUser.family_name,
          about: currentUser.about,
        }),
      });
      if (response.status === 200) {
        toast.success("Updated Successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Use Effect
  useEffect(() => {
    if (user) {
      setCurrentUser(user);
    }
  }, [user]);

  // if user is not available
  if (!user) {
    return <Loading />; // Replace this with your loading component or placeholder
  }
  return (
    <div className="w-3/4 h-full bg-gray-900 text-white rounded-xl flex flex-col">
      <div className="flex p-10 items-start justify-center gap-16">
        <div className="w-2/6 py-8 flex flex-col">
          <span>Personal Information</span>
          <span className="text-gray-400 text-xs">
            Use a permanent address where you can receive mail.
          </span>
        </div>
        <div className="w-full p-4">
          <form className="h-full w-full" onSubmit={updateUserInfo}>
            <div className="flex gap-10">
              <div className="border-2 rounded-full border-gray-500 p-1 w-48 mb-6 ml-4 flex items-center justify-center">
                <input
                  type="file"
                  className="hidden"
                  onChange={handleImageChange}
                  ref={imageRef}
                />
                <img
                  src={image || user.image}
                  alt="d"
                  className="sm:h-32 sm:w-32 h-14 w-14 rounded-full cursor-pointer object-cover"
                  onClick={handleImageClick}
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="first-name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  First Name
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    id="first-name"
                    value={currentUser.given_name || ""}
                    onChange={(e) => {
                      setCurrentUser({
                        ...currentUser,
                        given_name: e.target.value,
                      });
                    }}
                    className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <label
                  htmlFor="last-name"
                  className="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Last Name
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    id="last-name"
                    value={currentUser.family_name || ""}
                    onChange={(e) => {
                      setCurrentUser({
                        ...currentUser,
                        family_name: e.target.value,
                      });
                    }}
                    className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Last name"
                  />
                </div>
              </div>
            </div>
            <label
              htmlFor="about-user"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              About
            </label>
            <textarea
              id="about-user"
              rows="3"
              value={currentUser.about || ""}
              onChange={(e) =>
                setCurrentUser({ ...currentUser, about: e.target.value })
              }
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="About yourself"
            ></textarea>
            <label
              htmlFor="username"
              className="block mt-8 mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Username
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                </svg>
              </span>
              <input
                type="text"
                id="username"
                value={currentUser.username || ""}
                onChange={handleUserNameChange}
                className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            {usernameExists === null ? (
              <></>
            ): usernameExists ? (
              <p className="text-sm mt-1 text-red-700">
                Username already taken
              </p>
            ) : (
              <p className="text-sm mt-1 text-green-700">
                Username available
              </p>
            )}
            <label
              htmlFor="user-email"
              className="block mt-8 mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your Email
            </label>
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 16"
                >
                  <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                  <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                </svg>
              </div>
              <input
                type="email"
                id="user-email"
                value={currentUser.email || ""}
                onChange={(e) =>
                  setCurrentUser({ ...currentUser, email: e.target.value })
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                disabled
              />
            </div>
            <div className="flex gap-8 items-center justify-start">
              <button
                type="submit"
                disabled={usernameExists || currentUser === user}
                className={`text-white focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2  ${usernameExists || currentUser === user ? "bg-gray-700" : "bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 hover:bg-blue-800"}`}
              >
                Save
              </button>
              <button
                type="reset"
                className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                onClick={() => {
                  setImage(null);
                  setCurrentUser(user);
                  toast.warn("Canceled", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                  });
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="flex p-10 border-t-2 border-gray-500 gap-16">
        <div className="w-2/6 py-8 flex flex-col">
          <span>Reset Password</span>
          <span className="text-gray-400 text-xs">
            Update your password associated with your account.
          </span>
        </div>
        <div className="w-full p-4">
          <form>
            <label
              htmlFor="first-name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Current Password
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                <i className="fa-solid fa-lock"></i>
              </span>
              <input
                type="text"
                id="first-name"
                className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Current Password"
              />
            </div>
            <label
              htmlFor="first-name"
              className="block mb-2 mt-4 text-sm font-medium text-gray-900 dark:text-white"
            >
              New Password
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                <i className="fa-solid fa-lock"></i>
              </span>
              <input
                type="text"
                id="first-name"
                className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="New Password"
              />
            </div>
            <label
              htmlFor="last-name"
              className="block mb-2 mt-4 text-sm font-medium text-gray-900 dark:text-white"
            >
              Confirm Password
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                <i className="fa-solid fa-lock"></i>
              </span>
              <input
                type="text"
                id="last-name"
                className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Confirm Password"
              />
            </div>
            <div className="flex gap-8 items-center justify-start mt-6">
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Change
              </button>
              <button
                type="reset"
                className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="flex p-6 px-10 border-t-2 border-gray-500 gap-16">
        <div className="w-2/6 py-8 flex flex-col">
          <span>Log Out</span>
          <span className="text-gray-400 text-xs">Log Out your session .</span>
        </div>
        <div className="w-full p-4 flex items-center justify-start">
          <button
            type="button"
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 h-10 "
            onClick={handleLogOut}
          >
            Log Out<i className="fa-solid fa-right-from-bracket ml-4"></i>
          </button>
        </div>
      </div>
      <div className="flex p-6 px-10 border-t-2 border-gray-500 gap-16">
        <div className="w-2/6 py-8 flex flex-col">
          <span>Delete Account</span>
          <span className="text-gray-400 text-xs">
            No longer want to use our service? You can delete your account here.
            This action is not reversible. All information related to this
            account will be deleted permanently.
          </span>
        </div>
        <div className="w-full p-4 flex items-center justify-start">
          <button
            type="button"
            className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            Yes, delete my account
          </button>
        </div>
      </div>
    </div>
  );
}
