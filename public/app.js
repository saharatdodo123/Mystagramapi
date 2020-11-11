const addImagestoGallery = (res) => {
  const gallery = document.querySelector(".gallery");
  let html = "";
  res.results.forEach((element) => {
      html += `
    <section class="photo">
    <header class="photo__header">
      <div class="photo__header-column">
      <a href="profile.html?username=${element.user.username}">
        <img
            class="photo__avatar"
            src=${
              element.user.profile_image.small
            }
            />
        </div>
        <div class="photo__header-column">
            <span class="photo__username"<a href="profile.html?username=${element.user.username}">${element.user.username}</a></span>
        </div>
      </header>
      <div class="photo__file-container">
            <img
                class="photo__file"
                src=${
                  element.urls.raw
                }
          />
        </div>
        <div class="photo__info">
                <div class="photo__icons">
                  <span class="photo__icon">
                    <i class="fa fa-heart-o heart fa-lg"></i>
                  </span>
                  <span class="photo__icon">
                    <i class="fa fa-comment-o fa-lg"></i>
                  </span>
                  </div>
                  <span class="photo__likes">${element.likes}likes</span>
                  <div class="photo__comments">
                            <div class="photo__comment">
                  <span class="photo__comment-author"><a href="profile.html?username=${element.user.username}">${element.user.username}</a></span>${element.alt_description}
                  </div>
                  </div>
            </div>
            </section>
        `;
  });
  gallery.innerHTML = html;
};
const callAPI = async(keyword) => {
  try {
      console.log("keyword --> ", keyword);//res-resporse req-requset
      const response = await fetch("/api/searchPhotos", {//response คำตอบ requeat คำถาม
          method: "POST",
          headers: {//คำอยู่ใน{}คือobject
              Accept: "application/json",
              "Content-Type": "application/json",
          },
          body: JSON.stringify({ keyword }),//JSON.stringifyแปลงค่าเป็นjson
      });
      const res = await response.json();
      //check response return from our API
      console.log("response ----> ", res);
      addImagestoGallery(res);
  } catch (error) {
      console.log("message error --->", error);
      //Do Something
  }
};
const removeAllPhoto = () => {
  const galleryElement = document.querySelector(".gallery");
  galleryElement.innerHTML = "";
};
const searchPhoto = (event) => {//=คือการกำหนดค่า ==คือเปรียบเทียบค่าเท่ากันสองฝั่งไหม ===คือเปรียบเทียบค่าเท่ากันสองฝั่งและชนิดข้อมูล
  const keyword = event.target.value;
  if (event.key === "Enter" && keyword) {//&& ค่าจริงทั้งคู่ && keyword ต้องไม่ใช้ค่าว่าง
      removeAllPhoto();
      //5. Call API
      callAPI(keyword);
  }
};
const main = () => {
  //ทำหาองค์ประกอบของclass=search แล้วเก็บไว้ในตัวแปลinputElement
  const inputElement = document.querySelector(".search");
  //inputElementเรียกผ่านfunction addEventlistener  keydownที่เรียกใช้ผ่านที่เรากดลงไปในkey
  inputElement.addEventListener("keydown", searchPhoto);
};
main();