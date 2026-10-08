let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTask");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function displayTasks(filter = "all") {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {

        if (filter === "completed" && !task.completed) return;
        if (filter === "pending" && task.completed) return;

        const li = document.createElement("li");
        li.className = "task";

        if (task.completed) {
            li.classList.add("completed");
        }

        const taskText = document.createElement("span");
        taskText.textContent = task.text;

        const buttons = document.createElement("div");
        buttons.className = "task-buttons";

        const completeButton = document.createElement("button");
        completeButton.textContent = task.completed ? "Undo" : "Complete";

        completeButton.addEventListener("click", function () {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            displayTasks(filter);
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function () {
            tasks.splice(index, 1);
            saveTasks();
            displayTasks(filter);
        });

        buttons.appendChild(completeButton);
        buttons.appendChild(deleteButton);

        li.appendChild(taskText);
        li.appendChild(buttons);

        taskList.appendChild(li);
    });

    updateCounter();
}

function updateCounter() {
    const pendingTasks = tasks.filter(task => !task.completed);
    taskCount.textContent = pendingTasks.length;
}

addTaskButton.addEventListener("click", function () {

    const text = taskInput.value.trim();

    if (text === "") {
        alert("Please enter a task.");
        return;
    }

    tasks.push({
        text: text,
        completed: false
    });

    taskInput.value = "";

    saveTasks();
    displayTasks();
});

taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        addTaskButton.click();
    }
});

function filterTasks(filter) {
    displayTasks(filter);
}

displayTasks();
