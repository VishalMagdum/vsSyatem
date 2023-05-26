import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function CollabRepos() {
  const [Repos, setRepos] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    getData()
  }, [])
  const getData = async () => {
    const response = await axios.get("https://vcsystem.onrender.com/collab/all")
    setRepos(response.data)

  }

  const Versions = (Repo) => {
    navigate(`/${Repo.Title}`, { state: { Repo } })
  }

  return (
    <div class="container" style={{ height: 700, width: "100%", padding: 20 }}>
      <table class="table" id="list">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
          </tr>
        </thead>
        <tbody>

          {Repos.map((Repo) => {
            return (
              <tr scope="row" key={Repo._id}>
                <td onClick={() => Versions(Repo)}>{Repo.Title}&nbsp; <i style={{ color: "grey" }} class="fa-solid fa-arrow-up-right-from-square"></i></td>
                <td>{Repo.Desc}</td>

              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  )

}
