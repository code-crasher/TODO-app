const lightModeToggle = document.getElementById("toggle");
const Show = document.querySelector(".show");
const Hide = document.querySelector(".hide");
const darkMode = document.getElementById("dark__mode");
const lightMode = document.getElementById("light__mode");
const addTask = document.getElementById("add__task");
const taskContainer = document.getElementById("task__container");
const inputTask = document.getElementById("add_task-checkbox");
const countEl = document.getElementById("count__el");
const clearAll = document.querySelector("#clear__btn");
const completedBtn = document.querySelectorAll(".completed-task");
const activeTask = document.querySelectorAll(".active-task");
const showAll = document.querySelectorAll(".show-all");
const taskValue = document.querySelector("#add__task");
const msg=document.querySelector('.msg');
let count = 0;

//light and dark theme toggle
//saving the changes in local storage

let lightTheme = localStorage.getItem("lightTheme");

const enableLightTheme = () => {
  document.body.classList.add("light__theme");
  Hide.style.visibility = "hidden";
  Show.style.visibility = "visible";
  darkMode.style.visibility = "hidden";
  lightMode.style.visibility = "visible";

  localStorage.setItem("lightTheme", "enabled");
};

const disableLightTheme = () => {
  document.body.classList.remove("light__theme");
  Hide.style.visibility = "visible";
  Show.style.visibility = "hidden";
  darkMode.style.visibility = "visible";
  lightMode.style.visibility = "hidden";

  localStorage.setItem("lightTheme", null);
};

if (lightTheme === "enabled") {
  enableLightTheme();
}

lightModeToggle.addEventListener("click", () => {
  lightTheme = localStorage.getItem("lightTheme");

  if (lightTheme !== "enabled") {
    enableLightTheme();
  } else {
    disableLightTheme();
  }
});
const handleDragStart = (e) => {
  const target = e.target;
  target.setAttribute("data-dragged-item", "true");
  target.style.opacity = 0.5;
};
const handleDragOver = (e) => {
  e.preventDefault();
};
const handleDrop = (e) => {
  e.preventDefault();
  const target = e.target;
  const draggedItem = document.querySelector("li[data-dragged-item]");
  target.parentNode.insertBefore(draggedItem, target.nextSibling);
  draggedItem.removeAttribute("data-dragged-item");
};
const handleDragEnd = (e) => {
  e.target.style.opacity = 1;
};

//adding tasks

const addTodo = () => {
  if (inputTask.checked === true) {
    let task = document.createElement("li");
    task.classList.add("task");
    task.setAttribute("draggable", true);
    let completeTask = document.createElement("label");
    completeTask.classList.add("container");
    
    let checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");
    let span = document.createElement("span");
    span.classList.add("checkmark");

    completeTask.append(checkBox);
    completeTask.append(span);
    
    task.append(completeTask);

    let todoWrapper = document.createElement("div");
    todoWrapper.classList.add("todo_text");
    let todo = document.createElement("p");
    todo.innerText = addTask.value;

    todoWrapper.appendChild(todo);

    task.append(todoWrapper);

    task.addEventListener("dragstart", handleDragStart);
    task.addEventListener("dragover", handleDragOver);
    task.addEventListener("drop", handleDrop);
    task.addEventListener("dragend", handleDragEnd);

    let btnWrapper = document.createElement("div");
    btnWrapper.classList.add("btn-wrapper");
    let btn = document.createElement("button");
    btn.classList.add("close__btn");
    btn.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>';
    btnWrapper.appendChild(btn);
    task.append(btnWrapper);

    taskContainer.append(task);

    count = count + 1;
    countEl.textContent = count;

    checkBox.addEventListener("click", () => {
      if (checkBox.checked === true && todo.classList.contains("complete-task")==false) {
        todo.classList.add("complete-task");
        todo.style.color = "var(--clr-dark-150)";

        if (count != 0) {
          count = count - 1;
          countEl.textContent = count; 
        } 
      } 
    });

    btn.addEventListener("click", () => {
      task.remove();
      if (todo.classList.contains("complete-task") == true) {
         count = count;
      }else if(todo.classList.contains("complete-task") == false){
       count = count - 1;
      } else if (count != 0) {
        count = count - 1;
      } else if(count == 0){
        return;
      }

      countEl.textContent = count;
    });

    clearAll.addEventListener("click",() => {
    if(todo.classList.contains("complete-task") == true){
       task.remove();
    }
  });

    completedBtn.forEach((btn)=>{
      btn.addEventListener("click",()=>{
      if(todo.classList.contains("complete-task") == false){
       task.classList.add("show-task");
    }else if(task.classList.contains("show-task") == true){
      task.classList.remove("show-task");
    }else{
      return
    }
    });
    });

    activeTask.forEach((btn)=>{
      btn.addEventListener("click",()=>{
      if(todo.classList.contains("complete-task") == true){
       task.classList.add("show-task");
    }else if(task.classList.contains("show-task") == true){
      task.classList.remove("show-task");
    }
    });
    });

    showAll.forEach((btn)=>{
      btn.addEventListener("click",()=>{
      if(task.classList.contains("show-task") == true){
        task.classList.remove("show-task");
      }
    });
  });
  } 
};


inputTask.addEventListener("click",()=>{
  if(taskValue.value == ''){
    msg.textContent="Task can not be empty"
    msg.style.display = "block";
  }else{
    addTodo();
    msg.style.display = "none";
  }
});
