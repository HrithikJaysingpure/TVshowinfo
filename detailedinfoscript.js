const ID = localStorage.getItem('idvalue');
const URL = "https://api.tvmaze.com/shows/"
const CAST = "/cast"
const main = document.querySelector('main')
console.log(ID)
const logo = document.getElementById('logo')
const title = document.getElementById('title')

logo.addEventListener('click',()=>{
    window.history.go(-1)
})


async function getCastAndShow(URL,ID){
    const showdata = await fetch(URL+ID)
    const showJsonData = await showdata.json()
  
    const castdata = await fetch(URL+ID+CAST)
    const castJsonData = await castdata.json();
    
    
    demo(showJsonData,castJsonData)
}

function demo(data,castdata){
    title.innerHTML = `${data.name}`
    const tvshowEl = document.createElement('div')
    console.log(data)
    tvshowEl.classList.add('result')
    tvshowEl.innerHTML = `
    <img id="showposter" src ="${data.image.original}" alt="${data.name}">
        
                <div class="info">
                    <h1 #id="showtitle">${data.name}</h1>
                    <ul class="detailedinfo">
                        <li #id="premiered"><b class="bolt-tag">premiered:</b>${data.premiered}</li>
                        <li #id="ended"><b class="bolt-tag">Ended:</b>${data.ended}</li>
                        <li #id="rating"><b class="bolt-tag">Rating:</b>${data.rating.average}</li>
                        <li #id="generes"><b class="bolt-tag">Genres:</b>${data.genres}</li>
                        <li #id="runtime"><b class="bolt-tag">runtime:</b>${data.runtime}</li>
                        <li #id="language"><b class="bolt-tag">language:</b>${data.language}</li>
                        <li #id="cast"><b class="bolt-tag">cast:</b>${getActors(castdata)}</li>
                        <li #id="summary"><b class="bolt-tag">summary:</b>${data.summary}</li>
                    </ul>
                </div>`
                main.appendChild(tvshowEl)
}

getCastAndShow(URL,ID);
function getActors(actors){
    let result = " "

    actors.forEach(actor => {
        result+=actor.person.name+", "
    });
    return result.slice(0, -2)
}
