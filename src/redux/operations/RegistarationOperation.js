import { auth } from "../../config";

export const Registration = async ({ email, password }) => {
  const result = await auth.createUserWithEmailAndPassword(email, password);
  console.log(result);
};
