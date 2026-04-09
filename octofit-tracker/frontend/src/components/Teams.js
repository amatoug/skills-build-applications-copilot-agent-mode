import React, { useEffect, useState } from 'react';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const endpoint = `${process.env.REACT_APP_CODESPACE_NAME ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/` : '/api/teams/'}`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log('Teams endpoint:', endpoint);
        console.log('Fetched teams:', data);
        if (Array.isArray(data)) setTeams(data);
        else if (data && Array.isArray(data.results)) setTeams(data.results);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [endpoint]);

  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-title mb-4">Teams</h2>
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Members</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {teams.length === 0 ? (
                <tr><td colSpan="4" className="text-center">No teams found.</td></tr>
              ) : (
                teams.map((team, idx) => (
                  <tr key={team.id || idx}>
                    <td>{idx + 1}</td>
                    <td>{team.name || '-'}</td>
                    <td>{team.members ? team.members.length : '-'}</td>
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

export default Teams;
