import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { verifyAdmin } from "../api";

const AdminPanel = () => {
  const [isAdmin, updateAdmin] = useState(false);
  console.log("sup");

  useEffect(() => {
    const checkforAdmin = async () => {
      const { success, message } = await verifyAdmin();
      if (success && message) {
        console.log({ message });
        updateAdmin(true);
      }
    };
    checkforAdmin();
  }, []);
  console.log("Made the request for admin verification");
  if (!isAdmin) {
    return (
      <h1>
        `
        <iframe
          src="https://gfycat.com/ifr/ImpracticalTheseDingo"
          frameBorder="0"
          scrolling="no"
          width="720"
          height="484"
        ></iframe>
        `
      </h1>
    );
  }

  return <h1>Admin stuff goes here.</h1>;
};

export default AdminPanel;
