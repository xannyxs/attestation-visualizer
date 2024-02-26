"use client";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Suspense, useEffect, useState } from "react";

export default function ReadMeView() {
  const [readMe, setReadMe] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://raw.githubusercontent.com/xannyxs/attestation-visualizer/master/README.md",
        { cache: "force-cache" },
      );

      if (!response.ok) {
        console.error("Could not fetch the README uri", response.status);
        return;
      }

      const data = await response.text();
      setReadMe(data);
    };

    if (!readMe) {
      fetchData();
    }
  }, []);

  return (
    <Suspense fallback={<p className="mx-auto">Loading README content...</p>}>
      <div className="relative bg-white h-full w-full overflow-y-auto max-h-[calc(100vh)] z-20">
        <div className="flex sticky top-0 justify-between items-center pt-4 pb-3 mx-2 bg-white border-b border-gray-300">
          <div className="text-3xl">Read Me</div>
        </div>
        <article className="py-5 mx-auto prose">
          <Markdown remarkPlugins={[remarkGfm]}>{readMe}</Markdown>
        </article>
      </div>
    </Suspense>
  );
}
