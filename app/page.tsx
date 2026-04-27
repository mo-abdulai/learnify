import React from "react";
import CompanionCard from "@/components/CompanionCard";
import CompanionList from "@/components/CompanionList";
import { auth } from "@clerk/nextjs/server";

import { defaultCompanions } from "@/constants";
import Cta from "@/components/Cta";
import {
  getAllCompanions,
  getUserSessions,
} from "@/lib/actions/companion.actions";
import { getSubjectColor } from "@/lib/utils";

const Page = async () => {
  const { userId } = await auth();

  const companions = await getAllCompanions({ limit: 3 });
  const safeCompanions = companions ?? [];
  const useGuestFallback = !userId && safeCompanions.length === 0;
  const popularCompanions = useGuestFallback
    ? defaultCompanions.slice(0, 3)
    : safeCompanions;

  const recentSessionsCompanions = userId
    ? await getUserSessions(userId, 10).catch((error) => {
        console.error("Failed to fetch user sessions", error);
        return [];
      })
    : defaultCompanions;

  return (
    <main>
      <h1 className="text-2xl underline">Popular Companions</h1>
      <section className="home-section">
        {popularCompanions?.map((companion) => (
          <CompanionCard
            key={companion.id}
            {...companion}
            color={getSubjectColor(companion.subject)}
            launchHref={
              useGuestFallback
                ? `/launch/${companion.id}`
                : `/companions/${companion.id}`
            }
            launchLabel={useGuestFallback ? "Sign in to launch" : "Launch Lesson"}
          />
        ))}
      </section>
      <section className="home-section">
        <CompanionList
          title={userId ? "Recently Completed" : "Try These Companions"}
          companions={recentSessionsCompanions ?? []}
          classNames="w-2/3 max-lg:w-full"
          getItemHref={userId ? undefined : (id) => `/launch/${id}`}
        />
        <Cta />
      </section>
    </main>
  );
};

export default Page;
