export const authenticateUser = (user: any) => {
  try {
    if (
      user &&
      user.email === "fawad@rumilabs.ai" &&
      user.password === "rumilabs@pakistan123"
    )
      return true;
    return false;
  } catch (e: any) {
    return false;
  }
};
