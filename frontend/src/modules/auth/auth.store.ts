import { createWithEqualityFn } from 'zustand/traditional';
import { immer } from 'zustand/middleware/immer';

export type AuthStore = {};

const useFlowStore = createWithEqualityFn(immer<AuthStore>((set) => ({})));

export default useFlowStore;
