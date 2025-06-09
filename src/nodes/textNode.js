// textNode.js

import { BaseNode } from './BaseNode';
import { useStore } from '../store';
import { useEffect, useState } from 'react';

export const TextNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const [variables, setVariables] = useState([]);

  // Function to extract variables from text
  const extractVariables = (text) => {
    const regex = /{{([^}]+)}}/g;
    const matches = [...text.matchAll(regex)];
    return [...new Set(matches.map(match => match[1]))];
  };

  // Update variables whenever text changes
  useEffect(() => {
    if (data.text) {
      const newVariables = extractVariables(data.text);
      setVariables(newVariables);
    }
  }, [data.text]);

  // Create handles for each variable
  const variableHandles = variables.map((variable, index) => ({
    id: `input-${variable}`,
    type: 'target',
    position: 'left',
    style: { top: `${(index + 1) * 30}px` },
    label: variable
  }));

  return (
    <BaseNode
      id={id}
      data={data}
      title="Text"
      outputs={[{ id: 'output', label: 'Output' }]}
      inputs={variableHandles}
      fields={[
        {
          type: 'textarea',
          name: 'text',
          label: 'Text',
          defaultValue: '{{input}}',
          rows: 2,
          style: {
            width: '100%',
            minHeight: '40px',
            resize: 'none',
            overflow: 'hidden',
            padding: '8px',
            boxSizing: 'border-box',
            fontFamily: 'monospace'
          },
          onInput: (e) => {
            // Auto-resize the textarea
            e.target.style.height = 'auto';
            e.target.style.height = `${Math.max(40, e.target.scrollHeight)}px`;
            
            // Update the node's height to accommodate the textarea
            const nodeElement = e.target.closest('.react-flow__node');
            if (nodeElement) {
              nodeElement.style.height = 'auto';
            }
          }
        }
      ]}
      onFieldChange={(fieldName, value) => updateNodeField(id, fieldName, value)}
    />
  );
};