"use client";

import React, { useState, useEffect } from "react";
import type { DogBreed, DogFormData } from "../types";

interface DogFormProps {
  onSubmit: (dog: DogFormData) => Promise<void>;
  initialData: DogBreed | null;
  onCancel: () => void;
}

export default function DogForm({
  onSubmit,
  initialData,
  onCancel,
}: DogFormProps) {
  const [breed, setBreed] = useState("");
  const [subBreeds, setSubBreeds] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setBreed(initialData.breed || "");
      setSubBreeds((initialData.subBreeds || []).join(", "));
    } else {
      setBreed("");
      setSubBreeds("");
    }
  }, [initialData]);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!breed.trim()) return;

    setLoading(true);

    const formatted = subBreeds
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    try {
      await onSubmit({
        breed: breed.trim(),
        subBreeds: formatted,
      });
    } catch (err) {
      console.error("Submit failed", err);
    } finally {
      setLoading(false);
    }

    if (!initialData) {
      setBreed("");
      setSubBreeds("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8"
    >
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        {initialData ? "Edit Dog Breed" : "Add New Dog Breed"}
      </h2>

      <div className="space-y-4">
        <input
          type="text"
          value={breed}
          disabled={!!initialData}
          onChange={(e) => setBreed(e.target.value)}
          placeholder="Breed name"
          className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-white text-gray-900"
          required
        />

        <input
          type="text"
          value={subBreeds}
          onChange={(e) => setSubBreeds(e.target.value)}
          placeholder="Sub breeds (comma separated)"
          className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-white text-gray-900"
        />

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-indigo-600 text-white py-2.5 rounded-xl"
          >
            {loading ? "Saving..." : initialData ? "Update" : "Save"}
          </button>

          {initialData && (
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-200 py-2.5 rounded-xl"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
