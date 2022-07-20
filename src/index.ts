import { Meal } from "./Meal";

const mealContainer = <HTMLDivElement>document.getElementById("meal");
const button = <HTMLButtonElement>document.querySelector("button");

function makeMeal(meal: Meal) {
  const chunkedInstructions = meal.strInstructions
    .split("\n")
    .filter((step) => step !== "\r")
    .filter((step) => !step.includes("STEP"));

  const ingredientsArray = [];
  for (let i = 0; i < 21; i += 1) {
    const ingredientKey = `strIngredient${i}` as keyof Meal;
    const measureKey = `strMeasure${i}` as keyof Meal;
    if (meal[ingredientKey]) {
      ingredientsArray.push(`${meal[ingredientKey]} - ${meal[measureKey]}`);
    }
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

async function fetchMeal() {
  const data = await fetch(
    "https://www.themealdb.com/api/json/v1/1/random.php"
  );

  const mealData = await data.json();
  const meal: Meal = mealData.meals[0];
  makeMeal(meal);
}
button.addEventListener("click", () => {
  if (button.classList.contains("more-food")) {
    document.querySelector("body")?.classList.remove("starting-display");
    button.classList.add("more-food");
    button.innerText = "MORE FOOD!";
  }
  fetchMeal();
});
