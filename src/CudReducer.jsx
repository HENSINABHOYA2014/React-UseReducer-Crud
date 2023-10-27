import React, { useState, useEffect } from "react";

const Crud = () => {
  const [input, setInput] = useState({
    name: "",
    email: "",
  });
  const [record, setRecord] = useState([]);
  const [editId, setEditId] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    if (editId) {
      const updatedRecords = record.map((item) => {
        if (item.id === editId) {
          return {
            ...item,
            name: input.name,
            email: input.email,
          };
        }
        return item;
      });
      setRecord(updatedRecords);
      localStorage.setItem("crud", JSON.stringify(updatedRecords));
      setInput({
        name: "",
        email: "",
      });
      setEditId("");
    } else {
      const newObj = {
        id: Math.floor(Math.random() * 10000),
        name: input.name,
        email: input.email,
      };
      const updatedRecords = [...record, newObj];
      setRecord(updatedRecords);
      localStorage.setItem("crud", JSON.stringify(updatedRecords));
      setInput({
        name: "",
        email: "",
      });
    }
  };

  const deleteData = (id) => {
    const updatedRecords = record.filter((val) => val.id !== id);
    setRecord(updatedRecords);
    localStorage.setItem("crud", JSON.stringify(updatedRecords));
  };

  const editData = (id) => {
    const selectedRecord = record.find((val) => val.id === id);
    setInput(selectedRecord);
    setEditId(id);
  };

  useEffect(() => {
    const allrecord = JSON.parse(localStorage.getItem("crud"));
    if (allrecord === null) {
      setRecord([]);
    } else {
      setRecord(allrecord);
    }
  }, []);

  return (
    <>
      <center>
        <table>
          <tbody>
            <tr>
              <td>Name:-</td>
              <td>
                <input
                  type="text"
                  value={input.name}
                  name="name"
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>Email:-</td>
              <td>
                <input
                  type="text"
                  value={input.email}
                  name="email"
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                {editId ? (
                  <input type="button" value="Edit" onClick={handleSubmit} />
                ) : (
                  <input type="button" value="Submit" onClick={handleSubmit} />
                )}
              </td>
            </tr>
          </tbody>
        </table>
        <br /> <br />
        <table border={1}>
          <tbody>
            <tr>
              <td>Id</td>
              <td>Name</td>
              <td>Email</td>
              <td>Action</td>
            </tr>
            {record.map((val) => {
              const { id, name, email } = val;
              return (
                <tr key={id}>
                  <td>{id}</td>
                  <td>{name}</td>
                  <td>{email}</td>
                  <td>
                    <button onClick={() => deleteData(id)}>Delete</button>
                    <button onClick={() => editData(id)}>Edit</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </center>
    </>
  );
};

export default Crud;
