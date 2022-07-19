import { Meal } from "./Meal";

const mealContainer = document?.getElementById("meal");
const button = document.querySelector("button");

button?.addEventListener("click", () => {
  if (!button.classList.contains("more-food")) {
    document.querySelector("body")?.classList.remove("starting-display");
    button.classList.add("more-food");
    button.innerText = "MORE FOOD!";
  }
  fetchMeal();
});

async function fetchMeal() {
  const data = await fetch(
    "https://www.themealdb.com/api/json/v1/1/random.php"
  );

  const mealData = await data.json();
  const meal: Meal = mealData.meals[0];
  makeMeal(meal);
}

function makeMeal(meal: Meal) {
  if (mealContainer) {
    const chunkedInstructions = meal.strInstructions
      .split("\n")
      .filter((step) => step !== "\r")
      .filter((step) => !step.includes("STEP"));

    const ingredientsArray = [];
    for (let i = 0; i < 21; i++) {
      const ingredientKey = `strIngredient${i}` as keyof Meal;
      const measureKey = `strMeasure${i}` as keyof Meal;
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
  } else alert("Couldn't find the element ID to attach this tasty meal");
}
