import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { store } from './store';
import { Sidebar } from './components/Sidebar';
import { FlowCanvas } from './components/FlowCanvas';
import { UserForm } from './components/UserForm';
import { Plus } from 'lucide-react';

function App() {
  const [showUserForm, setShowUserForm] = useState(false);

  return (
    <Provider store={store}>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <div className="h-16 border-b border-gray-200 flex items-center justify-between px-4">
            <h1 className="text-xl font-bold">User Hobby Visualization</h1>
            <button
              onClick={() => setShowUserForm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              <Plus size={20} />
              Add User
            </button>
          </div>
          <div className="flex-1">
            <FlowCanvas />
          </div>
        </div>

        {showUserForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-96">
              <h2 className="text-xl font-bold mb-4">Create User</h2>
              <UserForm onClose={() => setShowUserForm(false)} />
            </div>
          </div>
        )}
      </div>
      <Toaster position="top-right" />
    </Provider>
  );
}

export default App;