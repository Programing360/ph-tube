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

// ----------------------------------------------------------------------------

const loadVideo = () => {
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
        .then(res => res.json())
        .then(data => displayLoadCategoryBtn(data.categories))
        .catch(error => console.log(error))
}
// btn create-------------------------------------------------
const displayLoadCategoryBtn = (category) => {
    // console.log(category)
    const btn = document.getElementById("btn-categorise")
    category.forEach(item => {
        console.log(item.category)

        // btnCreate---------------------------
        const div = document.createElement("div")
        div.innerHTML = `
        <button id = "btn-${item.category_id}" onclick = btnVideoLoad(${item.category_id}) class = "btn ">
        ${item.category}
        </button>
        `
        btn.append(div)

    });
}
// btnVideoLoad---------------------------------------------
const btnVideoLoad = (id) => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then(res => res.json())
        .then(data => displayVideoCategories(data.category
        ))
}
// const displayLoadCategorybtn = (video) => {

// }

// timeSet---------------------------------------------------------
function setTime(time) {
    const day = parseInt(time / 86400);
    const hour = parseInt(time / 60)
    let remainingSecond = parseInt(time % 60)
    const minute = parseInt(time / 3600)
    remainingSecond = remainingSecond % 60

    return `${day} day ${hour} hours ${minute} minute ${remainingSecond} second`
}
// vediosCategory---------------------------------------------------
const videoLoadCategorise = async (searchId = "") => {
    const url = `https://openapi.programming-hero.com/api/phero-tube/videos?title= ${searchId}`;
    const res = await fetch(url);
    const data = await res.json()
    displayVideoCategories(data.videos)
}
const displayVideoCategories = (vedioId) => {
    // console.log(vedioId)
    const loadVideo = document.getElementById('loadVideos')

    loadVideo.innerHTML = ""
    if(vedioId.length === 0){
        loadVideo.classList.remove("grid")
        loadVideo.innerHTML = `
        <div class = "flex flex-col justify-center items-center gap-3 object-cover mt-20">
        <img src = "assets/Icon.png"/>
        <p>Oops!There is no event here</p>
        </div>
        `
    }
    else{
        loadVideo.classList.add("grid")
    }
    vedioId.forEach(videos => {
        // console.log(videos)

        const divVideos = document.createElement('div')
        
        divVideos.classList = "card w-11/12 shadow-sm"
        divVideos.innerHTML = `

            <figure class = "h-[200px] relative">
    
                <img
    
                  src="${videos.thumbnail}"
                  class = "object-cover w-full h-full"
                alt="Shoes" />
                <div id = "setTime()" class = "absolute mt-38 ml-20 bg-black text-white">
                    ${videos.others.posted_date?.length === 0 ? "" : `<span class = "text-xs ">${setTime(videos.others.posted_date)}</span>`}     
                     
                </div>       
            </figure>
    
            <div class = "flex items-center gap-3 mt-1 ml-2">
                <div>
                <img class = "w-10 h-10 rounded-full " src = "${videos.authors[0].profile_picture}"/>
                </div>
                <div>
                    <h2 class = "font-bold">${videos.title}</h2>
                    <div class ="flex items-center gap-2">
                        <p>${videos.authors[0].profile_name}</p>
                        ${videos.authors[0].verified === true ? `<img class = "w-5 h-5" src = "https://img.icons8.com/?size=96&id=98A4yZTt9abw&format=png"/>` : ""}
                    </div>
                    <p class = "font-semibold">${videos.others.views}</p>
                </div>
            </div>

        `
        loadVideo.append(divVideos)

    })

}
// videoSearch-------------------------------
document.getElementById('videoSearch').addEventListener("keyup", (e) =>{
    videoLoadCategorise(e.target.value)
})
loadVideo()
videoLoadCategorise()