const mealsContainer = document.getElementById('meals');
const favContainer = document.querySelector('.fav-meals');
const mealInfoContainer = document.getElementById('meal-info');
const mealPopup = document.getElementById('meal-popup');
const closeButton = document.getElementById('close-popup');
const searchButton = document.getElementById('search');
//console.log(mealsContainer)

//define a random method to get a random meal using an API for mealdb
async function getRandomMeal(){
  const resp = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
  const resp1 = await resp.json();
  const randomMeal = resp1['meals'][0];
  addMeal(randomMeal, true);
  //console.log(resp1.meals[0]);
  //console.log(randomMeal);
}
getRandomMeal();
fetchFavMeals();
async function getMealById(id){
  const resp = await fetch('https:/www.themealdb.com/api/json/v1/1/lookup.php?i='+id);
  const resp1 = await resp.json();
  const mealData = resp1['meals'][0];
  return mealData;
}
async function getMealsBySearch(term){
  const resp = await fetch('https:/www.themealdb.com/api/json/v1/1/search.php?s='+term);
  const respdata = await resp.json();
  const meals = respdata.meals;
  return meals;
  //console.log(meals);
}
function addMeal(mealData, random = false){
  console.log(mealData);
  const meal = document.createElement('div');
  meal.innerHTML = `
  <div class="meal">
        <div class="meal-header">
            ${
              random ? `<span class="random"> Random Recipe </span>` : ''
            }
            
            <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
        </div>
        <div class="meal-body">
            <h4>"${mealData.strMeal}"</h4>
            <button class="fav-button ">
            <i class="fa-regular fa-heart"></i>
            </button>
        </div>
    </div>
  `;
  const btn = meal.querySelector('.meal-body .fav-button');
  const btnIcon = btn.querySelector('.fa-heart');
  btn.addEventListener('click', () => {
    if(btnIcon.classList.contains('fa-solid')){
      removeMealLS(mealData.idMeal);
      btnIcon.classList.remove('fa-solid');
      fetchFavMeals();
      //console.log('first case clicked');
    }else{
      addMealLS(mealData.idMeal);
      btnIcon.classList.add('fa-solid');
      fetchFavMeals();
      //console.log('second case clicked');
    }
  });
  mealsContainer.append(meal);
}
function getMealLS(){
  const mealIds = JSON.parse(localStorage.getItem('mealIds'));
  console.log(mealIds);
  return mealIds === null ? [] : mealIds;
}
function removeMealLS(id){
  const mealIds = getMealLS();
  localStorage.setItem('mealIds', 
  JSON.stringify(mealIds.filter((item) => item !== id)));
}
function addMealLS(id){
  const mealIds = getMealLS();
  localStorage.setItem("mealIds",
JSON.stringify([...mealIds, id]));
}
//getMealLS();

async function fetchFavMeals(){
  favContainer.innerHTML = '';
  const mealIds = getMealLS();
  for(let i = 0; i < mealIds.length; i++){
    const meal = await getMealById(mealIds[i]);
    addFavMeal(meal);
  }

}
function addFavMeal(mealData){
  const favMeal = document.createElement('li');
  favMeal.innerHTML = `  
<img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
<span>${mealData.strMeal}</span>
<button class="clear"><i class="fas fa-window-close"></i></button>
`

  const btn = favMeal.querySelector('.clear');
  btn.addEventListener('click', () => {
    removeMealLS(mealData.idMeal);
    fetchFavMeals();
    //favMeal.remove()
    //favMeal.removeEventListener('click', showMealInfo);
  });
  favMeal.addEventListener('click', (event) => showMealInfo(mealData) );
  favContainer.append(favMeal);
}
function showMealInfo(mealData){
  mealInfoContainer.innerHTML = '';
  const mealInfo = document.createElement('div');

  //collect the ingredients and their measures in an array
  const ingredients = [];
  for(let i = 1; i <= 20; i++){
    if(mealData['strIngredient' + i]){
      ingredients.push(
        `${mealData['strIngredient' + i]} - ${mealData['strMeasure' + i]}`
      );
    }else{
      break;
    }

  }
  mealInfo.innerHTML = `
  <h1>${mealData.strMeal}</h1>
  <img
      src="${mealData.strMealThumb}"
      alt="${mealData.strMeal}"
  />
  <p>
  ${mealData.strInstructions}
  </p>
  <h3>Ingredients:</h3>
  <ul>
      ${ingredients
          .map(
              (ing) => `
      <li>${ing}</li>
      `
          )
          .join("")}
  </ul>
  `;
  //console.log(ingredients);

  mealInfoContainer.appendChild(mealInfo);
      // show the popup
   mealPopup.classList.remove("hidden");
}
closeButton.addEventListener('click', () => {
  mealPopup.classList.add('hidden');
});
searchButton.addEventListener('click', async () =>{
  const term = document.getElementById('search-term').value;
  const meals = await getMealsBySearch(term);
  mealsContainer.innerHTML = '';
  if(meals){
    meals.forEach((meal) => {
      addMeal(meal);
    });
  }
  console.log(term)
});
//<i class="fa-solid fa-heart"></i>
//<i class="fa-regular fa-heart"></i>
//getMealsBySearch("fish");
function mealInfo() {
   
    showMealInfo(mealData);

  }