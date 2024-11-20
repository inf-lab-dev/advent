import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges and resolves tailwind classes.
 *
 * @param inputs the inputs supportd by `clsx`
 * @returns the merged classes
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
