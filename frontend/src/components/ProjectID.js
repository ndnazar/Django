import React from 'react';

const ProjectID = ({ value, onChange }) => {
    const generateProjectId = () => {
        const newProjectId = Math.floor(Math.random() * 1000000) || 1; // Generate a valid number
        onChange(newProjectId.toString()); // Pass the new ID to the parent
    };

    return (
        <div id="react-project-ID-container">
            <input
                type="text"
                value={value} // Controlled by parent
                onChange={(e) => onChange(e.target.value)} // Update parent state on input change
                placeholder="Project ID"
            />
            <div className="generate-project-id-button">
                <button onClick={generateProjectId}>Generate Project ID</button>
            </div>
        </div>
    );
};

export default ProjectID;