// Updated toolbar.js with new nodes

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
    return (
        <div style={{ 
            padding: '20px', 
            backgroundColor: '#ffffff', 
            borderBottom: '1px solid #e0e0e0',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
        }}>
            <h3 style={{ 
                margin: '0 0 20px 0', 
                color: '#333',
                fontSize: '18px',
                fontWeight: '600'
            }}>Node Library</h3>
            
            <div style={{ 
                display: 'flex',
                gap: '20px'
            }}>
                {/* Basic Nodes */}
                <div style={{ 
                    flex: 1,
                    padding: '15px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '8px',
                    border: '1px solid #e9ecef'
                }}>
                    <h4 style={{ 
                        margin: '0 0 12px 0', 
                        fontSize: '15px', 
                        color: '#495057',
                        fontWeight: '500'
                    }}>Basic Nodes</h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                        <DraggableNode type='customInput' label='Input' />
                        <DraggableNode type='llm' label='LLM' />
                        <DraggableNode type='customOutput' label='Output' />
                        <DraggableNode type='text' label='Text' />
                    </div>
                </div>

                {/* Advanced Nodes */}
                <div style={{ 
                    flex: 1,
                    padding: '15px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '8px',
                    border: '1px solid #e9ecef'
                }}>
                    <h4 style={{ 
                        margin: '0 0 12px 0', 
                        fontSize: '15px', 
                        color: '#495057',
                        fontWeight: '500'
                    }}>Advanced Nodes</h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                        <DraggableNode type='math' label='Math' />
                        <DraggableNode type='filter' label='Filter' />
                        <DraggableNode type='delay' label='Delay' />
                        <DraggableNode type='splitter' label='Splitter' />
                        <DraggableNode type='conditional' label='Conditional' />
                    </div>
                </div>
            </div>
        </div>
    );
};