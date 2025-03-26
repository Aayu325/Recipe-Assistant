'use client';

import { useState } from 'react';
import UserInputForm from './components/UserInputForm';
import RecipeList from './components/RecipeList';
import MealPlan from './components/MealPlan';
import { fetchRecipesWithAPI } from './utils/mistralService';
import { mockRecipes } from './utils/mockData';
import { Recipe } from './components/RecipeCard';
import { DailyMealPlan } from './components/MealPlan';

enum View {
  FORM = 'FORM',
  RECIPES = 'RECIPES',
  MEAL_PLAN = 'MEAL_PLAN'
}

export default function Home() {
  const [view, setView] = useState<View>(View.FORM);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [mealPlan, setMealPlan] = useState<DailyMealPlan[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (data: {
    ingredients: string[];
    dietaryPreferences: string[];
    mealType: string;
    allergies: string[];
    cookingTime: string;
    cuisineType: string;
    healthGoals: string[];
  }) => {
    try {
      setError(null);
      const recipes = await fetchRecipesWithAPI(
        data.ingredients,
        data.dietaryPreferences,
        data.mealType,
        data.allergies,
        data.cookingTime,
        data.cuisineType,
        data.healthGoals
      );
      setFilteredRecipes(recipes);
      setView(View.RECIPES);
    } catch (error) {
      console.error('Error processing recipes:', error);
      setError('Failed to generate recipes. Please try again.');
      setFilteredRecipes(mockRecipes);
      setView(View.RECIPES);
    }
  };

  const handleGenerateMealPlan = () => {
    const mealPlan = generateMealPlan(filteredRecipes);
    setMealPlan(mealPlan);
    setView(View.MEAL_PLAN);
  };

  const handleBackToRecipes = () => {
    setView(View.RECIPES);
  };

  const handleBackToForm = () => {
    setView(View.FORM);
    setFilteredRecipes([]);
    setMealPlan([]);
    setError(null);
  };

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-white">
          Recipe Assistant
        </h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {view === View.FORM && (
          <UserInputForm onSubmit={handleFormSubmit} />
        )}

        {view === View.RECIPES && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={handleBackToForm}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Back to Search
              </button>
              <button
                onClick={handleGenerateMealPlan}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Generate Meal Plan
              </button>
            </div>
            <RecipeList recipes={filteredRecipes} />
          </div>
        )}

        {view === View.MEAL_PLAN && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={handleBackToRecipes}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Back to Recipes
              </button>
            </div>
            <MealPlan mealPlan={mealPlan} />
          </div>
        )}
      </div>
    </main>
  );
}
