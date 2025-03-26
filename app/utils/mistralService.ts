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

export const fetchRecipesWithAPI = async (
  ingredients: string[],
  dietaryPreferences: string[],
  mealType: string,
  allergies: string[],
  cookingTime: string,
  cuisineType: string,
  healthGoals: string[]
): Promise<Recipe[]> => {
  try {
    const prompt = `Generate 3 recipes based on the following criteria:
    - Ingredients: ${ingredients.join(', ')}
    - Dietary Preferences: ${dietaryPreferences.join(', ')}
    - Meal Type: ${mealType}
    - Allergies: ${allergies.join(', ')}
    - Cooking Time: ${cookingTime}
    - Cuisine Type: ${cuisineType}
    - Health Goals: ${healthGoals.join(', ')}

    IMPORTANT: Each recipe MUST use at least one of the provided ingredients as a main component.
    The recipe names should reflect the main ingredient used.
    Highlight the provided ingredients in the ingredients list.
    Each recipe should use different combinations of the provided ingredients.

    Return the response in the following JSON format:
    {
      "recipes": [
        {
          "id": "1",
          "name": "Recipe Name",
          "image": "https://source.unsplash.com/featured/?food,recipe-name",
          "description": "Brief description",
          "ingredients": ["ingredient 1", "ingredient 2", ...],
          "instructions": ["step 1", "step 2", ...],
          "cookingTime": "30 minutes",
          "difficulty": "Easy",
          "servings": "4 servings",
          "nutritionalInfo": "Calories: 350, Protein: 25g, Carbs: 20g, Fat: 15g",
          "calories": "350",
          "protein": "25",
          "carbs": "20",
          "fat": "15"
        },
        ...
      ]
    }`;

    const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_MISTRAL_API_KEY}`
      },
      body: JSON.stringify({
        model: "mistral-tiny",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;

    // Clean up the response
    const cleanedContent = content
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim()
      .replace(/\n/g, ' ')
      .replace(/\s+/g, ' ')
      .replace(/,(\s*[}\]])/g, '$1') // Remove trailing commas
      .replace(/([}\]])/g, '$1,') // Add missing commas between objects
      .replace(/,(\s*[}\]])/g, '$1'); // Remove trailing commas again

    try {
      // First attempt: Try to parse the entire cleaned response
      const parsedResponse = JSON.parse(cleanedContent);
      if (parsedResponse.recipes && Array.isArray(parsedResponse.recipes)) {
        return parsedResponse.recipes;
      }
    } catch (error) {
      console.warn('Error parsing cleaned JSON response:', error);
    }

    try {
      // Second attempt: Try to parse individual recipe blocks
      const recipeBlocks = cleanedContent.match(/\{[\s\S]*?\}/g) || [];
      const recipes = recipeBlocks
        .map(block => {
          try {
            return JSON.parse(block);
          } catch (error) {
            console.warn('Error parsing individual recipe block:', error);
            return null;
          }
        })
        .filter((recipe): recipe is Recipe => recipe !== null);

      if (recipes.length > 0) {
        return recipes;
      }
    } catch (error) {
      console.warn('Error parsing individual recipe blocks:', error);
    }

    // If all parsing attempts fail, return mock recipes
    console.warn('All parsing attempts failed, returning mock recipes');
    return mockRecipes.slice(0, 3);
  } catch (error) {
    console.error('Error in fetchRecipesWithAPI:', error);
    return mockRecipes.slice(0, 3);
  }
}; 