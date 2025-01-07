// authUtils.ts

const getUserData = () => {
  const userDataToken = localStorage.getItem("qweldToken");
  try {
    return userDataToken ? JSON.parse(userDataToken) : null;
  } catch (error) {
    return null;
  }
};

const setUserData = (userData: string) => {
  localStorage.setItem("qweldToken", JSON.stringify(userData));
};

const removeUserData = () => {
  localStorage.removeItem("qweldToken");
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
