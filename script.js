const searchBox = document.querySelector('.search-box')
const searchBtn = document.querySelector('.search-btn')
const recipeContainer = document.querySelector('.recipe-container')
const recipeDetailsContent =document.querySelector('.recipe-details-content')
const recipeCloseBtn =document.querySelector('.recipe-close-btn')


// functio to get recipes

const fetchRecipes = async(query)=>{
    recipeContainer.innerHTML = "<h2>fetching recipes...</h2>"
    //  I use api from this site (https://www.themealdb.com/api.php) //
   await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
   .then((res)=>res.json())
    .then((json)=>{
        console.log(json);
        recipeContainer.innerHTML =''

        json.meals.forEach(meal => {
            console.log(meal)
            const recipeDiv = document.createElement('div')
            recipeDiv.classList.add('recipe')
            recipeDiv.innerHTML =`
            <img src="${meal.strMealThumb}">
            <h3>${meal.strMeal}</h3>
            <p><span>${meal.strArea}</span> Dish</p>
            <p>Belongs to <span>${meal.strCategory}</span> Category</p>
            
            `
            const button = document.createElement('button')
            button.textContent ='View Recipe'
            recipeDiv.appendChild(button)
    
            // adding eventlistenner to recipe button//
            button.addEventListener('click',()=>{
                openRecipePopup(meal)
            })


            recipeContainer.appendChild(recipeDiv)
        });
    })
    .catch(err=>{
        recipeContainer.innerHTML='<h2>Error in Fetching Recipes...</h2>'
    })
}

//function to fetch ingredients and measurements//
const fetchIngredients =(meal)=>{
    let ingredientsList = "" 
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    console.log(ingredient);
    if(ingredient){
        const measure =  meal[`strMeasure${i}`];
        console.log(measure);
        ingredientsList += `<li>${measure} ${ingredient}</li>`
    }else{
        break;
    }
  }
  return ingredientsList
}

const openRecipePopup =(meal)=>{
  recipeDetailsContent.innerHTML = `
  <h2 class="recipe-name">${meal.strMeal}</h2>
  <h3>Ingredents:</h3>
  <ul class="ingredient-list">${fetchIngredients(meal)}</ul>
  <div class="recipe-instructions">
     <h3>Instructions:</h3>
     <p >${meal.strInstructions}</p>
  </div>
  `

  recipeDetailsContent.parentElement.style.display = "block";
}

recipeCloseBtn.addEventListener('click',()=>{
    recipeDetailsContent.parentElement.style.display="none"
})

searchBtn.addEventListener('click',(e)=>{
    e.preventDefault()
    let inputValue = searchBox.value.trim()
    if(!inputValue){
        recipeContainer.innerHTML=`<h2>Type meal in the search box</h2>`
        return recipeContainer
    }
    fetchRecipes(inputValue)
    
})

searchBox.addEventListener('focus',()=>{
    recipeContainer.innerHTML=""
})


 