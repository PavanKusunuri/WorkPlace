import React from 'react';
// import { Container, Row, Col } from 'react-bootstrap';

const FormContainer = ({ children }) => {
    return (
        <div>
            <div className='justify-content-md-center'>
                <div>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default FormContainer;