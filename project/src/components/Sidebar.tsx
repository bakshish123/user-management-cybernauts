import React, { useState } from 'react';
import { Search } from 'lucide-react';

const HOBBY_CATEGORIES = [
  'Sports',
  'Music',
  'Art',
  'Reading',
  'Gaming',
  'Cooking',
  'Travel',
  'Photography',
  'Technology',
  'Fitness',
];

export const Sidebar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredHobbies = HOBBY_CATEGORIES.filter(hobby =>
    hobby.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const onDragStart = (event: React.DragEvent, hobby: string) => {
    event.dataTransfer.setData('application/reactflow', hobby);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4">
      <h2 className="text-lg font-bold mb-4">Hobbies</h2>
      <div className="relative mb-4">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search hobbies..."
          className="w-full pl-10 pr-4 py-2 border rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        {filteredHobbies.map((hobby) => (
          <div
            key={hobby}
            draggable
            onDragStart={(e) => onDragStart(e, hobby)}
            className="p-2 bg-gray-50 rounded-md cursor-move hover:bg-gray-100 transition-colors border border-gray-200 hover:border-blue-300"
          >
            {hobby}
          </div>
        ))}
      </div>
    </div>
  );
};