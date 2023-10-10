import { IUser } from "../../models/IUser";
import { AppDispatch } from "../store";
import axios from "axios";
import { userSlice } from "./UserSlice";

export const fetchUsers = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(userSlice.actions.usersFetching());
    const response = await axios.get<IUser[]>(
      "https://jsonplaceholder.typicode.com1/users"
    );
    dispatch(userSlice.actions.usersFetchingSuccess(response.data));
  } catch (e) {
    dispatch(userSlice.actions.usersFetchingError(e.message));
  }
};
