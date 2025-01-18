import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Node, Edge } from 'reactflow';
import { FlowNode } from '../../types';

interface FlowState {
  nodes: Node[];
  edges: Edge[];
  undoStack: { nodes: Node[]; edges: Edge[] }[];
  redoStack: { nodes: Node[]; edges: Edge[] }[];
}

const initialState: FlowState = {
  nodes: [],
  edges: [],
  undoStack: [],
  redoStack: [],
};

const flowSlice = createSlice({
  name: 'flow',
  initialState,
  reducers: {
    setNodes: (state, action: PayloadAction<Node[]>) => {
      state.undoStack.push({ nodes: state.nodes, edges: state.edges });
      state.nodes = action.payload;
      state.redoStack = [];
    },
    setEdges: (state, action: PayloadAction<Edge[]>) => {
      state.undoStack.push({ nodes: state.nodes, edges: state.edges });
      state.edges = action.payload;
      state.redoStack = [];
    },
    undo: (state) => {
      const previous = state.undoStack.pop();
      if (previous) {
        state.redoStack.push({ nodes: state.nodes, edges: state.edges });
        state.nodes = previous.nodes;
        state.edges = previous.edges;
      }
    },
    redo: (state) => {
      const next = state.redoStack.pop();
      if (next) {
        state.undoStack.push({ nodes: state.nodes, edges: state.edges });
        state.nodes = next.nodes;
        state.edges = next.edges;
      }
    },
  },
});

export const { setNodes, setEdges, undo, redo } = flowSlice.actions;
export default flowSlice.reducer;