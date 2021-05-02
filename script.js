document.querySelector(".transparent-search__submit-button").addEventListener('click', getData);
document.querySelector(".clear__localStorage-button").addEventListener('click', clearLocalstorage)
async function fetchData(url) {
    try {
        let response = await fetch(url);
        let data = await response.json();
        return data
    }
    catch (error) {
        console.log(error);
    }
}



function setName(dataName) {
    if (dataName == null || dataName == "")
        document.querySelector(".transparent-rectangle__name").innerHTML = "No Name!";

    else
        document.querySelector(".transparent-rectangle__name").innerHTML = dataName;
}
function setBlog(dataBlog) {
    if (dataBlog == null || dataBlog == "")
        document.querySelector(".transparent-rectangle__blog").innerHTML = "No blog!";
    else
        document.querySelector(".transparent-rectangle__blog").innerHTML = dataBlog;
}

function setLocation(dataLocation) {
    if (dataLocation == null || dataLocation == "")
        document.querySelector(".transparent-rectangle__location").innerHTML = "No location!";

    else
        document.querySelector(".transparent-rectangle__location").innerHTML = dataLocation;
}

function setBio(dataBio) {
    if (dataBio == null || dataBio == "")
        document.querySelector(".transparent-rectangle__bio").innerHTML = "No bio!";
    else
        document.querySelector(".transparent-rectangle__bio").innerHTML = dataBio;
}
function setImage(dataImage) {
    document.querySelector(".transparent-rectangle__avatar_url").src = dataImage;
}


async function getData(e) {
    const username = document.querySelector('.transparent-search__input').value;
    if (username == null) {
        document.querySelector(".print__scroll-bar").innerHTML = "there is no username"
        return;
    }
    e.preventDefault();
    let str1 = "https://api.github.com/users/";
    let url = str1.concat(String(username));
    let wholeData;
    if (typeof (Storage) !== "undefined") {
        if (username in localStorage) {
            document.querySelector(".print__scroll-bar").innerHTML = "user name existed in Local Storage, to see our localStorage, visit console..."
            console.log("hi again!, our localStorage:\n", localStorage);
            wholeData = await JSON.parse(localStorage.getItem(username));
        }
        else {
            document.querySelector(".print__scroll-bar").innerHTML = "User name didn't exist in Local Storage, to see our data , visit console..."
            wholeData = await fetchData(url);
            console.log("hi again!, our data:\n", wholeData)
            localStorage.setItem(username, JSON.stringify(wholeData));
        }
    }
    else {
        document.querySelector(".print__scroll-bar").innerHTML = "No web storage Support..."
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
    document.querySelector(".print__scroll-bar").innerHTML = "the local storage is empty now, to see our localStorage, visit console..."
    console.log("hi again!,our localStorage:\n", localStorage);
}