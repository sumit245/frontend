import React, { useEffect, useState } from 'react'
import AddOnCard from './AddOnCard'

export default function MealCard({ meal_name, meal_image, meal_day, meal_description, meal_slot, meal_type, meal_add_on }) {
    const [name, setName] = useState(meal_name)
    const [image, setImage] = useState(meal_image)
    const [day, setDay] = useState(meal_day)
    const [description, setDescription] = useState(meal_description)
    const [slot, setSlot] = useState(meal_slot)
    const [type, setType] = useState(meal_type)
    const [editable, setEditable] = useState(false)
    const [add_on, setAddOn] = useState(meal_add_on)
    const deleteMeal = () => { }
    const imageUpdate = () => { }
    const handleInputChange = (event) => { }
    return (
        <div className="col-6">
            <div className="ibox card">
                <div className="ibox-title" style={{ borderTopColor: "transparent" }}>
                    {editable ? (
                        <input
                            name="day"
                            placeholder="Day"
                            className="form-control col-md-6"
                            onChange={(event) => handleInputChange(event)}
                        />
                    ) : (
                        <h5>{day}</h5>
                    )}
                    <div className="ibox-tools">
                        <span className=" btn btn-outline-primary mr-1" onClick={() => setEditable(!editable)}>
                            <i className={`${editable ? "fa fa-save" : "fa fa-pencil"}`} />
                        </span>
                        <span className="btn btn-outline-danger" onClick={() => deleteMeal()}>
                            <i className="fa fa-trash" />
                        </span>
                    </div>
                </div>
                <div className="ibox-content">
                    <img src={image} className="img-fluid" alt="Meal" style={{ width: "100%", height: 220 }} />
                    <div className="mt-1" />
                    {editable && (
                        <div className="custom-file">
                            <input
                                id="meal_image"
                                type="file"
                                className="custom-file-input"
                                onChange={(e) => imageUpdate(e)}
                            />
                            <label htmlFor="meal_image" className="custom-file-label">Choose file...</label>
                        </div>
                    )}

                    <div className="row mt-1">
                        <div className="col-8">
                            {editable ? (
                                <input
                                    name="name"
                                    placeholder="Meal Name"
                                    className="form-control"
                                    onChange={(event) => handleInputChange(event)}
                                />
                            ) : (
                                <h5 className='text-uppercase'>{name}</h5>
                            )}
                        </div>
                        <div className="col-4">
                            {editable ? (
                                <input
                                    name="slot"
                                    placeholder="Slot"
                                    className="form-control"
                                    onChange={(event) => handleInputChange(event)}
                                />
                            ) : (
                                <h5 className='text-capitalize' style={{ fontSize: 10 }}>{slot}</h5>
                            )}
                        </div>
                    </div>
                    <div className="row mt-1">
                        <div className="col-8">
                            {editable ? (
                                <input
                                    name="description"
                                    placeholder="Little description here"
                                    className="form-control"
                                    onChange={(event) => handleInputChange(event)}
                                />
                            ) : (
                                <p className='text-capitalize'>{description}</p>
                            )}
                        </div>
                        <div className="col-4">
                            {editable ? (
                                <input
                                    name="type"
                                    placeholder="Meal Type"
                                    className="form-control"
                                    onChange={(event) => handleInputChange(event)}
                                />
                            ) : (
                                <h5 className={`text-capitalize ${type}=='veg'?'text-success':'text-danger'`} style={{ fontSize: 8 }}>{type}</h5>
                            )}
                        </div>
                    </div>
                    <AddOnCard meal_add_on={add_on} />
                </div>
            </div>
        </div>
    )
}
