const searchBtn = document.getElementById('srch-btn');
const mealList = document.getElementsByClassName('container2');
const mealDetails = document.querySelector('.mealDetails');
const getRecipeBtn = document.getElementById('mealCard');
// const recipeCloseBtn = document.getElementsByClassName('getRecipe');
console.log(getRecipeBtn)


// EVENT LISTENERS

// FUNCTION TO GET MEAL LIST ACCORDING TO GIVEN INGREDIENT

function getMealList(){
    let searchInputText = document.querySelector('#search-input').value;
    console.log(searchInputText);
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputText}`)
    .then(response => response.json())
    .then(data =>{
        
        let html = "";
        console.log(data.meals)
        if(data.meals){
            data.meals.forEach(meals => {
                html +=`
                <div class="mealCard" data-id="${meals.idMeal}">
                    <div class="mealImg">
                      <img src="${meals.strMealThumb}" id="mealCard-img"/>
                    </div>
                  <div class="mealName">${meals.strMeal}</div>
                    <div class="getRecipeBtn">
                    <button type="button" class="getRecipe">GET RECIPE    
                    </button>
                  </div>
                </div>
                `;
            });
        }else{
            html="Sorry, We did not find any meal";
        }
        mealList[0].innerHTML = html
    });   
}
searchBtn.addEventListener('click',getMealList);
getRecipeBtn.addEventListener('click',getMealRecipe);

// FUNCTION TO GET MEAL RECIPE
function getMealRecipe(e){
    e.preventDefault();
    console.log("function working");



    // if(e.target.classList.contains('getRecipe')){
    //     let mealItem = e.target.parentElement.parentElement;
        
    //     fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`).
    //     then(response =>response.json()) 
    //     .then(data => {
    //         console.log(data);
    //     })
    // }
}