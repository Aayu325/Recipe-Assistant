import axios from 'axios';
import { Recipe } from '../components/RecipeCard';

// Hardcoded Mistral API key
const MISTRAL_API_KEY = "1NfsBB7FUH0UJFdiAtWQ8f2hy0jM8slZ";

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
  allergies: string[]
): Promise<Recipe[]> => {
  try {
    // Using the hardcoded API key
    const apiKey = MISTRAL_API_KEY;
    
    if (!apiKey) {
      throw new Error('No API key available');
    }

    // Constructing a prompt that's specific about the format we want
    const dietaryText = dietaryPreferences.length > 0 
      ? `dietary preferences: ${dietaryPreferences.join(', ')}` 
      : '';
    
    const allergiesText = allergies.length > 0 
      ? `allergies to avoid: ${allergies.join(', ')}` 
      : '';
    
    const mealTypeText = mealType ? `meal type: ${mealType}` : '';
    
    const prompt = `Generate 5 detailed and distinct recipes using these ingredients: ${ingredients.join(', ')}. 
${dietaryText}
${allergiesText}
${mealTypeText}

For each recipe, provide the following sections EXACTLY in this order and format:

Recipe name: [PROVIDE A UNIQUE AND DESCRIPTIVE NAME]

Ingredients: 
- [DETAILED LIST OF INGREDIENTS WITH QUANTITIES]

Instructions:
1. [STEP-BY-STEP INSTRUCTIONS]

Cooking time: [COOKING TIME IN MINUTES]

Nutritional info: 
- Calories: [NUMBER] calories
- Protein: [NUMBER]g
- Carbs: [NUMBER]g
- Fat: [NUMBER]g

Make sure each recipe is completely different from the others in style, cuisine, and preparation methods.
IMPORTANT: ALWAYS include the exact nutritional information with numbers for calories, protein, carbs, and fat for EACH recipe.
Format the nutrition section exactly as shown above.`;

    // Make the API request
    const response = await axios.post(
      'https://api.mistral.ai/v1/chat/completions',
      {
        model: 'mistral-small-latest',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2500
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        }
      }
    );

    // Extract recipe text from response
    const recipeText = response.data.choices[0].message.content;
    console.log("Raw recipe text:", recipeText);
    
    // Split the text into separate recipes (using multiple pattern matching to handle different formats)
    const recipeSeparators = [
      /\n\s*\n\s*Recipe \d+:|\n\s*\n\s*\d+\.\s*Recipe/i,
      /\n\s*\n\s*Recipe name:/i,
      /\n\s*---+\s*\n/
    ];
    
    let recipesTexts: string[] = [];
    
    // Try each separator pattern
    for (const separator of recipeSeparators) {
      const split = recipeText.split(separator);
      if (split.length > 1) {
        recipesTexts = split;
        break;
      }
    }
    
    // If no separator patterns worked, treat the entire text as one recipe
    if (recipesTexts.length <= 1) {
      recipesTexts = [recipeText];
    }
    
    const recipes: Recipe[] = [];
    
    for (const text of recipesTexts) {
      if (text.trim().length > 0) {
        const recipe = parseRecipeFromText(text);
        if (recipe) {
          recipes.push(recipe);
        }
      }
    }
    
    console.log(`Generated ${recipes.length} recipes`);
    
    if (recipes.length === 0) {
      // If no recipes were successfully parsed, try parsing the entire text as one recipe
      const singleRecipe = parseRecipeFromText(recipeText);
      if (singleRecipe) {
        recipes.push(singleRecipe);
      } else {
        // Create a fallback recipe if parsing completely fails
        recipes.push({
          id: generateId(),
          name: `Custom ${mealType || 'Recipe'} with ${ingredients[0] || 'Custom Ingredients'}`,
          ingredients: ingredients.map(ing => `${ing} (quantity as needed)`),
          instructions: ["Combine all ingredients and cook until done."],
          cookingTime: "30 minutes",
          nutritionalInfo: "Calories: 350 calories, Protein: 15g, Carbs: 30g, Fat: 12g",
          calories: "350 calories",
          protein: "15g",
          carbs: "30g",
          fat: "12g"
        });
      }
    }
    
    return recipes;
  } catch (error) {
    console.error('Error fetching recipes from Mistral API:', error);
    throw error;
  }
}; 