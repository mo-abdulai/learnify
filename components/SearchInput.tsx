"use client";
import Image from "next/image";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";

const SearchInput = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("topiċ") || "";

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {

    const delayBounceFn = setTimeout(() => {

        if (searchQuery) {
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "topic",
        value: searchQuery,
      });

      router.push(newUrl, { scroll: false });
    } else {
     if(pathname === '/companions'){
         const newUrl = removeKeysFromUrlQuery({
        params: searchParams.toString(),
        keysToRemove: ["topic"],
      });

      router.push(newUrl, { scroll: false });
     }
    }
        
    }, 500)

  }, [searchQuery, searchParams, router, pathname]);

  return (
    <div className="relative border border-black rounded-lg items-center flex gap-2 px-2 py-1 h-fit">
      <Image src="/icons/search.svg" alt="Search" width={15} height={15} />
      <input
        placeholder="Search Companions ..."
        className="outline-none"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;
