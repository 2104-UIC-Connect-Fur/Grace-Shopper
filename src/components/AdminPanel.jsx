import React, { useEffect, useState, useContext } from "react";
import Container from "react-bootstrap/Container";
import { useParams } from "react-router-dom";
import { verifyAdmin } from "../api";
import { store } from "./State";

const AdminPanel = () => {
  const { state } = useContext(store);
  const [isAdmin, updateAdmin] = useState(false);
  const { username } = state;

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
        />
        `
      </h1>
    );
  }

  return (
    <Container>
      <h1>Hello admin, {username} </h1>
    </Container>
  );
};

export default AdminPanel;
