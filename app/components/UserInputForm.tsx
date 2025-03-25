'use client';

import { useState, useEffect } from 'react';
import { FaPlus, FaTrash, FaUtensils } from 'react-icons/fa';

interface UserInputFormProps {
  onSubmit: (data: {
    ingredients: string[];
    dietaryPreferences: string[];
    mealType: string;
    allergies: string[];
  }) => void;
}

export default function UserInputForm({ onSubmit }: UserInputFormProps) {
  const [ingredient, setIngredient] = useState('');
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [dietaryPreferences, setDietaryPreferences] = useState<string[]>([]);
  const [mealType, setMealType] = useState('');
  const [allergy, setAllergy] = useState('');
  const [allergies, setAllergies] = useState<string[]>([]);

  const dietaryOptions = [
    'Vegetarian',
    'Vegan',
    'Gluten-Free',
    'Dairy-Free',
    'Keto',
    'Paleo',
    'Low-Carb',
    'Low-Fat',
    'High-Protein',
  ];

  const mealTypeOptions = [
    'Breakfast',
    'Lunch',
    'Dinner',
    'Snack',
    'Dessert',
    'Appetizer',
    'Soup',
    'Salad',
    'Main Course',
    'Side Dish',
  ];

  const commonAllergies = [
    'Nuts',
    'Peanuts',
    'Dairy',
    'Eggs',
    'Wheat',
    'Soy',
    'Fish',
    'Shellfish',
  ];

  const handleAddIngredient = () => {
    if (ingredient.trim() && !ingredients.includes(ingredient.trim())) {
      setIngredients([...ingredients, ingredient.trim()]);
      setIngredient('');
    }
  };

  const handleRemoveIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const toggleDietaryPreference = (preference: string) => {
    setDietaryPreferences((prev) =>
      prev.includes(preference)
        ? prev.filter((p) => p !== preference)
        : [...prev, preference]
    );
  };

  const handleAddAllergy = () => {
    if (allergy.trim() && !allergies.includes(allergy.trim())) {
      setAllergies([...allergies, allergy.trim()]);
      setAllergy('');
    }
  };

  const handleRemoveAllergy = (index: number) => {
    setAllergies(allergies.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ingredients,
      dietaryPreferences,
      mealType,
      allergies,
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Find Recipes</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-2">
          Enter ingredients you have on hand, and we&apos;ll find recipes for you. The app is now powered by Mistral AI to suggest custom recipes based on your inputs!
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
            Ingredients <span className="text-red-500">*</span>
          </label>
          <div className="flex">
            <input
              type="text"
              value={ingredient}
              onChange={(e) => setIngredient(e.target.value)}
              className="flex-grow border rounded-l-md p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Add an ingredient (e.g., chicken, rice)"
            />
            <button
              type="button"
              onClick={handleAddIngredient}
              className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600"
            >
              <FaPlus />
            </button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {ingredients.map((item, index) => (
              <div
                key={index}
                className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-3 py-1 rounded-full flex items-center"
              >
                <span>{item}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveIngredient(index)}
                  className="ml-2 text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-100"
                >
                  <FaTrash size={12} />
                </button>
              </div>
            ))}
          </div>
          {ingredients.length === 0 && (
            <p className="text-sm text-yellow-600 dark:text-yellow-400 mt-2">
              Please add at least one ingredient to search for recipes
            </p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
            Dietary Preferences
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {dietaryOptions.map((option) => (
              <div key={option} className="flex items-center">
                <input
                  type="checkbox"
                  id={option}
                  checked={dietaryPreferences.includes(option)}
                  onChange={() => toggleDietaryPreference(option)}
                  className="mr-2"
                />
                <label htmlFor={option} className="cursor-pointer">
                  {option}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
            Meal Type
          </label>
          <select
            value={mealType}
            onChange={(e) => setMealType(e.target.value)}
            className="w-full border rounded-md p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="">Any meal type</option>
            {mealTypeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-8">
          <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
            Allergies
          </label>
          <div className="flex">
            <input
              type="text"
              value={allergy}
              onChange={(e) => setAllergy(e.target.value)}
              className="flex-grow border rounded-l-md p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Add an allergy (e.g., peanuts)"
              list="common-allergies"
            />
            <datalist id="common-allergies">
              {commonAllergies.map((item) => (
                <option key={item} value={item} />
              ))}
            </datalist>
            <button
              type="button"
              onClick={handleAddAllergy}
              className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600"
            >
              <FaPlus />
            </button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {allergies.map((item, index) => (
              <div
                key={index}
                className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100 px-3 py-1 rounded-full flex items-center"
              >
                <span>{item}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveAllergy(index)}
                  className="ml-2 text-red-600 dark:text-red-300 hover:text-red-800 dark:hover:text-red-100"
                >
                  <FaTrash size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-md mb-6">
          <h3 className="font-bold text-green-800 dark:text-green-300 mb-2 flex items-center">
            <FaUtensils className="mr-2" /> AI Recipe Generation
          </h3>
          <p className="text-green-700 dark:text-green-400 text-sm">
            Our app is now powered by Mistral AI! Enter your ingredients and preferences above, and we'll generate custom recipes tailored to your needs.
          </p>
        </div>

        <div className="text-center">
          <button
            type="submit"
            disabled={ingredients.length === 0}
            className={`px-6 py-3 bg-blue-500 text-white rounded-md ${
              ingredients.length > 0
                ? 'hover:bg-blue-600'
                : 'opacity-50 cursor-not-allowed'
            }`}
          >
            Find Recipes
          </button>
        </div>
      </form>
    </div>
  );
} 