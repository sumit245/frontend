import React, { useEffect, useState } from 'react'

export default function EditPlans({ goToStep, restaurant }) {
  const [plans, setPlan] = useState([])
  const [isDelivery, setIsDelivery] = useState(false)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    let componentMount = true
    if (componentMount) {
      console.log(restaurant.price_plans)
      setPlan(restaurant.price_plans)
      setIsDelivery(restaurant.isDelivery)
      console.log(restaurant.isDelivery)
      setLoading(true)
    }
    return (() => {
      componentMount = false
    })
  }, [restaurant])
  const onBasePriceChange = () => { }
  const handleContinue = () => {
    goToStep(5)
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

                Array.isArray(price_plan.plans) && price_plan.plans.map((plan, key) => (
                  <div className="form-group mt-1" key={key}>
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
                            name="base_price"
                            defaultValue={plan.base_price}
                            onChange={(e) => onBasePriceChange(e)}
                          />
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="form-group">
                          <label>Customer price &nbsp;($)</label>
                          <input
                            className="form-control"
                            type="currency"
                            name="customer_price"
                            defaultValue={plan.customer_price}
                            disabled
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
                            onChange={(e) => onBasePriceChange(e)}
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
      {/* {
        loading && plans.map((data, key) => (

        ))
      } */}

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
