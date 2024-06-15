import { create } from "zustand";

const getUserData = create((set) => ({
  userGitName: "github",
  userGitData: {},
  // set the name and the data
  setUserGitName: (userGitName) => set({ userGitName }),
  setuserGitData: (userGitData) => set({ userGitData }),
  // function to fetch user data using the passed git name. and set it to user data.

  fetchData: async (userGitName) => {
    if (!userGitName) {
      return;
    }
    try {
      const fetchUserData = await fetch(
        `https://api.github.com/users/${userGitName}`
      );
      const data = await fetchUserData.json();

      set({ userGitData: data, userGitName });
    } catch (e) {
      console.error("Failed to fetch user data", e);
    }
  },
}));

export default getUserData;
