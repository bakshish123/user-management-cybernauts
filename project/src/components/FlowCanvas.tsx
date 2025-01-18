import React, { useCallback, useEffect } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  NodeDragHandler,
  DragEvent,
} from 'reactflow';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { setNodes, setEdges } from '../store/slices/flowSlice';
import { fetchUsers, updateUser } from '../store/slices/usersSlice';
import { UserNode } from './UserNode';
import { HobbyNode } from './HobbyNode';
import toast from 'react-hot-toast';
import 'reactflow/dist/style.css';

const nodeTypes = {
  user: UserNode,
  hobby: HobbyNode,
};

export const FlowCanvas: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { nodes: reduxNodes, edges: reduxEdges } = useSelector(
    (state: RootState) => state.flow
  );
  const { users, loading } = useSelector((state: RootState) => state.users);

  const [nodes, setLocalNodes, onNodesChange] = useNodesState(reduxNodes);
  const [edges, setLocalEdges, onEdgesChange] = useEdgesState(reduxEdges);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (users.length > 0) {
      const newNodes: any[] = [];
      const newEdges: Edge[] = [];
      
      // Create user nodes
      users.forEach((user) => {
        // Add user node
        newNodes.push({
          id: user._id,
          type: 'user',
          position: { x: Math.random() * 500, y: Math.random() * 300 },
          data: { user },
        });

        // Add hobby nodes for each user
        user.hobbies.forEach((hobby, index) => {
          const hobbyNodeId = `${user._id}-hobby-${index}`;
          newNodes.push({
            id: hobbyNodeId,
            type: 'hobby',
            position: { 
              x: (Math.random() * 200) + 300, 
              y: (Math.random() * 200) + 300 
            },
            data: { hobby },
          });

          // Create edge between user and hobby
          newEdges.push({
            id: `${user._id}-${hobbyNodeId}`,
            source: user._id,
            target: hobbyNodeId,
            type: 'smoothstep',
          });
        });
      });

      setLocalNodes(newNodes);
      setLocalEdges(newEdges);
      dispatch(setNodes(newNodes));
      dispatch(setEdges(newEdges));
    }
  }, [users, dispatch, setLocalNodes, setLocalEdges]);

  const onDrop = useCallback(
    async (event: DragEvent) => {
      event.preventDefault();
      const hobby = event.dataTransfer.getData('application/reactflow');
      const targetNodeId = (event.target as Element).closest('.react-flow__node')?.getAttribute('data-id');
      
      if (!targetNodeId || !hobby) return;

      const user = users.find(u => u._id === targetNodeId);
      if (!user) return;

      try {
        // Update user with new hobby
        const updatedUser = {
          ...user,
          hobbies: [...user.hobbies, hobby],
        };
        await dispatch(updateUser({ id: user._id, data: updatedUser })).unwrap();

        // Add new hobby node
        const hobbyNodeId = `${user._id}-hobby-${user.hobbies.length}`;
        const newHobbyNode = {
          id: hobbyNodeId,
          type: 'hobby',
          position: { 
            x: Math.random() * 200 + 300, 
            y: Math.random() * 200 + 300 
          },
          data: { hobby },
        };

        // Create edge between user and hobby
        const newEdge: Edge = {
          id: `${user._id}-${hobbyNodeId}`,
          source: user._id,
          target: hobbyNodeId,
          type: 'smoothstep',
        };

        setLocalNodes((nds) => [...nds, newHobbyNode]);
        setLocalEdges((eds) => [...eds, newEdge]);
        dispatch(setNodes([...nodes, newHobbyNode]));
        dispatch(setEdges([...edges, newEdge]));
        toast.success(`Added ${hobby} to ${user.username}`);
      } catch (error) {
        toast.error('Failed to add hobby');
      }
    },
    [nodes, edges, users, dispatch, setLocalNodes, setLocalEdges]
  );

  const onConnect = useCallback(
    (params: Connection | Edge) => {
      const newEdges = addEdge(params, edges);
      setLocalEdges(newEdges);
      dispatch(setEdges(newEdges));
    },
    [edges, setLocalEdges, dispatch]
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex-1 h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};