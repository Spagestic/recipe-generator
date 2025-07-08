/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";

export default function HomePage() {
  const [activeSection, setActiveSection] = useState<"hero" | "generator">(
    "hero"
  );
  const [dishName, setDishName] = useState("");

  const handleGenerateRecipe = (dish: string) => {
    setDishName(dish);
    setActiveSection("generator");
  };

  const handleBackToHome = () => {
    setActiveSection("hero");
    setDishName("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <style jsx global>{`
        :root {
          --primary: #d2691e;
          --primary-foreground: #ffffff;
          --background: #f7f5f3;
          --foreground: #1f2937;
          --card: #ffffff;
          --card-foreground: #1f2937;
          --secondary: #f3f4f6;
          --secondary-foreground: #374151;
          --muted: #f9fafb;
          --muted-foreground: #6b7280;
          --border: #e5e7eb;
          --input: #e5e7eb;
          --ring: #d2691e;
          --destructive: #ef4444;
          --text-dark: #1f2937;
          --font-heading: Inter;
          --font-body: Inter;
        }
      `}</style>

      <main className="flex-1">
        {activeSection === "hero" && (
          <SimpleCenteredWithCallback onGenerateRecipe={handleGenerateRecipe} />
        )}
        {activeSection === "generator" && (
          <div>
            <div className="bg-[#F7F5F3] px-6 py-4">
              <div className="max-w-4xl mx-auto">
                <button
                  onClick={handleBackToHome}
                  className="text-[var(--primary)] hover:text-[#B85A1A] font-medium font-[var(--font-body)]"
                >
                  ← Back to Home
                </button>
              </div>
            </div>
            <RecipeGeneratorWithDish initialDish={dishName} />
          </div>
        )}
      </main>
    </div>
  );
}

function SimpleCenteredWithCallback({
  onGenerateRecipe,
}: {
  onGenerateRecipe: (dish: string) => void;
}) {
  const [dishName, setDishName] = useState("");

  const handleGenerateRecipe = () => {
    if (dishName.trim()) {
      onGenerateRecipe(dishName.trim());
    }
  };

  return (
    <div className="bg-[#F7F5F3]">
      <div className="relative isolate px-6 pt-0 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#D2691E] to-[#E67E22] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>

        <div className="mx-auto max-w-2xl py-18 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-5xl font-semibold tracking-tight text-balance text-[var(--text-dark)] sm:text-7xl ">
              Discover Delicious Recipes
            </h1>
            <div className="mt-8 text-sm font-normal text-pretty text-gray-600 sm:text-xl/8 ">
              Simply enter any dish name and get complete recipes with
              ingredients and step-by-step instructions.
            </div>

            <div className="mt-10 flex flex-col items-center gap-4 max-w-xl mx-auto">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Enter a dish name..."
                  value={dishName}
                  onChange={(e) => setDishName(e.target.value)}
                  className="w-full px-6 py-4 text-lg rounded-xl border-2 border-[var(--border)] bg-white focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 font-[var(--font-body)] shadow-sm"
                  onKeyDown={(e) => e.key === "Enter" && handleGenerateRecipe()}
                />
                <svg
                  className="absolute right-4 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </div>

              <button
                onClick={handleGenerateRecipe}
                className="w-full bg-[var(--primary)] hover:bg-[#B85A1A] text-[var(--primary-foreground)] font-semibold py-4 px-8 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all duration-200 font-[var(--font-body)]"
              >
                Generate Recipe
              </button>
            </div>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#D2691E] to-[#E67E22] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          />
        </div>
      </div>
    </div>
  );
}

function RecipeGeneratorWithDish({ initialDish }: { initialDish: string }) {
  const [dishName, setDishName] = useState(initialDish);
  const [isLoading, setIsLoading] = useState(false);
  const [recipe, setRecipe] = useState<any>(null);
  const [error, setError] = useState("");

  // Helper to parse NDJSON stream and accumulate recipe
  async function parseNDJSONStream(
    stream: ReadableStream<Uint8Array>,
    onData: (obj: any) => void,
    onDone: () => void
  ) {
    const reader = stream.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop()!;
      for (const line of lines) {
        if (line.trim()) {
          try {
            onData(JSON.parse(line));
          } catch {}
        }
      }
    }
    if (buffer.trim()) {
      try {
        onData(JSON.parse(buffer));
      } catch {}
    }
    onDone();
  }

  const generateRecipe = async () => {
    if (!dishName.trim()) {
      setError("Please enter a dish name");
      return;
    }

    setIsLoading(true);
    setError("");
    setRecipe(null);

    try {
      const response = await fetch("/api/stream-object", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: dishName }),
      });
      if (!response.body) throw new Error("No response body");
      let latestRecipe: any = {};
      let gotAny = false;
      await parseNDJSONStream(
        response.body,
        (obj) => {
          if (obj.recipe) {
            gotAny = true;
            // Merge new fields into latestRecipe
            latestRecipe = { ...latestRecipe, ...obj.recipe };
            setRecipe({
              name: latestRecipe.name,
              ingredients: latestRecipe.ingredients,
              steps: latestRecipe.steps,
            });
          }
        },
        () => {
          if (!gotAny) {
            setError("No recipe found in response.");
          }
        }
      );
    } catch (err) {
      setError("Failed to generate recipe. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (initialDish) {
      generateRecipe();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialDish]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      generateRecipe();
    }
  };

  return (
    <div className="bg-background min-h-screen w-full">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <svg
              className="h-8 w-8 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
              />
            </svg>
            <h1 className="text-4xl font-bold text-foreground font-[var(--font-heading)]">
              Recipe Generator
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-[var(--font-body)]">
            Enter any dish name and get a complete recipe with ingredients and
            step-by-step instructions
          </p>
        </div>

        <div className="mb-8 bg-card border border-border rounded-lg">
          <div className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Enter a dish name..."
                  value={dishName}
                  onChange={(e) => setDishName(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full h-12 px-4 text-lg bg-background border border-input rounded-md focus:ring-2 focus:ring-ring focus:border-ring outline-none font-[var(--font-body)]"
                  disabled={isLoading}
                />
              </div>
              <button
                onClick={generateRecipe}
                disabled={isLoading || !dishName.trim()}
                className="h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-md font-[var(--font-body)] disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <svg
                      className="h-4 w-4 mr-2 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Generating...
                  </div>
                ) : (
                  "Generate Recipe"
                )}
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-8 border border-destructive/50 bg-destructive/10 rounded-lg p-4">
            <div className="flex items-center">
              <svg
                className="h-4 w-4 text-destructive mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-destructive font-medium font-[var(--font-body)]">
                {error}
              </span>
            </div>
          </div>
        )}

        {isLoading && (
          <div className="mb-8 bg-card border border-border rounded-lg">
            <div className="p-12 text-center">
              <svg
                className="h-12 w-12 animate-spin text-primary mx-auto mb-4"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <h3 className="text-xl font-semibold text-foreground mb-2 font-[var(--font-heading)]">
                Generating Your Recipe
              </h3>
              <p className="text-muted-foreground font-[var(--font-body)]">
                This may take a few moments...
              </p>
            </div>
          </div>
        )}

        {recipe && !isLoading && (
          <div className="space-y-8">
            {/* Recipe Header */}
            <div className="bg-card border border-border rounded-lg">
              <div className="p-6 pb-4">
                <h2 className="text-2xl font-semibold text-foreground mb-2 font-[var(--font-heading)]">
                  {recipe.name || "Recipe"}
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Ingredients Section */}
              <div className="bg-card border border-border rounded-lg h-fit p-6">
                <h3 className="text-xl font-semibold mb-4">Ingredients</h3>
                <ul className="space-y-2">
                  {(recipe.ingredients || []).map(
                    (ingredient: any, idx: number) => (
                      <li key={idx} className="flex justify-between">
                        <span>{ingredient.name}</span>
                        <span>{ingredient.amount}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>

              {/* Steps Section */}
              <div className="bg-card border border-border rounded-lg h-fit p-6">
                <h3 className="text-xl font-semibold mb-4">Instructions</h3>
                <ol className="list-decimal list-inside space-y-2">
                  {(recipe.steps || []).map((step: string, idx: number) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
