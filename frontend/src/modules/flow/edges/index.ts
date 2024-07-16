import type { EdgeTypes } from '@xyflow/react';
import FloatingEdge from './floating-edge';
import { AppEdge } from './types';

// export const initialEdges: AppEdge[] = [
//   {
//     id: 'ui->backend',
//     source: 'ui',
//     target: 'backend',
//   },
//   {
//     id: 'backend->database',
//     source: 'backend',
//     target: 'database',
//   },
// ];

// export const initialEdges: AppEdge[] = [
//   {
//     id: 'frontend->backend',
//     source: 'frontend',
//     target: 'backend',
//   },
//   {
//     id: 'backend->database',
//     source: 'backend',
//     target: 'database',
//   },
// ];

export const initialEdges: AppEdge[] = [
  { id: 'loadBalancer->webApp', source: 'loadBalancer', target: 'webApp' },
  { id: 'loadBalancer->cdn', source: 'loadBalancer', target: 'cdn' },
  { id: 'webApp->apiGateway', source: 'webApp', target: 'apiGateway' },
  {
    id: 'apiGateway->authService',
    source: 'apiGateway',
    target: 'authService',
  },
  {
    id: 'apiGateway->productService',
    source: 'apiGateway',
    target: 'productService',
  },
  {
    id: 'apiGateway->orderService',
    source: 'apiGateway',
    target: 'orderService',
  },
  {
    id: 'apiGateway->paymentService',
    source: 'apiGateway',
    target: 'paymentService',
  },
  {
    id: 'apiGateway->tenantService',
    source: 'apiGateway',
    target: 'tenantService',
  },
  {
    id: 'authService->mainDatabase',
    source: 'authService',
    target: 'mainDatabase',
  },
  {
    id: 'productService->mainDatabase',
    source: 'productService',
    target: 'mainDatabase',
  },
  {
    id: 'orderService->mainDatabase',
    source: 'orderService',
    target: 'mainDatabase',
  },
  {
    id: 'paymentService->mainDatabase',
    source: 'paymentService',
    target: 'mainDatabase',
  },
  {
    id: 'tenantService->mainDatabase',
    source: 'tenantService',
    target: 'mainDatabase',
  },
  {
    id: 'productService->searchEngine',
    source: 'productService',
    target: 'searchEngine',
  },
  {
    id: 'productService->cacheLayer',
    source: 'productService',
    target: 'cacheLayer',
  },
  {
    id: 'orderService->cacheLayer',
    source: 'orderService',
    target: 'cacheLayer',
  },
  {
    id: 'orderService->messageQueue',
    source: 'orderService',
    target: 'messageQueue',
  },
  {
    id: 'paymentService->messageQueue',
    source: 'paymentService',
    target: 'messageQueue',
  },
];

export const edgeTypes = {
  floating: FloatingEdge,
} satisfies EdgeTypes;
