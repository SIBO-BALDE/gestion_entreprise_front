import React, { useState } from 'react'
import { ClipLoader, PropagateLoader, PulseLoader } from 'react-spinners';
import './LoadingBox.css';

export default function LoadingBox() {
    const [loading, setLoading] = useState(true);
  return (
    <div className="loading">
    <PulseLoader  color={"#3498db"} loading={true} size={10} />
  </div>
  )
}
