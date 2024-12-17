"use client";

import { useState } from "react";

export default function JokesPage() {
  const [title, setTitle] = useState("");
  const [roast, setRoast] = useState("");
  const [roasts, setRoasts] = useState([]);

  async function fetchRoasts() {
    const response = await fetch("/api/jokes");
    const data = await response.json();
    setRoasts(data);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newRoast = { id: Date.now(), title, roast };

    const response = await fetch("/api/jokes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRoast),
    });

    const updatedRoasts = await response.json();
    setRoasts(updatedRoasts);

    // Clear form
    setTitle("");
    setRoast("");
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Roasts</h1>

      <form onSubmit={handleSubmit} className="mb-8">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="block w-full mb-2 p-2 border rounded"
        />
        <textarea
          placeholder="Roast"
          value={roast}
          onChange={(e) => setRoast(e.target.value)}
          className="block w-full mb-2 p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Roast
        </button>
      </form>

      <button
        onClick={fetchRoasts}
        className="mb-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Fetch Roasts
      </button>

      <ul className="space-y-4">
        {roasts.map((roast: { id: number; title: string; roast: string }) => (
          <li key={roast.id} className="p-4 border rounded-lg shadow-md">
            <h2 className="text-xl font-bold">{roast.title}</h2>
            <p className="text-gray-700">{roast.roast}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
