import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../services/api';

const UpdateEmployee = () => {
  const { id } = useParams(); // Extract employee ID from the URL
  const [employee, setEmployee] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the employee details when the component loads
    const fetchEmployee = async () => {
      try {
        const response = await API.get(`/emp/employees/${id}`);
        setEmployee(response.data);
      } catch (err) {
        console.error(err);
        setErrorMessage('Failed to fetch employee details.');
      }
    };

    fetchEmployee();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/emp/employees/${id}`, employee, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      alert('Employee updated successfully!');
      navigate('/employees'); // Redirect back to the employees list
    } catch (err) {
      console.error(err);
      setErrorMessage('Failed to update employee. Please try again.');
    }
  };

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  if (!employee) {
    return <p>Loading employee details...</p>;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center">Update Employee</h2>
      {errorMessage && <p className="text-danger">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            className="form-control"
            name="first_name"
            value={employee.first_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mt-3">
          <label>Last Name</label>
          <input
            type="text"
            className="form-control"
            name="last_name"
            value={employee.last_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mt-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={employee.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mt-3">
          <label>Position</label>
          <input
            type="text"
            className="form-control"
            name="position"
            value={employee.position}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mt-3">
          <label>Department</label>
          <input
            type="text"
            className="form-control"
            name="department"
            value={employee.department}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mt-3">
          <label>Date of Joining</label>
          <input
            type="date"
            className="form-control"
            name="date_of_joining"
            value={employee.date_of_joining.split('T')[0]}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mt-3">
          <label>Salary</label>
          <input
            type="number"
            className="form-control"
            name="salary"
            value={employee.salary}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block mt-4">
          Update Employee
        </button>
      </form>
    </div>
  );
};

export default UpdateEmployee;
