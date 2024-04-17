import React from 'react'

export default function ButtonDeco(props) {
  return (
    <div className='d-flex justify-content-center align-items-center mt-2 me-1' 
       style={{width:'15px', height:'15px',borderRadius:'50%', backgroundColor: props.backgroundColor || 'white'}}>
        <div style={{width:'10px', height:'10px',borderRadius:'50%', backgroundColor:'#FFB703'}}></div>
    </div>
  )
}
