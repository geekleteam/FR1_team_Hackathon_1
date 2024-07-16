import { RectangleHorizontal } from 'lucide-react';
import React, { useRef } from 'react';
import { AppNode } from '../nodes/types';
import { TooltipTrigger } from 'react-aria-components';
import { useDrag } from 'react-aria';
import { useFlow } from '../hooks/use-flow';
import { nanoid } from 'nanoid';

export function NodePicker() {
  return (
    <div className="absolute flex flex-col gap-1 border border-gray-200 p-2 -translate-y-1/2 bg-white top-1/2 left-4">
      <NodeType
        type="group"
        label="Group"
        icon="📥"
        creator={() => ({
          data: {
            label: 'New group',
            color: 'red',
          },
        })}
      />

      <NodeType
        type="service"
        label="Service"
        icon="⚙️"
        creator={() => ({
          data: {
            icon: '⚙️',
            label: 'New service',
          },
        })}
      />
    </div>
  );
}

// ---
// NodeType
// ---
interface NodeTypeProps<T extends NonNullable<AppNode['type']>> {
  type: T;
  label?: string;
  icon?: React.ReactNode;
  creator: () => Omit<AppNode & { type: T }, 'id' | 'type' | 'position'>;
}

function NodeType<T extends NonNullable<AppNode['type']>>({ type, label, icon, creator }: NodeTypeProps<T>) {
  const ref = useRef<HTMLSpanElement>(null);

  const { dragProps } = useDrag({
    getItems() {
      return [
        {
          'application/geekle-ai-diagram': JSON.stringify({
            type,
            ...creator(),
          }),
        },
      ];
    },
  });

  return (
    <TooltipTrigger delay={0} closeDelay={0}>
      <span
        ref={ref}
        role="button"
        // {...buttonProps}
        {...dragProps}
        className="flex flex-col items-center justify-center gap-1 border border-transparent hover:border-dashed hover:border-zinc-400 hover:text-zinc-700 p-2 rounded-sm"
      >
        {icon ?? <RectangleHorizontal />}
        {label || type}
      </span>
    </TooltipTrigger>
  );
}
