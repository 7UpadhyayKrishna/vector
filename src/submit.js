// submit.js

export const SubmitButton = () => {
    return (
        <div style={{
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            padding: '20px',
            marginTop: '20px'
        }}>
            <button 
                type="submit"
                style={{
                    padding: '12px 24px',
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#ffffff',
                    backgroundColor: '#2196F3',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 2px 4px rgba(33, 150, 243, 0.3)',
                    ':hover': {
                        backgroundColor: '#1976D2',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 8px rgba(33, 150, 243, 0.4)'
                    },
                    ':active': {
                        transform: 'translateY(0)',
                        boxShadow: '0 2px 4px rgba(33, 150, 243, 0.3)'
                    }
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#1976D2';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 8px rgba(33, 150, 243, 0.4)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#2196F3';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 4px rgba(33, 150, 243, 0.3)';
                }}
                onClick={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 4px rgba(33, 150, 243, 0.3)';
                }}
            >
                Submit
            </button>
        </div>
    );
}
