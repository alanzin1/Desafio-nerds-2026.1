const API_URL = "http://localhost:3000/members";

export async function fetchMembers() {
  const response = await fetch(API_URL);
  return response.json();
}

export async function createMember(member) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(member),
  });

  return response.json();
}
