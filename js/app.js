const callCategoriesApi = async () => {
  try {
    mainLoader(false);
    const url = "https://openapi.programming-hero.com/api/news/categories";
    const res = await fetch(url);
    const data = await res.json();
    const categoryLists = data.data.news_category;
    displayCategories(categoryLists);
  } catch (error) {}
};

const displayCategories = (categoryLists) => {
  const categoryId = document.getElementById("categories");
  categoryLists.forEach((element) => {
    console.log(element);
    const div = document.createElement("div");
    div.innerHTML = `<h1 class="hover:bg-cyan-900 hover:text-white tracking-wide px-4 py-2 rounded transition duration-300 ease-out hover:ease-in">${element.category_name}</h1>`;
    categoryId.appendChild(div);
  });
  mainLoader(true);
};

const mainLoader = (mainLoading) => {
  const mainLoader = document.getElementById("main-loader");
  if (mainLoading == true) {
    mainLoader.classList.add("hidden");
  } else {
    console.log("a;sdkjf");
    mainLoader.classList.remove("hidden");
  }
};
callCategoriesApi();
