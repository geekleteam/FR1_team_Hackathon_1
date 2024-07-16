import { createFileRoute } from '@tanstack/react-router';
import { FlowCanvas } from '~/modules/flow/components/flow-canvas';
import { NodePicker } from '~/modules/flow/components/node-picker';
import { GitBranch, Layers, MessageSquare } from 'lucide-react';
import { Sidebar, SidebarTab } from '~/modules/flow/panels/sidebar';
import { Hierarchy } from '~/modules/flow/panels/hierarchy';
import { Chatbot } from '~/components/RightSidebarComponents/Chatbot';
import BlockProperties from '~/components/RightSidebarComponents/BlockProperties';
import BlockPalettePanel from '~/components/ServicesBlockPalettePanel';

export const Route = createFileRoute('/_authenticated/board/$board')({
  component: BoardPage,
});

function BoardPage() {
  return (
    <>
      <FlowCanvas path="/" />

      <Sidebar>
        <SidebarTab icon={<MessageSquare size={24} />} title="System Design Chatbot 🤖">
          <Chatbot path="/" />
        </SidebarTab>

        <SidebarTab icon={<Layers size={24} />} title="Hierarchy">
          <Hierarchy />
        </SidebarTab>

        <SidebarTab icon={<GitBranch size={24} />} title="Block Properties">
          <BlockProperties />
        </SidebarTab>
      </Sidebar>

      <NodePicker />
      <BlockPalettePanel />
    </>
  );
}
