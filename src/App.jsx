import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import update from "immutability-helper";

import { images } from "./constants/data";
import Gallery from "./pages/Gallery";
import Navbar from "./components/Navbar";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import { ToastContainer, toast } from "react-toastify";

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [filteredImages, setFilteredImages] = useState(images);

  const auth = getAuth();

  //function handling logout
  const onLogout = async () => {
    //successful signout
    await signOut(auth)
      .then(() => {
        toast.success("Successfully logged out");
      })
      .catch((error) => {
        // errors
        toast.error("Error " + error);
      });
  };

  //authentication
  useEffect(() => {
    // Listen for changes in the user's authentication state
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    // Clean up the listener
    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false); // Set loading to false after the timeout
    }, 4000);

    // Clean up the timeout to prevent memory leaks
    return () => clearTimeout(timeout);
  }, []);

  //for image data
  useEffect(() => {
    setData(filteredImages);
    setLoading(true);
  }, []);

  // search
  useEffect(() => {
    const filtered = data.filter((image) =>
      image.tag.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredImages(filtered);
  }, [data, query]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const moveImage = (dragIndex, hoverIndex) => {
    // Get the dragged element
    const draggedImage = data[dragIndex];

    setData(
      update(data, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, draggedImage],
        ],
      })
    );
  };

  return (
    <>
      <ToastContainer />
      <Navbar onLogout={onLogout} user={user} />

      <Routes>
        <Route
          path="/"
          element={
            <Gallery
              loading={loading}
              data={filteredImages}
              user={user}
              query={query}
              moveImage={moveImage}
              handleInputChange={handleInputChange}
            />
          }
        />
        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<LogIn />} />
        <Route path="*" element={<Gallery />} />
      </Routes>
    </>
  );
};

export default App;
