import React from 'react';
import Card from 'react-bootstrap/Card';
import { FaRegBookmark, FaGraduationCap, FaRegUser } from "react-icons/fa";
import { IoLogoUsd } from "react-icons/io";


export default function Dashboard() {
    return (

        <div className='row form-group  d-flex mx-2'>
            <div className='col-3'> 
                <Card style={{ width: '255px', height: '157px', backgroundColor: '#F0F9FF', borderRadius: '8px', border: 'none' }}>
                    <Card.Body>
                        <Card.Title ><FaGraduationCap className='cap-title mt-1' /></Card.Title>
                        <Card.Text className='card-text'>
                            Students
                        </Card.Text>
                        <Card.Footer className='card-footer'>243</Card.Footer>
                    </Card.Body>
                </Card>
            </div>
            <div className='col-3'> 
                <Card style={{ width: '255px', height: '157px', backgroundColor: '#FEF6FB', borderRadius: '8px', border: 'none' }}>
                    <Card.Body>
                        <Card.Title ><FaRegBookmark className='course-title mt-1' /></Card.Title>
                        <Card.Text className='card-text'>
                            Course
                        </Card.Text>
                        <Card.Footer className='card-footer'>13</Card.Footer>
                    </Card.Body>
                </Card>
            </div>
            <div className='col-3'> 
                <Card style={{ width: '255px', height: '157px', backgroundColor: '#FEFBEC', borderRadius: '8px', border: 'none' }}>
                    <Card.Body>
                        <Card.Title ><IoLogoUsd className='payment-title mt-1' /></Card.Title>
                        <Card.Text className='card-text'>
                            Payments
                        </Card.Text>
                        <Card.Footer className='card-footer'> 556,000₺</Card.Footer>
                    </Card.Body>
                </Card>
            </div>
            <div className='col-3'> 
                <Card style={{ width: '255px', height: '157px',backgroundImage: 'linear-gradient(#FEAF00,#F8D442)', borderRadius: '8px', border: 'none' }}>
                    <Card.Body>
                        <Card.Title ><FaRegUser className='user-title mt-1' /></Card.Title>
                        <Card.Text className='card-text'>
                            Users
                        </Card.Text>
                        <Card.Footer className='card-footer'>3</Card.Footer>
                    </Card.Body>
                </Card>
            </div>
        </div>

    );
}