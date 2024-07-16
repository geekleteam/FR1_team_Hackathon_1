import React, { useState } from 'react';
import { Grid, List, Plus } from 'lucide-react';

const BlockPalettePanel = () => {
  const [filter, setFilter] = useState('');
  const [isGridView, setIsGridView] = useState(true);
  const [blocks, setBlocks] = useState([
    { name: 'Load Balancer', emoji: '⚖️', type: 'loadBalancer' },
    { name: 'Cache', emoji: '💾', type: 'cache' },
    { name: 'Database', emoji: '🗄️', type: 'database' },
    { name: 'API Gateway', emoji: '🚪', type: 'apiGateway' },
    { name: 'Message Queue', emoji: '📨', type: 'messageQueue' },
    { name: 'CDN', emoji: '🌐', type: 'cdn' },
    { name: 'Web Server', emoji: '🖥️', type: 'webServer' },
    { name: 'Application Server', emoji: '🚀', type: 'applicationServer' },
    { name: 'Firewall', emoji: '🛡️', type: 'firewall' },
    { name: 'Storage', emoji: '💽', type: 'storage' },
  ]);

  const filteredBlocks = blocks.filter(block =>
    block.name.toLowerCase().includes(filter.toLowerCase())
  );

  const addNewBlock = () => {
    const newBlock = { name: filter, emoji: '🆕', type: filter.toLowerCase().replace(/\s+/g, '') };
    setBlocks([...blocks, newBlock]);
    setFilter('');
  };


  //@ts-ignore
  const onDragStart = (event, block) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify(block));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="service-blocks-palette fixed bottom-[-20%] left-14 w-64 h-96 bg-purple-50 border-t border-r border-purple-300 rounded-tr-lg shadow-lg z-20">
      <div className="p-2 bg-purple-100 border-b border-purple-300 flex items-center">
        <input
          type="text"
          placeholder="Filter blocks..."
          className="flex-grow mr-2 px-2 py-1 text-sm border border-purple-300 rounded"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <button
          onClick={() => setIsGridView(!isGridView)}
          className="p-1 text-purple-600 hover:text-pink-500"
        >
          {isGridView ? <List size={20} /> : <Grid size={20} />}
        </button>
      </div>
      
      {filteredBlocks.length > 0 ? (
        <div className={`p-2 overflow-y-auto h-80 ${isGridView ? 'grid grid-cols-2 gap-2' : 'space-y-2'}`}>
          {filteredBlocks.map((block, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-2 bg-white rounded shadow cursor-move hover:bg-purple-100"
              draggable
              onDragStart={(event) => onDragStart(event, block)}
            >
              <span className="text-2xl mb-1">{block.emoji}</span>
              <span className="text-xs text-center">{block.name}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-2 flex flex-col items-center justify-center h-80">
          <p className="text-sm text-purple-600 mb-2">No matching blocks</p>
          <button
            onClick={addNewBlock}
            className="flex items-center px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            <Plus size={16} className="mr-1" />
            Add "{filter}"
          </button>
        </div>
      )}
    </div>
  );
};

export default BlockPalettePanel;