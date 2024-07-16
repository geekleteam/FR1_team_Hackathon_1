import '@xyflow/react/dist/style.css';

import { useSearchParams } from 'react-router-dom';
import { FlowCanvas } from '~/modules/flow/components/flow-canvas';
import { NodePicker } from '~/modules/flow/components/node-picker';
import GuideButton from '~/components/GuidanceButton';

export function BoardPage() {
  const boardId = useSearchParams();
  console.log(boardId);

  return (<>
    <div className="relative flex flex-col w-full ml-auto h-full bg-white text-gray-600 antialiased dark:bg-gray-900 dark:text-gray-400">
      <div className="relative w-full ml-auto flex-1">
        <FlowCanvas path="/" />
        <NodePicker />
      </div>
    </div>
    </>
  );
}
