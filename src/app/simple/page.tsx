/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState, useRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function StreamingPage() {
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState<any>(null);
  const [streaming, setStreaming] = useState(false);
  const [stage, setStage] = useState<
    "idle" | "preparing" | "waiting" | "streaming" | "done"
  >("idle");
  const [error, setError] = useState<string | null>(null);
  const outputRef = useRef<HTMLPreElement>(null);

  async function handleStream() {
    setStreaming(true);
    setStage("preparing");
    setOutput(null);
    setError(null);
    try {
      setStage("waiting");
      const res = await fetch("/api/stream-object", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      if (!res.body) throw new Error("No response body");
      setStage("streaming");
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      const partials: any[] = [];
      let gotFirst = false;
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop()!;
        for (const line of lines) {
          if (line.trim()) {
            try {
              const obj = JSON.parse(line);
              partials.push(obj);
              setOutput(obj); // Show latest partial
              if (!gotFirst) {
                setStage("streaming");
                gotFirst = true;
              }
            } catch {
              // Ignore JSON parse errors for incomplete lines
            }
          }
        }
      }
      setStage("done");
    } catch (e: any) {
      setError(e.message || "Streaming error");
      setStage("idle");
    } finally {
      setStreaming(false);
    }
  }

  return (
    <div className="max-w-600 mx-auto p-6 space-y-2">
      <h2>Recipe Generator (Streaming Structured Output)</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleStream();
        }}
        className="mb-4 flex"
      >
        <Input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter a recipe prompt..."
          className="w-full"
          disabled={streaming}
        />
        <Button
          type="submit"
          disabled={streaming || !prompt.trim()}
          style={{ marginLeft: 8 }}
        >
          {stage === "idle" && "Generate"}
          {stage === "preparing" && "Preparing..."}
          {stage === "waiting" && "Waiting for response..."}
          {stage === "streaming" && "Streaming..."}
          {stage === "done" && "Done"}
        </Button>
      </form>
      {error && <div className="text-destructive">{error}</div>}
      <div className="flex justify-center">
        <pre
          ref={outputRef}
          className="text-sm text-wrap bg-accent p-4 rounded "
        >
          {output ? JSON.stringify(output, null, 2) : "No output yet."}
        </pre>

        {/* Improved UI rendering for the recipe */}
        {output && (
          <>
            {output.recipe &&
            Array.isArray(output.recipe.ingredients) &&
            Array.isArray(output.recipe.steps) ? (
              <div className="bg-card p-6 rounded shadow space-y-4 border">
                <h3 className="text-xl font-bold mb-2">{output.recipe.name}</h3>
                <p className="text-muted-foreground mb-4">
                  {output.recipe.description}
                </p>
                <div>
                  <span className="font-semibold">Ingredients:</span>
                  <Table className="mt-2">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-1/2">Name</TableHead>
                        <TableHead className="w-1/2">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {output.recipe.ingredients.map((ing: any, i: number) => (
                        <TableRow key={i}>
                          <TableCell className="">{ing.name}</TableCell>
                          <TableCell>
                            {ing.amount ? (
                              <span className="text-muted-foreground">
                                {ing.amount}
                              </span>
                            ) : (
                              <span className="text-muted-foreground">-</span>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div>
                  <span className="font-semibold">Steps:</span>
                  <ol className="list-decimal list-inside ml-4 mt-1 space-y-1">
                    {output.recipe.steps.map((step: string, i: number) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ol>
                </div>
              </div>
            ) : (
              // Show partial UI as soon as any part of the recipe is available
              <div className="bg-card p-6 rounded shadow space-y-4 border opacity-60">
                <h3 className="text-xl font-bold mb-2">
                  {output.recipe?.name || (
                    <span className="italic text-muted-foreground">
                      Loading name...
                    </span>
                  )}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {output.recipe?.description || (
                    <span className="italic">Loading description...</span>
                  )}
                </p>
                <div>
                  <span className="font-semibold">Ingredients:</span>
                  <Table className="mt-2">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-1/2">Name</TableHead>
                        <TableHead className="w-1/2">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Array.isArray(output.recipe?.ingredients) ? (
                        output.recipe.ingredients.map((ing: any, i: number) => (
                          <TableRow key={i}>
                            <TableCell className="">
                              {ing.name || (
                                <span className="italic text-muted-foreground">
                                  ...
                                </span>
                              )}
                            </TableCell>
                            <TableCell>
                              {ing.amount ? (
                                <span className="text-muted-foreground">
                                  {ing.amount}
                                </span>
                              ) : (
                                <span className="text-muted-foreground">-</span>
                              )}
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={2}>
                            <span className="italic text-muted-foreground">
                              Loading ingredients...
                            </span>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
                <div>
                  <span className="font-semibold">Steps:</span>
                  <ol className="list-decimal list-inside ml-4 mt-1 space-y-1">
                    {Array.isArray(output.recipe?.steps) ? (
                      output.recipe.steps.map((step: string, i: number) => (
                        <li key={i}>
                          {step || (
                            <span className="italic text-muted-foreground">
                              ...
                            </span>
                          )}
                        </li>
                      ))
                    ) : (
                      <li>
                        <span className="italic text-muted-foreground">
                          Loading steps...
                        </span>
                      </li>
                    )}
                  </ol>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
