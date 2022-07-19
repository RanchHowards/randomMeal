const mealContainer = document === null || document === void 0 ? void 0 : document.getElementById("meal");
const button = document.querySelector("button");
button === null || button === void 0 ? void 0 : button.addEventListener("click", () => {
    var _a;
    if (!button.classList.contains("more-food")) {
        (_a = document.querySelector("body")) === null || _a === void 0 ? void 0 : _a.classList.remove("starting-display");
        button.classList.add("more-food");
        button.innerText = "MORE FOOD!";
    }
    fetchMeal();
});
async function fetchMeal() {
    const data = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    const mealData = await data.json();
    const meal = mealData.meals[0];
    makeMeal(meal);
}
function makeMeal(meal) {
    if (mealContainer) {
        const chunkedInstructions = meal.strInstructions
            .split("\n")
            .filter((step) => step !== "\r")
            .filter((step) => !step.includes("STEP"));
        const ingredientsArray = [];
        for (let i = 0; i < 21; i++) {
            const ingredientKey = `strIngredient${i}`;
            const measureKey = `strMeasure${i}`;
            meal[ingredientKey]
                ? ingredientsArray.push(`${meal[ingredientKey]} - ${meal[measureKey]}`)
                : null;
        }
        mealContainer.innerHTML = `
    <h1>${meal.strMeal}</h1>
    <div class='pictureIngredientsContainer'>
      <img src=${meal.strMealThumb}></img>
      <ul>${ingredientsArray
            .map((ingredient) => `<li>${ingredient}</li>`)
            .join("")}</ul>
    </div>
    <ol>${chunkedInstructions.map((step) => `<li>${step}</li>`).join("")}
    </ol>
    `;
    }
    else
        alert("Couldn't find the element ID to attach this tasty meal");
}
export {};
