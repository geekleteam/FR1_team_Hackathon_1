import { useReactFlow } from '@xyflow/react';
import { AppNode } from '../nodes/types';
import { AppEdge } from '../edges/types';

export function useFlow() {
  return useReactFlow<AppNode, AppEdge>();
}
