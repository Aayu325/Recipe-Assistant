# Recipe Assistant App

A modern web application that helps users find recipes based on ingredients they have on hand, dietary preferences, and meal types. The app uses Next.js, React, and Tailwind CSS for the frontend, and leverages Mistral AI for generating custom recipes.

## Features

- **Ingredient-Based Recipe Search**: Find recipes based on ingredients you have available
- **Dietary Preferences**: Filter recipes based on dietary restrictions (vegetarian, vegan, etc.)
- **Meal Type Filtering**: Find recipes for specific meal types (breakfast, lunch, dinner, etc.)
- **Allergy Consideration**: Exclude recipes containing allergens
- **AI-Powered Recipe Generation**: Generate custom recipes using Mistral AI
- **Meal Planning**: Create weekly meal plans from your favorite recipes
- **Responsive Design**: Works on desktop and mobile devices

## Mistral AI Integration

This app is integrated with Mistral AI to provide personalized recipe suggestions. The integration:

- Generates custom recipes based on your ingredients, dietary preferences, and restrictions
- Provides more diverse recipe suggestions tailored to your specific needs
- Offers creative cooking ideas beyond traditional recipes

**Note**: The app comes with a pre-configured Mistral AI API key, so you don't need to provide your own key to use the AI features.

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## How to Use

1. Enter the ingredients you have available
2. Select any dietary preferences or restrictions
3. Choose a meal type (optional)
4. Add any allergies or ingredients to avoid
5. Click "Find Recipes" to see your personalized recipe suggestions
6. Click on a recipe card to view detailed instructions
7. Use the "Generate Meal Plan" button to create a weekly meal plan

## Technologies Used

- **Next.js**: React framework for server-rendered applications
- **React**: Frontend library for building user interfaces
- **Tailwind CSS**: Utility-first CSS framework
- **TypeScript**: Typed JavaScript for better development experience
- **Mistral AI**: AI language model for generating custom recipes

## Project Structure

```
/app
  /components      # UI components
  /utils           # Utility functions and mock data
  /hooks           # Custom React hooks
  page.tsx         # Main application page
/public            # Static assets
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Recipe data inspired by various culinary sources
- Icons from [React Icons](https://react-icons.github.io/react-icons/)
- Design inspired by modern recipe applications
