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

function loadCategorise() {
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
        .then(res => res.json())
        .then(data => btnCategory(data.
            categories))
        .catch(error => console.log(error));

}
// button create-------------------------------------
const btnCategory = (categories) => {
    const btnId = document.getElementById("btn-categorise")
    categories.forEach(item => {
        // console.log(item)

        const divBtn = document.createElement("div")
        divBtn.innerHTML = `
    <button id = "btn-${item.category_id}" onclick = btnLoadvideo(${item.category_id}) class = "btn category-btn">
    ${item.category}
    </button>
    `
        btnId.append(divBtn)
    });


}

// videoLoadCategorise-----------------------------------------
const displayLoadCategory = (searchText = "") => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
        .then(res => res.json())
        .then(data => videoLoadCategory(data.videos))
        .catch(error => console.log(error));
}
// post er time create-------------------------------------------
function setTime(time) {
    const day = parseInt(time / 86400)
    const hours = parseInt(time / 3600)
    let remainingSecond = time % 60
    const minute = parseInt(time / 60)
    remainingSecond = remainingSecond % 60
    // console.log(day , hours , minute, remainingSecond)
    return `${day} day ${hours} hours ${minute} minute ${remainingSecond} second`
}

const videoLoadCategory = (video) => {
    const vedioId = document.getElementById('vedioLoad')
    vedioId.innerHTML = ""
    if (video.length === 0) {
        vedioId.classList.remove("grid")
        vedioId.innerHTML = `
            <div class = "flex flex-col h-full bottom-3 justify-center items-center mx-auto">
                <img src = "assets/Icon.png"/>
                <p class = "font-bold text-center">Oops!! Sorry,There is no <span class = "text-center"><br>contain here.</br></span></p>
            </div>
        `
        return;
    }
    else {
        vedioId.classList.add("grid")
    }
    video.forEach(item => {
        // console.log(item)

        const videoDiv = document.createElement("div")
        videoDiv.classList = "card w-96 shadow-sm"
        videoDiv.innerHTML = `
        
        <figure class = h-[200px] relative>
          <img
            src="${item.thumbnail}"
            class = "h-full w-full object-cover"
            alt="Shoes" />
            

            ${item.others.posted_date?.length == 0 ? "" : `<span class = "absolute bottom-32  right-2  bg-black text-white rounded"> ${setTime(item.others.posted_date)}</span>`

            }
        </figure>
        
        	
        <div class = "flex items-center px-4 py-3 gap-4">
            <div>
               <img class = "w-10 h-10 rounded-full object-cover " src = "${item.authors[0].profile_picture}"/>
            </div>
            <div>
                <h2 class = "font-bold">
                ${item.title}
                </h2>
                <div class = "flex gap-2 items-center">
                    <p>${item.authors[0].profile_name}</p>
                    
                    ${item.authors[0].verified === true ? `<img class = "w-5" src = "https://img.icons8.com/?size=96&id=98A4yZTt9abw&format=png"/>` : ""}
                </div>
                <p class = "font-semibold">${item.others.views} views</P>
                <button id = "btn-details" onclick = "btnDetails('${item.video_id}')" class = "btn btn-sm btn-error">Details</button>
            </div>
        </div>
        `
        vedioId.append(videoDiv)
    })

}
// btn-Details create--------------------------------------------------------
const btnDetails = async (videoId) => {
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`
    const res = await fetch(url);
    const data = await res.json();
    displayDetail(data.video)
    // console.log(videoId)
}
const displayDetail = (video) => {
    // console.log(video)
    const detailContainer = document.getElementById('modal-contaner')
    detailContainer.innerHTML = `
    <img src = "${video.thumbnail}"/>
    <p>${video.description}</p>
    `

    // way-1---------
    // document.getElementById('showModalData').click()
    // way-2----------
    document.getElementById("customModal").showModal()
}

// button category videos create----------------------------------------------
const btnLoadvideo = (id) => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then(res => res.json())
        .then(data => {
            // removeClassListFunction
            activeBtn()
            videoLoadCategory(data.category)
            const coloreId = document.getElementById(`btn-${id}`)
            coloreId.classList.add('active')

        })
        .catch(error => console.log(error));
}
// removeClassList---------------------------------------------------------
function activeBtn() {
    const button = document.getElementsByClassName("category-btn")
    for (let btn of button) {
        btn.classList.remove('active')
    }

}

document.getElementById('videoSearch').addEventListener("keyup", (e) => {
    displayLoadCategory(e.target.value)
})

// sort button-------------------------------------------------
const buttonSort = () => {
    const sortBtn = document.getElementById('sort-btn')
    console.log(sortBtn, "hello")
    displaySort()

}
// let names = ["Banana", "Apple", "Mango", "Orange"];
// names.sort();
// console.log(names);
const displaySort = async() => {
    const url = `https://openapi.programming-hero.com/api/phero-tube/videos`
    const res = await fetch(url)
    let data = await res.json()
    console.log(data.videos)
}
displayLoadCategory()
loadCategorise()