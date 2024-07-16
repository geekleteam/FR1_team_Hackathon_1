import { Node, NodeResizer, useInternalNode, useNodes, useReactFlow, useStoreApi, type NodeProps } from '@xyflow/react';
import { useCallback, useEffect, useState } from 'react';
import useFlowStore from '../flow.store';

export type GroupNode = Node<
  {
    label: string;
    color: string;
  },
  'group'
>;
export const groupColors = {
  red: /* tw */ 'bg-[red]/30 dark:bg-red-600/30 ',
} as Record<string, string>;

// const defaultPadding = 10;
export function GroupNode({ id, data, selected, width, height }: NodeProps<GroupNode>) {
  // const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  // const updateNodes = useFlowStore((s) => s.onNodesChange);
  // const store = useStoreApi();
  // const nodes = useNodes();
  // const { getNode, setNodes } = useReactFlow();

  // const calculateGroupDimensions = useCallback(() => {
  //   const childNodes = Array.from(nodes).filter((node) => node.parentId === id);

  //   if (childNodes.length === 0) return { width: 200, height: 100 };

  //   const groupPadding = 20;
  //   let minX = Infinity,
  //     minY = Infinity,
  //     maxX = -Infinity,
  //     maxY = -Infinity;

  //   childNodes.forEach((node) => {
  //     minX = Math.min(minX, node.position.x);
  //     minY = Math.min(minY, node.position.y);
  //     maxX = Math.max(maxX, node.position.x + (node.measured?.width || 100));
  //     maxY = Math.max(maxY, node.position.y + (node.measured?.height || 40));
  //   });

  //   return {
  //     width: maxX - minX + groupPadding * 2,
  //     height: maxY - minY + groupPadding * 2,
  //   };
  // }, [id, store]);

  // useEffect(() => {
  //   const newDimensions = calculateGroupDimensions();
  //   setDimensions(newDimensions);

  //   updateNodes('/', [
  //     {
  //       id,
  //       type: 'dimensions',
  //       resizing: true,
  //       setAttributes: true,
  //       dimensions: newDimensions,
  //     },
  //   ]);
  // }, [id, calculateGroupDimensions, setNodes]);

  return (
    <div
      style={{
        border: '1px solid #ccc',
        borderRadius: '5px',
        padding: '10px',
      }}
      className={`w-full h-full border rounded-md p-4 ${groupColors[data.color] || ''}`}
    >
      <div>{data.label}</div>
    </div>
  );
}
