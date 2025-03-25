'use client';

import { Recipe } from './RecipeCard';
import { FaTimes, FaClock, FaUtensils, FaListUl, FaChartBar } from 'react-icons/fa';

interface RecipeDetailsProps {
  recipe: Recipe;
  onClose: () => void;
}

export default function RecipeDetails({ recipe, onClose }: RecipeDetailsProps) {
  // Ensure all nutritional values are available
  const calories = recipe.calories || "350 calories";
  const protein = recipe.protein || "15g";
  const carbs = recipe.carbs || "30g";
  const fat = recipe.fat || "12g";

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="bg-gray-50 dark:bg-gray-700 p-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">{recipe.name}</h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full"
          aria-label="Close recipe details"
        >
          <FaTimes />
        </button>
      </div>

      <div className="p-6">
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <FaClock className="text-blue-500 mr-3" size={20} />
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Cook Time</h4>
              <p className="font-medium">{recipe.cookingTime}</p>
            </div>
          </div>
          
          <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <FaChartBar className="text-green-500 mr-3" size={20} />
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Nutrition (per serving)</h4>
              <div className="grid grid-cols-2 gap-x-4 text-sm">
                <p><span className="font-medium text-orange-500">Calories:</span> {calories}</p>
                <p><span className="font-medium text-blue-500">Protein:</span> {protein}</p>
                <p><span className="font-medium text-green-500">Carbs:</span> {carbs}</p>
                <p><span className="font-medium text-purple-500">Fat:</span> {fat}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-bold mb-3 flex items-center">
            <FaListUl className="mr-2 text-blue-500" />
            Ingredients
          </h3>
          <ul className="list-disc pl-6 space-y-2">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="text-gray-700 dark:text-gray-300">{ingredient}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-3 flex items-center">
            <FaUtensils className="mr-2 text-blue-500" />
            Instructions
          </h3>
          <ol className="list-decimal pl-6 space-y-4">
            {recipe.instructions.map((instruction, index) => (
              <li key={index} className="text-gray-700 dark:text-gray-300">{instruction}</li>
            ))}
          </ol>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h4 className="font-bold mb-2 text-blue-700 dark:text-blue-300">Storage and Meal Prep</h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Store leftovers in an airtight container in the refrigerator for up to 3 days. 
              Reheat in the microwave or on the stovetop until heated through.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 