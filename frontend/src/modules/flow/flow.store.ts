import {
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  OnNodesChange,
  OnEdgesChange,
  applyNodeChanges,
  applyEdgeChanges,
  OnConnect,
} from '@xyflow/react';
import { createWithEqualityFn } from 'zustand/traditional';
import ecommerceExample from './samples/ecommerce.json';
import smartHomeExample from './samples/smart-home.json';
import { immer } from 'zustand/middleware/immer';
import { nanoid } from 'nanoid';
import { AppNode } from './nodes/types';

type Diagram = {
  nodes: Node[];
  edges: Edge[];
};

type DiagramPath = '/' | (string & {});

type DiagramBoundFunction<T> = T extends (...args: infer Args) => infer Result
  ? (path: DiagramPath, ...args: Args) => Result
  : never;

export type RFState = {
  diagrams: Record<DiagramPath, Diagram>;

  onNodesChange: DiagramBoundFunction<OnNodesChange>;
  onEdgesChange: DiagramBoundFunction<OnEdgesChange>;
  addNode: DiagramBoundFunction<(node: Omit<AppNode, 'id'>) => void>;
  addEdge: DiagramBoundFunction<OnConnect>;
  setNodeVisibility: DiagramBoundFunction<(nodeId: string, visibility: 'visible' | 'invisible') => void>;
};

const useFlowStore = createWithEqualityFn(
  immer<RFState>((set, get) => ({
    diagrams: {
      '/': {
        nodes: [],
        edges: [],
      },
    },

    onNodesChange: (path: string, changes: NodeChange[]) =>
      set((draft) => {
        const diagram = draft.diagrams[path];

        diagram.nodes = applyNodeChanges(changes, diagram.nodes);
      }),

    onEdgesChange: (path, changes: EdgeChange[]) =>
      set((draft) => {
        const diagram = draft.diagrams[path];

        diagram.edges = applyEdgeChanges(changes, diagram.edges);
      }),

    addNode: (path, node) =>
      set((draft) => {
        const diagram = draft.diagrams[path];
        const id = nanoid();
        const newNode: Node = { id, ...node };

        diagram.nodes.push(newNode);
      }),

    addEdge: (path, connection) =>
      set((draft) => {
        const diagram = draft.diagrams[path];
        const id = nanoid();
        const newEdge: Edge = { id, ...connection };

        diagram.edges.unshift(newEdge);
      }),

    setNodeVisibility: (path, nodeId, visibility) =>
      set((draft) => {
        const diagram = draft.diagrams[path];
        const node = diagram.nodes.find((n) => n.id === nodeId);
        if (!node) return;

        const setVisibility = (nodeId: string, visibility: string) => {
          const node = diagram.nodes.find((n) => n.id === nodeId);
          if (node) {
            node.hidden = visibility === 'invisible';

            // Find and hide all children of this node
            diagram.nodes
              .filter((n) => n.parentId === nodeId)
              .forEach((childNode) => setVisibility(childNode.id, visibility));
          }
        };

        setVisibility(nodeId, visibility);
      }),
  })),
);

useFlowStore.setState({
  diagrams: {
    '/': ecommerceExample,
    '/webApp': smartHomeExample,
  },
});

export default useFlowStore;
