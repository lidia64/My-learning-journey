export interface Story {
  id: string;
  authorName: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
}

const BASE_URL = "https://sms-express-app-1-production-a843.up.railway.app/api/stories";

export async function getStories(): Promise<Story[]> {
  const response = await fetch(BASE_URL, {
    cache: "no-store", // Keep data fresh
  });

  if (!response.ok) {
    throw new Error("Failed to fetch stories.");
  }

  return response.json();
}

export async function getStory(id: string): Promise<Story> {
  const response = await fetch(`${BASE_URL}/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Story not found.");
  }

  return response.json();
}

export async function createStory(story: Omit<Story, "id">): Promise<Story> {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(story),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || "Failed to create story.");
  }

  return response.json();
}

export async function updateStory(id: string, story: Omit<Story, "id">): Promise<Story> {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(story),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || "Failed to update story.");
  }

  return response.json();
}

export async function deleteStory(id: string): Promise<void> {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete story.");
  }
}
