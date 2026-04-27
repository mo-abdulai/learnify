"use client";
import React, { useEffect, useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import { subjects } from "@/constants";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";

const SubjectFilter = () => {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get("subject") || "all";

    const [subject, setSubject] = useState(query);

    useEffect(() => {
        setSubject(query);
    }, [query]);

    useEffect(() => {
        if (pathname !== "/companions") return;
        const currentSubject = searchParams.get("subject") || "all";
        if (subject === currentSubject) return;

        let newUrl = "";
        if (subject === "all") {
            newUrl = removeKeysFromUrlQuery({
                params: searchParams.toString(),
                keysToRemove: ["subject"],
            });
        } else {
            newUrl = formUrlQuery({
                params: searchParams.toString(),
                key: "subject",
                value: subject,
            });
        }
        router.replace(newUrl, { scroll: false });
    }, [subject, searchParams, router, pathname]);

    return (
        <div className="w-full max-w-xs">
            <label className="sr-only" htmlFor="subject-filter">
                Filter companions by subject
            </label>
            <Select onValueChange={setSubject} value={subject} aria-label="Filter companions by subject">
                <SelectTrigger id="subject-filter" className="input capitalize">
                    <SelectValue placeholder="Subject" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All subjects</SelectItem>
                    {subjects.map((subject) => (
                        <SelectItem key={subject} value={subject} className="capitalize">
                            {subject}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <p className="sr-only" aria-live="polite">
                {subject ? `Subject filter: ${subject}` : "No subject filter applied"}
            </p>
        </div>
    );
};

export default SubjectFilter;
