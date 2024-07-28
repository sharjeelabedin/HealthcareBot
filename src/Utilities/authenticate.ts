export const authenticateUser = (user: any) => {
  try {
    let findUser: IUser | undefined = users.find((x: IUser) => x.email === user.email);
    if (findUser && findUser.password === user.password) return true;
    return false;
  } catch (e: any) {
    return false;
  }
};

interface IUser {
  email: string;
  password: string;
}

let users: IUser[] = [
  {
    email: "fawad@rumilabs.ai",
    password: "rumilabs@pakistan123",
  },
  {
    email: "user1@rumilabs.ai",
    password: "Admin123",
  },
];
