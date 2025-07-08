"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Loader2,
  ChefHat,
  Clock,
  Users,
  AlertCircle,
  CheckCircle,
  Timer,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Ingredient {
  name: string;
  amount: string;
  unit?: string;
}

interface Recipe {
  name: string;
  description: string;
  prepTime: string;
  cookTime: string;
  servings: number;
  ingredients: Ingredient[];
  instructions: string[];
  difficulty: string;
}

export default function RecipeGenerator() {
  const [dishName, setDishName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [error, setError] = useState("");
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const toggleStepCompletion = (stepIndex: number) => {
    setCompletedSteps((prev) =>
      prev.includes(stepIndex)
        ? prev.filter((index) => index !== stepIndex)
        : [...prev, stepIndex]
    );
  };

  const generateRecipe = async () => {
    if (!dishName.trim()) {
      setError("Please enter a dish name");
      return;
    }

    setIsLoading(true);
    setError("");
    setRecipe(null);
    setCompletedSteps([]);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock recipe data - in real implementation, this would be an API call
      const mockRecipe: Recipe = {
        name: dishName,
        description: `A delicious and flavorful ${dishName} that's perfect for any occasion.`,
        prepTime: "15 mins",
        cookTime: "30 mins",
        servings: 4,
        difficulty: "Medium",
        ingredients: [
          { name: "Olive oil", amount: "2", unit: "tablespoons" },
          { name: "Onion", amount: "1", unit: "large, diced" },
          { name: "Garlic cloves", amount: "3", unit: "minced" },
          { name: "Salt", amount: "1", unit: "teaspoon" },
          { name: "Black pepper", amount: "1/2", unit: "teaspoon" },
          { name: "Fresh herbs", amount: "2", unit: "tablespoons" },
        ],
        instructions: [
          "Heat olive oil in a large skillet or saucepan over medium heat.",
          "Add diced onion and cook for 3-4 minutes until softened and translucent.",
          "Add minced garlic and cook for another 1 minute until fragrant.",
          "Season with salt and black pepper, stirring to combine.",
          "Continue cooking according to your specific dish requirements.",
          "Garnish with fresh herbs before serving.",
        ],
      };

      setRecipe(mockRecipe);
    } catch (err) {
      setError("Failed to generate recipe. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      generateRecipe();
    }
  };

  return (
    <div className="bg-background min-h-screen w-full">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <ChefHat className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">
              Recipe Generator
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Enter any dish name and get a complete recipe with ingredients and
            step-by-step instructions
          </p>
        </div>

        {/* Search Input */}
        <Card className="mb-8 bg-card border-border">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Enter a dish name..."
                  value={dishName}
                  onChange={(e) => setDishName(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="h-12 text-lg bg-background border-input focus:ring-ring focus:border-ring"
                  aria-label="Dish name input"
                  disabled={isLoading}
                />
              </div>
              <Button
                onClick={generateRecipe}
                disabled={isLoading || !dishName.trim()}
                className="h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                aria-label="Generate recipe"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate Recipe"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Error State */}
        {error && (
          <Alert className="mb-8 border-destructive/50 bg-destructive/10">
            <AlertCircle className="h-4 w-4 text-destructive" />
            <AlertDescription className="text-destructive font-medium">
              {error}
            </AlertDescription>
          </Alert>
        )}

        {/* Loading State */}
        {isLoading && (
          <Card className="mb-8 bg-card border-border">
            <CardContent className="p-12 text-center">
              <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Generating Your Recipe
              </h3>
              <p className="text-muted-foreground">
                This may take a few moments...
              </p>
            </CardContent>
          </Card>
        )}

        {/* Recipe Results */}
        {recipe && !isLoading && (
          <div className="space-y-8">
            {/* Recipe Header */}
            <Card className="bg-card border-border">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl text-foreground">
                  {recipe.name}
                </CardTitle>
                <p className="text-muted-foreground text-lg">
                  {recipe.description}
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">Total Time</p>
                      <p className="text-sm text-muted-foreground">
                        {recipe.prepTime} prep + {recipe.cookTime} cook
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">Servings</p>
                      <p className="text-sm text-muted-foreground">
                        {recipe.servings} people
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <ChefHat className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">Difficulty</p>
                      <p className="text-sm text-muted-foreground">
                        {recipe.difficulty}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Ingredients Section */}
              <Card className="bg-card border-border h-fit">
                <CardHeader>
                  <CardTitle className="text-xl text-foreground flex items-center gap-2">
                    Ingredients
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recipe.ingredients.map((ingredient, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-start p-3 rounded-lg bg-secondary/30 border border-border/50 hover:bg-secondary/50 transition-colors"
                      >
                        <span className="font-medium text-foreground">
                          {ingredient.name}
                        </span>
                        <span className="text-muted-foreground text-sm font-medium ml-4 text-right">
                          {ingredient.amount} {ingredient.unit}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Enhanced Instructions Section */}
              <Card className="bg-card border-border h-fit">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl text-foreground flex items-center gap-2">
                      <Timer className="h-5 w-5 text-primary" />
                      Instructions
                    </CardTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>
                        {completedSteps.length}/{recipe.instructions.length}{" "}
                        completed
                      </span>
                      <div className="w-16 bg-secondary rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{
                            width: `${
                              (completedSteps.length /
                                recipe.instructions.length) *
                              100
                            }%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Follow the steps below and check them off as you complete
                    each one
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recipe.instructions.map((instruction, index) => {
                      const isCompleted = completedSteps.includes(index);
                      return (
                        <div
                          key={index}
                          className={`group relative rounded-lg border transition-all duration-200 ${
                            isCompleted
                              ? "bg-primary/10 border-primary/30 shadow-sm"
                              : "bg-secondary/30 border-border/50 hover:bg-secondary/50 hover:border-border/70"
                          }`}
                        >
                          <div className="flex gap-4 p-4">
                            <div className="flex-shrink-0 pt-0.5">
                              <button
                                onClick={() => toggleStepCompletion(index)}
                                className={`w-8 h-8 rounded-full font-semibold text-sm flex items-center justify-center transition-all duration-200 ${
                                  isCompleted
                                    ? "bg-primary text-primary-foreground shadow-md"
                                    : "bg-secondary border-2 border-border hover:border-primary/50 text-muted-foreground hover:text-foreground"
                                }`}
                                aria-label={`${
                                  isCompleted ? "Uncheck" : "Check off"
                                } step ${index + 1}`}
                              >
                                {isCompleted ? (
                                  <CheckCircle className="h-4 w-4" />
                                ) : (
                                  <span>{index + 1}</span>
                                )}
                              </button>
                            </div>
                            <div className="flex-1">
                              <p
                                className={`leading-relaxed transition-all duration-200 ${
                                  isCompleted
                                    ? "text-foreground/80 line-through"
                                    : "text-foreground"
                                }`}
                              >
                                {instruction}
                              </p>
                              {isCompleted && (
                                <div className="flex items-center gap-1 mt-2 text-xs text-primary font-medium">
                                  <CheckCircle className="h-3 w-3" />
                                  <span>Completed</span>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Step connector line */}
                          {index < recipe.instructions.length - 1 && (
                            <div
                              className={`absolute left-8 top-12 w-0.5 h-4 transition-colors duration-200 ${
                                isCompleted ? "bg-primary/30" : "bg-border"
                              }`}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Completion celebration */}
                  {completedSteps.length === recipe.instructions.length &&
                    recipe.instructions.length > 0 && (
                      <div className="mt-6 p-4 rounded-lg bg-primary/10 border border-primary/30">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                            <CheckCircle className="h-5 w-5" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground">
                              Recipe Complete! 🎉
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              Great job! Your {recipe.name} is ready to enjoy.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
