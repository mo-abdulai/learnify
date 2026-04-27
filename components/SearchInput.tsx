"use client";
import Image from "next/image";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";

const SearchInput = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("topic") || "";

  const [searchQuery, setSearchQuery] = useState(query);

  useEffect(() => {
    setSearchQuery(query);
  }, [query]);

  useEffect(() => {
    const delayBounceFn = setTimeout(() => {
      const nextTopic = searchQuery.trim();
      const currentTopic = query.trim();

      if (nextTopic === currentTopic) return;

      if (nextTopic) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "topic",
          value: nextTopic,
        });

        router.replace(newUrl, { scroll: false });
      } else if (pathname === "/companions") {
        const newUrl = removeKeysFromUrlQuery({
          params: searchParams.toString(),
          keysToRemove: ["topic"],
        });

        router.replace(newUrl, { scroll: false });
      }
    }, 500);

    return () => clearTimeout(delayBounceFn);
  }, [searchQuery, query, searchParams, router, pathname]);

  return (
    <div className="relative w-full max-w-md">
      <label className="sr-only" htmlFor="companion-search">
        Search companions
      </label>
      <div className="relative border border-black rounded-lg items-center flex gap-2 px-3 py-2 h-fit bg-background">
        <Image src="/icons/search.svg" alt="Search" width={15} height={15} />
        <input
          id="companion-search"
          name="companion-search"
          type="search"
          placeholder="Search companions by topic or name"
          className="outline-none bg-transparent w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search companions by topic or name"
        />
      </div>
      <p className="sr-only" aria-live="polite">
        {searchQuery ? `Searching for ${searchQuery}` : "No search applied"}
      </p>
    </div>
  );
};

export default SearchInput;
