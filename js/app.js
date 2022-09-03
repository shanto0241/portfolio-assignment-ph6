// Call Category List
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

// Display Category List
const displayCategories = (categoryLists) => {
  const categoryId = document.getElementById("categories");
  //   console.log(categoryLists, "lasdkj");
  const categoryList = categoryLists;
  categoryNewsList(
    categoryList[categoryList.length - 1].category_id,
    categoryList[categoryList.length - 1].category_name
  );
  categoryList.forEach((element) => {
    const category_id = element.category_id;
    const category_name = element.category_name;
    console.log(typeof category_id);
    const div = document.createElement("div");
    div.innerHTML = `<h1 onClick="categoryNewsList('${category_id}','${category_name}')" class="hover:bg-cyan-900 hover:text-white tracking-wide px-4 py-2 rounded transition duration-300 ease-out hover:ease-in">${element.category_name}</h1>`;
    categoryId.appendChild(div);
  });
  mainLoader(true);
};

// Main Loader Function
const mainLoader = (mainLoading) => {
  const mainLoader = document.getElementById("main-loader");
  if (mainLoading == true) {
    mainLoader.classList.add("hidden");
  } else {
    mainLoader.classList.remove("hidden");
  }
};

// Call Category List by Category Id
const categoryNewsList = async (category_id, category_name) => {
  newsLoader(true);
  console.log(category_id, category_name);
  const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
  const res = await fetch(url);
  const data = await res.json();
  //   console.log(data, category_name);
  displayNews(data.data, category_name);
};

// Display Category List
const displayNews = (newsList, category_name) => {
  const newsContainer = document.getElementById("display-news");
  const counter = document.getElementById("counter");
  newsContainer.innerHTML = "";
  if (newsList.length < 1) {
    newsContainer.innerHTML = `<p> News Not Found </p>`;
  } else {
    counter.innerHTML = `<p> ${
      newsList.length - 1
    } Items found in ${category_name} </p>`;
    newsList.forEach((element) => {
      const newsBox = document.createElement("div");
      newsContainer.appendChild(newsBox);
      newsBox.classList.add("card-item");
      newsBox.classList.add("flex");
      newsBox.classList.add("gap-4");
      newsBox.classList.add("mb-4");
      console.log(element);
      newsBox.innerHTML = `<div class="card-image w-1/4">
					<img class=" shadow-xl" src="${element.thumbnail_url}" alt="">
				</div>
				<div class="card-news w-3/4">
					<h1 class="headlines text-2xl font-semibold text-slate-800">
					${element.title}</h1>
					<p class="text-md text-gray-600 py-2">${
            element.details.substring(0, 300) + "..."
          }
					</p>
					<div class="news-details justify-between flex gap-2">
						<div class="author flex gap-2 pt-4 items-center">
							<div class="w-9">
								<img src="${element.author.img}" alt="">
							</div>
							<div>
								<p>${element.author.name}</p>
								<p class="text-sm">${element.author.published_date}</p>
							</div>
						</div>
						<div class="views flex items-center gap-2">
							<img class="w-5" src="./assets/eye.svg" alt="">
							<p class="text-md font-bold text-gray-500">${element.total_view}</p>
						</div>
						<div class="reviews flex gap-2 justify-evenly">
							<img src="./assets/star.svg" alt="" class="w-5">
							<img src="./assets/star.svg" alt="" class="w-5">
							<img src="./assets/star.svg" alt="" class="w-5">
							<img src="./assets/star.svg" alt="" class="w-5">
							<img src="./assets/star.svg" alt="" class="w-5">
						</div>
						<button class="text-cyan-800 hover:text-blue-900 text-md px-4 rounded">Read more...</button>
					</div>
				</div>`;
      newsContainer.appendChild(newsBox);
    });
  }
  newsLoader(false);
};

// News Loader Funtion

const newsLoader = (isNewsLoader) => {
  const newsLoader = document.getElementById("news-loader");
  if (isNewsLoader == true) {
    newsLoader.classList.remove("hidden");
  } else {
    newsLoader.classList.add("hidden");
  }
};
callCategoriesApi();
