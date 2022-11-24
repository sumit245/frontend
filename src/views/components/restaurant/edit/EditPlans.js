import React, { useEffect, useState } from 'react'
import { getProfitMargin } from '../../../../actions/restaurantAction'

export default function EditPlans({ goToStep, restaurant }) {
  const [plans, setPlan] = useState([])
  const [isDelivery, setIsDelivery] = useState(false)
  const [loading, setLoading] = useState(false)
  const [profits, setProfits] = useState([])

  useEffect(async () => {
    let componentMount = true
    if (componentMount) {
      const profit = await getProfitMargin()
      setProfits(profit)
    }
    return () => {
      componentMount = true
    }
  }, [])

  useEffect(() => {
    let componentMount = true
    if (componentMount) {
      setPlan(restaurant.price_plans)
      setIsDelivery(restaurant.isDelivery)
      setLoading(true)
    }
    return (() => {
      componentMount = false
    })
  }, [restaurant])

  const onBasePriceChange = (category, plan_name, e) => {
    const { value } = e.target
    let planToUpdate = plans
    let currentPlan = planToUpdate[category].plans.find(plan => plan.plan_name === plan_name)
    let foundIndex = planToUpdate[category].plans.findIndex(plan => plan.plan_name === plan_name)
    const { profit_margin } = profits.find((plan) => plan.plan_name === plan_name)
    currentPlan.base_price = value
    currentPlan.customer_price = parseFloat(parseFloat(value) + parseFloat(profit_margin)).toString()
    planToUpdate[category].plans[foundIndex] = currentPlan
    setPlan(planToUpdate)
    console.log('====================================');
    console.log(plans);
    console.log('====================================');
  }

  const onDeliveryPriceChange = (key, plan_name, e) => {

  }

  const handleContinue = () => {
    console.log('====================================');
    console.log(plans);
    console.log('====================================');
    // goToStep(5)
  }
  const handleBack = () => {
    goToStep(3)
  }
  return (
    <fieldset>
      {
        loading && Array.isArray(plans) && plans.map((price_plan, key) => (
          <div className='ibox' key={key}>
            <div className='ibox-title'>
              <h5>{price_plan.category}</h5>
              <div className="ibox-tools">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    onChange={() => setIsDelivery(!isDelivery)}
                    id="flexCheckChecked"
                    defaultValue={isDelivery}
                    defaultChecked={isDelivery} />
                  <label className="form-check-label" htmlFor="flexCheckChecked">
                    Provide Delivery
                  </label>
                </div>
              </div>
            </div>
            <div className='ibox-content'>
              {
                Array.isArray(price_plan.plans) && price_plan.plans.map((plan, index) => (
                  <div className="form-group mt-1" key={index}>
                    <label>
                      <strong>{plan.plan_name}</strong>
                    </label>
                    <div className="row" >
                      <div className="col-lg-4">
                        <div className="form-group">
                          <label>
                            Base price <strong className="text-danger">*</strong> &nbsp;($)
                          </label>
                          <input
                            className="form-control"
                            type="currency"
                            defaultValue={plan.base_price}
                            onChange={(e) => onBasePriceChange(key, plan.plan_name, e)}
                          />
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="form-group">
                          <label>Customer price &nbsp;($)</label>
                          <input
                            className="form-control"
                            type="currency"
                            defaultValue={plan.customer_price}
                          />
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="form-group">
                          <label>Delivery Charges &nbsp;($)</label>
                          <input
                            className="form-control"
                            type="currency"
                            name="delivery_price"
                            onChange={(e) => onDeliveryPriceChange(key, plan.plan_name, e)}
                            defaultValue={plan.delivery_price}
                            disabled={!isDelivery}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        ))
      }
      <div className="row">
        <div className="col-lg-12 justify-content-end">
          <button
            type="button"
            className="btn btn-primary float-right mr-2 "
            onClick={handleContinue}
          >
            Next
          </button>
          <button
            type="button"
            className="btn btn-default float-right mr-2 "
            onClick={handleBack}
          >
            Previous
          </button>
        </div>
      </div>
    </fieldset>
  )
}
