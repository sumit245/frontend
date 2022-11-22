import React, { useState, useEffect } from "react";
import { imageUploader } from "../../../../utilities/fileHandlers";
import { useDispatch } from "react-redux";
import { editMealsInfo } from "../../../../actions/restaurantAction";
import AddMoreMeals from "./AddMoreMeals";
import MealCard from "../MealCard";
export default function EditMeals(props) {
  const [meals, setMeals] = useState([]);
  const [contentEditable, setContentEditable] = useState(false);
  const [moreAddons, setmoreAddons] = useState(false);
  const [currentpos, setCurrentpos] = useState(0);
  const [addsomemeal, setaddsomemeal] = useState(false);
  const [localaddons, setlocaladdons] = useState({
    add_on: "",
    add_on_image: "",
    add_on_price: "",
  });
  const dispatch = useDispatch();
  const handleContinue = (e) => {
    dispatch(editMealsInfo(meals));
    props.goToStep(4);
  };
  const handleBack = (e) => {
    e.preventDefault();
    props.goToStep(2);
  };
  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    let localmeals = [...meals];
    let updatedMeal = { ...meals[index] };
    updatedMeal[name] = value;
    localmeals[index] = updatedMeal;
    setMeals(localmeals);
  };
  const onChangeaddons = (index, event) => {
    const { name, value } = event.target;
    setlocaladdons({
      ...localaddons,
      [name]: value,
    });
  };
  const profileUpdate = (index, e) => {
    let file = e.target.files[0];
    imageUploader(file, (result) => {
      let localmeals = [...meals];
      let updatedMeal = { ...meals[index] };
      updatedMeal.image = result;
      localmeals[index] = updatedMeal;
      setMeals(localmeals);
    });
  };
  const editMeal = (key) => {
    setContentEditable(!contentEditable);
    setCurrentpos(key);
  };
  const deleteMeal = (index) => {
    let localmeals = [...meals];
    localmeals.splice(index, 1);
    setMeals(localmeals);
  };
  const onChangeExtras = (index, event) => {
    let addOnImage = event.target.files[0];
    imageUploader(addOnImage, (result) => {
      setlocaladdons({
        ...localaddons,
        add_on_image: result,
      });
    });
  };
  const saveExtras = (index) => {
    setmoreAddons(false);
    let localmeals = [...meals];
    let updatedMeal = { ...meals[index] };
    let addons = [...meals[index].add_on];
    addons.push(localaddons);
    updatedMeal.add_on = addons;
    localmeals[index] = updatedMeal;
    setMeals(localmeals);
  };
  function arrayRemove(arr, value) {
    return arr.filter(function (ele) {
      return ele !== value;
    });
  }
  const deleteExtra = (mealindex, addOnIndex) => {
    setmoreAddons(false);
    let localmeals = [...meals];
    let updatedMeal = { ...meals[mealindex] };
    let addons = [...meals[mealindex].add_on];
    let updatedExtras = arrayRemove(addons, addons[addOnIndex]);
    updatedMeal.add_on = updatedExtras;
    localmeals[mealindex] = updatedMeal;
    setMeals(localmeals);
  };
  const addMoreExtras = (key) => {
    setmoreAddons(true);
    setCurrentpos(key);
  };
  const addMeal = (data) => {
    setMeals([...meals, data]);
    setaddsomemeal(false);
  };
  useEffect(() => {
    let componentMount = true;
    if (componentMount) {
      let { meals } = props.restaurant;
      Array.isArray(meals) && setMeals(meals);
    }
    return () => {
      componentMount = false;
    };
  }, [props.restaurant]);
  return (
    <fieldset>
      <div className="row">
        {meals.length > 0 ? (
          meals.map((meal, key) => (
            <div className="row mt-2" key={key}>
              <div className="col-lg-12">
                <div className="ibox px-4">
                  <div className="ibox-title">
                    <h5>{meal.category}</h5>
                  </div>
                  <div className="ibox-content">
                    <div className="row">
                      {
                        Array.isArray(meal.items) && meal.items.map((item, key) => (
                          <MealCard
                            meal_name={item.meal_name}
                            meal_description={item.description}
                            meal_image={item.image}
                            meal_slot={item.slot}
                            meal_day={item.day}
                            meal_type={item.type}
                            meal_add_on={item.add_on}
                            key={key}
                          />
                        ))
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-lg-8">
            <p>You have not added any meals</p>
          </div>
        )}
      </div>

      <div className="ibox">
        <div className="ibox-title">
          <h5>Add More Meals</h5>
          <div className="ibox-tools">
            <span
              className="btn btn-outline-info"
              type="button"
              onClick={() => setaddsomemeal(true)}
            >
              <i className="fa fa-plus" />
            </span>
          </div>
        </div>
        <div className="ibox-content">
          {addsomemeal ? <AddMoreMeals addMeal={addMeal} /> : null}
        </div>
      </div>

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
    </fieldset>
  );
}
