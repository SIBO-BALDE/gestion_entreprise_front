import React from 'react'
import './ButtonDeco.css';

export default function ButtonDeco(props) {
  return (
    <div className='d-flex justify-content-center align-items-center mt-2 me-1 btn_deco_compo' id='btn_deco_compo'
       style={{width:'15px', height:'15px',borderRadius:'50%', backgroundColor: props.backgroundColor || 'white',
       animation: 'rotation 5s infinite linear'
       }}>
        <div style={{width:'10px', height:'10px',borderRadius:'50%', backgroundColor:'#FFB703'}}></div>
    </div>
  )
}
