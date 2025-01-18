import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { createUser, updateUser } from '../store/slices/usersSlice';
import { setNodes } from '../store/slices/flowSlice';
import { User, CreateUserDTO } from '../types';
import toast from 'react-hot-toast';
import { Node } from 'reactflow';

interface UserFormProps {
  user?: User;
  onClose: () => void;
}

export const UserForm: React.FC<UserFormProps> = ({ user, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const nodes = useSelector((state: RootState) => state.flow.nodes);
  const [formData, setFormData] = useState<CreateUserDTO>({
    username: user?.username || '',
    age: user?.age || 0,
    hobbies: user?.hobbies || [],
  });
  const [hobby, setHobby] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (user) {
        await dispatch(updateUser({ id: user._id, data: formData })).unwrap();
        toast.success('User updated successfully');
      } else {
        const newUser = await dispatch(createUser(formData)).unwrap();
        // Create a new node for the user
        const newNode: Node = {
          id: newUser._id,
          type: 'user',
          position: { 
            x: Math.random() * 500, 
            y: Math.random() * 300 
          },
          data: { 
            user: newUser 
          },
        };
        // Add the new node to existing nodes
        dispatch(setNodes([...nodes, newNode]));
        toast.success('User created successfully');
      }
      onClose();
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  const addHobby = () => {
    if (hobby && !formData.hobbies.includes(hobby)) {
      setFormData({ ...formData, hobbies: [...formData.hobbies, hobby] });
      setHobby('');
    }
  };

  const removeHobby = (index: number) => {
    const newHobbies = formData.hobbies.filter((_, i) => i !== index);
    setFormData({ ...formData, hobbies: newHobbies });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Username</label>
        <input
          type="text"
          required
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Age</label>
        <input
          type="number"
          required
          min="0"
          value={formData.age}
          onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Hobbies</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={hobby}
            onChange={(e) => setHobby(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={addHobby}
            className="mt-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add
          </button>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {formData.hobbies.map((h, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 rounded-full flex items-center gap-2"
            >
              {h}
              <button
                type="button"
                onClick={() => removeHobby(index)}
                className="text-red-500 hover:text-red-700"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          {user ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  );
};