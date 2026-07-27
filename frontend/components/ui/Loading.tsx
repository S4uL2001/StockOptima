'use client';

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center">
      <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-r-transparent rounded-full" />
    </div>
  );
}

export function LoadingCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="rounded-lg bg-gray-200 dark:bg-gray-700 h-24 animate-pulse" />
      ))}
    </div>
  );
}

export function LoadingTable() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="rounded-lg bg-gray-200 dark:bg-gray-700 h-12 animate-pulse"
        />
      ))}
    </div>
  );
}
