import React from "react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-3xl text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to SRS
        </h1>
        <p className="text-gray-600 text-lg">
          This is your home page. Use the navigation bar to explore the app and manage your account.
        </p>
      </div>
    </div>
  );
}
