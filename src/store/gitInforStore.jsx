import { create } from "zustand";

const getUserData = create((set) => ({
  userGitName: [],
  fetchUserName: async () => {
    const fetchUserName = await fetch(`https://api.github.com/users/`);
    const userGitName = await fetchUserName.json();

    set({ userGitName });
  },
}));

export default getUserData;
