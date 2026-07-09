"use client";

import { useEffect, useState, useTransition } from "react";
import { getStories, createStory, updateStory, deleteStory, Story } from "@/lib/story-api";
import { getAccessToken, getCurrentProfile } from "@/lib/auth-api";
import { 
  Plus, Edit, Trash2, Search, BookOpen, User, Calendar, 
  X, Loader2, AlertCircle, CheckCircle, ChevronRight, Eye 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function StoriesPage() {
  const [stories, setStories] = useState<Story[]>([]);
  const [filteredStories, setFilteredStories] = useState<Story[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isActionPending, startAction] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Modal / Form States
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<"create" | "edit">("create");
  const [selectedStoryId, setSelectedStoryId] = useState<string | null>(null);
  const [authorName, setAuthorName] = useState("");
  const [content, setContent] = useState("");

  // Single View State
  const [viewingStory, setViewingStory] = useState<Story | null>(null);

  // Load user info to auto-fill author if logged in
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    loadStories();
    checkUser();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredStories(stories);
    } else {
      const query = searchQuery.toLowerCase();
      setFilteredStories(
        stories.filter(
          (s) =>
            s.authorName.toLowerCase().includes(query) ||
            s.content.toLowerCase().includes(query)
        )
      );
    }
  }, [searchQuery, stories]);

  async function checkUser() {
    const token = getAccessToken();
    if (token) {
      try {
        const profile = await getCurrentProfile();
        setUserEmail(profile.email);
        // Pre-fill authorName if it is empty
        if (!authorName) {
          setAuthorName(profile.email.split("@")[0]);
        }
      } catch (err) {
        // Ignore silent error
      }
    }
  }

  async function loadStories() {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getStories();
      // Sort stories newest first if date is present
      const sorted = [...data].sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA;
      });
      setStories(sorted);
    } catch (err: any) {
      setError("Failed to fetch stories from the backend API. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  const openCreateModal = () => {
    setFormMode("create");
    setSelectedStoryId(null);
    setAuthorName(userEmail ? userEmail.split("@")[0] : "");
    setContent("");
    setIsFormOpen(true);
    setError(null);
    setSuccessMsg(null);
  };

  const openEditModal = (story: Story) => {
    setFormMode("edit");
    setSelectedStoryId(story.id);
    setAuthorName(story.authorName);
    setContent(story.content);
    setIsFormOpen(true);
    setError(null);
    setSuccessMsg(null);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !content.trim()) {
      setError("Both Author Name and Story Content are required.");
      return;
    }

    setError(null);
    setSuccessMsg(null);

    startAction(async () => {
      try {
        if (formMode === "create") {
          await createStory({ authorName, content });
          setSuccessMsg("Story shared successfully!");
        } else if (formMode === "edit" && selectedStoryId) {
          await updateStory(selectedStoryId, { authorName, content });
          setSuccessMsg("Story updated successfully!");
        }
        
        setIsFormOpen(false);
        // Refresh stories
        const updatedStories = await getStories();
        const sorted = [...updatedStories].sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return dateB - dateA;
        });
        setStories(sorted);
      } catch (err: any) {
        setError(err.message || "An error occurred while saving the story.");
      }
    });
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid triggering any view modal

    if (!confirm("Are you sure you want to delete this story?")) {
      return;
    }

    setError(null);
    setSuccessMsg(null);

    startAction(async () => {
      try {
        await deleteStory(id);
        setSuccessMsg("Story deleted successfully!");
        // Refresh stories
        const updatedStories = await getStories();
        const sorted = [...updatedStories].sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return dateB - dateA;
        });
        setStories(sorted);
      } catch (err: any) {
        setError("Failed to delete story.");
      }
    });
  };

  return (
    <div className="space-y-10 animate-fade-up">
      {/* Hero Header */}
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-wider text-[var(--color-primary)]">
            Community Board
          </p>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Story Management System
          </h1>
          <p className="max-w-2xl text-base text-gray-600">
            Read, write, modify, and manage real stories published dynamically to our Express API backend.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="flex items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--color-secondary)] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40 self-start md:self-auto"
        >
          <Plus className="h-5 w-5" />
          <span>Write a Story</span>
        </button>
      </div>

      {/* Notifications */}
      {error && (
        <div className="flex items-start gap-3 rounded-xl bg-red-50 p-4 text-sm text-red-600 border border-red-100">
          <AlertCircle className="h-5 w-5 shrink-0 text-red-500" />
          <div>
            <span className="font-semibold">Error: </span>
            {error}
          </div>
        </div>
      )}

      {successMsg && (
        <div className="flex items-start gap-3 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-800 border border-emerald-100">
          <CheckCircle className="h-5 w-5 shrink-0 text-emerald-600" />
          <div>
            <span className="font-semibold">Success: </span>
            {successMsg}
          </div>
        </div>
      )}

      {/* Search Bar */}
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
          <Search className="h-5 w-5" />
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search stories by author name or content keywords..."
          className="block w-full rounded-2xl border border-gray-200 bg-white/80 py-3.5 pl-12 pr-4 text-sm text-gray-900 placeholder-gray-400 backdrop-blur focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/10"
        />
      </div>

      {/* Stories Grid */}
      {isLoading ? (
        <div className="flex min-h-[300px] flex-col items-center justify-center gap-3">
          <Loader2 className="h-10 w-10 animate-spin text-[var(--color-primary)]" />
          <p className="text-sm font-medium text-gray-500">Retrieving real-time stories...</p>
        </div>
      ) : filteredStories.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-200 bg-white/50 py-16 text-center backdrop-blur">
          <BookOpen className="mx-auto h-12 w-12 text-gray-300" />
          <h3 className="mt-4 text-lg font-semibold text-gray-800">No Stories Found</h3>
          <p className="mx-auto mt-2 max-w-sm text-sm text-gray-500">
            {searchQuery ? "No stories matched your search term. Try another query!" : "Be the first one to share a learning story on our dynamic API board!"}
          </p>
          {!searchQuery && (
            <button
              onClick={openCreateModal}
              className="mt-6 inline-flex items-center gap-1.5 rounded-xl bg-[var(--color-primary)] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--color-secondary)]"
            >
              <Plus className="h-4 w-4" />
              <span>Publish First Story</span>
            </button>
          )}
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredStories.map((story) => (
            <div
              key={story.id}
              onClick={() => setViewingStory(story)}
              className="group relative flex flex-col justify-between rounded-2xl border border-gray-200 bg-white/75 p-6 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-primary)]/30 hover:shadow-lg cursor-pointer"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                      <User className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm line-clamp-1">{story.authorName}</h4>
                      {story.createdAt && (
                        <p className="text-[10px] text-gray-400">
                          {new Date(story.createdAt).toLocaleDateString(undefined, {
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  {/* Hover visual arrow */}
                  <span className="text-gray-300 transition group-hover:text-[var(--color-primary)] group-hover:translate-x-1">
                    <ChevronRight className="h-4 w-4" />
                  </span>
                </div>

                <p className="text-sm text-gray-600 line-clamp-4 leading-relaxed whitespace-pre-wrap">
                  {story.content}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setViewingStory(story);
                  }}
                  className="flex items-center gap-1 text-xs font-semibold text-gray-500 hover:text-[var(--color-primary)]"
                >
                  <Eye className="h-3.5 w-3.5" />
                  <span>View</span>
                </button>

                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openEditModal(story);
                    }}
                    className="flex h-7 w-7 items-center justify-center rounded-md border border-gray-200 text-gray-500 hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 hover:text-[var(--color-primary)] transition"
                    title="Edit Story"
                  >
                    <Edit className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={(e) => handleDelete(story.id, e)}
                    disabled={isActionPending}
                    className="flex h-7 w-7 items-center justify-center rounded-md border border-red-100 text-red-500 hover:border-red-300 hover:bg-red-50 transition disabled:opacity-50"
                    title="Delete Story"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Form Dialog/Modal for Create & Edit */}
      <AnimatePresence>
        {isFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFormOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-6 shadow-xl"
            >
              <button
                onClick={() => setIsFormOpen(false)}
                className="absolute right-4 top-4 rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition"
              >
                <X className="h-5 w-5" />
              </button>

              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-[var(--color-primary)]" />
                <span>{formMode === "create" ? "Share Your Story" : "Edit Story"}</span>
              </h2>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label htmlFor="modalAuthor" className="block text-sm font-semibold text-gray-700">
                    Author Name
                  </label>
                  <input
                    id="modalAuthor"
                    type="text"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="Enter your name or pen name"
                    required
                    className="mt-1 block w-full rounded-xl border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="modalContent" className="block text-sm font-semibold text-gray-700">
                    Story Content
                  </label>
                  <textarea
                    id="modalContent"
                    rows={6}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your story details, learning takeaways, and development notes..."
                    required
                    className="mt-1 block w-full rounded-xl border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 text-sm resize-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isActionPending}
                    className="flex items-center gap-2 rounded-xl bg-[var(--color-primary)] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--color-secondary)] disabled:opacity-50"
                  >
                    {isActionPending ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <span>{formMode === "create" ? "Publish Story" : "Update Story"}</span>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Single View Dialog/Modal */}
      <AnimatePresence>
        {viewingStory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setViewingStory(null)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-xl rounded-2xl border border-gray-200 bg-white p-6 shadow-xl"
            >
              <button
                onClick={() => setViewingStory(null)}
                className="absolute right-4 top-4 rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">{viewingStory.authorName}</h2>
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    {viewingStory.createdAt && (
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>
                          {new Date(viewingStory.createdAt).toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </span>
                    )}
                    <span>ID: {viewingStory.id}</span>
                  </div>
                </div>
              </div>

              <hr className="my-4 border-gray-100" />

              <div className="max-h-[300px] overflow-y-auto pr-2">
                <p className="text-sm leading-relaxed text-gray-700 whitespace-pre-wrap">
                  {viewingStory.content}
                </p>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => {
                    const storyToEdit = viewingStory;
                    setViewingStory(null);
                    setTimeout(() => openEditModal(storyToEdit), 200);
                  }}
                  className="flex items-center gap-1 rounded-xl border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
                >
                  <Edit className="h-4 w-4 text-gray-500" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => setViewingStory(null)}
                  className="rounded-xl bg-gray-100 px-5 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-200 transition"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
