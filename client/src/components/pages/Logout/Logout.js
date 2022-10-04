import { API_URL } from "../../../config";
import { logOut } from "../../../redux/usersRedux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const Logout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const options = {
      method: "DELETE",
      credentials: "include",
    };
    fetch(`${API_URL}/auth/logout`, options)
      .then(() => {
        dispatch(logOut());
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return null;
};

export default Logout;
