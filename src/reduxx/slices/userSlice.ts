import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from "@reduxjs/toolkit";
import firebase from "firebase";
import { UserProp } from "utils/interfaces";
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
  NumberDictionary,
} from "unique-names-generator";
import { RootState } from "reduxx/store";
import * as userAPI from "lib/user";

const initialState: {
  loading: boolean;
  data: UserProp | null;
  credentials: firebase.User | null;
  error: {
    signin: SerializedError | null;
    signup: SerializedError | null;
    updating: SerializedError | null;
  };
} = {
  loading: false,
  data: null,
  credentials: null,
  error: {
    signin: null,
    signup: null,
    updating: null,
  },
};

export const createUser = createAsyncThunk(
  "user/create",
  async (data: UserProp, thunkAPI) => {
    await firebase.firestore().collection("users").doc(data.id).set(data);
    return data;
  }
);

export const addUserPoints = createAsyncThunk<
  number,
  number,
  { state: RootState }
>("user/update", async (points: number, thunkAPI) => {
  await firebase
    .firestore()
    .collection("users")
    .doc(thunkAPI.getState().user.data?.id)
    .update({
      points: firebase.firestore.FieldValue.increment(points),
    });
  return points;
});

export const readUser = createAsyncThunk(
  "user/read",
  async (uid: string, thunkAPI) => {
    const userSnap = await firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .get();
    if (userSnap.exists) {
      return userSnap.data() as UserProp;
    } else {
      const numberDictionary = NumberDictionary.generate({
        min: 100,
        max: 999,
      });

      return await thunkAPI
        .dispatch(
          createUser({
            id: uid,
            name: uniqueNamesGenerator({
              dictionaries: [adjectives, colors, animals, numberDictionary],
              separator: " ",
              style: "capital",
            }),
            email: "",
            points: 0,
            rank: {
              change: 0,
              current: null,
            },
          })
        )
        .unwrap();
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/update",
  async (data: UserProp) => {
    return await userAPI.update(data);
  }
);

export const saveAccount = createAsyncThunk(
  "user/saveAccount",
  async (data: { username: string; password: string }) => {
    return await userAPI.linkEmailAuth(data);
  }
);

export const updateCredentials = createAsyncThunk(
  "user/updateCredentials",
  async (data: any) => {
    const res = await userAPI.updateCredentials(data);
    await firebase.auth().currentUser?.reload();
    return res;
  }
);

export const signinCredentials = createAsyncThunk(
  "user/signinCredentials",
  async (data: { username: string; password: string }) =>
    await userAPI.signinCredentials(data.username, data.password)
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserCredentials: (state, action) => {
      state.credentials = action.payload;
    },
    setUserData: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createUser.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.error.signup = null;
      state.loading = false;
    });
    builder.addCase(createUser.rejected, (state, { error }) => {
      state.error.signup = error;
      state.loading = false;
    });

    builder.addCase(readUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(readUser.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.error.signin = null;
      state.loading = false;
    });
    builder.addCase(readUser.rejected, (state, { error }) => {
      state.error.signin = error;
      state.loading = false;
    });

    builder.addCase(updateUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateUser.fulfilled, (state, { payload }) => {
      state.data = { ...state.data, ...payload };
      state.error.updating = null;
      state.loading = false;
    });
    builder.addCase(updateUser.rejected, (state, { error }) => {
      state.error.updating = error;
      state.loading = false;
    });
    builder.addCase(saveAccount.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(saveAccount.fulfilled, (state, { payload }) => {
      state.credentials = payload;
      state.error.updating = null;
      state.loading = false;
    });
    builder.addCase(saveAccount.rejected, (state, { error }) => {
      state.error.updating = error;
      state.loading = false;
    });
    builder.addCase(updateCredentials.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateCredentials.fulfilled, (state, { payload }) => {
      state.error.updating = null;
      state.loading = false;
    });
    builder.addCase(updateCredentials.rejected, (state, { error }) => {
      state.error.updating = error;
      state.loading = false;
    });
    builder.addCase(signinCredentials.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signinCredentials.fulfilled, (state, { payload }) => {
      state.credentials = payload;
      state.error.signin = null;
      state.loading = false;
    });
    builder.addCase(signinCredentials.rejected, (state, { error }) => {
      state.error.signin = error;
      state.loading = false;
    });
  },
});

export default userSlice.reducer;
export const { setUserCredentials, setUserData } = userSlice.actions;
