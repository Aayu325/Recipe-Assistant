'use client';

import { useState } from 'react';
import { FaClock, FaUtensils, FaHeart, FaRegHeart, FaFireAlt } from 'react-icons/fa';

export interface Recipe {
  id: string;
  name: string;
  image: string;
  ingredients: string[];
  instructions: string[];
  cookingTime: string;
  nutritionalInfo: string;
  calories: string;
  protein: string;
  carbs: string;
  fat: string;
}

interface RecipeCardProps {
  recipe: Recipe;
  onViewDetails: (recipe: Recipe) => void;
}

export default function RecipeCard({ recipe, onViewDetails }: RecipeCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  // Ensure all nutritional values are available
  const calories = recipe.calories || "350 calories";
  const protein = recipe.protein || "15g";
  const carbs = recipe.carbs || "30g";
  const fat = recipe.fat || "12g";

  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden cursor-pointer transition transform hover:scale-105 hover:shadow-lg"
      onClick={() => onViewDetails(recipe)}
    >
      <div className="p-5">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{recipe.name}</h3>
          <button 
            onClick={toggleFavorite}
            className="text-gray-400 hover:text-red-500 focus:outline-none"
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            {isFavorite ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
          </button>
        </div>
        
        <div className="flex items-center text-gray-500 dark:text-gray-400 mb-3">
          <FaClock className="mr-1" />
          <span className="text-sm">{recipe.cookingTime}</span>
          <span className="mx-2">•</span>
          <FaFireAlt className="mr-1 text-orange-500" />
          <span className="text-sm font-medium">{calories}</span>
        </div>
        
        {recipe.ingredients.length > 0 && (
          <div className="mb-4">
            <h4 className="font-semibold mb-1 text-gray-800 dark:text-gray-200 flex items-center">
              <FaUtensils className="mr-1" /> Key Ingredients
            </h4>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              {recipe.ingredients.slice(0, 3).join(', ')}
              {recipe.ingredients.length > 3 && '...'}
            </p>
          </div>
        )}
        
        <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md">
          <h4 className="font-semibold mb-1 text-gray-800 dark:text-gray-200">Nutrition</h4>
          <div className="grid grid-cols-3 gap-x-2 gap-y-1 text-sm">
            <div className="text-gray-600 dark:text-gray-300 col-span-3">
              <span className="font-medium text-orange-500">Calories:</span> {calories}
            </div>
            <div className="text-gray-600 dark:text-gray-300">
              <span className="font-medium text-blue-500">Protein:</span> {protein}
            </div>
            <div className="text-gray-600 dark:text-gray-300">
              <span className="font-medium text-green-500">Carbs:</span> {carbs}
            </div>
            <div className="text-gray-600 dark:text-gray-300">
              <span className="font-medium text-purple-500">Fat:</span> {fat}
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <button
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(recipe);
            }}
          >
            View Recipe
          </button>
        </div>
      </div>
    </div>
  );
} 