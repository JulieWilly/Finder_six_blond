import { create } from "zustand";

const getUserData = create((set) => ({
  userGitName: "",
  userGitData: null,
  // set the name and the data
  setUserGitName: (userGitName) => set({ userGitName }),
  setuserGitData: (userGitData) => set({ userGitData }),
  // function to fetch user data using the passed git name. and set it to user data.

  fetchUserName: async (userGitName) => {
    if (!userGitName) {
      return;
    } else {
      try {
        const fetchUserName = await fetch(
          `https://api.github.com/users/JullieWilly`
        );
        const userGitName = await fetchUserName.json();
        set({ userGitName });
      } catch (e) {
        console.error(e);
      }
    }
  },
}));

export default getUserData;
