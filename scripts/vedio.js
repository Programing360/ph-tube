// loadCategorise
const lodeCategories = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then((res) => res.json())
        .then(data => displayCategorise(data.categories
        ))
        .catch(error => console.log(error))
}
// category else----------------------------------
const buttonCategoryVideo = (id) => {
    // alert(id)
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then((res) => res.json())
        .then(data => displayLoad(data.category
        ))
        activeBtn(id)
        .catch(error => console.log(error))
}
const activeBtn = (id) => {
    const button = document.getElementById(id)
    button.classList.add("bg-red-400")
}

// displayCategorise----------------------------
const displayCategorise = (categories) => {
    const btnCategorise = document.getElementById('categorise')
    categories.forEach((item) => {
        console.log(item)

        // btn-Create------------------------------
        const buttonDiv = document.createElement("div")
        buttonDiv.innerHTML =`
        <button id = "${item.category_id}" onclick ="buttonCategoryVideo(${item.category_id})" class = "btn">
        ${item.category}
        </button>
        `
        
        // button.classList = "btn"
        // button.id = "btnId-$"
        // button.innerText = item.category;

        btnCategorise.append(buttonDiv)
    });


}

const vedioLoad = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
        .then((res) => res.json())
        .then(data => displayLoad(data.videos
        ))
        
        .catch(error => console.log(error))
}
// timeFuntion Create------------------------------------
function setTime(time){
    const day = parseInt(time / 86400);
    const hour = parseInt(time / 3600) ;
    let remainingSecond = time % 3600
    const minute = parseInt(time / 60);
    remainingSecond = remainingSecond % 60
    return `${day} days ${hour} hour ${minute} minute ${remainingSecond} second ago`

}



const displayLoad = (videos) => {
    const div = document.getElementById('vedioLoad')
    div.innerHTML = ""

    if(videos.length === 0){
        div.classList.remove('grid')
        div.innerHTML =`
        <div class = "flex flex-col justify-center items-center m-h-[500px]">
        <img src = "assets/Icon.png" />
        <h2>
            There is no video in here.
        </h2>
        </div>
        `
        return;
    }
    else{
        div.classList.add('grid')
    }
    videos.forEach((item) => {
        console.log(item)

        const card = document.createElement('div');
        card.classList = "card shadow-sm"
        card.innerHTML =
            `
                <figure class = h-[200px] relative>
                    <img
                    src=${item.thumbnail}
                    class = "h-full w-full object-cover"  
                    lt="Shoes"/>

                    ${
                        item.others.posted_date?.length == 0 ? "" : `<span class = "absolute right-2 text-xs bottom-25 bg-black text-white rounded p-1" >${setTime(item.others.posted_date)} </span>`
                    }
                    
                </figure>
                <div class="px-0 py-2 flex gap-4">
                        <div>
                            <img class = "w-10 h-10 rounded-full" src= ${item.authors[0].profile_picture} />
                        </div>
                    <div>
                        <h2 class="font-bold">${item.title}
                        </h2>
                        <div class = "flex items-center object-cover gap-2">
                            <p>${item.authors[0].profile_name}</p>
                            ${item.authors[0].verified === true ? `<img class = "w-5 h-5" src = "https://img.icons8.com/fluency/48/instagram-check-mark.png"/>` : ''}
                            
                        </div>
                        <p class = font-bold>${item.others.views} views</p>
                    </div>
                    
                   
                </div>
 
            `
        div.append(card)
    })
}
// {
//     "category_id": "1001",
//     "video_id": "aaab",
//     "thumbnail": "https://i.ibb.co/QPNzYVy/moonlight.jpg",
//     "title": "Midnight Serenade",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/fDbPv7h/Noha.jpg",
//             "profile_name": "Noah Walker",
//             "verified": false
//         }
//     ],
//     "others": {
//         "views": "543K",
//         "posted_date": ""
//     },
//     "description": "'Midnight Serenade' by Noah Walker is a soulful journey into the depths of the night, capturing the mystique and allure of a moonlit evening. With 543K views, this song brings together tender melodies and evocative lyrics, making it a favorite among listeners seeking a contemplative yet uplifting experience. Immerse yourself in this musical masterpiece and feel the calm embrace of the night."
// }
lodeCategories()
vedioLoad()