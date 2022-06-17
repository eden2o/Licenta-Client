import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TbArrowBackUp } from 'react-icons/tb';

export default function Back() {
  let navigate = useNavigate();
  return (
    <button onClick={() => navigate(-1)} className={`back`} aria-label='Back Button'>
      <TbArrowBackUp />
    </button>
  );
}
