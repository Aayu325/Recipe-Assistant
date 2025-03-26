import { Recipe } from '../components/RecipeCard';

interface DailyMealPlan {
  day: string;
  breakfast: Recipe;
  lunch: Recipe;
  dinner: Recipe;
  onViewRecipe: (recipe: Recipe) => void;
}

export const mockRecipes: Recipe[] = [
  {
    id: 'r1',
    name: 'Vegetable Stir Fry',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
    ingredients: [
      '2 tbsp vegetable oil',
      '1 onion, sliced',
      '2 bell peppers, sliced',
      '2 carrots, julienned',
      '2 cups broccoli florets',
      '1 cup snap peas',
      '3 cloves garlic, minced',
      '1 tbsp ginger, grated',
      '3 tbsp soy sauce',
      '1 tbsp honey',
      '1 tsp sesame oil',
      '1/4 cup vegetable broth',
      '2 tbsp cornstarch (mixed with 2 tbsp water)',
      'Sesame seeds and green onions for garnish',
    ],
    instructions: [
      'Heat vegetable oil in a large wok or skillet over high heat.',
      'Add onions and stir-fry for 1 minute until they start to soften.',
      'Add bell peppers, carrots, broccoli, and snap peas. Stir-fry for 3-4 minutes until vegetables are tender-crisp.',
      'Add garlic and ginger and cook for 30 seconds until fragrant.',
      'In a small bowl, mix soy sauce, honey, sesame oil, vegetable broth, and cornstarch slurry.',
      'Pour sauce over vegetables and stir until the sauce thickens, about 1-2 minutes.',
      'Garnish with sesame seeds and sliced green onions.',
      'Serve over rice or noodles if desired.',
    ],
    cookingTime: '20 minutes',
    nutritionalInfo: 'Calories: 250 calories, Protein: 8g, Carbs: 30g, Fat: 10g',
    calories: '250',
    protein: '8g',
    carbs: '30g',
    fat: '10g'
  },
  {
    id: 'r2',
    name: 'Grilled Chicken Salad',
    image: 'https://images.unsplash.com/photo-1569058242567-93de6f36f8eb',
    ingredients: [
      '2 boneless, skinless chicken breasts',
      '2 tbsp olive oil',
      '1 tsp dried oregano',
      '1 tsp garlic powder',
      'Salt and pepper to taste',
      '6 cups mixed salad greens',
      '1 cucumber, sliced',
      '1 cup cherry tomatoes, halved',
      '1/2 red onion, thinly sliced',
      '1/4 cup crumbled feta cheese',
      '1/4 cup kalamata olives, pitted',
      '2 tbsp balsamic vinegar',
      '3 tbsp extra virgin olive oil',
      '1 tsp Dijon mustard',
      '1 tsp honey',
    ],
    instructions: [
      'Preheat grill to medium-high heat.',
      'Rub chicken breasts with olive oil and season with oregano, garlic powder, salt, and pepper.',
      'Grill chicken for 6-7 minutes per side, until internal temperature reaches 165°F (74°C).',
      'Let chicken rest for 5 minutes, then slice into strips.',
      'In a large bowl, combine mixed greens, cucumber, cherry tomatoes, red onion, feta cheese, and olives.',
      'In a small bowl, whisk together balsamic vinegar, olive oil, Dijon mustard, honey, salt, and pepper to make the dressing.',
      'Add sliced chicken to the salad and drizzle with dressing.',
      'Toss gently to combine and serve immediately.',
    ],
    cookingTime: '25 minutes',
    nutritionalInfo: 'Calories: 420 calories, Protein: 35g, Carbs: 12g, Fat: 28g',
    calories: '420',
    protein: '35g',
    carbs: '12g',
    fat: '28g'
  },
  {
    id: 'r3',
    name: 'Mushroom Risotto',
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371',
    ingredients: [
      '6 cups vegetable broth',
      '2 tbsp olive oil',
      '1 tbsp butter',
      '1 onion, finely diced',
      '3 cloves garlic, minced',
      '8 oz (225g) mushrooms, sliced',
      '1 1/2 cups Arborio rice',
      '1/2 cup dry white wine',
      '1/2 cup grated Parmesan cheese',
      '2 tbsp fresh parsley, chopped',
      'Salt and pepper to taste',
    ],
    instructions: [
      'In a saucepan, bring vegetable broth to a simmer. Keep warm.',
      'In a large, deep skillet, heat olive oil and butter over medium heat.',
      'Add onion and cook until softened, about 3-4 minutes.',
      'Add garlic and mushrooms, and cook for another 5 minutes until mushrooms are tender.',
      'Add Arborio rice and stir to coat in oil, cooking for 1-2 minutes until slightly translucent.',
      'Pour in white wine and stir until absorbed.',
      'Add warm broth, one ladle at a time, stirring constantly and waiting until liquid is absorbed before adding more.',
      'Continue this process for about 18-20 minutes until rice is creamy and al dente.',
      'Remove from heat and stir in Parmesan cheese, parsley, salt, and pepper.',
      'Let stand for 2 minutes before serving.',
    ],
    cookingTime: '35 minutes',
    nutritionalInfo: 'Calories: 380 calories, Protein: 10g, Carbs: 55g, Fat: 12g',
    calories: '380',
    protein: '10g',
    carbs: '55g',
    fat: '12g'
  },
  {
    id: 'r4',
    name: 'Baked Salmon with Asparagus',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2',
    ingredients: [
      '4 salmon fillets (6 oz each)',
      '1 lb asparagus, trimmed',
      '2 tbsp olive oil',
      '1 lemon, thinly sliced',
      '4 cloves garlic, minced',
      '2 tbsp fresh dill, chopped',
      '2 tbsp fresh parsley, chopped',
      'Salt and pepper to taste',
    ],
    instructions: [
      'Preheat oven to 400°F (200°C).',
      'Line a baking sheet with parchment paper.',
      'Arrange asparagus in a single layer on the baking sheet.',
      'Place salmon fillets on top of asparagus.',
      'Drizzle olive oil over salmon and asparagus.',
      'Sprinkle minced garlic, dill, parsley, salt, and pepper over everything.',
      'Top with lemon slices.',
      'Bake for 15-20 minutes until salmon is cooked through and asparagus is tender.',
      'Serve immediately, garnished with additional fresh herbs if desired.',
    ],
    cookingTime: '25 minutes',
    nutritionalInfo: 'Calories: 320 calories, Protein: 34g, Carbs: 8g, Fat: 18g',
    calories: '320',
    protein: '34g',
    carbs: '8g',
    fat: '18g'
  },
  {
    id: 'r5',
    name: 'Vegetarian Chili',
    image: 'https://images.unsplash.com/photo-1564671546498-37a3e4f938bcc',
    ingredients: [
      '2 tbsp olive oil',
      '1 onion, diced',
      '1 red bell pepper, diced',
      '1 green bell pepper, diced',
      '3 cloves garlic, minced',
      '2 tbsp chili powder',
      '1 tbsp cumin',
      '1 tsp smoked paprika',
      '1/2 tsp cayenne pepper (optional)',
      '2 cans (15 oz each) diced tomatoes',
      '1 can (15 oz) black beans, drained and rinsed',
      '1 can (15 oz) kidney beans, drained and rinsed',
      '1 can (15 oz) corn, drained',
      '1 cup vegetable broth',
      'Salt and pepper to taste',
      'Toppings: avocado, sour cream, cheese, cilantro, lime wedges',
    ],
    instructions: [
      'Heat olive oil in a large pot over medium heat.',
      'Add onions and bell peppers, and cook until softened, about 5 minutes.',
      'Add garlic and cook for another minute until fragrant.',
      'Stir in chili powder, cumin, smoked paprika, and cayenne pepper.',
      'Add diced tomatoes, black beans, kidney beans, corn, and vegetable broth.',
      'Bring to a boil, then reduce heat and simmer for 25-30 minutes, stirring occasionally.',
      'Season with salt and pepper to taste.',
      'Serve hot with your choice of toppings.',
    ],
    cookingTime: '40 minutes',
    nutritionalInfo: 'Calories: 280 calories, Protein: 12g, Carbs: 45g, Fat: 7g',
    calories: '280',
    protein: '12g',
    carbs: '45g',
    fat: '7g'
  },
  {
    id: "1",
    name: "Mediterranean Quinoa Bowl",
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
    id: "2",
    name: "Asian Stir-Fry",
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
    id: "3",
    name: "Mexican Black Bean Soup",
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
    id: "4",
    name: "Greek Yogurt Parfait",
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
    id: "5",
    name: "Baked Salmon",
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

// Function to generate a meal plan from provided recipes
export const generateMealPlan = (recipes: Recipe[]): DailyMealPlan[] => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const mealPlan: DailyMealPlan[] = [];
  
  // Make a copy of recipes to avoid modifying the original array
  const availableRecipes = [...recipes];
  // Add some mock recipes if we don't have enough to fill the meal plan
  if (availableRecipes.length < 21) { // 7 days x 3 meals
    availableRecipes.push(...mockRecipes);
  }
  
  // Keep track of used recipes to avoid duplicates as much as possible
  const usedRecipeIds = new Set<string>();
  
  // Function to get a unique random recipe
  const getUniqueRandomRecipe = (): Recipe => {
    // Filter out recipes that have already been used
    const unusedRecipes = availableRecipes.filter(r => !usedRecipeIds.has(r.id));
    
    // If we've used all recipes, we'll allow repeats, but pick from mock recipes first
    if (unusedRecipes.length === 0) {
      console.log("Using all mock recipes as we've run out of unique ones");
      // Try to get an unused mock recipe
      const unusedMockRecipes = mockRecipes.filter(r => !usedRecipeIds.has(r.id));
      if (unusedMockRecipes.length > 0) {
        const randomIndex = Math.floor(Math.random() * unusedMockRecipes.length);
        const recipe = unusedMockRecipes[randomIndex];
        usedRecipeIds.add(recipe.id);
        return recipe;
      }
      
      // If all mock recipes are used too, pick a random one from all recipes
      const randomIndex = Math.floor(Math.random() * availableRecipes.length);
      return availableRecipes[randomIndex];
    }
    
    // Pick a random recipe from unused ones
    const randomIndex = Math.floor(Math.random() * unusedRecipes.length);
    const recipe = unusedRecipes[randomIndex];
    usedRecipeIds.add(recipe.id);
    return recipe;
  };

  // Create a meal plan for each day with unique recipes
  for (const day of days) {
    mealPlan.push({
      day,
      breakfast: getUniqueRandomRecipe(),
      lunch: getUniqueRandomRecipe(),
      dinner: getUniqueRandomRecipe(),
      onViewRecipe: () => {} // Default no-op callback
    });
  }
  
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