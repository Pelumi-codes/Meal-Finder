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
        <div class"meal">
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
// Add event listeners
submit.addEventListener('submit', searchMeal);
