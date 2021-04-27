const search = document.getElementById('search'),
random =  document.getElementById('random'),
submit =  document.getElementById('submit'),
resultHeading =  document.getElementById('result-heading'),
mealsEl =  document.getElementById('meals'),
single_mealEl=  document.getElementById('single-meal');




//Search meal and fetch from API
function searchMeal(e) {
    e.preventDefault();

    // Clear single-Meal
 single_mealEl.innerHTML='';

 //Get search meal
 const meal =search.value;



 //Check for empty
 if(meal.trim()) {
fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`)
    .then(res => res.json())
    .then (data => {
    resultHeading.innerHTML = `<h2>search result for '${meal}':</h2>`;

    if (data.meals === null) {
    resultHeading.innerHTML = `<p>There are no search results. Try again!</p>`;
    } else {
        mealsEl.innerHTML = data.meals.map(meal =>`
        <div class ="meal">
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
        <div class="meal-info" data-mealID="${meal.idMeal}">
        <h3>${meal.strMeal}</h3>
        
        </div>
        </div>
        `)
        .join('');
    }
    });
    // Clear search text
    search.value = '';
 } else {
 alert('Please enter a search meal');
 }
}

// Fetch meal by ID
function getMealById(mealID) {
fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
.then(res => res.json())
.then(data => {
    const meal = data.meals[0];

    addMealToDOM(meal);
});
}

// Fetch random meal from API
function getRandomMeal() {
    // Clear meals and heading
    mealsEl.innerHTML = '';
    resultHeading.innerHTML = '';

    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then(res => res.json())
        .then(data => {

            const meal = data.meals[0];

            addMealToDOM(meal);

        });
    
}

//Add meal to DOM
function addMealToDOM(meal) {
    const ingredients = [];

    for(let i = 1; i <= 20; i++) {
    if(meal[`strIngredient${i}`]) {
    ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
    } else {
        break;
    }
    }

    single_mealEl.innerHTML =`
    <div class="single-meal">
    <h1>${meal.strMeal}</h1>
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
    <div class="single-meal-info">
    ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
    ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
    </div>
    <div class="main">
    <p>${meal.strInstructions}</p>
    <h2>Ingredients</h2>
    <ul>
    ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
    </ul>
    </div>
    </div>
    `;
}
// Add event listeners
submit.addEventListener('submit', searchMeal);
random.addEventListener('click', getRandomMeal);

mealsEl.addEventListener('click', e => {
    const mealInfo = e.path.find(meal => {
        if(meal.classList) {
            return meal.classList.contains('meal-info');
        } else {
            return false;
        }      
    });
    if (mealInfo) {
    const mealID = mealInfo.getAttribute('data-mealid');
    getMealById(mealID);
    }
});
