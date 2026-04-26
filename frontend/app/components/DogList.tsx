import DogItem from "./DogItem";
import type { DogBreed } from "../types";

interface DogListProps {
  dogs: Record<string, string[]>;
  refresh: () => void;
}

export default function DogList({ dogs, refresh }: DogListProps) {
  return (
    <div>
      {Object.entries(dogs).map(([breed, subBreeds]: [string, string[]]) => (
        <DogItem
          key={breed}
          dog={{ id: breed, breed, subBreeds } as DogBreed}
          onEdit={() => refresh()}
          onDelete={() => refresh()}
        />
      ))}
    </div>
  );
}
