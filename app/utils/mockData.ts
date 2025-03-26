import { Recipe } from '../components/RecipeCard';

export const mockRecipes: Recipe[] = [
  {
    id: "1",
    name: "Chicken Stir Fry",
    image: "https://source.unsplash.com/featured/?chicken,stir-fry",
    description: "A quick and healthy Asian-inspired dish with tender chicken and fresh vegetables.",
    ingredients: [
      "2 chicken breasts, sliced",
      "2 cups mixed vegetables",
      "3 cloves garlic",
      "2 tbsp soy sauce",
      "1 tbsp sesame oil"
    ],
    instructions: [
      "Slice chicken into thin strips",
      "Heat oil in a wok or large pan",
      "Stir fry chicken until golden",
      "Add vegetables and garlic",
      "Season with soy sauce"
    ],
    cookingTime: "25 minutes",
    difficulty: "Easy",
    servings: "4 servings",
    nutritionalInfo: "Calories: 350, Protein: 25g, Carbs: 20g, Fat: 15g",
    calories: "350",
    protein: "25",
    carbs: "20",
    fat: "15"
  },
  {
    id: "2",
    name: "Vegetarian Buddha Bowl",
    image: "https://source.unsplash.com/featured/?buddha-bowl",
    description: "A nutritious bowl packed with quinoa, roasted vegetables, and tahini dressing.",
    ingredients: [
      "1 cup quinoa",
      "2 cups mixed vegetables",
      "1 can chickpeas",
      "2 tbsp tahini",
      "1 lemon"
    ],
    instructions: [
      "Cook quinoa according to package instructions",
      "Roast vegetables in the oven",
      "Drain and rinse chickpeas",
      "Make tahini dressing",
      "Assemble bowl with all ingredients"
    ],
    cookingTime: "30 minutes",
    difficulty: "Medium",
    servings: "2 servings",
    nutritionalInfo: "Calories: 450, Protein: 15g, Carbs: 65g, Fat: 18g",
    calories: "450",
    protein: "15",
    carbs: "65",
    fat: "18"
  },
  {
    id: "3",
    name: "Salmon with Roasted Vegetables",
    image: "https://source.unsplash.com/featured/?salmon,vegetables",
    description: "Oven-baked salmon fillet with seasonal roasted vegetables.",
    ingredients: [
      "2 salmon fillets",
      "2 cups mixed vegetables",
      "2 tbsp olive oil",
      "1 lemon",
      "Fresh herbs"
    ],
    instructions: [
      "Preheat oven to 400°F",
      "Season salmon with herbs and lemon",
      "Toss vegetables with olive oil",
      "Bake for 20-25 minutes",
      "Serve hot with lemon wedges"
    ],
    cookingTime: "30 minutes",
    difficulty: "Easy",
    servings: "2 servings",
    nutritionalInfo: "Calories: 400, Protein: 35g, Carbs: 15g, Fat: 25g",
    calories: "400",
    protein: "35",
    carbs: "15",
    fat: "25"
  },
  {
    id: "4",
    name: "Mediterranean Quinoa Bowl",
    image: "https://source.unsplash.com/featured/?quinoa,bowl",
    description: "A healthy and protein-rich bowl with Mediterranean flavors",
    ingredients: [
      "1 cup quinoa",
      "1 can chickpeas",
      "1 cucumber",
      "1 red onion",
      "1 cup cherry tomatoes",
      "1/2 cup olives",
      "Feta cheese",
      "Olive oil",
      "Lemon juice",
      "Fresh herbs"
    ],
    instructions: [
      "Cook quinoa according to package instructions",
      "Drain and rinse chickpeas",
      "Chop vegetables",
      "Combine all ingredients in a bowl",
      "Dress with olive oil and lemon juice",
      "Top with feta cheese and fresh herbs"
    ],
    nutritionalInfo: "Calories: 450, Protein: 18g, Carbs: 65g, Fat: 15g",
    cookingTime: "25 minutes",
    difficulty: "Easy",
    servings: "2 servings",
    calories: "450",
    protein: "18",
    carbs: "65",
    fat: "15"
  },
  {
    id: "5",
    name: "Asian Stir-Fry",
    image: "https://source.unsplash.com/featured/?stir-fry,vegetables",
    description: "Quick and healthy Asian-inspired stir-fry",
    ingredients: [
      "2 cups mixed vegetables",
      "1 block firm tofu",
      "2 tbsp soy sauce",
      "1 tbsp sesame oil",
      "2 cloves garlic",
      "1 inch ginger",
      "Brown rice",
      "Green onions"
    ],
    instructions: [
      "Press and cube tofu",
      "Cook rice according to package instructions",
      "Heat sesame oil in a wok",
      "Stir-fry vegetables until crisp-tender",
      "Add tofu and sauce",
      "Serve over rice"
    ],
    nutritionalInfo: "Calories: 380, Protein: 22g, Carbs: 45g, Fat: 12g",
    cookingTime: "20 minutes",
    difficulty: "Easy",
    servings: "2 servings",
    calories: "380",
    protein: "22",
    carbs: "45",
    fat: "12"
  },
  {
    id: "6",
    name: "Mexican Black Bean Soup",
    image: "https://source.unsplash.com/featured/?soup,black-beans",
    description: "Spicy and nutritious black bean soup",
    ingredients: [
      "2 cans black beans",
      "1 onion",
      "2 cloves garlic",
      "1 bell pepper",
      "1 can diced tomatoes",
      "Cumin",
      "Chili powder",
      "Vegetable broth",
      "Cilantro"
    ],
    instructions: [
      "Sauté onion and garlic",
      "Add bell pepper and spices",
      "Add beans and tomatoes",
      "Simmer for 20 minutes",
      "Garnish with cilantro"
    ],
    nutritionalInfo: "Calories: 320, Protein: 15g, Carbs: 55g, Fat: 8g",
    cookingTime: "30 minutes",
    difficulty: "Easy",
    servings: "4 servings",
    calories: "320",
    protein: "15",
    carbs: "55",
    fat: "8"
  },
  {
    id: "7",
    name: "Greek Yogurt Parfait",
    image: "https://source.unsplash.com/featured/?yogurt,parfait",
    description: "Healthy breakfast parfait with fresh fruits",
    ingredients: [
      "2 cups Greek yogurt",
      "1 cup granola",
      "Mixed berries",
      "Honey",
      "Almonds"
    ],
    instructions: [
      "Layer Greek yogurt in a glass",
      "Add granola layer",
      "Top with berries",
      "Drizzle with honey",
      "Sprinkle with almonds"
    ],
    nutritionalInfo: "Calories: 280, Protein: 20g, Carbs: 35g, Fat: 10g",
    cookingTime: "5 minutes",
    difficulty: "Easy",
    servings: "2 servings",
    calories: "280",
    protein: "20",
    carbs: "35",
    fat: "10"
  },
  {
    id: "8",
    name: "Baked Salmon",
    image: "https://source.unsplash.com/featured/?salmon,baked",
    description: "Healthy omega-3 rich salmon dish",
    ingredients: [
      "2 salmon fillets",
      "Lemon",
      "Dill",
      "Garlic",
      "Olive oil",
      "Salt and pepper"
    ],
    instructions: [
      "Preheat oven to 400°F",
      "Season salmon with herbs",
      "Drizzle with olive oil",
      "Bake for 15 minutes",
      "Serve with lemon wedges"
    ],
    nutritionalInfo: "Calories: 350, Protein: 35g, Carbs: 2g, Fat: 22g",
    cookingTime: "20 minutes",
    difficulty: "Easy",
    servings: "2 servings",
    calories: "350",
    protein: "35",
    carbs: "2",
    fat: "22"
  }
];

export const generateMealPlan = (): { [key: string]: { breakfast: Recipe; lunch: Recipe; dinner: Recipe } } => {
  const mealPlan: { [key: string]: { breakfast: Recipe; lunch: Recipe; dinner: Recipe } } = {};
  const usedRecipes = new Set<string>();

  const getUniqueRandomRecipe = (): Recipe => {
    const availableRecipes = mockRecipes.filter(recipe => !usedRecipes.has(recipe.id));
    if (availableRecipes.length === 0) {
      console.warn('No more unique recipes available, reusing recipes');
      usedRecipes.clear();
      return mockRecipes[Math.floor(Math.random() * mockRecipes.length)];
    }
    const recipe = availableRecipes[Math.floor(Math.random() * availableRecipes.length)];
    usedRecipes.add(recipe.id);
    return recipe;
  };

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  days.forEach(day => {
    mealPlan[day] = {
      breakfast: getUniqueRandomRecipe(),
      lunch: getUniqueRandomRecipe(),
      dinner: getUniqueRandomRecipe()
    };
  });

  return mealPlan;
};

// Helper function to filter recipes based on user preferences
export const filterRecipes = (
  recipes: Recipe[],
  ingredients: string[] = [],
  dietaryPreferences: string[] = [],
  mealType: string = '',
  allergies: string[] = []
) => {
  // If no filters are applied, return all recipes
  if (ingredients.length === 0 && dietaryPreferences.length === 0 && mealType === '' && allergies.length === 0) {
    return recipes;
  }
  
  return recipes.filter(recipe => {
    // Check if the recipe contains at least one of the specified ingredients
    const hasIngredient = ingredients.length === 0 || ingredients.some(ingredient => 
      recipe.ingredients.some(i => i.toLowerCase().includes(ingredient.toLowerCase()))
    );
    
    // Check dietary preferences (this is a simplified check)
    const meetsDietaryPreferences = dietaryPreferences.length === 0 || dietaryPreferences.every(pref => {
      switch (pref.toLowerCase()) {
        case 'vegetarian':
          return !recipe.ingredients.some(i => 
            i.toLowerCase().includes('chicken') || 
            i.toLowerCase().includes('beef') || 
            i.toLowerCase().includes('pork') || 
            i.toLowerCase().includes('fish') ||
            i.toLowerCase().includes('salmon')
          );
        case 'vegan':
          return !recipe.ingredients.some(i => 
            i.toLowerCase().includes('meat') || 
            i.toLowerCase().includes('chicken') || 
            i.toLowerCase().includes('beef') || 
            i.toLowerCase().includes('pork') || 
            i.toLowerCase().includes('fish') ||
            i.toLowerCase().includes('salmon') ||
            i.toLowerCase().includes('egg') ||
            i.toLowerCase().includes('milk') ||
            i.toLowerCase().includes('cheese') ||
            i.toLowerCase().includes('yogurt') ||
            i.toLowerCase().includes('butter')
          );
        case 'keto':
          // Extract number from carbs string (e.g., "30g" -> 30)
          const carbsValue = parseInt(recipe.carbs, 10);
          return !isNaN(carbsValue) && carbsValue < 20; // Simplified check for keto
        case 'gluten-free':
          return !recipe.ingredients.some(i => 
            i.toLowerCase().includes('wheat') || 
            i.toLowerCase().includes('flour') || 
            i.toLowerCase().includes('bread') ||
            i.toLowerCase().includes('pasta')
          );
        case 'high-protein':
          // Extract number from protein string (e.g., "35g" -> 35)
          const proteinValue = parseInt(recipe.protein, 10);
          return !isNaN(proteinValue) && proteinValue > 25; // Simplified check for high protein
        case 'low-carb':
          // Extract number from carbs string (e.g., "30g" -> 30)
          const carbsVal = parseInt(recipe.carbs, 10);
          return !isNaN(carbsVal) && carbsVal < 30; // Simplified check for low carb
        default:
          return true;
      }
    });
    
    // Check for meal type (this would need more sophisticated logic in a real app)
    const isMealType = mealType === '' || (
      (mealType.toLowerCase() === 'breakfast' && recipe.name.toLowerCase().includes('breakfast')) ||
      (mealType.toLowerCase() === 'lunch' && !recipe.name.toLowerCase().includes('breakfast')) ||
      (mealType.toLowerCase() === 'dinner' && !recipe.name.toLowerCase().includes('breakfast')) ||
      (mealType.toLowerCase() === 'snack' && recipe.cookingTime.includes('15')) // Assuming quick recipes are snacks
    );
    
    // Check for allergies
    const noAllergies = allergies.length === 0 || !allergies.some(allergy => 
      recipe.ingredients.some(i => i.toLowerCase().includes(allergy.toLowerCase()))
    );
    
    return hasIngredient && meetsDietaryPreferences && isMealType && noAllergies;
  }); 
}; 