import axios from 'axios';
import { Recipe } from '../components/RecipeCard';
import { mockRecipes } from './mockData';

// Hardcoded Mistral API key
const MISTRAL_API_KEY = "1NfsBB7FUH0UJFdiAtWQ8f2hy0jM8slZ";

interface MistralRecipe {
  name: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  nutritionalInfo: string;
  cookingTime: string;
  difficulty: string;
  servings: string;
}

// Generate a unique ID for each recipe
const generateId = () => Math.random().toString(36).substring(2, 9);

// Parse recipe text to structured format
const parseRecipeFromText = (text: string): Recipe | null => {
  try {
    // Extract recipe name
    const nameRegex = /Recipe\s*name:?\s*(.+?)(?:\n|$)/i;
    const nameMatch = text.match(nameRegex);
    const name = nameMatch ? nameMatch[1].trim() : "Custom Recipe";

    // Extract ingredients
    const ingredientsRegex = /ingredients:?\s*(?:\n|-)?([\s\S]*?)(?:instructions:|directions:|method:|steps:|preparation:|$)/i;
    const ingredientsMatch = text.match(ingredientsRegex);
    let ingredients: string[] = [];
    
    if (ingredientsMatch && ingredientsMatch[1]) {
      ingredients = ingredientsMatch[1]
        .split(/\n|-/)
        .map(item => item.trim())
        .filter(item => item.length > 0);
    }

    // Extract instructions
    const instructionsRegex = /(?:instructions|directions|method|steps|preparation):?\s*([\s\S]*?)(?:cooking time:|nutritional info:|nutrition|$)/i;
    const instructionsMatch = text.match(instructionsRegex);
    let instructions: string[] = [];
    
    if (instructionsMatch && instructionsMatch[1]) {
      instructions = instructionsMatch[1]
        .split(/\n\d+\.|\n-|\.\s+(?=\d+\.)/)
        .map(item => item.trim())
        .filter(item => item.length > 0);
    }

    // Extract cooking time
    const timeRegex = /cooking time:?\s*(.+?)(?:\n|$)/i;
    const timeMatch = text.match(timeRegex);
    const cookingTime = timeMatch ? timeMatch[1].trim() : "30 minutes";

    // Extract nutritional info
    const nutritionRegex = /(?:nutritional info|nutrition):?\s*([\s\S]*?)(?:$)/i;
    const nutritionMatch = text.match(nutritionRegex);
    const nutritionalInfoText = nutritionMatch ? nutritionMatch[1].trim() : "";
    
    // Try to extract specific nutritional values with more flexible patterns
    const caloriesRegex = /calories:?\s*(\d+[^,\n]*)/i;
    const proteinRegex = /protein:?\s*(\d+[^,\n]*)/i;
    const carbsRegex = /(?:carbs|carbohydrates):?\s*(\d+[^,\n]*)/i;
    const fatRegex = /fat:?\s*(\d+[^,\n]*)/i;
    
    // Look for these patterns in the nutritional info section first, then the whole text
    const caloriesMatch = nutritionalInfoText.match(caloriesRegex) || text.match(caloriesRegex);
    const proteinMatch = nutritionalInfoText.match(proteinRegex) || text.match(proteinRegex);
    const carbsMatch = nutritionalInfoText.match(carbsRegex) || text.match(carbsRegex);
    const fatMatch = nutritionalInfoText.match(fatRegex) || text.match(fatRegex);
    
    const calories = caloriesMatch ? caloriesMatch[1].trim() : "350 calories";
    const protein = proteinMatch ? proteinMatch[1].trim() : "15g";
    const carbs = carbsMatch ? carbsMatch[1].trim() : "30g";
    const fat = fatMatch ? fatMatch[1].trim() : "12g";

    // Create formatted nutrition info
    const nutritionalInfo = `Calories: ${calories}, Protein: ${protein}, Carbs: ${carbs}, Fat: ${fat}`;

    console.log("Extracted Nutrition:", { calories, protein, carbs, fat, nutritionalInfo });

    // Create the recipe object
    return {
      id: generateId(),
      name,
      image: `https://source.unsplash.com/featured/?food,${encodeURIComponent(name)}`,
      ingredients,
      instructions,
      cookingTime,
      nutritionalInfo,
      calories,
      protein,
      carbs,
      fat
    };
  } catch (error) {
    console.error("Error parsing recipe:", error);
    return null;
  }
};

export const fetchRecipesWithAPI = async (
  ingredients: string[],
  dietaryPreferences: string[],
  mealType: string,
  allergies: string[],
  cookingTime: string = "30 minutes",
  cuisineType: string = "Any",
  healthGoals: string[] = []
): Promise<Recipe[]> => {
  try {
    // Using the hardcoded API key
    const apiKey = MISTRAL_API_KEY;
    
    if (!apiKey) {
      throw new Error('No API key available');
    }

    // Construct the prompt after all variables are defined
    const prompt = `Generate at least 3 healthy and delicious recipes that primarily use these ingredients: ${ingredients.join(", ")}.

    Additional criteria:
    - Dietary preferences: ${dietaryPreferences.join(", ")}
    - Meal type: ${mealType}
    - Cooking time: ${cookingTime}
    - Cuisine type: ${cuisineType}
    - Health goals: ${healthGoals.join(", ")}
    - Allergies: ${allergies.join(", ")}

    IMPORTANT: Each recipe MUST use at least one of the provided ingredients as a main component. You can add other ingredients as needed, but the provided ingredients should be the primary focus.

    For each recipe, provide the following information in a structured format:
    1. Name of the recipe (should reflect the main ingredient)
    2. Brief description
    3. List of ingredients with quantities (highlight the provided ingredients)
    4. Step-by-step cooking instructions
    5. Nutritional information (calories, protein, carbs, fat)
    6. Cooking time
    7. Difficulty level
    8. Servings

    Format each recipe as a JSON object with these fields:
    {
      "name": "Recipe Name",
      "description": "Brief description",
      "ingredients": ["ingredient 1", "ingredient 2", ...],
      "instructions": ["step 1", "step 2", ...],
      "nutritionalInfo": "Calories: X, Protein: Yg, Carbs: Zg, Fat: Wg",
      "cookingTime": "X minutes",
      "difficulty": "Easy/Medium/Hard",
      "servings": "X servings"
    }

    Return the recipes as a JSON array. Ensure you provide at least 3 unique recipes, each using different combinations of the provided ingredients.`;

    const response = await axios.post(
      "https://api.mistral.ai/v1/chat/completions",
      {
        model: "mistral-tiny",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 2000,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${MISTRAL_API_KEY}`,
        },
      }
    );

    const content = response.data.choices[0].message.content;
    let recipes: Recipe[] = [];

    try {
      // First try to clean up the entire response
      const cleanedContent = content
        .replace(/\n/g, ' ')
        .replace(/\s+/g, ' ')
        .replace(/,(\s*[}\]])/g, '$1') // Remove trailing commas
        .replace(/\}\s*\{/g, '},{') // Fix missing commas between objects
        .replace(/\[\s*\{/g, '[{') // Fix array start
        .replace(/\}\s*\]/g, '}]') // Fix array end
        .replace(/"\s*:\s*"/g, '":"') // Fix spacing around colons
        .replace(/"\s*,\s*"/g, '","') // Fix spacing around commas
        .replace(/\s+/g, ' ') // Normalize whitespace
        .trim();

      // Try to parse the cleaned response as JSON
      try {
        const parsedRecipes = JSON.parse(cleanedContent) as MistralRecipe[];
        if (Array.isArray(parsedRecipes)) {
          recipes = parsedRecipes.map((recipe) => ({
            id: Math.random().toString(36).substr(2, 9),
            name: recipe.name,
            description: recipe.description,
            ingredients: recipe.ingredients,
            instructions: recipe.instructions,
            nutritionalInfo: recipe.nutritionalInfo,
            cookingTime: recipe.cookingTime,
            difficulty: recipe.difficulty,
            servings: recipe.servings,
            calories: recipe.nutritionalInfo.match(/Calories: (\d+)/)?.[1] || "350",
            protein: recipe.nutritionalInfo.match(/Protein: (\d+)g/)?.[1] || "15",
            carbs: recipe.nutritionalInfo.match(/Carbs: (\d+)g/)?.[1] || "30",
            fat: recipe.nutritionalInfo.match(/Fat: (\d+)g/)?.[1] || "12",
          }));
        }
      } catch (error) {
        console.error("Error parsing cleaned JSON response:", error);
        
        // If that fails, try to extract individual recipe blocks
        const recipeBlocks = content.split(/\n(?=\s*\{)/);
        recipes = recipeBlocks
          .map((block) => {
            try {
              // Clean up each block
              const cleanedBlock = block
                .trim()
                .replace(/\n/g, ' ')
                .replace(/\s+/g, ' ')
                .replace(/,(\s*[}\]])/g, '$1')
                .replace(/\}\s*\{/g, '},{')
                .replace(/\[\s*\{/g, '[{')
                .replace(/\}\s*\]/g, '}]')
                .replace(/"\s*:\s*"/g, '":"')
                .replace(/"\s*,\s*"/g, '","')
                .replace(/\s+/g, ' ')
                .trim();

              // Try to parse the cleaned block
              const recipe = JSON.parse(cleanedBlock) as MistralRecipe;
              return {
                id: Math.random().toString(36).substr(2, 9),
                name: recipe.name,
                description: recipe.description,
                ingredients: recipe.ingredients,
                instructions: recipe.instructions,
                nutritionalInfo: recipe.nutritionalInfo,
                cookingTime: recipe.cookingTime,
                difficulty: recipe.difficulty,
                servings: recipe.servings,
                calories: recipe.nutritionalInfo.match(/Calories: (\d+)/)?.[1] || "350",
                protein: recipe.nutritionalInfo.match(/Protein: (\d+)g/)?.[1] || "15",
                carbs: recipe.nutritionalInfo.match(/Carbs: (\d+)g/)?.[1] || "30",
                fat: recipe.nutritionalInfo.match(/Fat: (\d+)g/)?.[1] || "12",
              };
            } catch (e) {
              console.error("Error parsing individual recipe block:", e);
              // If JSON parsing fails, try to extract recipe information using regex
              const nameMatch = block.match(/"name"\s*:\s*"([^"]+)"/);
              const descMatch = block.match(/"description"\s*:\s*"([^"]+)"/);
              const ingredientsMatch = block.match(/"ingredients"\s*:\s*\[(.*?)\]/s);
              const instructionsMatch = block.match(/"instructions"\s*:\s*\[(.*?)\]/s);
              const nutritionMatch = block.match(/"nutritionalInfo"\s*:\s*"([^"]+)"/);

              if (nameMatch && ingredientsMatch && instructionsMatch) {
                return {
                  id: Math.random().toString(36).substr(2, 9),
                  name: nameMatch[1],
                  description: descMatch ? descMatch[1] : "A delicious recipe",
                  ingredients: ingredientsMatch[1]
                    .split(',')
                    .map(i => i.trim().replace(/"/g, '')),
                  instructions: instructionsMatch[1]
                    .split(',')
                    .map(i => i.trim().replace(/"/g, '')),
                  nutritionalInfo: nutritionMatch ? nutritionMatch[1] : "Calories: 350, Protein: 15g, Carbs: 30g, Fat: 12g",
                  cookingTime: "30 minutes",
                  difficulty: "Easy",
                  servings: "4 servings",
                  calories: "350",
                  protein: "15",
                  carbs: "30",
                  fat: "12"
                };
              }
              return null;
            }
          })
          .filter((recipe): recipe is Recipe => recipe !== null);
      }
    } catch (error) {
      console.error("Error in recipe processing:", error);
    }

    // Ensure we have at least 3 recipes
    if (recipes.length < 3) {
      console.warn(`Only received ${recipes.length} recipes, adding mock recipes to reach minimum of 3`);
      const additionalRecipes = mockRecipes.slice(0, 3 - recipes.length);
      recipes = [...recipes, ...additionalRecipes];
    }

    return recipes;
  } catch (error) {
    console.error('Error fetching recipes from Mistral API:', error);
    throw error;
  }
}; 