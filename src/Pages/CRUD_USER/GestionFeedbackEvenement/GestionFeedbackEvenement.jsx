import { faEye, faMagnifyingGlass, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Button, Form } from 'react-bootstrap'

export default function GestionFeedbackEvenement() {
  return (
    <div>
      <div className="d-flex justify-content-between mt-5">
        <div>
          <Button
            variant="primary"
            // onClick={handleShowEdit}
            className="ms-4"
            style={{ backgroundColor: "#004573", border: "none" }}
            id="buttonAjouter"
          >
            Ajouter un feedback évenement
          </Button>
        </div>
        <div className="flex-grow-1 d-flex justify-content-end ">
          <div className="champsRecherche mt-2 mb-3 w-50">
            <Form>
              <div
                className="input-group flex-nowrap "
                style={{ borderColor: "#004573" }}
              >
                <Form.Control
                  type="search"
                  className="form-control w-50   "
                  placeholder="Rechercher un feedback"
                  aria-label="user"
                  aria-describedby="addon-wrapping"
                  // value={searchValue}
                  // onChange={handleSearchChange}
                />
                <span
                  className="input-group-text text-white me-4"
                  id="addon-wrapping"
                  style={{ backgroundColor: "#004573" }}
                >
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </span>
              </div>
            </Form>
          </div>
        </div>
      </div>
      <div className="mt-4 ms-3  me-3">
        <h3>Liste des feedback donnée</h3>
        <table className="table border  border-1">
          <thead
            className=""
            id="hearder-color"
            style={{ backgroundColor: "#004573" }}
          >
            <tr>
              
              <th style={{ backgroundColor: "#004573", color: "#fff" }}>
              Date
              </th>
              
              <th
                className="d-flex  justify-content-center "
                style={{
                  backgroundColor: "#004573",
                  color: "#fff",
                  marginLeft: "3rem",
                }}
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>24/02/2024</td>
            {/* {currentMaisons &&
              currentMaisons.map((maison) => {  key={maison.id} {maison.image && (*/}
                {/* return ( */}

                {/* {currentEvents && currentEvents.map((eventEl) => (
                  <tr key={ eventEl && eventEl.id}>
                    <td>{ eventEl && eventEl.titre}</td>
                    <td>{ eventEl && eventEl.description}</td>
                    <td>{ eventEl && eventEl.date_debut}</td>
                    <td>{ eventEl && eventEl.date_fin}</td>
                    <td className="d-flex justify-content-evenly">
                     
                    </td> */}
                    <td className="d-flex justify-content-evenly">
                 
                        <Button
                          style={{
                            backgroundColor: "#fff",
                            border: "1px solid #004573",
                            color: "#004573",
                          }}
                          // onClick={() => supprimerEvent(eventEl.id)}
                        >
                          <FontAwesomeIcon icon={faEye} />
                        </Button>
                </td>
                  </tr>
                {/* ))} */}

          </tbody>
        </table>
        {/* <Pagination
          currentPageE={currentPageE}
          totalPaginationPages={totalPaginationPages}
          setCurrentPageE={setCurrentPageE}
          />   */}
      </div>

    </div>
  )
}
