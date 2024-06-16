//const { createElement } = require("react");


let inputFieldEl = document.getElementById("input-btn")
let addButtonEl = document.getElementById("add-btn")
let taskListEl = document.getElementById("task-list")
let deleteButtonEl = document.getElementById("delete-btn")


//load task from local storage on page load
document.addEventListener("DOMContentLoaded",function() {
    loadTasks();
})

addButtonEl.addEventListener("click" , function(){

    let task = inputFieldEl.value.trim();
    console.log(task);
    if(task){
        addTask(task);
        saveTask(task);
        clearTextField();
    }
})

function addTask(task , isCompleted = false){
    let taskItemEl = document.createElement("div")
    taskItemEl.className = "task-item";

    if(isCompleted){
        taskItemEl.classList.add("completed")
    }

    let checkboxEl = document.createElement("input")
    checkboxEl.type = "checkbox"
    checkboxEl.checked = isCompleted;
    checkboxEl.addEventListener("change",function() {
        if(this.checked){
            taskItemEl.classList.add("completed");
            updateTaskstatus(task,true)
        }else{
            taskItemEl.classList.remove("completed");
            updateTaskstatus(task,false);
        }
    })

    let taskTextEl = document.createElement("span");
    taskTextEl.textContent = task;

    taskItemEl.appendChild(checkboxEl);
    taskItemEl.appendChild(taskTextEl);
    taskListEl.appendChild(taskItemEl)
}


function clearTextField(){
    inputFieldEl.value = " ";
}

function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ text: task, completed: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(function(task) {
        addTask(task.text, task.completed);
    });
}

function updateTaskStatus(taskText, isCompleted) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.forEach(function(task) {
        if (task.text === taskText) {
            task.completed = isCompleted;
        }
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


deleteButtonEl.addEventListener("dblclick" , function(){
    localStorage.removeItem("tasks")
    taskListEl.innerHTML = " ";
})