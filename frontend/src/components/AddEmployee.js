import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

const AddEmployee = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [position, setPosition] = useState('');
  const [department, setDepartment] = useState('');
  const [dateOfJoining, setDateOfJoining] = useState('');
  const [salary, setSalary] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const employeeData = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        position: position,
        department: department,
        date_of_joining: dateOfJoining,
        salary: salary,
      };

      const response = await API.post('/emp/employees', employeeData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      if (response.status === 201) {
        alert('Employee added successfully!');
        navigate('/employees'); // Redirect to the employees list
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('Failed to add employee. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Add Employee</h2>
      {errorMessage && <p className="text-danger">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="form-group mt-3">
          <label>Last Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="form-group mt-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group mt-3">
          <label>Position</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            required
          />
        </div>
        <div className="form-group mt-3">
          <label>Department</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
          />
        </div>
        <div className="form-group mt-3">
          <label>Date of Joining</label>
          <input
            type="date"
            className="form-control"
            value={dateOfJoining}
            onChange={(e) => setDateOfJoining(e.target.value)}
            required
          />
        </div>
        <div className="form-group mt-3">
          <label>Salary</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block mt-4">
          Add Employee
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;
