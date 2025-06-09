// Updated ui.js with new node types

import { useState, useRef, useCallback, useEffect } from 'react';
import ReactFlow, { Controls, Background, MiniMap, useReactFlow } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

// Import all node types
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { MathNode } from './nodes/newNodes/MathNode';
import { FilterNode } from './nodes/newNodes/FilterNode';
import { DelayNode } from './nodes/newNodes/DealyNode';
import { SplitterNode } from './nodes/newNodes/SplitterNode';
import { ConditionalNode } from './nodes/newNodes/ConditionalNode';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };

// Register all node types
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  math: MathNode,
  filter: FilterNode,
  delay: DelayNode,
  splitter: SplitterNode,
  conditional: ConditionalNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  deleteNode: state.deleteNode,
});

export const PipelineUI = () => {
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const [contextMenu, setContextMenu] = useState(null);
    const {
      nodes,
      edges,
      getNodeID,
      addNode,
      onNodesChange,
      onEdgesChange,
      onConnect,
      deleteNode
    } = useStore(selector, shallow);

    const getInitNodeData = (nodeID, type) => {
      let nodeData = { id: nodeID, nodeType: `${type}` };
      return nodeData;
    }

    const onDrop = useCallback(
        (event) => {
          event.preventDefault();
    
          const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
          if (event?.dataTransfer?.getData('application/reactflow')) {
            const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
            const type = appData?.nodeType;
      
            // check if the dropped element is valid
            if (typeof type === 'undefined' || !type) {
              return;
            }
      
            const position = reactFlowInstance.project({
              x: event.clientX - reactFlowBounds.left,
              y: event.clientY - reactFlowBounds.top,
            });

            const nodeID = getNodeID(type);
            const newNode = {
              id: nodeID,
              type,
              position,
              data: getInitNodeData(nodeID, type),
            };
      
            addNode(newNode);
          }
        },
        [reactFlowInstance, getNodeID, addNode]
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onNodeContextMenu = useCallback(
      (event, node) => {
        event.preventDefault();
        setContextMenu({
          id: node.id,
          top: event.clientY,
          left: event.clientX,
        });
      },
      []
    );

    const onPaneClick = useCallback(() => {
      setContextMenu(null);
    }, []);

    const handleDeleteNode = useCallback(
      (nodeId) => {
        deleteNode(nodeId);
        setContextMenu(null);
      },
      [deleteNode]
    );

    // Handle keyboard delete
    useEffect(() => {
      const handleKeyDown = (event) => {
        if (event.key === 'Delete' && nodes.some(node => node.selected)) {
          const selectedNodes = nodes.filter(node => node.selected);
          selectedNodes.forEach(node => handleDeleteNode(node.id));
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, [nodes, handleDeleteNode]);

    return (
        <>
        <div ref={reactFlowWrapper} style={{width: '100vw', height: '70vh', border: '1px solid #ddd'}}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onInit={setReactFlowInstance}
                nodeTypes={nodeTypes}
                proOptions={proOptions}
                snapGrid={[gridSize, gridSize]}
                connectionLineType='smoothstep'
                fitView
                onNodeContextMenu={onNodeContextMenu}
                onPaneClick={onPaneClick}
            >
                <Background 
                    color="#f0f0f0" 
                    gap={gridSize} 
                    style={{ filter: 'blur(0.5px)' }}
                />
                <Controls />
                <MiniMap 
                    nodeStrokeColor={(n) => {
                        if (n.type === 'input') return '#0041d0';
                        if (n.type === 'output') return '#ff0072';
                        if (n.type === 'default') return '#1a192b';
                        return '#eee';
                    }}
                    nodeColor={(n) => {
                        if (n.type === 'math') return '#e3f2fd';
                        if (n.type === 'filter') return '#fff3e0';
                        if (n.type === 'delay') return '#f3e5f5';
                        if (n.type === 'splitter') return '#e8f5e8';
                        if (n.type === 'conditional') return '#ffeaa7';
                        return '#fff';
                    }}
                />
            </ReactFlow>
            {contextMenu && (
              <div
                style={{
                  position: 'absolute',
                  top: contextMenu.top,
                  left: contextMenu.left,
                  background: 'white',
                  padding: '8px',
                  borderRadius: '4px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  zIndex: 1000,
                }}
              >
                <button
                  onClick={() => handleDeleteNode(contextMenu.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: '4px 8px',
                    cursor: 'pointer',
                    color: '#ff4444',
                    width: '100%',
                    textAlign: 'left',
                  }}
                >
                  Delete Node
                </button>
              </div>
            )}
        </div>
        </>
    )
}