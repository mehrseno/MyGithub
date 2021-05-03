document.querySelector(".transparent-search__submit-button").addEventListener('click', getWholeData);
document.querySelector(".clear__localStorage-button").addEventListener('click', clearLocalstorage)

async function getWholeData(e) {
    const username = document.querySelector('.transparent-search__input').value;
    if (username == "") {
        document.querySelector(".print__scroll-bar").innerHTML = "there is no username"
        return;
    }
    e.preventDefault();
    let str1 = "https://api.github.com/users/";
    let url = str1.concat(String(username));
    let wholeData;
    if (typeof (Storage) != "undefined") {
        if (username in localStorage) {
            document.querySelector(".print__scroll-bar").innerHTML = "user name existed in Local Storage, to see our localStorage, visit console..."
            console.log("hi again!, our localStorage:\n", localStorage);
            wholeData = await JSON.parse(localStorage.getItem(username));
        }
        else {
            document.querySelector(".print__scroll-bar").innerHTML = "User name didn't exist in Local Storage, to see our data , visit console..."
            let response;
            try {
                response = await fetch(url);
                // if (response == null) {
                if (response.status == 200) {
                    wholeData = await response.json();
                    console.log("hi again!, our data:\n", wholeData);
                    localStorage.setItem(username, JSON.stringify(wholeData));
                }
                else {
                    console.log("an error accured");
                    if (response.status == 404) {
                        document.querySelector(".print__scroll-bar").innerHTML = "This username does not exist, response status :" + String(response.status)
                    }
                }
            }
            catch (error) {
                document.querySelector(".print__scroll-bar").innerHTML = error

            }

        }
    }
    else {
        document.querySelector(".print__scroll-bar").innerHTML = "No web storage Support..."
    }
    if (wholeData != null || wholeData != "undifined") {
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
function clearLocalstorage(e) {
    localStorage.clear();
    document.querySelector(".print__scroll-bar").innerHTML = "the local storage is empty now, to see our localStorage, visit console..."
    console.log("hi again!,our localStorage:\n", localStorage);
}