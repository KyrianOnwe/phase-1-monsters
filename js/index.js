//control when can click on things
function makeReady(){
    document.addEventListener('DOMContentLoaded', () => {
        getInfo()
        createMonsters()
        upArrow()
        downArrow()
    })
}

//page to control which page my list comes up to
let page = 1


//create cards and append to DOM
function createCard(monster){
    let card = document.createElement('li');
    card.className = 'card'
    card.innerHTML = `
        <div class="card">
            <h2>${monster.name}</h2>
            <h4>Age: ${monster.age}
            </h4>
            <p>Bio: ${monster.description}</p>
        </div>    
    `
    document.querySelector('#monster-container').appendChild(card);

    //make buttons to change the page of monsters
    
}

function upArrow(){
    let up = document.querySelector(`#forward`)
    up.addEventListener('click', () => {
    page = page + 1
    getInfo()
    console.log(page)
    
    })
    //getInfo()
}



function downArrow(){
    let down = document.querySelector('#back')
    down.addEventListener('click', () => {
    page = page - 1
    getInfo()
    console.log(page)
    })
}

//get the list and display 50 at a time to the DOM
function getInfo(){
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
    .then(res => res.json())
    .then(monsters => monsters.forEach(monster => createCard(monster)))
}

//create the monsters
function createMonsters(){
    let form = document.createElement('form')
    form.className = 'create-monster-form'
    form.id ='cmf'
    form.innerHTML = `
        <h3>Create a monster</h3>

        <input
          type="text"
          name="name"
          value=""
          placeholder="Enter a monster's name..."
          class="input-text"
        />
        <br />
        <input
          type="text"
          name="age"
          value=""
          placeholder="Enter the monster's age...
          class="input-text"
        />
        <br />
        <input
          type="text"
          name="description"
          value=""
          placeholder="Tell us about the monster..."
          class="input-text"
        />
        <br />
        <input
          type="submit"
          name="submit"
          value="Create Monster"
          class="submit"
        />
        `
    document.getElementById('create-monster').appendChild(form)

    form.addEventListener('submit', (e)=>{
        e.preventDefault();
        let monster = {
            name: e.target.name.value,
            age: e.target.age.value,
            description: e.target.description.value
        }
        storeMonster(monster)
        form.reset()


    })

}

function storeMonster(monster){
    fetch('http://localhost:3000/monsters', {
      method: 'POST',
      headers:
        {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
  
      body: JSON.stringify(monster)
    })
    .then(res => res.json())
    .then(monster =>createCard(monster))
  }

makeReady()