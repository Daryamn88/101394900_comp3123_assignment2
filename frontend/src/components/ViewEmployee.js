import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../services/api';

const ViewEmployee = () => {
  const { id } = useParams(); // Extract employee ID from the URL
  const [employee, setEmployee] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the employee details when the component loads
    const fetchEmployee = async () => {
      try {
        const response = await API.get(`/emp/employees/${id}`);
        setEmployee(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchEmployee();
  }, [id]);

  if (!employee) {
    return <p>Loading employee details...</p>;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center">View Employee Details</h2>
      <div className="form-group">
        <label>First Name:</label>
        <p>{employee.first_name}</p>
      </div>
      <div className="form-group">
        <label>Last Name:</label>
        <p>{employee.last_name}</p>
      </div>
      <div className="form-group">
        <label>Email:</label>
        <p>{employee.email}</p>
      </div>
      <div className="form-group">
        <label>Position:</label>
        <p>{employee.position}</p>
      </div>
      <div className="form-group">
        <label>Department:</label>
        <p>{employee.department}</p>
      </div>
      <div className="form-group">
        <label>Date of Joining:</label>
        <p>{employee.date_of_joining.split('T')[0]}</p>
      </div>
      <div className="form-group">
        <label>Salary:</label>
        <p>{employee.salary}</p>
      </div>
      <button className="btn btn-secondary mt-4" onClick={() => navigate('/employees')}>
        Back to List
      </button>
    </div>
  );
};

export default ViewEmployee;
