import type { NodeTypes } from '@xyflow/react';

import { ServiceNode } from './service-node';
import { GroupNode } from './group-node';

export const nodeTypes = {
  service: ServiceNode,
  group: GroupNode,
  // Add any of your custom nodes here!
} satisfies NodeTypes;

// ------------------------------------------------------------------------------

// Use the following interface to generate the Diagram

type Node = {
  /* use a descriptive name so you understand what node the user is referring to, avoid clashes */
  id: string;

  /* type of this node */
  type: 'service';

  position: {
    /* start from 0, put nodes on the sides, centered on 0, keeping a gap of 10, assuming node-width of 150 */
    x: number;

    /* start from 0, put nodes below each other, keeping a gap of 10, assuming a node-height of 40 */
    y: number;
  };

  data: {
    /* best emoji representing this node */
    icon: string;

    /* name for this node, visible to the user. (e.g: service name) */
    label: string;
  };
};

type Edge = {
  /* must be `${source}->${target}` */
  id: string;

  /* id of source node */
  source: string;

  /* id of target node */
  target: string;
};

type Diagram = {
  nodes: Node[];
  edges: Edge[];
};
