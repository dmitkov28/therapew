import image from "@/assets/therapew.svg";
import { Link } from "@tanstack/react-router";
export default function NotFound() {
  return (
    <div className="flex w-full justify-center items-center">
      <div className="space-y-4">
        <img className="w-96 " src={image} />
        <h1 className="text-3xl text-center font-bold bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">
          Страницата не е намерена.
        </h1>
        <Link
          className="block w-fit mx-auto bg-emerald-600 text-white font-bold rounded-md text-center px-2 py-1"
          to="/"
        >
          &larr; Начало
        </Link>
      </div>
    </div>
  );
}
