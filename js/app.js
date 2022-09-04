// Call Category List
const callCategoriesApi = async () => {
  try {
    mainLoader(true);
    const url = "https://openapi.programming-hero.com/api/news/categories";
    const res = await fetch(url);
    const data = await res.json();
    const categoryLists = data.data.news_category;
    displayCategories(categoryLists);
  } catch (error) {
    const categoryId = document.getElementById("categories");
    categoryId.innerText = "something is worng";
    //   console.log(error.message);

    mainLoader(false);
  }
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
    const div = document.createElement("div");
    div.innerHTML = `<h1 onClick="categoryNewsList('${category_id}','${category_name}')" class="hover:bg-cyan-900 hover:text-white tracking-wide px-4 py-2 rounded transition duration-300 ease-out hover:ease-in cursor-pointer">${element.category_name}</h1>`;
    categoryId.appendChild(div);
  });
  mainLoader(false);
};

// Main Loader Function
const mainLoader = (mainLoading) => {
  const mainLoader = document.getElementById("main-loader");
  if (mainLoading == true) {
    mainLoader.classList.remove("hidden");
  } else {
    mainLoader.classList.add("hidden");
  }
};

// Call News List by Category Id
const categoryNewsList = async (category_id, category_name) => {
  try {
    newsLoader(true);
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayNews(data.data, category_name);
  } catch (error) {
    const newsContainer = document.getElementById("display-news");
    newsContainer.innerText = "No News Found";
    newsLoader(false);
  }
};

// Display Category List
const displayNews = (newsList, category_name) => {
  const newsContainer = document.getElementById("display-news");
  const counter = document.getElementById("counter");
  newsContainer.innerHTML = "";
  // sortign newslis with max views
  newsList.sort((a, b) => parseFloat(b.total_view) - parseFloat(a.total_view));
  if (newsList.length < 1) {
    newsContainer.innerHTML = `<p> News Not Found </p>`;
  } else {
    counter.innerHTML = `<p> ${
      newsList.length - 1
    } Items found in ${category_name} </p>`;
    newsList.forEach((element) => {
      const newsBox = document.createElement("div");
      newsContainer.appendChild(newsBox);
      newsBox.classList.add("bg-slate-100");
      newsBox.classList.add("p-4");
      newsBox.classList.add("rounded-lg");
      newsBox.classList.add("flex");
      newsBox.classList.add("gap-4");
      newsBox.classList.add("mb-10");
      newsBox.innerHTML = `<div class=" w-1/4 ">
					<img class=" shadow-xl rounded-lg" src="${element.thumbnail_url}" alt="">
				</div>
				<div class="card-news w-3/4 flex  justify-center  items-center ">
					<div>
					<h1 class="headlines text-2xl font-semibold text-slate-800">
					${element.title}</h1>
					<p class="text-md text-gray-600 py-2">${
            element.details.substring(0, 300) + "..."
          }
					</p>
					<div class="news-details justify-between items-center flex gap-2">
						<div class="author flex gap-2 pt-4 items-center">
							<div class="w-9">
								<img src="${element.author.img}" alt="">
							</div>
							<div>
								<p class="text-gray-900">${element.author.name}</p>
								<p class="text-sm text-gray-600">${element.author.published_date}</p>
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
							<label onClick="newsDetails('${
                element._id
              }')" for="my-modal" class="text-cyan-800 hover:text-blue-900 text-md px-4 rounded modal-button">read more...
							</label>
					</div>
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

// get news detail list
const newsDetails = async (news_id) => {
  console.log(news_id);
  const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
  const res = await fetch(url);
  const data = await res.json();

  console.log(data, "alsdjkf");
  showNewsDetailsInModal(data.data);
};

// show News Details in modal
const showNewsDetailsInModal = (newsDetails) => {
  const showModal = document.getElementById("news_details_modal");
  showModal.innerHTML = "";
  showModal.innerHTML = ` <div class="w-full flex justify-end">
      <label for="my-modal" class="">
		<img class="w-5 " src="./assets/cross-circle(1).svg" alt="">
	  </label>
    </div>`;
  newsDetails.forEach((element) => {
    const newsBox = document.createElement("div");
    newsBox.classList.add("card-item");
    newsBox.classList.add("gap-4");

    newsBox.classList.add("flex");
    newsBox.classList.add("mb-4");
    newsBox.innerHTML = `
	
	<div class="card-image w-1/4">
					<img class=" shadow-xl" src="${element.thumbnail_url}" alt="">
				</div>
				<div class="card-news w-3/4">
					<h1 class="headlines text-2xl font-semibold text-slate-800">
					${element.title}</h1>
					<p class="text-md text-gray-600 py-2">${element.details}
					</p>
					<div class="news-details justify-between flex gap-2">
						<div class="author flex gap-2 pt-4 items-center">
							<div class="w-9">
								<img src="${element.author.img}" alt="">
							</div>
							<div>
								<p class="text-gray-900">${element.author.name}</p>
								<p class="text-sm text-gray-600">${element.author.published_date}</p>
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
						</div>
				</div>
				`;
    showModal.appendChild(newsBox);
  });
};
callCategoriesApi();
