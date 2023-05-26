import React, { useState, useEffect } from "react";
import axios from "axios";
import Popup from "./Popup";
import { useNavigate, useLocation } from "react-router-dom";

export default function Main() {

  const { state } = useLocation();
  const { _id, Title, Desc, User } = state.Repo;
  const [Version, setVersion] = useState([])
  const [isOpen, setIsOpen] = useState(false);
  const [Content, setContent] = useState("<h3> This Repository is Currently Empty ... </h3>");
  const navigate = useNavigate()
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  const handleCloseX = () => {
    setIsOpen(false)
  }

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    console.log(_id)
    const response = await axios.get(`https://vcsystem.onrender.com/version/all/${state.Repo._id}`)
    setVersion(response.data)
    if (response.data.length > 0) {
      getContent(response.data)
    }
  }
  const getContent = async (array) => {
    const obj = array[array.length - 1]
    const response = await axios.get(`https://vcsystem.onrender.com/version/${obj._id}`)
    console.log(response.data)
    setContent(response.data.Content)
  }
  const Edit = () => {
    state.Repo.Content = Content
    navigate(`/Edit/${state.Repo.Title}`, { state: { Repo: state.Repo } })
  }
  const getCon = async (id) => {
    const response = await axios.get(`https://vcsystem.onrender.com/version/${id}`)
    setContent(response.data.Content)

  }
  return (
    <div className="container" style={{ height: 700, width: "100%", padding: 20 }}>

      <div className="col d-flex justify-content-end gap-3">
        <button
          class="btn btn-primary"
          type="button"
          id="cource-btn"
          onClick={togglePopup}
          style={{ width: 80, height: 50 }}
        >
          Versions
        </button>
        <button
          class="btn btn-primary"
          style={{ width: 50, height: 50 }}
          type="button"
          id="cource-btn"
          onClick={Edit}
        >
          <i class="fa-solid fa-pen"></i>
        </button>
      </div>

      {isOpen && (
        <Popup
          content={
            <>
              <h4 style={{ textAlign: "center", marginBottom: 30 }}>
                Versionitory Detail
              </h4>
              <table class="table" id="list">
                <thead>
                  <tr>
                    <th scope="col">Version</th>
                  </tr>
                </thead>
                <tbody>

                  {Version.map((Repo, index) => {
                    return (
                      <tr scope="row" key={Repo._id}>
                        <td onClick={() => getCon(Repo._id)} style={{ cursor: "pointer" }}>Version: {index + 1}</td>
                        <td>{Repo.Desc}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </>
          }
          handleClose={handleCloseX}
        />
      )}
      <div dangerouslySetInnerHTML={{ __html: Content }}>

      </div>
    </div>
  )

}

