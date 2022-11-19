import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Plans(props) {
  const { price_plans } = useSelector((state) => state.restaurant);
  const [plans, setPlans] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    let componentMounted = true
    if (componentMounted) {
      setPlans(price_plans)
      console.log('=========Plans=====================');
      console.log(plans);
      console.log('====================================');
      setLoading(true)
    }
    return () => {
      componentMounted = false
    }
  }, [props])
  if (!loading) { return (<div />) }
  return (
    Array.isArray(plans) && plans.map((plan, key) => (
      <div className="ibox">
        <div className="ibox-title">
          <h5>{plan.category}</h5>
        </div>
        <div className="ibox-content">
          {
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">Plan</th>
                  <th scope="col">Base Price</th>
                  <th scope="col">Customer Price</th>
                  <th scope="col">Delivery Price</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(plan.plans) && plan.plans.map((item, key) => (
                  <tr>
                    <td>{item.plan_name}</td>
                    <td>${parseFloat(item.base_price)}</td>
                    <td>${parseFloat(item.customer_price)}</td>
                    <td>${parseFloat(item.delivery_price) === 0 ? "N/A" : parseFloat(item.delivery_price)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          }
        </div>

      </div>
    ))

  );
}
