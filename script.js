const localStorageKey = 'to-do-list-gn'

const alertaText = document.getElementById('alerta');

const body = document.querySelector('body');

const iconTheme = document.getElementById('troca-de-tema');

function toggleTheme() {
    document.body.classList.toggle('light-theme');


    if (document.body.classList.value == 'light-theme') {
        iconTheme.innerHTML = `<span class="material-symbols-outlined">
            dark_mode
            </span>`
    } else {
        iconTheme.innerHTML = `<span class="material-symbols-outlined">
        light_mode
        </span>`
    }
}

function validateIfExistsNewTask() {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let inputValue = document.getElementById('input-task').value
    let exists = values.find(x => x.name == inputValue)
    return !exists ? false : true
}

function newTask() {
    let input = document.getElementById('input-task');

    input.style.border = ''

    //Validação
    if (!input.value) {
        input.style.border = '1px solid white'
        alertaText.innerHTML = 'Digite algo para adcionar a sua lista.';
    }
    else if (validateIfExistsNewTask()) {
        alertaText.innerHTML = 'Já existe uma tarefa com esse nome.';
    }
    else {
        //Adiconar tarefas (Pegando infos do localStorage)

        let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
        values.push({
            name: input.value
        })
        localStorage.setItem(localStorageKey, JSON.stringify(values))
        showValue()
    }
    input.value = ''
}

function showValue() {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let list = document.getElementById('to-do-list')

    list.innerHTML = ''

    for (let i = 0; i < values.length; i++) {
        list.innerHTML += `<li>${values[i]['name']}<div class='div-btn'><button id='btn-ok' onclick='removeItem("${values[i]['name']}")'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
        <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
      </svg></button><button id='btn-del' onclick='removeItem("${values[i]['name']}")'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
    </svg></button></div></li>`
    }
    alertaText.innerHTML = ""
}

function removeItem(data) {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")

    let index = values.findIndex(x => x.name == data);

    values.splice(index, 1)

    localStorage.setItem(localStorageKey, JSON.stringify(values))

    alertaText.innerHTML = ""

    showValue()
}

showValue()