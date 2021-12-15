const inputField = document.querySelector('.form-control');
const tasks = document.querySelector('.todo__list');
const check = document.querySelector('.fa-check');
const done = document.querySelector('.done__list');

let list = [], id = 0;
let listDone = [];
let d = new Date();
let day = d.getUTCDay();
let month = d.getUTCMonth();
let year = d.getUTCFullYear();


inputField.addEventListener("keyup", (e) => {
    if (e.keyCode === 13) {
        inputValue = inputField.value;
        let date = `${day}/${month}/${year}`;
        if(inputValue) {
            addTodo(inputValue, id, false, date);
            list.push(
                {
                    name: inputValue,
                    id: id,
                    done: false,
                    date: date
                }
            );
            inputValue.value = "";
            id++;
            localStorage.setItem("Todo", JSON.stringify(list));
        }
    }
});
const addTodo = (inputValue, id, done, date) => {
    let task = `      
    <div class="task">
        <p id="task__name">${inputValue}</p>
        <i class="fas fa-check" id="${id}"></i>
        <p id="task__date">${date}</p>
    </div>`;
    tasks.insertAdjacentHTML('beforeend', task);
}