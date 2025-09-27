const API_URL = "http://localhost:5000/api/notes"; // backend route

export const getNotes = async () => {
  const res = await fetch(API_URL);
  return res.json();
};

export const addNote = async (title, content) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content }),
  });
  return res.json();
};

export const updateNote = async (id, title, content) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content }),
  });
  return res.json();
};

export const deleteNote = async (id) => {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
};
