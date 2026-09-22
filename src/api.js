const BASE_URL = "https://goodreads-cf57c-default-rtdb.firebaseio.com";

//!hämtar böcker från firebase
export async function fetchBooks() {
  const response = await fetch(`${BASE_URL}/books.json`);
  if (!response.ok) throw new Error("Kunde inte hämta böcker, försök igen senare");
  const data = await response.json();

  if (!data) return [];

  
  return Object.entries(data).map(([id, book]) => ({
    id,
    ...book
  }));
}
//!-----------------------------------------------------------------------





export async function addBookToDb(bookData) {
  const response = await fetch(`${BASE_URL}/books.json`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bookData)
  });
  if (!response.ok) throw new Error("Kunde inte lägga till boken");
  const data = await response.json(); // datan son täggs till i firebase
  return data.name;
}
//!-----------------------------------------------------------------------



//!
export async function updateBookInDb(id, updates) {
  const response = await fetch(`${BASE_URL}/books/${id}.json`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates)
  });
  if (!response.ok) throw new Error("Kunde inte uppdatera boken");
  return response.json();
}
//!-----------------------------------------------------------------------




export async function deleteBookFromDb(id) {
  const response = await fetch(`${BASE_URL}/books/${id}.json`, {
    method: "DELETE"
  });

  if 
  (!response.ok) throw new Error("Kunde inte ta bort boken");
}