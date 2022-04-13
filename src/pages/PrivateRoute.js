import React, { useEffect, useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
const USER_URL = "/api/v1/users/user/me";

// will remove later

const PrivateRoute = ({ children }) => {
  const [user, setUser] = useState();
  // const [fetching, setFetching] = useState(true);
  const mounted = useRef(false);
  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axios.get(USER_URL);
        setUser(data.user);
      } catch (err) {
        if (err.response.status === 401) {
          setUser(null);
        }
      }
      mounted.current = true;
    };

    getUser();
  }, []);

  if (!user && mounted.current) return <Navigate to="/" />;
  return <>{children}</>;
};
export default PrivateRoute;
