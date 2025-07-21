import React, { useContext, useState } from 'react'
import AuthContext from './AuthContext';

const Register = () => {
    const { registerUser } = useContext(AuthContext)
    const [formData, setformData] = useState(null);
    const handleChange = (e) => {
        let { name, value } = e.target;
        setformData((prev) => (
            {
                ...prev,
                [name]: value
            }
        ))
    }
    const handleSubmit = () => {
        registerUser(formData)
    }
    return (
        <div className='py-3'>
            <div className='mb-3'>
                <label className='form-label'>Name</label>
                <input type='text' name='fullname' className='form-control' onChange={handleChange} />

            </div>
            <div className='mb-3'>
                <label className='form-label'>Email</label>
                <input type='text' name='email' className='form-control' onChange={handleChange} />

            </div>
            <div className='mb-3'>
                <label className='form-label'>Password</label>
                <input type='password' name='password' className='form-control' onChange={handleChange} />

            </div>
            <button onClick={handleSubmit} className='btn btn-primary'>Register</button>
        </div>
    )
}

export default Register