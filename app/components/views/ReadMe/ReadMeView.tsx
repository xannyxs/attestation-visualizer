"use client";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useEffect, useState } from "react";

export default function ReadMeView() {
  const [readMe, setReadMe] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/fetch_file?file=README.md", {
        cache: "force-cache",
      });
      if (!response.ok) {
        console.log("Failed to fetch:", response.status);
        return;
      }
      const data = await response.text();
      setReadMe(data);
    };

    if (!readMe) {
      fetchData();
    }
  });

  return (
    <div className="relative bg-white h-full w-full overflow-y-auto max-h-[calc(100vh)]">
      <div className="sticky top-0 mx-2 border-b border-gray-300 pt-4 pb-3 bg-white flex justify-between items-center">
        <div className="text-3xl">Read Me</div>
      </div>
      <article className="mx-auto py-5 prose">
        {readMe ? (
          <Markdown remarkPlugins={[remarkGfm]}>{readMe}</Markdown>
        ) : (
          <p>Loading README content...</p>
        )}
      </article>
    </div>
  );
}
