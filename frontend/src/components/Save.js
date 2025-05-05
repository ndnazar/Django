import React, { useState } from 'react';

function MyComponent() {
  const [data, setData] = useState('');

  const handleSave = async () => {
    try {
      const response = await fetch('/api/data/', {
        method: 'POST', // or 'PUT' if updating
        headers: {
          'Content-Type': 'application/json',
          // Add any authorization headers if needed
        },
        body: JSON.stringify({ data }),
      });

      if (response.ok) {
        // Handle successful save
        console.log('Data saved successfully!');
      } else {
        // Handle error
        console.error('Failed to save data.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={data}
        onChange={(e) => setData(e.target.value)}
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
}

export default MyComponent;