import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Dashboard.module.css';

function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  useEffect(() => {
    const fetchJobs = async () => {
      const token = localStorage.getItem('token');
      if (!token) return navigate('/');

      try {
        const res = await fetch('http://localhost:5000/api/jobs', {
          headers: { Authorization: token },
        });

        if (res.ok) {
          const data = await res.json();
          setJobs(data);
        } else {
          logout();
        }
      } catch (error) {
        console.error(error);
        logout();
      }
      setLoading(false);
    };

    fetchJobs();
  }, [navigate]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this job?')) return;

    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`http://localhost:5000/api/jobs/${id}`, {
        method: 'DELETE',
        headers: { Authorization: token },
      });

      if (res.ok) {
        setJobs(jobs.filter((job) => job._id !== id));
      } else {
        alert('Failed to delete the job');
      }
    } catch (error) {
      console.error('Error deleting job:', error);
      alert('Error deleting job');
    }
  };

  if (loading) return <p className={styles.loading}>Loading jobs...</p>;

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h2 className={styles.title}>Your Job Applications</h2>
        <div className={styles.actions}>
          <button onClick={() => navigate('/add-job')} className={styles.primaryBtn}>
            + Add Job
          </button>
          <button onClick={logout} className={styles.secondaryBtn}>
            Logout
          </button>
        </div>
      </header>

      {jobs.length === 0 ? (
        <p className={styles.empty}>No job applications found.</p>
      ) : (
        <div className={styles.jobGrid}>
          {jobs.map((job) => (
            <div key={job._id} className={styles.jobCard}>
              <div className={styles.cardHeader}>
                <h3 className={styles.jobTitle}>{job.jobTitle}</h3>
                <span className={`${styles.status} ${styles[job.status.toLowerCase().replace(/\s/g, '')]}`}>
                  {job.status}
                </span>
              </div>
              <p className={styles.companyName}>@ {job.companyName}</p>
              <div className={styles.cardActions}>
                <button
                  className={styles.editBtn}
                  onClick={() => navigate(`/edit-job/${job._id}`)}
                >
                  Edit
                </button>
                <button
                  className={styles.deleteBtn}
                  onClick={() => handleDelete(job._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
