document.querySelector(".transparent-search__submit-button").addEventListener('click', getData);
document.querySelector(".clear__localStorage-button").addEventListener('click', clearLocalstorage)
async function fetchData(url) {
    try {
        let response = await fetch(url);
        let data = await response.json();
        console.log("our data" +data);
        return data
    }
    catch (error) {
        console.log(error);
    }
}



function setName(dataName) {
    if (dataName == null)
        document.querySelector(".transparent-rectangle__name").innerHTML = "No Name!";

    else
        document.querySelector(".transparent-rectangle__name").innerHTML = dataName;
}
function setBlog(dataBlog) {
    if (dataBlog == null)
        document.querySelector(".transparent-rectangle__blog").innerHTML = "No blog!";
    else
        document.querySelector(".transparent-rectangle__blog").innerHTML = dataBlog;
}

function setLocation(dataLocation) {
    if (dataLocation == null)
        document.querySelector(".transparent-rectangle__location").innerHTML = "No location!";

    else
        document.querySelector(".transparent-rectangle__location").innerHTML = dataLocation;
}

function setBio(dataBio) {
    if (dataBio == null)
        document.querySelector(".transparent-rectangle__bio").innerHTML = "No bio!";
    else
        document.querySelector(".transparent-rectangle__bio").innerHTML = dataBio;
}
function setImage(dataImage) {

    document.querySelector(".transparent-rectangle__avatar_url").src = dataImage;
}


async function getData(e) {
    const username = document.querySelector('.transparent-search__input').value;
    if (username == "") {
        console.log("there is no username");
        return;
    }
    e.preventDefault();
    let str1 = "https://api.github.com/users/";
    let url = str1.concat(String(username));
    let wholeData;
    if (username in localStorage) {
        console.log("the username is in localStorage"+ localStorage);
        wholeData = await JSON.parse(window.localStorage.getItem(username));
    }
    else {
        wholeData = await fetchData(url);
        localStorage.setItem(username, JSON.stringify(wholeData));
    }
    let dataName = wholeData.name;
    let dataBlog = wholeData.blog;
    let dataLocation = wholeData.location;
    let dataBio = wholeData.bio;
    let dataImage = wholeData.avatar_url;
    setName(dataName)
    setBlog(dataBlog)
    setLocation(dataLocation)
    setBio(dataBio)
    setImage(dataImage)

}
function clearLocalstorage(e) {
    localStorage.clear();
}