import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center font-sans px-4">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="font-heading text-8xl md:text-9xl text-gray-100 font-bold mb-4">404</h1>
        <h2 className="font-heading text-3xl md:text-4xl text-gray-900 mb-6">Page Not Found</h2>
        <p className="text-gray-500 font-light leading-relaxed mb-10 max-w-md mx-auto">
          The page you are looking for has been moved or no longer exists. Return to the homepage to explore our collection of luxury accommodations.
        </p>
        <Link href="/">
          <Button className="bg-primary text-white hover:bg-primary/95 rounded-none px-12 py-6 uppercase tracking-widest text-xs font-semibold">
            Return Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
