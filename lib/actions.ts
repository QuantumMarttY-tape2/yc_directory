"use server";

import { auth } from "@/auth";
import { parseServerActionResponse } from "./utils";
import slugify from 'slugify';
import { writeClient } from "@/sanity/lib/write-client";

export const createPitch = async (state: any, form: FormData, pitch: string) => {
    // Get access to the active session.
    const session = await auth();

    // If the user has not logged in:
    if (!session) return parseServerActionResponse({
        error: "Not signed in",
        status: "ERROR"
    })

    // We only want to keep the pitch.
    const { title, description, category, link } = Object.fromEntries(
        Array.from(form).filter(([key]) => key !== 'pitch')
    )

    // Slug.
    const slug = slugify(title as string, { lower: true, strict: true });

    try{
        const startup = {
            title,
            description,
            category,
            image: link,
            slug: {
                _type: slug,
                current: slug,
            },
            author: {
                _type: "reference",
                _ref: session?.id,
            },
            pitch,
        };

        // Create data in Sanity's database.
        const result = await writeClient.create({ _type: "startup", ...startup });

        return parseServerActionResponse({
            ...result,
            error: '',
            status: "SUCCESS"
        })
    } catch(error) {
        console.log(error);

        return parseServerActionResponse({ error: JSON.stringify(error), status: "ERROR" })
    }
}

