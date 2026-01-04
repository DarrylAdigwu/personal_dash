
const getBackgroundImage = async () => {
  try {
    const response = await fetch(`https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature`);
    const data = await response.json()

    document.body.style.backgroundImage = `url(${data.urls.full})`;

    console.log(data.urls.full)
    document.getElementById("author").textContent = `By: ${data.user.first_name} ${data.user.last_name}`
  } catch(err) {
    document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1506744038136-46273834b3fb?crop=entropy&cs=srgb&fm=jpg&ixid=M3wxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3Njc1MDUyOTV8&ixlib=rb-4.1.0&q=85)`
  }

}

getBackgroundImage();