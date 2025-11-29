// =============================
// DATA STORAGE
// =============================
let tasks = []; // menyimpan semua tugas

// =============================
// MESSAGE HANDLER
// =============================
function showMessage(text, type = "success") {
  const msg = document.getElementById("message");
  msg.textContent = text;
  msg.className = "";
  msg.classList.add(type === "success" ? "success" : "error");
  msg.style.display = "block";

  setTimeout(() => {
    msg.style.display = "none";
  }, 2500);
}

// Reset form
function clearForm() {
  document.getElementById("taskForm").reset();
  document.getElementById("editIndex").value = "";
  document.getElementById("isDone").checked = false;
}

// =============================
// CRUD FUNCTIONS
// =============================
function addTask(task) {
  tasks.push(task);
}

function updateTask(index, task) {
  tasks[index] = task;
}

function deleteTask(index) {
  if (confirm("Yakin ingin menghapus tugas?")) {
    tasks.splice(index, 1);
    renderTasks();
    renderStats();
    showMessage("Tugas dihapus!", "success");
  }
}

// =============================
// FILTERING
// =============================
function getFilteredTasks() {
  const search = document.getElementById("searchInput").value.toLowerCase();
  const filterCat = document.getElementById("filterCategory").value;
  const filterStatus = document.getElementById("filterStatus").value;

  return tasks.filter((t) => {
    const matchTitle = t.title.toLowerCase().includes(search);
    const matchCat = filterCat === "Semua" || t.category === filterCat;
    const matchStatus =
      filterStatus === "Semua" ||
      (filterStatus === "Belum" && !t.isDone) ||
      (filterStatus === "Selesai" && t.isDone);

    return matchTitle && matchCat && matchStatus;
  });
}

// =============================
// RENDER TASKS
// =============================
function renderTasks() {
  const tbody = document.getElementById("taskTableBody");
  tbody.innerHTML = "";

  const filtered = getFilteredTasks();

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7">Belum ada tugas.</td></tr>`;
    return;
  }

  filtered.forEach((t, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${t.title}</td>
      <td>${t.category}</td>
      <td>${t.dueDate}</td>
      <td>${t.priority}</td>
      <td>${t.estimateHours}</td>
      <td>${t.isDone ? "Selesai" : "Belum"}</td>
      <td>
        <button class="action-btn edit" data-index="${index}">Edit</button>
        <button class="action-btn delete" data-index="${index}">Hapus</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// =============================
// RENDER STATS
// =============================
function renderStats() {
  const total = tasks.length;
  const done = tasks.filter((t) => t.isDone).length;
  const pending = total - done;
  const hours = tasks.reduce((s, t) => s + Number(t.estimateHours), 0);

  document.getElementById("stat-total").textContent = total;
  document.getElementById("stat-done").textContent = done;
  document.getElementById("stat-pending").textContent = pending;
  document.getElementById("stat-hours").textContent = hours;
}

// =============================
// FORM SUBMIT
// =============================
document.getElementById("taskForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const desc = document.getElementById("description").value.trim();
  const cat = document.getElementById("category").value;
  const due = document.getElementById("dueDate").value;
  const estimate = document.getElementById("estimate").value;
  const priority = document.querySelector("input[name='priority']:checked").value;
  const isDone = document.getElementById("isDone").checked;
  const editIndex = document.getElementById("editIndex").value;

  if (!title || !cat || !due) {
    showMessage("Judul, kategori, dan deadline wajib diisi!", "error");
    return;
  }

  if (estimate < 0) {
    showMessage("Estimasi jam tidak boleh negatif!", "error");
    return;
  }

  const task = {
    title,
    desc,
    category: cat,
    dueDate: due,
    priority,
    estimateHours: Number(estimate),
    isDone,
  };

  if (editIndex === "") {
    addTask(task);
    showMessage("Tugas ditambahkan!", "success");
  } else {
    updateTask(Number(editIndex), task);
    showMessage("Tugas diperbarui!", "success");
  }

  clearForm();
  renderTasks();
  renderStats();
});

// =============================
// SEARCH & FILTER EVENTS
// =============================
document.getElementById("searchInput").addEventListener("input", renderTasks);
document.getElementById("filterCategory").addEventListener("change", renderTasks);
document.getElementById("filterStatus").addEventListener("change", renderTasks);

// =============================
// TABLE EDIT & DELETE HANDLER
// =============================
document.getElementById("taskTableBody").addEventListener("click", function (e) {
  if (e.target.classList.contains("edit")) {
    const index = Number(e.target.dataset.index);
    const t = getFilteredTasks()[index];

    const real = tasks.findIndex((x) => x.title === t.title && x.dueDate === t.dueDate);

    document.getElementById("title").value = t.title;
    document.getElementById("description").value = t.desc;
    document.getElementById("category").value = t.category;
    document.getElementById("dueDate").value = t.dueDate;
    document.getElementById("estimate").value = t.estimateHours;
    document.getElementById("isDone").checked = t.isDone;
    document.querySelector(`input[name="priority"][value="${t.priority}"]`).checked = true;

    document.getElementById("editIndex").value = real;
    showMessage("Mode edit: ubah data lalu simpan.", "success");
    switchSection("section-form", "nav-add");
  }

  if (e.target.classList.contains("delete")) {
    const index = Number(e.target.dataset.index);
    const t = getFilteredTasks()[index];
    const real = tasks.findIndex((x) => x.title === t.title && x.dueDate === t.dueDate);
    deleteTask(real);
  }
});

// =============================
// SECTION SWITCHER
// =============================
function switchSection(sectionId, navId) {
  ["section-form", "section-list", "section-stats"].forEach((id) =>
    document.getElementById(id).classList.add("hidden")
  );

  document.getElementById(sectionId).classList.remove("hidden");

  ["nav-add", "nav-list", "nav-stats"].forEach((id) =>
    document.getElementById(id).classList.remove("active")
  );

  document.getElementById(navId).classList.add("active");
}

document.getElementById("nav-add").onclick = () =>
  switchSection("section-form", "nav-add");
document.getElementById("nav-list").onclick = () =>
  switchSection("section-list", "nav-list");
document.getElementById("nav-stats").onclick = () =>
  switchSection("section-stats", "nav-stats");

// INIT RENDER
renderTasks();
renderStats();
