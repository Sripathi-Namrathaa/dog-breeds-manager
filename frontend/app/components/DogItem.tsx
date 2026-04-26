import { Edit2, Trash2 } from "lucide-react";
import type { DogBreed } from "../types";

interface DogItemProps {
  dog: DogBreed;
  onEdit: (dog: DogBreed) => void;
  onDelete: (id: string) => void;
  highlighted?: boolean;
}

export default function DogItem({ dog, onEdit, onDelete, highlighted }: DogItemProps) {
  return (
    <div
      id={`dog-${dog.id}`}
      className={`rounded-2xl p-5 shadow-sm border hover:shadow-md transition-all duration-500 group flex flex-col h-full ${
        highlighted
          ? "border-indigo-400 ring-2 ring-indigo-300 bg-indigo-50"
          : "border-gray-100 bg-white"
      }`}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-bold text-gray-900 capitalize">
          {dog.breed}
        </h3>

        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(dog)}
            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Edit2 size={18} />
          </button>

          <button
            onClick={() => onDelete(dog.id)}
            className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <div className="flex-1">
        {dog.subBreeds?.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {dog.subBreeds.map((sub, idx) => (
              <span
                key={idx}
                className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100 capitalize"
              >
                {sub}
              </span>
            ))}
          </div>
        ) : (
          <span className="text-sm text-gray-400 italic">No sub-breeds</span>
        )}
      </div>
    </div>
  );
}
