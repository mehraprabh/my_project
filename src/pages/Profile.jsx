import React, { useContext, useEffect, useState } from 'react'
import { convertBase64, formatDate } from '../helper/Index';
import AuthContext from '../auth/AuthContext';

const init = {
    fullname: "",
    dob: "",
    designation: "",
    gender: "male"
}
function Profile() {
    const { user, fetchUserDetails, userDetails, updateUser } = useContext(AuthContext);
    const [editUser, setEditUser] = useState(false);
    const [formData, setFormData] = useState(init);

    const handleImage = async (e) => {
        let file = e.target.files[0];
        const fileString = await convertBase64(file);
        const formData = { id: user.id, imgurl: fileString }
        updateUser(formData)
    }
    const handleEdit = () => {
        setEditUser(!editUser);
    }
    const handleChange = (e) => {
        let { name, value } = e.target;
        setFormData((prev) => (
            {
                ...prev,
                [name]: value,
                userid: user.id
            }
        ))
    }
    const saveUser = () => {
        updateUser(formData);
    }

    useEffect(() => {
        if (userDetails) {
            setFormData(userDetails)
        }
    }, [userDetails])

    useEffect(() => {

        if (user) {
            fetchUserDetails(user.id)
        }
    }, [user])
    return (
        <div className='container mt-5' >
            <div className='bg-primary p-3 text-white'>
                <div className='row align-items-center'>
                    {
                        userDetails &&
                        <>
                            <div className='col-lg-3 text-center'>
                                <img src={userDetails.imgurl ? userDetails.imgurl : ""} className='border border-1 img-fluid rounded-circle' style={{ width: 200, height: 200 }} />
                                <input type='file' onChange={handleImage} />

                            </div>
                            <div className='col-lg-9'>
                                <h5>{userDetails.fullname}</h5>
                                <p>{userDetails.email}</p>
                                {
                                    userDetails.designation &&
                                    <p>{userDetails.designation}</p>
                                }
                                {
                                    userDetails.designation &&
                                    <p>{formatDate(userDetails.dob)}</p>
                                }
                                <button onClick={handleEdit} className='btn btn-info'>Edit</button>
                                {
                                    editUser &&
                                    <div className='py-3'>
                                        <div className='row'>
                                            <div className='col-lg-6'>
                                                <label className='form-label'>Fullname</label>
                                                <input type='text' name='fullname' className='form-control' onChange={handleChange} value={formData?.fullname} />
                                            </div>
                                            <div className='col-lg-6'>
                                                <label className='form-label'>Designation</label>
                                                <input type='text' name='designation' className='form-control' onChange={handleChange} value={formData?.designation} />
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-lg-6'>
                                                <label className='form-label d-block'>Date Of Birth</label>
                                                <input type='date' className='w-100' style={{ height: 40 }} name='dob' onChange={handleChange} />
                                            </div>
                                            <div className='col-lg-6'>
                                                <label className='form-label'>Gender</label>
                                                <input type='radio' name='gender' onChange={handleChange} value="male" /> Male
                                                <input type='radio' name='gender' onChange={handleChange} /> Female
                                            </div>
                                        </div>

                                        <button onClick={saveUser} className='btn btn-info'>Save</button>
                                    </div>

                                }
                            </div>
                        </>
                    }
                </div>
            </div>

        </div>
    )
}

export default Profile