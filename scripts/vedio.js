// loadCategorise
const lodeCategories = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then((res) => res.json())
        .then(data => displayCategorise(data.categories
        ))
        .catch(error => console.log(error))
}
// displayCategorise----------------------------
const displayCategorise = (categories) => {
    const btnCategorise = document.getElementById('categorise')
    categories.forEach((item) => {
        console.log(item)

        // btn-Create------------------------------
        const button = document.createElement("button")
        button.classList = "btn"
        button.innerText = item.category;

        btnCategorise.append(button)
    });


}

lodeCategories()