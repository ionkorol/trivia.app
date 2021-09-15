import firebase from "firebase";
import { UserProp } from "utils/interfaces";

export const signinAnonymously = () => firebase.auth().signInAnonymously();

export const signinCredentials = async (username: string, password: string) => {
  const res = await firebase
    .auth()
    .signInWithEmailAndPassword(`${username}@trivify.app`, password);
  return res.user?.toJSON() as firebase.User;
};

export const signupCredentials = async (
  name: string,
  username: string,
  password: string
) => {
  const creds = await firebase
    .auth()
    .createUserWithEmailAndPassword(`${username}@trivify.app`, password);
  if (creds.user) {
    create(creds.user.uid, name);
  }
};

export const signout = () => firebase.auth().signOut();

const create = (uid: string, name: string) => {
  firebase
    .firestore()
    .collection("users")
    .doc(uid)
    .set({
      id: uid,
      name,
      email: "",
      points: 0,
      rank: {
        current: null,
        change: 0,
      },
    } as UserProp);
};

export const update = async (data: UserProp) => {
  await firebase.firestore().collection("users").doc(data.id).update(data);
  return data;
};

export const updateCredentials = async (data: {
  username?: string;
  currentPassword: string;
  newPassword: string;
}) => {
  // Verify Auth
  const credentials = firebase.auth.EmailAuthProvider.credential(
    firebase.auth().currentUser?.email!,
    data.currentPassword
  );
  const userCredentials = await firebase
    .auth()
    .currentUser?.reauthenticateWithCredential(credentials);

  // Make changes
  const currentUsername = firebase
    .auth()
    .currentUser?.email?.replace("@trivify.app", "");
  if (data.username && data.username !== currentUsername) {
    await firebase
      .auth()
      .currentUser!.updateEmail(`${data.username}@trivify.app`);
  }

  if (data.newPassword) {
    await firebase.auth().currentUser?.updatePassword(data.newPassword);
  }

  return data;
};

export const linkEmailAuth = async (data: {
  username: string;
  password: string;
}) => {
  const credentials = firebase.auth.EmailAuthProvider.credential(
    `${data.username}@trivify.app`,
    data.password
  );

  return (await firebase.auth().currentUser?.linkWithCredential(credentials)!)
    .user;
};

export const checkNameAvailability = async (name: string) => {
  const user = firebase.auth().currentUser;
  if (user) {
    const query = await firebase
      .firestore()
      .collection("users")
      .where("name", "==", name)
      .limit(1)
      .get();

    console.log(query.docs);

    if (query.docs.length === 1) {
      if (query.docs[0].data().id === user.uid) {
        return true;
      }
      return false;
    } else if (query.docs.length > 1) {
      return false;
    }
    return true;
  } else {
    const query = await firebase
      .firestore()
      .collection("users")
      .where("name", "==", name)
      .limit(1)
      .get();
    if (query.docs.length > 0) {
      return false;
    } else {
      return true;
    }
  }
};
export const checkEmailAvailability = async (email: string) => {
  const user = firebase.auth().currentUser;
  if (user) {
    const query = await firebase
      .firestore()
      .collection("users")
      .where("email", "==", email)
      .limit(1)
      .get();
    if (query.docs.length === 1) {
      if (query.docs[0].data().id === user.uid) {
        return true;
      }
      return false;
    } else if (query.docs.length > 1) {
      return false;
    }
    return true;
  } else {
    const query = await firebase
      .firestore()
      .collection("users")
      .where("email", "==", email)
      .limit(1)
      .get();
    if (query.docs.length > 0) {
      return false;
    } else {
      return true;
    }
  }
};

export const errorHandler = (code: string) => {
  switch (code) {
    case "auth/user-not-found":
    case "auth/wrong-password":
      return "The username and/or password are invalid!";

    case "auth/too-many-requests":
      return "Account has been temporarily disabled due to too many failed login attempts!";
    default:
      return "Error";
  }
};
