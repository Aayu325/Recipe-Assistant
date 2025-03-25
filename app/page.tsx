'use client';

import { useState } from 'react';
import UserInputForm from './components/UserInputForm';
import RecipeCard, { Recipe } from './components/RecipeCard';
import RecipeDetails from './components/RecipeDetails';
import MealPlan from './components/MealPlan';
import { mockRecipes, filterRecipes, generateMealPlan } from './utils/mockData';
import { fetchRecipesWithAPI } from './utils/mistralService';
import { FaUtensils, FaCalendarAlt, FaSpinner, FaRobot } from 'react-icons/fa';

enum View {
  INPUT,
  RECIPES,
  MEAL_PLAN,
  RECIPE_DETAILS,
  LOADING
}

interface DailyMealPlan {
  breakfast: Recipe;
  lunch: Recipe;
  dinner: Recipe;
}

export default function Home() {
  const [view, setView] = useState<View>(View.INPUT);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [mealPlan, setMealPlan] = useState<DailyMealPlan[]>([]);
  // Mistral AI is enabled by default since we have the key hardcoded
  const [isUsingMistral, setIsUsingMistral] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (formData: {
    ingredients: string[];
    dietaryPreferences: string[];
    mealType: string;
    allergies: string[];
  }) => {
    setError(null);
    
    // Check if ingredients are provided
    if (formData.ingredients.length === 0) {
      setError("Please add at least one ingredient to search for recipes.");
      return;
    }

    // Set loading state
    setView(View.LOADING);

    try {
      // If Mistral AI is enabled (which is by default)
      if (isUsingMistral) {
        // Attempt to generate recipes with Mistral AI
        const recipes = await fetchRecipesWithAPI(
          formData.ingredients,
          formData.dietaryPreferences,
          formData.mealType,
          formData.allergies
        );
        
        if (recipes && recipes.length > 0) {
          setFilteredRecipes(recipes);
          setView(View.RECIPES);
          return; // Exit early if we have AI-generated recipes
        } else {
          setError("Couldn&apos;t generate custom recipes. Showing results from our database instead.");
        }
      }
      
      // If we reach here, either Mistral AI is not enabled or it failed to generate recipes
      // Fallback to mock data
      const filtered = filterRecipes(
        mockRecipes,
        formData.ingredients,
        formData.dietaryPreferences,
        formData.mealType,
        formData.allergies
      );
      
      if (filtered.length > 0) {
        setFilteredRecipes(filtered);
      } else {
        // If no results in mock data, show all recipes
        setFilteredRecipes(mockRecipes);
        if (!error) {
          setError("No recipes matched your criteria exactly. Showing all available recipes instead.");
        }
      }
      
      setView(View.RECIPES);
    } catch (err) {
      console.error('Error processing recipes:', err);
      setError("There was an error processing your request. Showing all available recipes.");
      setFilteredRecipes(mockRecipes);
      setView(View.RECIPES);
    }
  };

  const handleViewRecipeDetails = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setView(View.RECIPE_DETAILS);
  };

  const handleGenerateMealPlan = () => {
    // Use filtered recipes if available, otherwise use mock recipes
    const recipes = filteredRecipes.length > 0 ? filteredRecipes : mockRecipes;
    const plan = generateMealPlan(recipes);
    setMealPlan(plan);
    setView(View.MEAL_PLAN);
  };

  const toggleMistralUsage = () => {
    setIsUsingMistral(!isUsingMistral);
  };

  const renderContent = () => {
    switch (view) {
      case View.LOADING:
        return (
          <div className="flex flex-col items-center justify-center h-64">
            <FaSpinner className="animate-spin text-blue-500 mb-4" size={40} />
            <p className="text-lg">Generating delicious recipes just for you...</p>
            <p className="text-sm text-gray-500 mt-2">This may take a moment</p>
          </div>
        );
      
      case View.INPUT:
        return (
          <>
            <div className="mb-6 flex justify-end">
              <button
                onClick={toggleMistralUsage}
                className={`flex items-center px-4 py-2 rounded-md ${
                  isUsingMistral
                    ? 'bg-green-500 text-white hover:bg-green-600'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                <FaRobot className="mr-2" />
                {isUsingMistral ? 'Using Mistral AI' : 'Use Standard Recipes'}
              </button>
            </div>
            
            {error && (
              <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md">
                {error}
              </div>
            )}
            
            <UserInputForm onSubmit={handleFormSubmit} />
            
            {isUsingMistral && (
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-md">
                <h3 className="font-bold mb-2">About Mistral AI Integration</h3>
                <p className="text-sm">
                  With Mistral AI enabled, we&apos;ll generate custom recipes based on your ingredients and preferences.
                  This provides more diverse and personalized recipe suggestions beyond our standard database.
                </p>
              </div>
            )}
          </>
        );
      
      case View.RECIPES:
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Recipe Suggestions</h2>
              <button
                onClick={() => setView(View.INPUT)}
                className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Modify Search
              </button>
            </div>
            
            {error && (
              <div className="mb-6 p-4 bg-yellow-100 text-yellow-800 rounded-md">
                {error}
              </div>
            )}
            
            {filteredRecipes.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-lg mb-4">
                  No recipes match your criteria. Try adjusting your search parameters.
                </p>
                <button
                  onClick={() => setView(View.INPUT)}
                  className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Back to Search
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredRecipes.map((recipe) => (
                    <RecipeCard
                      key={recipe.id}
                      recipe={recipe}
                      onViewDetails={handleViewRecipeDetails}
                    />
                  ))}
                </div>
                
                <div className="mt-8 text-center">
                  <button
                    onClick={handleGenerateMealPlan}
                    className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 flex items-center mx-auto"
                  >
                    <FaCalendarAlt className="mr-2" />
                    Generate Meal Plan
                  </button>
                </div>
              </>
            )}
          </div>
        );
      
      case View.MEAL_PLAN:
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Your Meal Plan</h2>
              <div>
                <button
                  onClick={() => setView(View.RECIPES)}
                  className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 mr-2"
                >
                  Back to Recipes
                </button>
                <button
                  onClick={() => setView(View.INPUT)}
                  className="px-4 py-2 text-sm bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                >
                  New Search
                </button>
              </div>
            </div>
            
            <MealPlan mealPlan={mealPlan} onViewRecipe={handleViewRecipeDetails} />
          </div>
        );
      
      case View.RECIPE_DETAILS:
        return selectedRecipe ? (
          <RecipeDetails recipe={selectedRecipe} onClose={() => setView(View.RECIPES)} />
        ) : (
          <div className="text-center py-10">
            <p className="text-lg mb-4">Recipe not found</p>
            <button
              onClick={() => setView(View.RECIPES)}
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Back to Recipes
            </button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 flex justify-between items-center">
          <div className="flex items-center">
            <FaUtensils className="text-green-500 mr-2" size={24} />
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Recipe Assistant</h1>
          </div>
          
          <nav className="flex space-x-4">
            <button
              onClick={() => setView(View.INPUT)}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                view === View.INPUT
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
                  : 'text-gray-600 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-300'
              }`}
            >
              Find Recipes
            </button>
            <button
              onClick={handleGenerateMealPlan}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                view === View.MEAL_PLAN
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
                  : 'text-gray-600 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-300'
              }`}
              disabled={filteredRecipes.length === 0 && view === View.INPUT}
            >
              Meal Plan
            </button>
          </nav>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {renderContent()}
      </main>
      
      <footer className="bg-white dark:bg-gray-800 mt-auto py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            Recipe Assistant - Find recipes and create meal plans based on your ingredients and preferences
          </p>
        </div>
      </footer>
    </div>
  );
}
