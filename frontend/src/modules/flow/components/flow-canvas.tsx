import '@xyflow/react/dist/style.css';

import { useCallback, useRef } from 'react';
import { ReactFlow, Background, Controls, MiniMap } from '@xyflow/react';
import { shallow } from 'zustand/shallow';
import useFlowStore, { RFState } from '../flow.store';
import { nodeTypes } from '../nodes';
import { edgeTypes } from '../edges';
import { useDrop } from 'react-aria';
import { useThemeMode } from 'flowbite-react';
import { SettingsPanel } from '../panels/SettingsPanel';
import { BoardInfoPanel } from '../panels/BoardInfoPanel';
import { useFlow } from '../hooks/use-flow';
import { LeftSidebar } from '~/components/sidebar';
import GuideButton from '~/components/GuidanceButton';
import { nanoid } from 'nanoid';
// import Sidebar from '../../../components/sidebar';

interface FlowCanvasProps {
  path: string;
}

export function FlowCanvas({ path }: FlowCanvasProps) {
  const flow = useFlow();
  const { mode: themeMode } = useThemeMode();
  const flowSelector = useCallback(
    (state: RFState) => ({
      nodes: state.diagrams[path].nodes,
      edges: state.diagrams[path].edges,
      onNodesChange: state.onNodesChange,
      onEdgesChange: state.onEdgesChange,
      addEdge: state.addEdge,
      addNode: state.addNode,
    }),
    [path],
  );
  const { nodes, edges, onNodesChange, onEdgesChange, addEdge, addNode } = useFlowStore(flowSelector, shallow);

  const ref = useRef(null);
  const { dropProps } = useDrop({
    ref,
    async onDrop({ items: [item], x, y }) {
      if (item.kind === 'text' && item.types.has('application/geekle-ai-diagram')) {
        const node = JSON.parse(await item.getText('application/geekle-ai-diagram'));
        addNode(path, {
          id: nanoid(),
          position: flow.screenToFlowPosition({ x, y }),
          ...node,
        });
      }
    },
  });

  return (
    <>
      <ReactFlow
        className="playground"
        ref={ref}
        fitView
        // Nodes and Edges
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodesChange={(changes) => onNodesChange(path, changes)}
        onEdgesChange={(changes) => onEdgesChange(path, changes)}
        onConnect={(connection) => addEdge(path, connection)}
        // DnD
        onDragEnter={dropProps.onDragEnter}
        onDragLeave={dropProps.onDragLeave}
        onDragOver={dropProps.onDragOver}
        onDrop={dropProps.onDrop}
        // Theme
        colorMode={themeMode === 'auto' ? 'system' : themeMode}
      >
        <SettingsPanel />
        <BoardInfoPanel />

        <Background className="dark:bg-gray-900" />
        <MiniMap className="dark:bg-gray-900" />
        <Controls showInteractive={false} />
      </ReactFlow>

      <LeftSidebar path={path} addNode={addNode} addEdge={addEdge} />
      <GuideButton />
    </>
  );
}
