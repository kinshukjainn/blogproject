import { useState, useEffect, useMemo } from "react";
import { posts } from "../data/posts";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { xonokai } from "react-syntax-highlighter/dist/cjs/styles/prism";
import ReactMarkdown from "react-markdown";

// Icons
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const Post = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSearch, setActiveSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const now = new Date();
    const options = { weekday: "long" as const, year: "numeric" as const, month: "long" as const, day: "numeric" as const };
    setCurrentDate(now.toLocaleDateString('en-US', options));
  }, []);

  const filteredPosts = useMemo(() => {
    if (!activeSearch.trim()) return posts;
    const search = activeSearch.toLowerCase();
    return posts.filter(post =>
      post.title.toLowerCase().includes(search) || post.content.toLowerCase().includes(search)
    );
  }, [activeSearch]);

  const searchSuggestions = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const search = searchTerm.toLowerCase();
    return posts
      .filter(post =>
        post.title.toLowerCase().includes(search) || post.content.toLowerCase().includes(search)
      )
      .slice(0, 5);
  }, [searchTerm]);

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  const getContentPreview = (content: string, maxLength = 100) => {
    if (!content) return "";
    const stripped = content.replace(/```[\s\S]*?```/g, "[code]");
    return stripped.length <= maxLength ? stripped : stripped.substring(0, maxLength) + "...";
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveSearch(searchTerm);
    setShowDropdown(false);
  };

  const handleSearchReset = () => {
    setSearchTerm("");
    setActiveSearch("");
    setShowDropdown(false);
  };

  const handleSuggestionClick = (post: any) => {
    setSearchTerm("");
    setActiveSearch(post.title);
    setShowDropdown(false);
  };

  return (
    <div className="bg-[#1e1f1c] min-h-screen text-[#f8f8f2]">
      {/* Header */}
      <header className="bg-[#272822] border-b border-[#49483e] sticky top-0 z-10 px-4 py-3">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-[#a6e22e] font-medium text-sm sm:text-base order-1 sm:order-none">
            {currentDate}
          </div>

          {/* Search Bar */}
          <div className="w-full sm:w-96 order-3 sm:order-none">
            <form onSubmit={handleSearchSubmit} className="relative">
              <div className="flex">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#75715e]">
                    <SearchIcon />
                  </div>
                  <input
                    type="text"
                    placeholder="Search posts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => setShowDropdown(true)}
                    onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                    className="block w-full pl-10 pr-3 py-2 bg-[#3e3d32] text-[#f8f8f2] border border-[#49483e] rounded-l-md focus:outline-none focus:ring-1 focus:ring-[#a6e22e] focus:border-[#a6e22e]"
                  />
                </div>
                <button type="submit" className="bg-[#a6e22e] text-[#272822] px-4 py-2 rounded-r-md font-medium hover:bg-[#8fbe00] focus:outline-none">
                  Search
                </button>
              </div>

              {/* Suggestions */}
              {showDropdown && searchSuggestions.length > 0 && (
                <div className="absolute mt-1 w-full bg-[#3e3d32] border border-[#49483e] rounded-md shadow-lg max-h-60 overflow-auto z-50">
                  <ul>
                    {searchSuggestions.map((post) => (
                      <li
                        key={post.id}
                        className="px-4 py-2 hover:bg-[#272822] cursor-pointer border-b border-[#49483e] last:border-0"
                        onMouseDown={() => handleSuggestionClick(post)}
                      >
                        <h4 className="font-medium text-[#a6e22e]">{post.title}</h4>
                        <p className="text-sm text-[#f8f8f2] truncate">{getContentPreview(post.content, 60)}</p>
                        <span className="text-xs text-[#75715e]">{formatDate(post.date)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </form>
          </div>

          {/* Profile */}
          <div className="flex items-center gap-2 order-2 sm:order-none">
            <div className="bg-[#66d9ef] text-[#272822] rounded-full h-8 w-8 flex items-center justify-center">
              <UserIcon />
            </div>
            <span className="font-medium">@kinshuk jain</span>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#a6e22e]">
              {!activeSearch ? "All Posts" : "Search Results"}
            </h1>
            {activeSearch && (
              <div className="flex items-center gap-2">
                <span className="text-[#75715e] text-sm">
                  {filteredPosts.length} {filteredPosts.length === 1 ? "result" : "results"} for "{activeSearch}"
                </span>
                <button onClick={handleSearchReset} className="text-sm text-[#f92672] hover:underline">
                  Clear search
                </button>
              </div>
            )}
          </div>

          {/* Posts */}
          {filteredPosts.length > 0 ? (
            <div className="space-y-8">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-[#272822] p-6 rounded-lg shadow-md border border-[#49483e] transition-transform transform hover:-translate-y-1 hover:shadow-lg"
                >
                  <h2 className="text-xl sm:text-2xl font-bold text-[#a6e22e] mb-2">{post.title}</h2>
                  <p className="text-sm text-[#75715e] mb-1">Published on {formatDate(post.date)}</p>
                  <p className="text-sm text-[#66d9ef] mb-4">Author: <span className="text-[#a6e22e]">@{post.author || "kinshuk jain"}</span></p>

                  <div className="prose prose-invert max-w-none">
                    <ReactMarkdown
                      components={{
                        code({ className, children }) {
                          const language = className ? className.replace("language-", "") : "";
                          return (
                            <SyntaxHighlighter style={xonokai} language={language || "text"}>
                              {String(children).trim()}
                            </SyntaxHighlighter>
                          );
                        },
                      }}
                    >
                      {post.content}
                    </ReactMarkdown>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-[#272822] rounded-lg border border-[#49483e]">
              <p className="text-xl text-[#75715e]">No posts found matching your search criteria.</p>
              <button
                onClick={handleSearchReset}
                className="mt-4 bg-[#a6e22e] hover:bg-[#8fbe00] text-[#272822] font-medium py-2 px-6 rounded-md focus:outline-none"
              >
                View all posts
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Post;
