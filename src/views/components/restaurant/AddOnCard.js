import React, { useState, useEffect } from 'react'

export default function AddOnCard({ meal_add_on }) {
    const [add_on, setAddOn] = useState(meal_add_on)
    const addMoreExtras = () => { }
    const deleteExtra = () => { }
    return (
        <div className="ibox-content table-responsive">
            <table className="table table-hover no-margins">
                <thead>
                    <tr>
                        <th><h5>Add On</h5></th>
                        <th><h5>Image</h5></th>
                        <th><h5>Price</h5></th>
                        <th>
                            <span className="btn btn-outline-primary" onClick={() => addMoreExtras()}>
                                <i className="fa fa-plus" />
                            </span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(add_on) &&
                        add_on.map((extra, rowIndex) => (
                            <tr key={rowIndex}>
                                <td style={{ width: "35%" }}>{extra.add_on}</td>
                                <td style={{ width: "40%" }}>
                                    <img
                                        src={extra.add_on_image}
                                        alt="Extras"
                                        className="card-img"
                                        style={{ height: 80, width: 120 }}
                                    />
                                </td>
                                <td style={{ width: "15%" }}>
                                    {"$" + extra.add_on_price}
                                </td>
                                <td
                                    style={{ width: "10%", flexDirection: "row" }}
                                >
                                    <span
                                        className="btn btn-outline-danger"
                                        onClick={() => deleteExtra(rowIndex)}
                                    >
                                        <i className="fa fa-trash-o" />
                                    </span>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
            {/* {moreAddons ? (
                <div>
                    <div className="row justify-content-end">
                        <button
                            className="btn btn-outline-danger mr-1"
                            onClick={() => setmoreAddons(false)}
                        >
                            CANCEL
                        </button>
                        <button
                            className="btn btn-outline-primary"
                            onClick={() => saveExtras(key)}
                        >
                            SAVE
                        </button>
                    </div>
                    <div className="row mt-1">
                        <div className="col-md-4">
                            <input
                                className="form-control"
                                placeholder="Add On"
                                name="add_on"
                                onChange={(e) => onChangeaddons(key, e)}
                            />
                        </div>
                        <div className="col-md-4">
                            <div className="custom-file dropzone">
                                <label
                                    htmlFor="add_on"
                                    style={{
                                        border: 1,
                                        display: "inline-block",
                                        cursor: "pointer",
                                    }}
                                >
                                    {localaddons.add_on_image !== "" ? (
                                        <img
                                            src={localaddons.add_on_image}
                                            alt="Preview"
                                            className="img-fluid"
                                        />
                                    ) : (
                                        <i className="fa fa-camera" />
                                    )}
                                </label>
                                <input
                                    id="add_on"
                                    type="file"
                                    name="add_on_image"
                                    onChange={(e) => onChangeExtras(key, e)}
                                    style={{ display: "none" }}
                                />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <input
                                className="form-control"
                                name="add_on_price"
                                placeholder="$2"
                                onChange={(e) => onChangeaddons(key, e)}
                            />
                        </div>
                    </div>
                </div>
            ) : (
               
            )} */}
        </div>
    )
}
