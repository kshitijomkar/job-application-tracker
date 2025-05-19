import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './JobForm.module.css';

function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: '',
    jobTitle: '',
    status: 'Applied',
    interviewDate: '',
    notes: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJob = async () => {
      const token = localStorage.getItem('token');
      if (!token) return navigate('/');

      try {
        const res = await fetch('http://localhost:5000/api/jobs', {
          headers: { Authorization: token },
        });
        const data = await res.json();
        const job = data.find((job) => job._id === id);

        if (!job) return navigate('/dashboard');

        setFormData({
          companyName: job.companyName,
          jobTitle: job.jobTitle,
          status: job.status,
          interviewDate: job.interviewDate?.substring(0, 10) || '',
          notes: job.notes || '',
        });
        setLoading(false);
      } catch (err) {
        console.error(err);
        navigate('/');
      }
    };

    fetchJob();
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const res = await fetch(`http://localhost:5000/api/jobs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        navigate('/dashboard');
      } else {
        const errData = await res.json();
        setError(errData.message || 'Failed to update job');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Error updating job');
    }
  };

  if (loading) return <p className={styles.loading}>Loading job details...</p>;

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.heading}>Edit Job</h2>
      {error && <p className={styles.errorMessage}>{error}</p>}
      <form onSubmit={handleSubmit}>
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

        <button type="submit" className={styles.button}>Update Job</button>
      </form>
    </div>
  );
}

export default EditJob;
