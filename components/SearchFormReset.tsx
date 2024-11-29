"use client";

import { X } from "lucide-react";
import Link from "next/link";
import React from "react";

const SearchFormReset = () => {
    // Define reset function that clears input within the search bar.
    const reset = () => {
        const form = document.querySelector('.search-form') as HTMLFormElement;

        // If a form exists:
        if (form) form.reset();
    }
    return(
        <button type="reset" onClick={reset}>
            <Link href="/" className="search-btn text-white">
                <X className="size-5" />
            </Link>
        </button>
    )
}

export default SearchFormReset;