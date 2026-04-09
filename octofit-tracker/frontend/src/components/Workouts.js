import React, { useEffect, useState } from 'react';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const endpoint = `${process.env.REACT_APP_CODESPACE_NAME ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/` : '/api/workouts/'}`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log('Workouts endpoint:', endpoint);
        console.log('Fetched workouts:', data);
        if (Array.isArray(data)) setWorkouts(data);
        else if (data && Array.isArray(data.results)) setWorkouts(data.results);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [endpoint]);

  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-title mb-4">Workouts</h2>
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Duration</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {workouts.length === 0 ? (
                <tr><td colSpan="4" className="text-center">No workouts found.</td></tr>
              ) : (
                workouts.map((workout, idx) => (
                  <tr key={workout.id || idx}>
                    <td>{idx + 1}</td>
                    <td>{workout.name || '-'}</td>
                    <td>{workout.duration || '-'}</td>
                    <td>
                      <button className="btn btn-primary btn-sm me-2">View</button>
                      <button className="btn btn-secondary btn-sm">Edit</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Workouts;
