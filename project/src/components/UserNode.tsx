import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { User } from '../types';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { deleteUser } from '../store/slices/usersSlice';
import { UserForm } from './UserForm';
import { Edit2, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface UserNodeProps {
  data: {
    user: User;
  };
}

export const UserNode: React.FC<UserNodeProps> = ({ data }) => {
  const { user } = data;
  const dispatch = useDispatch<AppDispatch>();
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDelete = async () => {
    try {
      await dispatch(deleteUser(user._id)).unwrap();
      toast.success('User deleted successfully');
    } catch (error) {
      toast.error('Failed to delete user');
    }
  };

  return (
    <>
      <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-gray-200">
        <Handle type="target" position={Position.Top} className="w-2 h-2" />
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg font-bold">{user.username}</div>
              <div className="text-gray-500">Age: {user.age}</div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowEditForm(true)}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <Edit2 size={16} className="text-blue-500" />
              </button>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <Trash2 size={16} className="text-red-500" />
              </button>
            </div>
          </div>
        </div>
        <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
      </div>

      {showEditForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit User</h2>
            <UserForm user={user} onClose={() => setShowEditForm(false)} />
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Delete User</h2>
            <p>Are you sure you want to delete {user.username}?</p>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleDelete();
                  setShowDeleteConfirm(false);
                }}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};