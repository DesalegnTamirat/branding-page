import { getRoast, roasts } from "@/data/jokes";
import Link from "next/link";

// Generates static paths for all roast IDs
export async function generateStaticParams() {
  return roasts.map((roast) => ({
    id: roast.id.toString(),
  }));
}

// Dynamic page for each roast ID
export default function RoastDetail({ params }: { params: { id: string } }) {
  const jokesId = parseInt(params.id, 10); // Convert ID to number
  const roast = getRoast(jokesId); // Fetch roast data by ID

  if (!roast) {
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <h3 className="text-2xl text-red-500 mb-4">No User with this ID</h3>
        <Link href="/" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Go Home
        </Link>
      </div>
    );
  }

  return (
    <div className="h-[100vh] flex justify-center items-center">
      <div className="bg-blue-900 max-w-lg rounded-xl py-5 px-8 text-center">
        <h1 className="text-3xl font-extrabold text-white mb-3">{roast.title}</h1>
        <p className="text-gray-200 mb-8">{roast.roast}</p>
        <Link
          href="/jokes"
          className="block m-auto bg-cyan-500 rounded-lg py-3 px-6 text-lg font-bold text-white hover:bg-cyan-600"
        >
          Full Roasts
        </Link>
      </div>
    </div>
  );
}
