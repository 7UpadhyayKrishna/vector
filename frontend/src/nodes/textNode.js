// textNode.js

import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const TextNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  return (
    <BaseNode
      id={id}
      data={data}
      title="Text"
      outputs={[{ id: 'output', label: 'Output' }]}
      fields={[
        {
          type: 'textarea',
          name: 'text',
          label: 'Text',
          defaultValue: '{{input}}',
          rows: 2
        }
      ]}
      onFieldChange={(fieldName, value) => updateNodeField(id, fieldName, value)}
    />
  );
};