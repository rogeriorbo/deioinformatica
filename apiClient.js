const API_URL = "";

export const apiClient = {
  async get(endpoint) {
    const res = await fetch(`${API_URL}/api${endpoint}`);
    if (!res.ok) throw new Error("Failed to fetch");
    return res.json();
  },

  async post(endpoint, data) {
    const token = localStorage.getItem("adminToken");
    const res = await fetch(`${API_URL}/api${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    if (res.status === 401 || res.status === 403) {
      localStorage.removeItem("adminToken");
      window.location.reload();
    }
    if (!res.ok) throw new Error("Failed to post");
    return res.json();
  },

  async delete(endpoint) {
    const token = localStorage.getItem("adminToken");
    const res = await fetch(`${API_URL}/api${endpoint}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    if (res.status === 401 || res.status === 403) {
      localStorage.removeItem("adminToken");
      window.location.reload();
    }
    if (!res.ok) throw new Error("Failed to delete");
    return res.json();
  },

  async login(email, password) {
    const res = await fetch(`${API_URL}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Erro no login");
    localStorage.setItem("adminToken", data.token);
    return data;
  },

  async getMe() {
    const token = localStorage.getItem("adminToken");
    if (!token) return null;
    const res = await fetch(`${API_URL}/api/me`, {
      headers: { "Authorization": `Bearer ${token}` }
    });
    if (!res.ok) {
      localStorage.removeItem("adminToken");
      return null;
    }
    return res.json();
  },

  logout() {
    localStorage.removeItem("adminToken");
    window.location.reload();
  }
};
