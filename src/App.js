import "./App.css";
import { useEffect, useState } from "react";
import delett from "./assets/delete.png";
import editt from "./assets/edit.png";

function App() {
  let init;
  if (localStorage.getItem("info") === null) {
    init = [];
  } else {
    init = JSON.parse(localStorage.getItem("info"));
  }
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [data, setdata] = useState(init);
  const [edit, setEdit] = useState(false);

  const Save = () => {
    if (newName && newPhone) {
      const newData = {
        id: data.length + 1,
        name: newName,
        Phone: newPhone,
      };
      setdata([...data, newData]);
      setNewName("");
      setNewPhone("");
    }
  };

  const Delete = (id) => {
    const deletData = data.filter((data) => data.id != id);
    setdata(deletData);
  };

  const Edit = (item) => {
    setEdit(item);
    setNewName(item.name);
    setNewPhone(item.Phone);
  };

  const Update = () => {
    if (newName && newPhone) {
      const updatedData = data.map((item) =>
        item.id === edit.id ? { ...item, name: newName, Phone: newPhone } : item
      );
      setdata(updatedData);
      setEdit(false);
      setNewName("");
      setNewPhone("");
    }
  };

  useEffect(() => {
    const storeData = localStorage.getItem("info");
    const dataSet = JSON.parse(storeData);
    if (dataSet) {
      setdata(dataSet);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("info", JSON.stringify(data));
  }, [data]);

  return (
    <div className="form">
      <div className="main_data">
        <div className="new-data">
          <h1>Contact</h1>

          <div className="Save">
            <div className="input">
              <h3>New Name</h3>
              <input
                type="Text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              ></input>
            </div>
            <div className="input">
              <h3>New Phone</h3>
              <input
                type="Number"
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
              ></input>
            </div>
            <button onClick={edit ? Update : Save}>
              {edit ? "Update" : "Save"}
            </button>
          </div>
        </div>
      </div>
      <div className="Table">
        <table>
          {data.length > 0 ? (
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Action</th>
              </tr>
            </thead>
          ) : null}
          <tbody>
            {data.map((item) => {
              return (
                <tr key={item.id} className="data-row">
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.Phone}</td>
                  <td className="action">
                    <button onClick={() => Delete(item.id)} className="del">
                      <img src={delett}></img>
                    </button>

                    <button onClick={() => Edit(item)} className="edit">
                      <img src={editt}></img>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
