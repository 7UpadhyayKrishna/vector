// Updated toolbar.js with new nodes

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
    return (
        <div style={{ 
            padding: '10px', 
            backgroundColor: '#f5f5f5', 
            borderBottom: '1px solid #ddd' 
        }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>Node Library</h3>
            
            {/* Basic Nodes */}
            <div style={{ marginBottom: '15px' }}>
                <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#666' }}>Basic Nodes</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    <DraggableNode type='customInput' label='Input' />
                    <DraggableNode type='llm' label='LLM' />
                    <DraggableNode type='customOutput' label='Output' />
                    <DraggableNode type='text' label='Text' />
                </div>
            </div>

            {/* New Advanced Nodes */}
            <div>
                <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#666' }}>Advanced Nodes</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    <DraggableNode type='math' label='Math' />
                    <DraggableNode type='filter' label='Filter' />
                    <DraggableNode type='delay' label='Delay' />
                    <DraggableNode type='splitter' label='Splitter' />
                    <DraggableNode type='conditional' label='Conditional' />
                </div>
            </div>
        </div>
    );
};