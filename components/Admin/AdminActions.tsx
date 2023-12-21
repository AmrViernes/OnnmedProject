
import { useState } from 'react';

const AdminActions = ({ articleId, status }) => {
  const [action, setAction] = useState('');

  const handleAction = async () => {
    // Implement logic for admin actions
  };

  return (
    <div className="mt-4">
      <label className="mr-4">
        Action:
        <select
          value={action}
          onChange={(e) => setAction(e.target.value)}
          className="border rounded p-2 ml-2"
        >
          <option value="">Select Action</option>
          <option value="accept" disabled={status === 'accepted'}>
            Accept
          </option>
          <option value="reject" disabled={status === 'rejected'}>
            Reject
          </option>
        </select>
      </label>
      <button onClick={handleAction} className="bg-blue-500 text-white px-4 py-2 rounded">
        Submit
      </button>
    </div>
  );
};

export default AdminActions;
