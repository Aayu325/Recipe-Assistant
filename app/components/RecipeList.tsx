import React from 'react';
import Image from 'next/image';
import { Recipe } from './RecipeCard';

interface RecipeListProps {
  recipes: Recipe[];
  onViewRecipe: (recipe: Recipe) => void;
}

const DEFAULT_IMAGE = 'https://source.unsplash.com/featured/?food,recipe';

const RecipeList: React.FC<RecipeListProps> = ({ recipes, onViewRecipe }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe) => (
        <div
          key={recipe.id}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          <div className="relative h-48">
            <Image
              src={recipe.image || DEFAULT_IMAGE}
              alt={recipe.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">{recipe.name}</h3>
            <p className="text-gray-600 mb-4">{recipe.description}</p>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>{recipe.cookingTime}</span>
              <span>{recipe.difficulty}</span>
              <span>{recipe.servings}</span>
            </div>
            <div className="mt-4 pt-4 border-t">
              <p className="text-sm text-gray-600">{recipe.nutritionalInfo}</p>
            </div>
            <button
              onClick={() => onViewRecipe(recipe)}
              className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
              View Recipe
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecipeList; 