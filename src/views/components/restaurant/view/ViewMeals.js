import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Meals(props) {
  const { meals } = useSelector((state) => state.restaurant);
  const [meal_plan, setMealPlan] = useState([])

  useEffect(() => {
    let componentMounted = true
    if (componentMounted) {
      setMealPlan(meals)
    }
  }, [props])

  return (
    <div className="row mt-2">

      {meal_plan &&
        meal_plan.map((meal, key) => (
          <div className="row mt-2" key={key}>
            <div className="col-lg-12">
              <div className="ibox px-4">
                <div className="ibox-title">
                  <h5>{meal.category}</h5>
                </div>
                <div className="ibox-content">
                  <div className="row">
                    {
                      Array.isArray(meal.items) && meal.items.map((data, key) => (
                        <div className="col-4" key={key}>
                          <div className="ibox">
                            <div className="ibox-content product-box active">
                              <img className="img-thumbnail" src={data.image} alt="Meal" />
                              <div className="product-desc">
                                <span className="product-price">{data.day}</span>
                                <div className="row justify-content-between ml-1">
                                  <small className="text-muted text-capitalize">
                                    {data.type}
                                  </small>
                                  <small className="text-muted text-capitalize">
                                    {data.slot}
                                  </small>
                                </div>
                                <a href="/" className="product-name">
                                  {data.meal_name}
                                </a>
                                <div className="small m-t-xs">{data.description}</div>
                                <hr className="hr-line-dashed" />
                                <div className="text-left">
                                  <h5>Add Ons</h5>
                                  <table className="table table-bordered">
                                    <thead>
                                      <tr>
                                        <th>
                                          <small>Add On</small>
                                        </th>
                                        <th>
                                          <small>Price</small>
                                        </th>
                                        <th>
                                          <small>Image</small>
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {data.add_on &&
                                        data.add_on.map((addOn, key) =>
                                          addOn.add_on ? (
                                            <tr key={key} className="px-2 center">
                                              <td className="text-muted text-capitalize">
                                                <small>{addOn.add_on}</small>
                                              </td>
                                              <td className="text-muted text-capitalize">
                                                <small>{"$" + addOn.add_on_price}</small>
                                              </td>
                                              <td>
                                                <img
                                                  className="img-md"
                                                  src={addOn.add_on_image}
                                                  alt="Add On"
                                                />
                                              </td>
                                            </tr>
                                          ) : (
                                            <tr>
                                              <td>No add ons for this day</td>
                                            </tr>
                                          )
                                        )}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  );
}
