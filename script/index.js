const removeActiveClass = () => {
  const categoryBtns = getCLASS("active");
    for (const btn of categoryBtns) {
        btn.classList.remove("active");
    }
};

const loadCategory = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((response) => response.json())
    .then((data) => displayCategories(data.categories));
};

const loadCategoryVideos = (id) => {
    const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
    console.log(url);
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            removeActiveClass();
            let clickedBtn = getID(`btn-${id}`);
            clickedBtn.classList.add("active");
            displayVideos(data.category);
        });
};

const loadVideos = (video) => {
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
      .then((response) => response.json())
      .then((data) => {
        removeActiveClass();
        getID("btn-all").classList.add("active");
        displayVideos(data.videos)
      });
    };

const displayCategories = (categories) => {
  for (const cat of categories) {
    const categoryContainer = getID("category-container");
    const div = createElement("div");
    div.classList.add("space-x-3", "md:space-x-5");
    div.innerHTML = `
        <button id="btn-${cat.category_id}" onclick="loadCategoryVideos( ${cat.category_id} )" class="category-btn btn btn-sm bg-[#25252526] text-black hover:bg-[#FF1F3D] hover:text-white">
            ${cat.category}
        </button>
        `;
    categoryContainer.appendChild(div);
  }
};

const displayVideos = (videos) => {
    const videoContainer = getID("video-container");
    videoContainer.innerHTML = "";

    if(videos.length==0){
        videoContainer.innerHTML = `
        <div class="flex flex-col items-center justify-center col-span-full p-6">
          <img src="./images/Icon.png" alt="icon">
          <h1 class="text-xl md:text-3xl font-bold text-center text-[#171717] mt-6">Oops!! Sorry, There is no<br>content here</h1>
        </div>
        `;
        return;
    };

  videos.forEach(video => {
    const div = createElement("div");
    div.innerHTML = `
<div class="bg-base-100 cursor-pointer">
          <figure class="relative">
            <img
              class="w-full h-40 rounded-lg object-cover"
              src=" ${video.thumbnail} "
              alt="Shoes"
            />
            <span class="absolute bottom-2 right-1 text-[10px] p-1 bg-black text-white rounded">3hrs 56 min ago</span>
          </figure>

          <div class="flex py-4 gap-2">
            <div class="avatar">
              <div class="ring-primary rounded-full w-10 h-10">
                <img
                  src=" ${video.authors[0].profile_picture} "
                  alt="avatar"
                />
              </div>
            </div>
            <div>
              <h5 class="mb-1 font-bold"> ${video.title} </h5>
              <p
                class="flex items-center gap-2 mb-1 text-sm text-[#171717b3]"
              >${video.authors[0].profile_name} 
                <img
                  class="w-5 h-5"
                  src="./images/verified.png"
                  alt="verified"
                />
              </p>
              <p class="text-sm text-[#171717b3]">91K views</p>
            </div>
          </div>
        </div>
        `;
    videoContainer.appendChild(div);
  });
};

loadCategory();
loadVideos();
