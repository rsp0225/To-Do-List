let taskInput = document.querySelector(".task-input");
let addButton = document.querySelector(".button-add");
let tabs = document.querySelectorAll(".tab-type div");
let underLine = document.getElementById("tab-underline");
let taskList = [];
let tabMode = "tab-all";
let filteredList = [];

addButton.addEventListener("click", addTask);

taskInput.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    //13 is Enter keyboard
    addTask(event);
  }
});

for (let i = 0; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (event) {
    filter(event);
  });
}

function addTask() {
  let task = {
    id: randomIDGenerator(),
    taskContent: taskInput.value,
    isComplete: false,
  };

  taskList.push(task);
  //console.log(taskList);
  taskInput.value = ""; //erases user's input
  render();
}

function render() {
  let resultHTML = "";
  let tempList = [];

  if (tabMode == "tab-all") {
    tempList = taskList;
  } else {
    tempList = filteredList;
  }

  for (let i = 0; i < tempList.length; i++) {
    if (tempList[i].isComplete == true) {
      resultHTML += `<div class="task task-done" id="${tempList[i].id}">
                        <span>${tempList[i].taskContent}</span>
                        <div class="button-box">
                            <button onclick="checkTask('${tempList[i].id}')"><i class="fas fa-undo-alt"></i></button>
                            <button onclick="deleteTask('${tempList[i].id}')"><i class="fa fa-trash-can"></i></button>
                        </div>
                    </div>`;
    } else {
      resultHTML += `<div class="task" id="${tempList[i].id}" >
                        <span>${tempList[i].taskContent}</span>
                        <div class="button-box">
                            <button onclick="checkTask('${tempList[i].id}')"><i class="fa fa-check"></i></button>
                            <button onclick="deleteTask('${tempList[i].id}')"><i class="fa fa-trash-can"></i></button>
                        </div>
                    </div>`;
    }
  }

  document.getElementById("task-board").innerHTML = resultHTML;
}

function checkTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  filter();
}

function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
      break;
    }
  }
  filter();
}

function filter(e) {
  if (e) {
    tabMode = e.target.id;
    underLine.style.width = e.target.offsetWidth + "px";
    underLine.style.left = e.target.offsetLeft + "px";
    underLine.style.top =
      e.target.offsetTop + (e.target.offsetHeight - 4) + "px";
  }

  filteredList = [];
  
  if (tabMode == "tab-not-done") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete == false) {
        filteredList.push(taskList[i]);
      }
    }
  } else if (tabMode == "tab-done") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete == true) {
        filteredList.push(taskList[i]);
      }
    }
  }
  
  render();
}

function randomIDGenerator() {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return "_" + Math.random().toString(36).substr(2, 9);
}
