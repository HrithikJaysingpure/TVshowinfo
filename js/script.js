const main = document.getElementById('main');
const input = document.getElementById('search-txt')
const poster = document.querySelector('img')
const left = document.getElementById('left')
let right = document.getElementById('right')
const movieURL = 'https://api.tvmaze.com/shows'
const logo = document.getElementById('logo')



logo.addEventListener('click',()=>{
    document.location.reload()
})

async function getShows(url){
   
    const res = await fetch(url)
     const data = await res.json()
    
     for(i=0; i<54; i++){
        show(data[i])
     }
}



function show(data){
    
        const{ name, rating, image, id} = data
        const tvshowEl = document.createElement('div')
        tvshowEl.classList.add('movie')
        
        tvshowEl.innerHTML = `
        <img onclick="openWindow('${data.id}')" class="poster" src="${data.image.medium}" alt="">
        <div class="movieinfo">
            <h3 class="title">${data.name}</h3>
            <span class="${getClassByRating(data.rating.average)}" >${data.rating.average}</span>
        </div>`
        main.appendChild(tvshowEl)

}

function searchQuery(query){
    const url = " https://api.tvmaze.com/search/shows?q=" + query;
    fetch(url)
    .then(response => response.json())
    .then(data => {
        main.innerHTML = ''
        data.forEach((result)=>{
            // console.log(result.show)
            const{ name, rating, image, id} = result
            if(result.show.rating.average==null){
                result.show.rating.average="waiting for vote"
            }
         
        const tvshowEl = document.createElement('div')

        tvshowEl.classList.add('movie')
        tvshowEl.innerHTML = `
        <img onclick="openWindow('${result.show.id}')" class="poster" src="${result.show.image.medium}" alt="${result.show.id}">
        <div class="movieinfo">
            <h3 class="title">${result.show.name}</h3>
            <span class="${getClassByRating(result.show.rating.average)}" >${result.show.rating.average}</span>
        </div>`
        main.appendChild(tvshowEl)
        }
    )})
}
function openWindow(i){
    localStorage.setItem('idvalue',i)
    window.location.href="detailedinfo.html";
    window.open("detailedinfo.html","_parent")

}
function getClassByRating(rating){
    if(rating == null){
        return "null"
    }else if(rating>=5 && rating<=7){
        return "yellow"
    }else if(rating<=5){
        return "red"
    }else if(rating>=7){
        return "green"
    }
    return "white"
}
input.onkeyup = (event)=>{
  if(input.value.length==0){
    getShows(movieURL)
  }
  searchQuery(input.value)

}



window.onload = () =>{

    getShows(movieURL)
}