import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { store } from './postSlice'
import { validateForm } from './postValidation'
import DashboardLayout from '../layouts/DashboardLayout'
import Validator from '../../helpers/validator'
import Select from 'react-select'

export default function () {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const validator = new Validator()

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        save_mode: '',
        color: null
    })
    const [errors, setErrors] = useState({})

    const onChangeForm = (e) => {
        setFormData(prev => ({ ...prev, ...validator.validate(e, validateForm, formData).formData }))
        setErrors(prev => ({ ...prev, ...validator.validate(e, validateForm).error }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const submit = validator.submit(formData, validateForm)
        if (typeof submit.errors != 'undefined') {
            setErrors(submit.errors)
        } else {
            dispatch(store(submit))
        }
    }

    const handleSelectChange = (selectedOption) => {
        const option = selectedOption.map(option => option.value)
        setFormData({ ...formData, color: option })
    }

    const colourStyles = {
        control: (styles) => ({ ...styles, backgroundColor: '#031111', border: 0 }),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => ({
            ...styles,
            backgroundColor: isDisabled
                ? null
                : isSelected
                    ? '#031111' // Change the background color for selected options
                    : isFocused
                        ? '#e9ecef' // Change the background color for focused options
                        : null,
            color: isDisabled
                ? '#ccc'
                : isSelected
                    ? 'white' // Change the text color for selected options
                    : '#333', // Change the text color for unselected options
            cursor: isDisabled ? 'not-allowed' : 'default',
        }),
    }

    return (
        <DashboardLayout>
            <div className="page-header">
                <h1>Create Post</h1>
            </div>

            <div className="row">
                <div className='cardbody col-lg-6'>
                    <form onSubmit={handleSubmit}>

                        <div className="form-group">
                            <label htmlFor="email">Post Name</label>
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

                        <div className="form-group">
                            <label>Post Type</label>
                            <label className='checkbox-control'>
                                <input
                                    type="checkbox"
                                    value="image"
                                    name="postType"
                                    onChange={onChangeForm}
                                /> Image
                            </label>
                            <label className='checkbox-control'>
                                <input
                                    type="checkbox"
                                    value="value"
                                    name="postType"
                                    onChange={onChangeForm}
                                /> Video
                            </label>
                            <div className="color-red">{errors.filetype}</div>
                        </div>

                        <div className="form-group">
                            <label>Save Mode</label>
                            <label className='radio-control'>
                                <input
                                    type="radio"
                                    value="publish"
                                    name="save_mode"
                                    onChange={onChangeForm}
                                /> Publish
                            </label>
                            <label className='radio-control'>
                                <input
                                    type="radio"
                                    value="draft"
                                    name="save_mode"
                                    onChange={onChangeForm}
                                /> Draft
                            </label>
                            <div className="color-red">{errors.filetype}</div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="post_country">Post Country:</label>
                            <select
                                id="post_country"
                                name="post_country"
                                value={formData.post_country}
                                onChange={onChangeForm}
                            >
                                <option value="">Select a Country</option>
                                <option value="usa">USA</option>
                                <option value="ca">Canada</option>
                                <option value="in">India</option>
                            </select>
                        </div>

                        <Select
                            options={options}
                            styles={colourStyles}
                            isMulti
                            name="color"
                            onChange={handleSelectChange}
                        />

                        <div className="form-group">
                            <label className='checkbox-control'>
                                <input
                                    type="checkbox"
                                    id="status"
                                    value={1}
                                    name="status"
                                    onChange={onChangeForm}
                                /> Status
                            </label>
                            <div className="color-red">{errors.status}</div>
                        </div>

                        <button type='submit' className="btn submit">Submit</button>
                        <Link to="/admin/posts" className="btn">Cancel</Link>
                    </form>


                </div>
            </div>
        </DashboardLayout>
    )
}
