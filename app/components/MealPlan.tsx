'use client';

import { Recipe } from './RecipeCard';
import { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaUtensils, FaFireAlt } from 'react-icons/fa';

interface MealDayProps {
  day: string;
  breakfast: Recipe;
  lunch: Recipe;
  dinner: Recipe;
  onViewRecipe: (recipe: Recipe) => void;
}

interface MealPlanProps {
  mealPlan: MealDayProps[];
  onViewRecipe: (recipe: Recipe) => void;
}

function MealCard({ recipe, mealType, onViewRecipe }: { recipe: Recipe; mealType: string; onViewRecipe: (recipe: Recipe) => void }) {
  const [expanded, setExpanded] = useState(false);

  // Ensure all nutritional values are available
  const calories = recipe.calories || "350 calories";
  const protein = recipe.protein || "15g";
  const carbs = recipe.carbs || "30g";
  const fat = recipe.fat || "12g";

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm mb-2">
      <div 
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center">
          <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full mr-3">
            <FaUtensils className="text-blue-500 dark:text-blue-300" />
          </div>
          <div>
            <div className="text-xs text-blue-500 dark:text-blue-300 font-medium">{mealType}</div>
            <div className="font-medium">{recipe.name}</div>
            <div className="text-xs text-gray-500 flex items-center mt-1">
              <FaFireAlt className="mr-1 text-orange-400" size={10} />
              {calories}
            </div>
          </div>
        </div>
        <button>
          {expanded ? <FaChevronUp /> : <FaChevronDown />}
        </button>
      </div>
      
      {expanded && (
        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
          <div className="mb-3">
            <h4 className="text-sm font-medium mb-1">Cooking Time</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">{recipe.cookingTime}</p>
          </div>
          
          <div className="mb-3">
            <h4 className="text-sm font-medium mb-1">Key Ingredients</h4>
            <ul className="text-sm text-gray-600 dark:text-gray-400 list-disc pl-5">
              {recipe.ingredients.slice(0, 3).map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
              {recipe.ingredients.length > 3 && (
                <li className="italic">plus {recipe.ingredients.length - 3} more...</li>
              )}
            </ul>
          </div>
          
          <div className="mb-3">
            <h4 className="text-sm font-medium mb-1">Nutritional Info</h4>
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-400">
              <div><span className="font-medium text-orange-500">Calories:</span> {calories}</div>
              <div><span className="font-medium text-blue-500">Protein:</span> {protein}</div>
              <div><span className="font-medium text-green-500">Carbs:</span> {carbs}</div>
              <div><span className="font-medium text-purple-500">Fat:</span> {fat}</div>
            </div>
          </div>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewRecipe(recipe);
            }}
            className="mt-2 w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            View Full Recipe
          </button>
        </div>
      )}
    </div>
  );
}

function DayMealPlan({ day, breakfast, lunch, dinner, onViewRecipe }: MealDayProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-6">
      <div 
        className="bg-gray-50 dark:bg-gray-700 px-4 py-3 cursor-pointer flex justify-between items-center"
        onClick={() => setExpanded(!expanded)}
      >
        <h3 className="font-bold text-lg">{day}</h3>
        <button>
          {expanded ? <FaChevronUp /> : <FaChevronDown />}
        </button>
      </div>
      
      {expanded && (
        <div className="p-4">
          <MealCard recipe={breakfast} mealType="Breakfast" onViewRecipe={onViewRecipe} />
          <MealCard recipe={lunch} mealType="Lunch" onViewRecipe={onViewRecipe} />
          <MealCard recipe={dinner} mealType="Dinner" onViewRecipe={onViewRecipe} />
        </div>
      )}
    </div>
  );
}

export default function MealPlan({ mealPlan, onViewRecipe }: MealPlanProps) {
  return (
    <div>
      {mealPlan.map((dayPlan, index) => (
        <DayMealPlan
          key={index}
          day={dayPlan.day}
          breakfast={dayPlan.breakfast}
          lunch={dayPlan.lunch}
          dinner={dayPlan.dinner}
          onViewRecipe={onViewRecipe}
        />
      ))}
    </div>
  );
} 