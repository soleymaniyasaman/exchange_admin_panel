import React, { useContext } from 'react';
import { UserContext } from '../../../../../context/provider';
import Form from '../index'
import './style.scss';

const AdminsSelectedForm = () => {
  const data = useContext(UserContext);

  return (
    <div className="formsContainer">
      <Form />
    </div>
  );
}

export default AdminsSelectedForm;
