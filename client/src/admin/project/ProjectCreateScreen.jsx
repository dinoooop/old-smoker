import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { store } from './projectSlice'
import { validateForm } from './projectValidation'
import DashboardLayout from '../layouts/DashboardLayout'

export default function () {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: '',
        description: ''
    })
    const [errors, setErrors] = useState({})

    const onChangeForm = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
        const error = validateForm(e.target.name, e.target.value)
        setErrors(prev => ({ ...prev, [e.target.name]: error }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const updatedErrors = {}
        Object.entries(formData).forEach(([key, value]) => {
            updatedErrors[key] = validateForm(key, value)
        })
        setErrors(prev => ({ ...prev, ...updatedErrors }))
        const allErrorsFalse = Object.values(updatedErrors).every(error => error === false)
        if (allErrorsFalse) {
            dispatch(store(formData))
            navigate('/admin/projects')
            
        }
    }

    return (
        <DashboardLayout>
            <div className="row">
                <div className="page-header">
                    <h1>Create Project</h1>
                </div>
            </div>

            <div className="row">
                <div className='cardbody md-60'>
                    <form onSubmit={handleSubmit}>

                        <div className="form-group">
                            <label htmlFor="email">Project Name</label>
                            <input type="text"
                                className="form-control input-field"
                                id="name"
                                value={formData.name}
                                name="name"
                                onChange={onChangeForm}
                            />
                            <div className="color-red">{errors.name}</div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea
                                className="form-control input-field"
                                id="description"
                                value={formData.description}
                                name="description"
                                onChange={onChangeForm}
                            />
                            <div className="color-red">{errors.description}</div>
                        </div>
                        <button type='submit' className="btn submit">Submit</button>
                    </form>


                </div>
            </div>
        </DashboardLayout>
    )
}
