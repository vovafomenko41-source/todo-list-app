
const taskInput =
    document.getElementById("taskInput");

const dateInput =
    document.getElementById("dateInput");

const timeInput =
    document.getElementById("timeInput");

const priorityInput =
    document.getElementById("priorityInput");

const addButton =
    document.getElementById("addButton");

const taskList =
    document.getElementById("taskList");

const searchInput =
    document.getElementById("searchInput");

const counter =
    document.getElementById("counter");

const themeButton =
    document.getElementById("themeButton");

const deleteCompletedButton =
    document.getElementById("deleteCompletedButton");

const progressFill =
    document.getElementById("progressFill");

const progressPercent =
    document.getElementById("progressPercent");

const filterButtons =
    document.querySelectorAll(".filter");


let tasks =
    JSON.parse(localStorage.getItem("tasks")) || [];

let currentFilter = "all";


// =====================================
// SPEICHERN
// =====================================

function saveTasks() {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

}


// =====================================
// PRIORITÄT
// =====================================

function getPriorityText(priority) {

    if (priority === "high") {

        return "🔴 Hoch";

    }

    if (priority === "low") {

        return "🟢 Niedrig";

    }

    return "🟡 Mittel";

}


function getPriorityClass(priority) {

    if (priority === "high") {

        return "priority-high";

    }

    if (priority === "low") {

        return "priority-low";

    }

    return "priority-medium";

}


// =====================================
// AUFGABEN ANZEIGEN
// =====================================

function renderTasks() {

    taskList.innerHTML = "";


    const searchText =
        searchInput.value.toLowerCase();


    let filteredTasks =
        tasks.filter(function(task) {


            const matchesSearch =
                task.text
                    .toLowerCase()
                    .includes(searchText);


            let matchesFilter = true;


            if (currentFilter === "open") {

                matchesFilter =
                    !task.completed;

            }


            if (currentFilter === "completed") {

                matchesFilter =
                    task.completed;

            }


            return matchesSearch &&
                   matchesFilter;

        });


    // =================================
    // NACH PRIORITÄT SORTIEREN
    // =================================

    const priorityOrder = {

        high: 1,

        medium: 2,

        low: 3

    };


    filteredTasks.sort(function(a, b) {

        return (
            (priorityOrder[a.priority] || 2) -
            (priorityOrder[b.priority] || 2)
        );

    });


    // =================================
    // AUFGABEN ERSTELLEN
    // =================================

    filteredTasks.forEach(function(task) {


        const li =
            document.createElement("li");


        li.className = "task";


        if (task.completed) {

            li.classList.add("completed");

        }


        const content =
            document.createElement("div");


        content.className =
            "task-content";


        // TEXT

        const text =
            document.createElement("span");


        text.className =
            "task-text";


        text.textContent =
            task.text;


        // ERSTELLT

        const date =
            document.createElement("small");


        date.className =
            "task-date";


        date.textContent =
            "Erstellt: " +
            task.date;


        content.appendChild(text);

        content.appendChild(date);


        // FÄLLIGKEIT

        if (task.dueDate) {

            const due =
                document.createElement("small");


            due.className =
                "task-due";


            due.textContent =
                "📅 Fällig: " +
                task.dueDate +
                " " +
                (task.dueTime || "");


            content.appendChild(due);

        }


        // PRIORITÄT

        const priority =
            document.createElement("span");


        priority.className =
            "priority " +
            getPriorityClass(
                task.priority
            );


        priority.textContent =
            getPriorityText(
                task.priority
            );


        content.appendChild(priority);


        // =================================
        // ERLEDIGEN
        // =================================

        text.addEventListener(
            "click",
            function() {


                task.completed =
                    !task.completed;


                saveTasks();

                renderTasks();

            }
        );


        // =================================
        // LÖSCHEN
        // =================================

        const deleteButton =
            document.createElement("button");


        deleteButton.className =
            "delete-button";


        deleteButton.textContent =
            "🗑️";


        deleteButton.addEventListener(
            "click",
            function() {


                li.style.opacity = "0";


                li.style.transform =
                    "translateX(100px)";


                setTimeout(function() {


                    tasks =
                        tasks.filter(
                            function(t) {

                                return (
                                    t.id !== task.id
                                );

                            }
                        );


                    saveTasks();

                    renderTasks();


                }, 300);

            }
        );


        li.appendChild(content);

        li.appendChild(deleteButton);

        taskList.appendChild(li);

    });


    updateCounter();

    updateProgress();

}


// =====================================
// NEUE AUFGABE
// =====================================

function addTask() {


    const text =
        taskInput.value.trim();


    if (text === "") {

        alert(
            "Bitte eine Aufgabe eingeben!"
        );

        return;

    }


    const now =
        new Date();


    const date =
        now.toLocaleString("de-DE");


    const newTask = {

        id: Date.now(),

        text: text,

        completed: false,

        date: date,

        dueDate: dateInput.value,

        dueTime: timeInput.value,

        priority: priorityInput.value

    };


    tasks.push(newTask);


    saveTasks();


    taskInput.value = "";

    dateInput.value = "";

    timeInput.value = "";

    priorityInput.value = "medium";


    renderTasks();

}


// =====================================
// BUTTON
// =====================================

addButton.addEventListener(
    "click",
    addTask
);


// =====================================
// ENTER
// =====================================

taskInput.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {

            addTask();

        }

    }
);


// =====================================
// SUCHE
// =====================================

searchInput.addEventListener(
    "input",
    function() {

        renderTasks();

    }
);


// =====================================
// FILTER
// =====================================

filterButtons.forEach(
    function(button) {


        button.addEventListener(
            "click",
            function() {


                filterButtons.forEach(
                    function(btn) {

                        btn.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );


                currentFilter =
                    button.dataset.filter;


                renderTasks();

            }
        );

    }
);


// =====================================
// ALLE ERLEDIGTEN LÖSCHEN
// =====================================

deleteCompletedButton.addEventListener(
    "click",
    function() {


        const completedTasks =
            tasks.filter(
                function(task) {

                    return task.completed;

                }
            );


        if (completedTasks.length === 0) {

            alert(
                "Es gibt keine erledigten Aufgaben."
            );

            return;

        }


        const confirmed =
            confirm(
                "Möchtest du wirklich alle erledigten Aufgaben löschen?"
            );


        if (!confirmed) {

            return;

        }


        tasks =
            tasks.filter(
                function(task) {

                    return !task.completed;

                }
            );


        saveTasks();

        renderTasks();

    }
);


// =====================================
// DARK MODE
// =====================================

themeButton.addEventListener(
    "click",
    function() {


        document.body.classList.toggle(
            "dark"
        );


        if (
            document.body.classList.contains(
                "dark"
            )
        ) {

            themeButton.textContent =
                "☀️";


            localStorage.setItem(
                "darkMode",
                "true"
            );

        } else {

            themeButton.textContent =
                "🌙";


            localStorage.setItem(
                "darkMode",
                "false"
            );

        }

    }
);


// =====================================
// DARK MODE LADEN
// =====================================

if (
    localStorage.getItem("darkMode")
    === "true"
) {

    document.body.classList.add(
        "dark"
    );

    themeButton.textContent =
        "☀️";

}


// =====================================
// COUNTER
// =====================================

function updateCounter() {


    const total =
        tasks.length;


    const completed =
        tasks.filter(
            function(task) {

                return task.completed;

            }
        ).length;


    counter.textContent =
        total +
        " Aufgaben, " +
        completed +
        " erledigt";

}


// =====================================
// FORTSCHRITT
// =====================================

function updateProgress() {


    const total =
        tasks.length;


    const completed =
        tasks.filter(
            function(task) {

                return task.completed;

            }
        ).length;


    let percent = 0;


    if (total > 0) {

        percent =
            Math.round(
                (completed / total) * 100
            );

    }


    progressFill.style.width =
        percent + "%";


    progressPercent.textContent =
        percent + "%";

}


// =====================================
// START
// =====================================

renderTasks();

