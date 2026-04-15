import Avatar from "../Avatar";
import useUsers from "@/hooks/useUsers";
import { useRouter } from "next/router";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { useMemo, useState } from "react";

type FollowBarUser = {
  id: string;
  name?: string | null;
  username?: string | null;
};

const trendingTopics = [
  {
    category: "Design · Trending",
    title: "Glitter UI",
    meta: "4,182 posts",
  },
  {
    category: "Technology · Trending",
    title: "Frontend portfolios",
    meta: "12.4K posts",
  },
  {
    category: "Careers · Trending",
    title: "Freelance launch",
    meta: "2,938 posts",
  },
];

const FollowBar = () => {
  const { data: users = [] } = useUsers();
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");

  const filteredUsers = useMemo(() => {
    const normalizedQuery = searchValue.trim().toLowerCase();

    if (!normalizedQuery) {
      return (users as FollowBarUser[]).slice(0, 3);
    }

    return (users as FollowBarUser[])
      .filter((user) => {
        const name = user.name?.toLowerCase() || "";
        const username = user.username?.toLowerCase() || "";

        return (
          name.includes(normalizedQuery) || username.includes(normalizedQuery)
        );
      })
      .slice(0, 5);
  }, [searchValue, users]);

  return (
    <div className="hidden px-2 py-4 lg:block">
      <div className="sticky top-4 space-y-4">
        <div className="rounded-full border border-neutral-800 bg-neutral-900/80 px-4 py-3 transition focus-within:border-sky-500/40">
          <input
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            placeholder="Search Glitter"
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-neutral-500"
          />
        </div>

        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/70 p-4">
          <h2 className="text-xl font-semibold text-white">What&apos;s happening</h2>
          <div className="mt-4 flex flex-col gap-4">
            {trendingTopics.map((topic) => (
              <div key={topic.title} className="flex items-start justify-between gap-3">
                <div className="group cursor-not-allowed">
                  <p className="text-xs text-neutral-500">{topic.category}</p>
                  <p className="relative mt-1 inline-block text-sm font-semibold text-white">
                    {topic.title}
                    <span className="pointer-events-none absolute inset-x-0 -bottom-1 h-px origin-left scale-x-0 bg-neutral-500/80 transition-transform duration-300 ease-out group-hover:scale-x-100" />
                  </p>
                  <p className="mt-1 text-xs text-neutral-500">{topic.meta}</p>
                </div>
                <HiOutlineDotsHorizontal className="mt-1 text-neutral-500" size={18} />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/70 p-4">
          <h2 className="text-xl font-semibold text-white">
            {searchValue.trim() ? "Search results" : "Who to follow"}
          </h2>
          <div className="mt-4 flex flex-col gap-6">
            {filteredUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Avatar userId={user.id} />
                  <div
                    onClick={() => router.push(`/users/${user.id}`)}
                    className="cursor-pointer transition hover:opacity-80"
                  >
                    <p className="text-sm font-semibold text-white">
                      {user.name || "Unknown User"}
                    </p>
                    <p className="text-sm text-gray-400">
                      @ {user.username || "unknown"}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-black transition hover:bg-neutral-200"
                >
                  Follow
                </button>
              </div>
            ))}
            {searchValue.trim() && filteredUsers.length === 0 ? (
              <p className="text-sm text-neutral-500">
                No Glitter users matched that search yet.
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FollowBar;
