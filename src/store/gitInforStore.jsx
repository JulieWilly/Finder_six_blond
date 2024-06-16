import { create } from "zustand";

const getUserData = create((set) => ({
  userGitName: "github",
  userGitData: {},

  // set the name and the data
  setUserGitName: (userGitName) => set({ userGitName }),
  setuserGitData: (userGitData) => set({ userGitData }),
  // function to fetch user data using the passed git name. and set it to user data.
  error: null,
  fetchData: async (userGitName, checkError = false) => {
    if (!userGitName) {
      return;
    }
    try {
      const fetchUserData = await fetch(
        `https://api.github.com/users/${userGitName}`,
      );

      if (!fetchUserData.ok) {
        throw new Error("No useer has been found");
      }
      const data = await fetchUserData.json();

      set({ userGitData: data, userGitName });
    } catch (error) {
      if (checkError) {
        set({ error: error.message, userGitData: null, userGitName: null });
      }
    }
  },
}));

export default getUserData;
