const inputField = document.querySelector('.form-control');
const list = document.querySelector('.todo__list');
const check = document.querySelector('.fa-check');
const deleteT = document.getElementById('fa-times');
const clear = document.querySelector('.clear');
const LINE_THROUGH = "lineThrough";

let tasks = [], id;

let d = new Date();
let day = d.getUTCDay();
let month = d.getUTCMonth();
let year = d.getUTCFullYear();
let date = `${day}/${month}/${year}`;

let data = localStorage.getItem("Todo");
if(data) {
    tasks = JSON.parse(data);
    id = tasks.length;
    loadTasks(tasks);
} else {
    tasks=[]; 
    id=0;
}
function loadTasks(array)
{
    array.forEach(function(item){
        addTask(item.task, item.id, item.date, item.trash);
    });
}
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});
function addTask(inputValue, id, date, trash) {
    if(trash) {return;}
    let task = `      
    <div class="task">
        <p id="task__name">${inputValue}</p>
        <i class="fas fa-check" id="${id}"></i>
        <p id="task__date">${date}</p>
        <i class="fas fa-times" id="${id}"></i>
    </div>`;
    list.insertAdjacentHTML('beforeend', task);
}
inputField.addEventListener('keyup',function(e) {
    validate();
    if (e.keyCode === 13) {
        e.preventDefault();
        let inputValue = inputField.value;
        if(inputValue) {
            addTask(inputValue, id, date, false);
            tasks.push({
                task: inputValue,
                id: id,
                date: date,
                trash:false
            });
            localStorage.setItem("Todo", JSON.stringify(tasks));
            id++;
        }
        inputField.value = "";
    }
});
list.addEventListener('click', (e) => {
    const element = e.target;
    if(element.classList.contains('fa-times')) {
        if(confirm("Do you really want to delete it?")) {
            element.parentNode.parentNode.removeChild(element.parentNode);
            tasks[element.id].trash = true;
        }
    }
    if(element.classList.contains('fa-check')) {
        const element = e.target;
        element.parentNode.querySelector("#task__name").classList.toggle(LINE_THROUGH);
    }
    localStorage.setItem("Todo", JSON.stringify(tasks));
});
function validate() {
    inputField.value = inputField.value.replace(/[^a-zA-Z0-9@]+/, '');
};