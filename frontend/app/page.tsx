"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import DogForm from "./components/DogForm";
import DogItem from "./components/DogItem";
import type { DogBreed, DogFormData } from "./types";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

async function loadDogs(): Promise<DogBreed[]> {
  const res = await fetch(`${API_URL}/dogs`, {
    cache: "no-store",
  });
  const data: Record<string, string[]> = await res.json();

  return Object.entries(data).map(([breed, subBreeds]) => ({
    id: breed,
    breed,
    subBreeds,
  }));
}

export default function Home() {
  const [dogs, setDogs] = useState<DogBreed[]>([]);
  const [editingDog, setEditingDog] = useState<DogBreed | null>(null);
  const [highlightedBreed, setHighlightedBreed] = useState<string | null>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    let cancelled = false;
    loadDogs().then((result) => {
      if (!cancelled) setDogs(result);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const refreshDogs = useCallback(async () => {
    const result = await loadDogs();
    setDogs(result);
  }, []);

  const handleEdit = (dog: DogBreed) => {
    setEditingDog(dog);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const scrollToCard = (breedId: string) => {
    setHighlightedBreed(breedId);
    setTimeout(() => {
      document.getElementById(`dog-${breedId}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 200);
    setTimeout(() => setHighlightedBreed(null), 2500);
  };

  const handleAddOrUpdate = async (dog: DogFormData) => {
    if (editingDog) {
      await fetch(`${API_URL}/dogs/${editingDog.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subBreeds: dog.subBreeds }),
      });

      setDogs((prev) =>
        prev.map((d) =>
          d.id === editingDog.id ? { ...d, subBreeds: dog.subBreeds } : d,
        ),
      );

      setEditingDog(null);
      scrollToCard(editingDog.id);
    } else {
      await fetch(`${API_URL}/dogs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dog),
      });
      await refreshDogs();
      scrollToCard(dog.breed);
    }
  };

  const handleDelete = async (id: string) => {
    await fetch(`${API_URL}/dogs/${id}`, { method: "DELETE" });
    refreshDogs();
  };

  return (
    <div className="min-h-screen p-6 md:p-10 bg-indigo-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-11 text-center">
          🐶 Dog Breeds Manager
        </h1>

        <div ref={formRef} className="max-w-xl mx-auto">
          <DogForm
            onSubmit={handleAddOrUpdate}
            initialData={editingDog}
            onCancel={() => setEditingDog(null)}
          />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dogs.map((dog) => (
            <DogItem
              key={dog.id}
              dog={dog}
              onEdit={handleEdit}
              onDelete={handleDelete}
              highlighted={dog.id === highlightedBreed}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
