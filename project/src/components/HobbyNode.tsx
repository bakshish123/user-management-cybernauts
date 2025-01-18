import React from 'react';
import { Handle, Position } from 'reactflow';

interface HobbyNodeProps {
  data: {
    hobby: string;
  };
}

export const HobbyNode: React.FC<HobbyNodeProps> = ({ data }) => {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-green-50 border-2 border-green-200">
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
      <div className="text-sm font-medium text-green-800">{data.hobby}</div>
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
    </div>
  );
};