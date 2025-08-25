import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}


import DOMPurify from 'dompurify';

export function sanitizeSubject(input) {
  return DOMPurify.sanitize(input, { USE_PROFILES: { html: false, svg: false, mathMl: false } });
}

export function sanitizeMessageContent(input) {
  return DOMPurify.sanitize(input, { USE_PROFILES: { html: false, svg: false, mathMl: false } });
}


