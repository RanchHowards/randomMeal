const mealContainer = document.getElementById("meal");
const button = document.querySelector("button");
function makeMeal(meal) {
    const chunkedInstructions = meal.strInstructions
        .split("\n")
        .filter((step) => step !== "\r")
        .filter((step) => !step.includes("STEP"));
    const ingredientsArray = [];
    for (let i = 0; i < 21; i += 1) {
        const ingredientKey = `strIngredient${i}`;
        const measureKey = `strMeasure${i}`;
        if (meal[ingredientKey]) {
            ingredientsArray.push(`${meal[ingredientKey]} - ${meal[measureKey]}`);
        }
    }
    mealContainer.innerHTML = `
    <h1>${meal.strMeal}</h1>
    <div class='pictureIngredientsContainer'>
      <div class='pictureWrapper'>
      <img src=${meal.strMealThumb}></img>
      </div>
      <ul>${ingredientsArray
        .map((ingredient) => `<li>${ingredient}</li>`)
        .join("")}</ul>
    </div>
    <ol class='instructions'>${chunkedInstructions
        .map((step) => `<li>${step}</li>`)
        .join("")}
    </ol>
    `;
}
async function fetchMeal() {
    const data = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    const mealData = await data.json();
    const meal = mealData.meals[0];
    makeMeal(meal);
}
button.addEventListener("click", () => {
    var _a, _b;
    if ((_a = document.querySelector("body")) === null || _a === void 0 ? void 0 : _a.classList.contains("starting-display")) {
        (_b = document.querySelector("body")) === null || _b === void 0 ? void 0 : _b.classList.remove("starting-display");
        button.classList.add("more-food");
        button.innerText = "MORE FOOD!";
    }
    fetchMeal();
});
export {};
