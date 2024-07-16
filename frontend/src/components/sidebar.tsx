import React, { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { saveAs } from 'file-saver';
import type { SaveOptions } from 'file-saver';
import { useDropzone } from 'react-dropzone';
import useFlowStore, { RFState } from '../modules/flow/flow.store';

interface SidebarProps {
  path: string;
  addNode: (path: string, node: any) => void;
  addEdge: (path: string, edge: any) => void;
}

export const LeftSidebar: React.FC<SidebarProps> = ({ path, addNode, addEdge }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { nodes, edges } = useFlowStore((state: RFState) => ({
    nodes: state.diagrams[path]?.nodes || [],
    edges: state.diagrams[path]?.edges || [],
  }));

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleDownloadDiagram = () => {
    const diagramData = {
      nodes,
      edges,
    };
    const blob = new Blob([JSON.stringify(diagramData, null, 2)], { type: 'application/json' });
    saveAs(blob, 'diagram.json', { autoBom: true } as SaveOptions);
  };

  const handleUploadDiagram = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          const parsedData = JSON.parse(content);

          if (
            !parsedData.nodes ||
            !parsedData.edges ||
            !Array.isArray(parsedData.nodes) ||
            !Array.isArray(parsedData.edges)
          ) {
            throw new Error('Invalid JSON structure: missing nodes or edges arrays');
          }

          parsedData.nodes.forEach((node: any) => {
            addNode(path, node);
          });
          parsedData.edges.forEach((edge: any) => {
            addEdge(path, edge);
          });
          alert('Diagram uploaded successfully');
        } catch (error: any) {
          console.error('Error parsing JSON:', error);
          alert(`Error parsing JSON: ${error?.message}`);
        }
      };
      reader.onerror = (error) => {
        console.error('Error reading file:', error);
        alert('Error reading file');
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className={`fixed  ${isCollapsed ? ` z-[0] ` : ` z-[500] `}  left-0 top-0 `}>
      <div
        className={`${isCollapsed ? ` bg-transparent ` : ` dark:bg-white bg-gray-900 shadow-lg`}  dark:*:text-gray-600 antialiased  text-gray-400
          h-screen
          ${isCollapsed ? 'w-16' : 'w-64'}
          transition-all duration-300 ease-in-out
           flex flex-col
        `}
      >
        {/* Logo and collapse button */}
        {/* <div className="p-4 flex justify-between items-center">
          {!isCollapsed && <img src="/logo.png" className="h-8 w-auto" alt="Logo" />}
          <button
            onClick={toggleSidebar}
            className={`
              p-1 rounded-full hover:bg-gray-200 focus:outline-none
              ${isCollapsed ? 'mx-auto' : ''}
            `}
          >
            {isCollapsed ? '→' : '←'}
          </button>
        </div> */}

        {/* Dropdown menu */}
        <div className="flex-grow overflow-y-auto mt-24">
          {/* <MenuButton icon="📝" text="New Diagram" isCollapsed={isCollapsed} onClick={() => {}} /> */}
          <MenuButton icon="📤" classes=' upload-diagram ' text="Upload New Diagram" isCollapsed={isCollapsed} onClick={handleUploadDiagram} />
          <MenuButton icon="💾" classes=' download-diagram ' text="Save Diagram" isCollapsed={isCollapsed} onClick={handleDownloadDiagram} />
        </div>
      </div>
      <input ref={fileInputRef} type="file" accept=".json" style={{ display: 'none' }} onChange={handleFileChange} />
    </div>
  );
};

interface MenuButtonProps {
  icon: string;
  text: string;
  isCollapsed: boolean;
  onClick: () => void;
  classes?:string
}

const MenuButton: React.FC<MenuButtonProps> = ({ icon, text, isCollapsed, onClick,classes }) => {
  return (
    <button
      title={text}
      className={` ${classes} rounded-full bg-blend-saturation
        w-full flex items-center p-4 hover:bg-gray-200 transition-colors duration-200
        ${isCollapsed ? 'justify-center' : 'justify-start'}
      `}
      onClick={onClick}
    >
      <span className="text-xl">{icon}</span>
      {!isCollapsed && <span className="ml-4">{text}</span>}
    </button>
  );
};
