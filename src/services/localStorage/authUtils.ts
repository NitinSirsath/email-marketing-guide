// authUtils.ts

const getUserData = () => {
  const userDataToken = localStorage.getItem("userToken");
  try {
    return userDataToken ? JSON.parse(userDataToken) : null;
  } catch (error) {
    return null;
  }
};

const setUserData = (userData: string) => {
  localStorage.setItem("userToken", JSON.stringify(userData));
};

const removeUserData = () => {
  localStorage.removeItem("userToken");
};

//user

const getUserInfo = () => {
  const userDataToken = localStorage.getItem("userProfileInfo");
  try {
    return userDataToken ? JSON.parse(userDataToken) : null;
  } catch (error) {
    return null;
  }
};

const setUserProfileInfo = (userInfo: any) => {
  localStorage.setItem("userProfileInfo", JSON.stringify(userInfo));
};

const removeUserInfo = () => {
  localStorage.removeItem("userProfileInfo");
};

export {
  getUserData,
  setUserData,
  removeUserData,
  getUserInfo,
  setUserProfileInfo,
  removeUserInfo,
};
