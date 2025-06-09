// BaseNode.js - Node Abstraction Component

import { useState } from 'react';
import { Handle, Position } from 'reactflow';

export const BaseNode = ({ 
  id, 
  data, 
  title,
  inputs = [], // Array of input handles: {id, label, position, style}
  outputs = [], // Array of output handles: {id, label, position, style}
  fields = [], // Array of form fields: {type, name, label, options, defaultValue}
  content = null, // Custom content component
  style = {},
  onFieldChange
}) => {
  const [fieldValues, setFieldValues] = useState(() => {
    const initialValues = {};
    fields.forEach(field => {
      initialValues[field.name] = data?.[field.name] || field.defaultValue || '';
    });
    return initialValues;
  });

  const handleFieldChange = (fieldName, value) => {
    setFieldValues(prev => ({
      ...prev,
      [fieldName]: value
    }));
    
    if (onFieldChange) {
      onFieldChange(fieldName, value);
    }
  };

  const renderField = (field) => {
    const value = fieldValues[field.name];
    
    switch (field.type) {
      case 'text':
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            style={{ width: '100%', marginBottom: '4px' }}
          />
        );
      
      case 'textarea':
        return (
          <textarea
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            rows={field.rows || 3}
            style={{ width: '100%', marginBottom: '4px', resize: 'vertical' }}
          />
        );
      
      case 'select':
        return (
          <select
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            style={{ width: '100%', marginBottom: '4px' }}
          >
            {field.options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      
      case 'number':
        return (
          <input
            type="number"
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            min={field.min}
            max={field.max}
            step={field.step}
            style={{ width: '100%', marginBottom: '4px' }}
          />
        );
      
      default:
        return null;
    }
  };

  const defaultStyle = {
    width: 200,
    minHeight: 80,
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: 'white',
    padding: '8px',
    fontSize: '12px',
    ...style
  };

  return (
    <div style={defaultStyle}>
      {/* Input Handles */}
      {inputs.map((input, index) => (
        <Handle
          key={input.id}
          type="target"
          position={input.position || Position.Left}
          id={`${id}-${input.id}`}
          style={{
            top: inputs.length > 1 ? `${((index + 1) * 100) / (inputs.length + 1)}%` : '50%',
            ...input.style
          }}
        />
      ))}

      {/* Node Header */}
      <div style={{ fontWeight: 'bold', marginBottom: '8px', textAlign: 'center' }}>
        {title}
      </div>

      {/* Custom Content */}
      {content && <div style={{ marginBottom: '8px' }}>{content}</div>}

      {/* Form Fields */}
      {fields.map(field => (
        <div key={field.name} style={{ marginBottom: '6px' }}>
          {field.label && (
            <label style={{ display: 'block', fontSize: '11px', marginBottom: '2px' }}>
              {field.label}:
            </label>
          )}
          {renderField(field)}
        </div>
      ))}

      {/* Output Handles */}
      {outputs.map((output, index) => (
        <Handle
          key={output.id}
          type="source"
          position={output.position || Position.Right}
          id={`${id}-${output.id}`}
          style={{
            top: outputs.length > 1 ? `${((index + 1) * 100) / (outputs.length + 1)}%` : '50%',
            ...output.style
          }}
        />
      ))}
    </div>
  );
};