import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { show, update } from './projectSlice'
import { validateForm } from './projectValidation'
import DashboardLayout from '../layouts/DashboardLayout'

export default function () {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()

    console.log(params.id)

    const stateFormData = useSelector(state => state.project)
    const [formData, setFormData] = useState(stateFormData.project || {});
    const [errors, setErrors] = useState({})

    useEffect(() => {
        dispatch(show(params.id));
    }, [dispatch, params.id]);

    useEffect(() => {
        if (stateFormData.project) {
            setFormData(stateFormData.project);
        }
    }, [stateFormData.project]);

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
            dispatch(update(formData)).then(() => {
                navigate('/admin/projects')
            })
        }
    }

    return (
        <DashboardLayout>
            <div className="row">
                <div className="page-header">
                    <h1>Edit Project</h1>
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
                                value={formData.name || ""}
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
                                value={formData.description || ""}
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
