import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full">
      <h2 className="text-3xl lg:text-2xl font-semibold tracking-tight text-black leading-10 mb-4">
        Not Found
      </h2>
      <p className="w-[96%] lg:w-full mx-auto py-1.5 lg:py-2 leading-6 text-text mb-4">
        Could not find requested resource. You can use navigation menu to go
        back to home page or use back button on your browser.
      </p>
      <Link href="/" className="bg-primary text-white  px-4 py-1.5 rounded-lg">
        Return Home
      </Link>
    </div>
  );
}
