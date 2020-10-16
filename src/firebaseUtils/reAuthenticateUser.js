import { fb, auth } from "@/firebaseConfig.js";

export default function reAuthenticateUser(password) {
  return new Promise((resolve, reject) => {
    let user = auth.currentUser;
    const credentials = fb.auth.EmailAuthProvider.credential(
      user.email,
      password
    );
    user
      .reauthenticateWithCredential(credentials)
      .then((user) => resolve(user))
      .catch((error) => reject(error));
  });
}
