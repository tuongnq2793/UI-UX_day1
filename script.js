if (document.getElementById("loginForm")) {
  document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (email === "admin@example.com" && password === "123456") {
      localStorage.setItem("loggedIn", "true");
      window.location.href = "admin.html";
    } else {
      document.getElementById("error").textContent = "Email hoặc mật khẩu không đúng!";
    }
  });
}

if (window.location.pathname.includes("admin.html")) {
  if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "login.html";
  }

  const getUsers = () => JSON.parse(localStorage.getItem("users") || "[]");
  const setUsers = (users) => localStorage.setItem("users", JSON.stringify(users));

  function renderUsers() {
    const users = getUsers();
    const tbody = document.querySelector("#userTable tbody");
    tbody.innerHTML = "";

    users.forEach((user, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td><input type="text" value="${user.name}" onchange="updateUser(${index}, 'name', this.value)"></td>
        <td><input type="email" value="${user.email}" onchange="updateUser(${index}, 'email', this.value)"></td>
        <td><input type="text" value="${user.role}" onchange="updateUser(${index}, 'role', this.value)"></td>
        <td><button onclick="deleteUser(${index})">Xóa</button></td>
      `;
      tbody.appendChild(row);
    });
  }

  document.getElementById("addUserForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("newEmail").value.trim();
    const role = document.getElementById("role").value.trim();

    const users = getUsers();
    users.push({ name, email, role });
    setUsers(users);

    this.reset();
    renderUsers();
  });

  window.deleteUser = function(index) {
    const users = getUsers();
    users.splice(index, 1);
    setUsers(users);
    renderUsers();
  };

  window.updateUser = function(index, field, value) {
    const users = getUsers();
    users[index][field] = value;
    setUsers(users);
  };

  window.logout = function() {
    localStorage.removeItem("loggedIn");
    window.location.href = "login.html";
  };

  renderUsers();
}