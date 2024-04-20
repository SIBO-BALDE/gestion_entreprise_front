import React from 'react'
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function Pagination() {
  return (
    <div style={{display:'flex', justifyContent:'flex-end',marginRight:'120px'}}>
        <div>
            <nav aria-label="Page navigation example" id='navigation'>
                <ul className="pagination" >
                <Link className="page-link"  to={'/'}  id='page-link1' >
                    <FontAwesomeIcon icon={faChevronLeft} id='iconpagination' /> 
                </Link>

                <Link className="page-link" id='page-link1' to={'/'} >
                  <FontAwesomeIcon icon={faChevronRight} id='iconpagination'/>
                </Link>
                </ul>
            </nav>
        </div>
    </div>
  )
}
