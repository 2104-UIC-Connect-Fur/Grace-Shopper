import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Table, Container } from "react-bootstrap";
import { verifyAdmin, getAllUsersData } from "../api";
import { store } from "./State";

const AdminPanel = () => {
  const { state } = useContext(store);
  const [isAdmin, updateAdmin] = useState(false);
  const { username } = state;
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    const checkforAdmin = async () => {
      const { success, message } = await verifyAdmin();

      if (success && message) {
        console.log({ message });
        updateAdmin(true);

        const { users } = await getAllUsersData();
        setUsersData(users);
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
    <>
      <h1>Users</h1>
      <Container>
        <Table striped bordered size="sm">
          <thead>
            <tr>
              {usersData.length > 0 &&
                Object.keys(usersData[0]).map((key) => <th>{key}</th>)}
            </tr>
          </thead>
          <tbody>
            {usersData.length > 0 &&
              usersData.map((user) => (
                <tr>
                  {Object.values(user).map((value) =>
                    typeof value === "boolean" ? (
                      <td>{value.toString()}</td>
                    ) : (
                      <td>{value}</td>
                    )
                  )}
                </tr>
              ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default AdminPanel;
