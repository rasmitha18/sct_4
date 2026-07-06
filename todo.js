const taskInput = document.getElementById("taskinput");
const dateInput = document.getElementById("dateinput");
const timeInput = document.getElementById("timeinput");
const addTaskBtn = document.getElementById("addtask");
const taskList = document.getElementById("tasklist");
const message = document.getElementById("message");

const total = document.getElementById("total");
const completed = document.getElementById("completed");
const pending = document.getElementById("pending");

const allBtn = document.getElementById("allBtn");
const completedBtn = document.getElementById("completedBtn");
const pendingBtn = document.getElementById("pendingBtn");

addTaskBtn.addEventListener("click", addTask);
allBtn.addEventListener("click", filterAll);
completedBtn.addEventListener("click", filterCompleted);
pendingBtn.addEventListener("click", filterPending);

function addTask() {
    const task = taskInput.value.trim();
    const date = dateInput.value;
    const time = timeInput.value;

    if (task === "") {
        message.textContent = "Please enter a task!";
        message.style.color = "red";
        return;
    }

    message.textContent = "";

    const li = document.createElement("li");

    li.innerHTML = `
        <input type="checkbox" class="check">

        <div class="task-info">
            <strong>${task}</strong><br>
            <small>📅 ${date || "No Date"}</small><br>
            <small>🕒 ${time || "No Time"}</small>
        </div>

        <button class="edit">Edit</button>
        <button class="delete">Delete</button>
    `;

    taskList.appendChild(li);

    taskInput.value = "";
    dateInput.value = "";
    timeInput.value = "";

    const checkbox = li.querySelector(".check");
    const editBtn = li.querySelector(".edit");
    const deleteBtn = li.querySelector(".delete");
    const taskInfo = li.querySelector(".task-info");

    checkbox.addEventListener("change", function () {

        if (checkbox.checked) {
            taskInfo.style.textDecoration = "line-through";
            taskInfo.style.opacity = "0.5";
        } else {
            taskInfo.style.textDecoration = "none";
            taskInfo.style.opacity = "1";
        }

        updateStats();
    });

    editBtn.addEventListener("click", function () {

        const currentTask = li.querySelector("strong").textContent;

        const newTask = prompt("Edit Task", currentTask);

        if (newTask !== null && newTask.trim() !== "") {
            li.querySelector("strong").textContent = newTask.trim();
        }

    });

    deleteBtn.addEventListener("click", function () {

        li.remove();

        updateStats();

    });

    updateStats();
}

function updateStats() {

    const tasks = document.querySelectorAll("#tasklist li");

    let completedCount = 0;

    tasks.forEach(function (task) {

        if (task.querySelector(".check").checked) {
            completedCount++;
        }

    });

    total.textContent = tasks.length;
    completed.textContent = completedCount;
    pending.textContent = tasks.length - completedCount;

}

function filterAll() {

    const tasks = document.querySelectorAll("#tasklist li");

    tasks.forEach(function (task) {
        task.style.display = "flex";
    });

}

function filterCompleted() {

    const tasks = document.querySelectorAll("#tasklist li");

    tasks.forEach(function (task) {

        if (task.querySelector(".check").checked) {
            task.style.display = "flex";
        } else {
            task.style.display = "none";
        }

    });

}

function filterPending() {

    const tasks = document.querySelectorAll("#tasklist li");

    tasks.forEach(function (task) {

        if (!task.querySelector(".check").checked) {
            task.style.display = "flex";
        } else {
            task.style.display = "none";
        }

    });

}