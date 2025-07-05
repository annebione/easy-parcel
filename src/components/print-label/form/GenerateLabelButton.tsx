'use client';
import type { ButtonHTMLAttributes } from "react";
import { useFormStatus } from "react-dom";

export default function GenerateLabelButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  const { pending } = useFormStatus();

  return (
    <button
    type="submit"
    disabled={pending}
    className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto hover:opacity-90"
    {...props}
  >
    {pending ? 'Generating...' : 'Generate Shipping Label'}
  </button>
  );
}