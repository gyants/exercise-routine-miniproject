const exercisesContainer = document.querySelector(".exercises-container");
const searchBar = exercisesContainer.querySelector(".search-bar")
const exercisesMenu = exercisesContainer.querySelector(".exercises-menu")
const addButton = document.querySelector('.add-button')
const addBar = document.querySelector('.add-bar')
const clearSearch = document.querySelector('.clear-search')
const routines = document.querySelector('.routines')
let focusingIndex = 0


searchBar.addEventListener("keyup", event => {
    let keyword = event.target.value.toLowerCase()
    updateExercisesMenu(keyword)

})

clearSearch.addEventListener("click", () => {
    searchBar.value = ""
    updateExercisesMenu("")
})

function updateExercisesMenu(keyword){
    Array.from(exercisesMenu.children)
    .filter( item => {
        return !item.innerText.toLowerCase().includes(keyword)
    })
    .forEach(item => {
        item.classList.add("hidden")
    })

    Array.from(exercisesMenu.children)
    .filter( item => {
        return item.innerText.toLowerCase().includes(keyword)
    })
    .forEach(item => {
        item.classList.remove("hidden")
    })
}


addButton.addEventListener("click", event => {
    const exerciseName = addBar.value.trim()
    const inList = exercisesMenu.innerText
    if(exerciseName.length && !inList.includes(exerciseName)){
        exercisesMenu.innerHTML+= `
        <div class="exercise-item">
            <span class="exercise-name-text add-routine-button">
                ${exerciseName}
            </span>
            <i class="exercise-button add-routine-button bi bi-plus-circle-fill"></i>
            <i class="exercise-button remove-button bi bi-dash-circle-fill"></i>
        </div>`   
    }
    addBar.value = ""
    updateExercisesMenu("");
})

exercisesMenu.addEventListener("click", event => {
    const clickedClasses = event.target.classList
    if(clickedClasses.contains("add-routine-button") || clickedClasses.contains("bi-plus-circle-fill")){
        let exercise = event.target.parentElement.innerText
        routines.innerHTML += `
        <div class="routine-item">
            <span class="routine-name">
                ${exercise}
            </span>
            <span class="routine-reps">
                <i class="bi bi-dash"></i>
                <span class="count">15</span>
                <span>reps</span>
                <i class="bi bi-plus"></i>
            </span>
            <div class="progress">
                <span>SET</span>
                <span class="count">1</span>
                <i class="bi bi-caret-right-fill"></i>
            </div>
            <i class="delete bi bi-trash-fill"></i>
        </div>

        `

        updateRoutine()
    } else if(clickedClasses.contains("remove-button") || clickedClasses.contains("bi-dash-circle-fill")){
        const element = event.target.parentElement
        element.remove()
        
    }
})



routines.addEventListener("click", event => {
    if (event.target.classList.contains("delete")){
        event.target.parentElement.remove()
        updateRoutine()
    } 
    
    else if(event.target.classList.contains("bi-caret-right-fill")){
        if(event.target.parentElement.children[1].innerText !== "3"){
            event.target.parentElement.children[1].innerText = String(Number(event.target.parentElement.children[1].innerText)+1)
        } else {
            
            const focus = routines.querySelector('.focused')
            const index = Array.from(routines.children).indexOf(focus)
            if(focusingIndex===index){
                focusingIndex += 1
            }
            event.target.parentElement.parentElement.classList.remove('focused')
            updateRoutine(true)
        }
    }

    else if(event.target.classList.contains("bi-plus")){
        event.target.parentElement.children[1].innerText = String(Number(event.target.parentElement.children[1].innerText)+1)
    }

    else if(event.target.classList.contains("bi-dash")){
        if(Number(event.target.parentElement.children[1].innerText)>0){
        event.target.parentElement.children[1].innerText = String(Number(event.target.parentElement.children[1].innerText)-1)
        }
    }
})

function updateRoutine(){
    const items = routines.querySelectorAll(".routine-item")
    const focus = routines.querySelector('.focused')
    const index = Array.from(routines.children).indexOf(focus)
    if(index=== -1 && focusingIndex<items.length){
        items[focusingIndex].classList.add('focused')
    }
}