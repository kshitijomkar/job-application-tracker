import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './JobForm.module.css';

function AddJob() {
  const [formData, setFormData] = useState({
    jobTitle: '',
    companyName: '',
    applicationDate: '',
    interviewDate: '',
    status: 'Applied',
    notes: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        navigate('/dashboard');
      } else {
        const data = await res.json();
        setError(data.message || 'Failed to add job');
      }
    } catch (err) {
      setError('Failed to add job');
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.heading}>Add New Job</h2>
      {error && <p className={styles.errorMessage}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="jobTitle" className={styles.label}>Job Title</label>
          <input
            id="jobTitle"
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            required
            placeholder="Enter job title"
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="companyName" className={styles.label}>Company Name</label>
          <input
            id="companyName"
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            required
            placeholder="Enter company name"
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="applicationDate" className={styles.label}>Application Date</label>
          <input
            id="applicationDate"
            type="date"
            name="applicationDate"
            value={formData.applicationDate}
            onChange={handleChange}
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="interviewDate" className={styles.label}>Interview Date</label>
          <input
            id="interviewDate"
            type="date"
            name="interviewDate"
            value={formData.interviewDate}
            onChange={handleChange}
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="status" className={styles.label}>Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className={styles.select}
          >
            <option value="Applied">Applied</option>
            <option value="Interview Scheduled">Interview Scheduled</option>
            <option value="Rejected">Rejected</option>
            <option value="Accepted">Accepted</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="notes" className={styles.label}>Notes</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Additional notes (optional)"
            className={styles.textarea}
          />
        </div>

        <button type="submit" className={styles.button}>Add Job</button>
      </form>
    </div>
  );
}

export default AddJob;
