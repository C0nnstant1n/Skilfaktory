import * as React from "react";
import LeftColumn from "./LeftColumn/LeftColumn";
import MiddleColumn from "./MiddleColumn/MiddleColumn";
import RightColumn from "./RightColumn/RightColumn";
import { useAppSelector, useAppDispatch } from "../hooks/redux";
import { fetchUsers } from "./store/reducers/ActionCreators";

export default function App() {
  const dispatch = useAppDispatch();
  const { users, isLoading, error } = useAppSelector(
    (state) => state.userReducer
  );

  React.useEffect(() => {
    dispatch(fetchUsers());
  });

  return (
    <div className='MainWrapper'>
      {isLoading && <h1>Загрузка</h1>}
      {error && <h1>{error}</h1>}
      {JSON.stringify(users, null, 2)}
      <LeftColumn />
      <MiddleColumn />
      <RightColumn />
    </div>
  );
}
