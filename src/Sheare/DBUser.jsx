import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";

export default function DBUser() {
  const { user } = useContext(AuthContext);
  const [dbUser, setDbUser] = useState(null);
  const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (user?.email) {
//       fetch(`${import.meta.env.VITE_API}/users/${user.email}`)
//         .then((res) => res.json())
//         .then((data) => {
//           setDbUser(data);
//           setLoading(false);
//         });
//     } else {
//       setLoading(false);
//     }
//   }, [user]);

  useEffect(() => {
    const fetchDBUser = async () => {
      if (!user?.email) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API}/users/${user.email}`
        );
        setDbUser(data);
      } catch (error) {
        console.error("Failed to fetch DB User:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDBUser();
  }, [user]);

  return { user, dbUser, role: dbUser?.role, loading };
}
