import { useDispatch, useSelector } from 'react-redux';
import AppIcon from '../components/AppIcon';
import DashboardLayout from '../layouts/DashboardLayout';
import { destroy, index, remove } from './projectSlice';
import { useEffect, useState } from 'react';
import SortArrow from '../components/SortArrow';
import Pagination from "react-js-pagination";

export default function () {

    const dispatch = useDispatch()

    const { projects, perPage, total } = useSelector(state => state.project)
    const [formData, setFormData] = useState({
        search: "",
        so: "",
        sb: "name",
        page: 1,
    });

    useEffect(() => {
        const data = Object.fromEntries(
            Object.entries(formData)
                .filter(([key, value]) => value !== "")
                .map(([key, value]) => [key, value])
        );
        dispatch(index(data))
    }, [dispatch, formData])

    const handleDelete = (project) => {
        dispatch(remove(project))
        dispatch(destroy(project))
    }

    const handleSearch = e => {
        setFormData({ search: e.target.value })
    }

    const handleSort = (order, name) => {
        setFormData(prev => ({ ...prev, so: order, sb: name }))
    }

    const handlePagination = number => {
        setFormData(prev => ({ ...prev, page: number }))
    }

    return (
        <DashboardLayout>
            <div className="row">
                <div className="page-header">
                    <h1>Projects</h1>
                </div>

                <div className="other-actions">
                    <AppIcon to="create" icon="add" />
                    <div className="search">
                        <input type="text"
                            className="form-control input-field"
                            id="search"
                            value={formData.search}
                            name="search"
                            onChange={handleSearch}
                        />
                    </div>
                </div>
            </div>

            <div className="row">
                <div className='cardbody'>
                    <div className="index-table-container">

                        <table className="index-table">
                            <thead>
                                <tr>
                                    <th># <SortArrow onClick={handleSort} column="id" /></th>
                                    <th>Project Name <SortArrow onClick={handleSort} column="name" /></th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    projects.map((data) => (
                                        <tr key={data.id}>
                                            <td>{data.id}</td>
                                            <td>{data.name}</td>
                                            <td className='action'>
                                                <AppIcon onClick={handleDelete} item={data} icon="trash" />
                                                <AppIcon to={`/projects/${data.id}`} icon="edit" />
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>

                    </div>
                    <Pagination
                        activePage={formData.page}
                        itemsCountPerPage={perPage}
                        totalItemsCount={total}
                        pageRangeDisplayed={5}
                        onChange={handlePagination}
                    />
                </div>
            </div>
        </DashboardLayout>

    )
}