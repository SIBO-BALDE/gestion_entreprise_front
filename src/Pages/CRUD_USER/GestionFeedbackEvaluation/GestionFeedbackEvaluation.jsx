import { faEye, faMagnifyingGlass, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'

export default function GestionFeedbackEvaluation() {
  const [showAdd, setShowAdd] = useState(false);

  const handleClosAdd = () => setShowAdd(false); 
  const handleshowAdd = () => setShowAdd(true);
  return (
    <div>
      <div className="d-flex justify-content-between mt-5">
        <div>
          <Button
            variant="primary"
            onClick={handleshowAdd}
            className="ms-4"
            style={{ backgroundColor: "#004573", border: "none" }}
            id="buttonAjouter"
          >
            Evaluer un participant
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
                  placeholder="Rechercher un évaluation donné"
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
        <h3>Liste des évaluations donné</h3>
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
              <th style={{ backgroundColor: "#004573", color: "#fff" }}>
              Catégorie
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
              <td>20/02/2024</td>
              <td>Collegue</td>
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
          </tbody>
          
        </table>
        {/* <Pagination
          currentPageE={currentPageE}
          totalPaginationPages={totalPaginationPages}
          setCurrentPageE={setCurrentPageE}
          />   */}
          <div>
          <div className="d-flex justify-content-between mt-5">
       
        
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
                  placeholder="Rechercher un évaluation reçu"
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
            <h3>Liste des  évaluations reçu</h3>
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
              <th style={{ backgroundColor: "#004573", color: "#fff" }}>
              Catégorie
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
              <td>20/02/2024</td>
              <td>Collegue</td>
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
          </tbody>
          
            </table>
            {/* <Pagination
              ={currentPageE}
              totalPaginationPages={totalPaginationPages}
              setCurrentPageE={setCurrentPageE}
              />   */}
          </div>

      </div>


      <>
        <Modal
          show={showAdd}
          onHide={handleClosAdd}
          id="buttonAjouter"
        >
          <Modal.Header closeButton>
            <Modal.Title>Evaluer un participant </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
               
                
                
              <p>salu</p>
              <Form.Control
                 
                  type="text"
                  placeholder=""
                />
              <p>sa</p>
              <Form.Control
                 
                  type="text"
                  placeholder=""
                />
              <p>cc</p>
              <Form.Control
                 
                  type="text"
                  placeholder=""
                />

              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                 
              </Form.Group>
              

              
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              // onClick={ajouterEntreprise}
              style={{
                backgroundColor: "#004573",
                border: "none",
                width: "130px",
              }}
            >
              Ajouter
            </Button>
            <Button
              variant="primary"
              onClick={handleClosAdd}
              style={{
                backgroundColor: "#fff",
                border: "1px solid #004573",
                width: "130px",
                color: "#004573",
              }}
            >
              Fermer
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </div>
    
  )
}
