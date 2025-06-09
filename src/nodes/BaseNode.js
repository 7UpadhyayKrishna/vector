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
    padding: '20px',
    fontSize: '12px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    transition: 'all 0.2s ease',
    ':hover': {
      boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
      border: '1px solid #999'
    },
    ...style
  };

  // Determine if this is a special node that needs larger title
  const isSpecialNode = ['Math', 'Conditional', 'Splitter'].includes(title);
  const titleStyle = {
    fontWeight: 'bold',
    marginBottom: '12px',
    textAlign: 'center',
    fontSize: isSpecialNode ? '16px' : '14px'
  };

  const handleStyle = {
    width: '8px',
    height: '8px',
    background: '#333',
    border: '1px solid #fff',
    transition: 'all 0.2s ease',
  };

  const handleHoverStyle = {
    width: '10px',
    height: '10px',
    background: '#2196f3',
    border: '1px solid #fff',
  };

  return (
    <div 
      style={defaultStyle}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
        e.currentTarget.style.border = '1px solid #999';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        e.currentTarget.style.border = '1px solid #ddd';
      }}
    >
      {/* Input Handles */}
      {inputs.map((input, index) => (
        <Handle
          key={input.id}
          type="target"
          position={input.position || Position.Left}
          id={`${id}-${input.id}`}
          style={{
            ...handleStyle,
            top: inputs.length > 1 ? `${((index + 1) * 100) / (inputs.length + 1)}%` : '50%',
            ...input.style
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.width = '10px';
            e.currentTarget.style.height = '10px';
            e.currentTarget.style.background = '#2196f3';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.width = '8px';
            e.currentTarget.style.height = '8px';
            e.currentTarget.style.background = '#333';
          }}
        />
      ))}

      {/* Node Header */}
      <div style={titleStyle}>
        {title}
      </div>

      {/* Custom Content */}
      {content && <div style={{ marginBottom: '12px' }}>{content}</div>}

      {/* Form Fields */}
      {fields.map(field => (
        <div key={field.name} style={{ marginBottom: '10px' }}>
          {field.label && (
            <label style={{ 
              display: 'block', 
              fontSize: '11px', 
              marginBottom: '4px',
              color: '#666'
            }}>
              {field.label}:
            </label>
          )}
          {renderField(field)}
          {field.name === 'delimiter' && (
            <div style={{ 
              fontSize: '10px', 
              color: '#888', 
              marginTop: '4px',
              fontStyle: 'italic'
            }}>
              Enter a character to split text (e.g., comma, space, newline)
            </div>
          )}
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
            ...handleStyle,
            top: outputs.length > 1 ? `${((index + 1) * 100) / (outputs.length + 1)}%` : '50%',
            ...output.style
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.width = '10px';
            e.currentTarget.style.height = '10px';
            e.currentTarget.style.background = '#2196f3';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.width = '8px';
            e.currentTarget.style.height = '8px';
            e.currentTarget.style.background = '#333';
          }}
        />
      ))}
    </div>
  );
};