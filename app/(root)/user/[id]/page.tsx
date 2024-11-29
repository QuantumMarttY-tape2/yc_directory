import { auth } from "@/auth";
import { StartupCardSkeleton } from "@/components/StartupCard";
import UserStartups from "@/components/UserStartups";
import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_ID_QUERY } from "@/sanity/lib/queries";
import Image from "next/image";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";

// Enable ppr to make the startups created by the user dynamic.
export const experimental_ppr = true;

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
    // Extract id from params.
    const id = (await params).id;

    const session = await auth();

    // Fetch user.
    const user = await client.fetch(AUTHOR_BY_ID_QUERY, { id });

    // If the user does not exist:
    if (!user) return notFound();

    return (
        <>
            <section className="profile_container">
                <div className="profile_card">
                    <div className="profile_title">
                        <h3 className="text-24-black uppercase text-center line-clamp-1">
                            {user.name}
                        </h3>
                    </div>
                    
                    {/* Profile image. */}
                    <Image
                        src={user.image}
                        alt={user.name}
                        width={220}
                        height={220}
                        className="profile_image"
                    />

                    {/* User name. */}
                    <p className="text-30-extrabold mt-7 text-center">
                        @{user.username}
                    </p>

                    {/* User bio. */}
                    <p className="mt-1 text-center text-14-normal">
                        {user?.bio}
                    </p>
                </div>

                {/* This section shws the startups from this user. */}
                <div className="flex-1 flex flex-col gap-5 lg:-mt-5">
                    <p className="text-30-bold">
                        {session?.id === id ? "Your" : "All"} Startups
                    </p>
                    <ul className="card_grid-sm">
                        {/* Show a fallback first. */}
                        <Suspense fallback={<StartupCardSkeleton />}>
                            {/* Then load this. */}
                            <UserStartups id={id} />
                        </Suspense>
                    </ul>
                </div>
            </section>
        </>
    )
}

export default Page;