import { Handle, Node, NodeResizer, Position, type NodeProps } from '@xyflow/react';
import { useState } from 'react';

export type ServiceNode = Node<
  {
    icon: string;
    label: string;
  },
  'service'
>;

export function ServiceNode({ data, selected, width, height }: NodeProps<ServiceNode>) {
  const [hasCustomSize, setHasCustomSize] = useState(false);

  function onResizeStart() {
    setHasCustomSize(true);
  }

  return (
    <div
      style={{
        width: hasCustomSize ? width : undefined,
        height: hasCustomSize ? height : undefined,
      }}
      className="flex p-2 px-3 items-center justify-center rounded-md border border-dashed border-gray-400 bg-gray-50 dark:border-gray-300 dark:bg-gray-600 dark:text-gray-100"
    >
      <div className="flex flex-col items-center justify-center text-center">
        <span className="text-md">{data.icon}</span>
        <span className="text-xs outline-none">{data.label}</span>
      </div>

      <Handle className="dark:border-gray-500" type="target" position={Position.Top} />
      <Handle className="dark:border-gray-500" type="source" position={Position.Bottom} />

      <NodeResizer isVisible={selected || false} onResizeStart={onResizeStart} />
    </div>
  );
}
