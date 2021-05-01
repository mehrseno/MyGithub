document.querySelector('.transparent-search__submit-button').addEventListener('click', fetchData);

async function fetchData(e) {
    if (username ==""){
        console.log("there is no username");
        return;}
    e.preventDefault();
    let username = document.querySelector('.transparent-search__input').value;
    let str1 = "https://api.github.com/users/";
    let url = str1.concat(String(username));
    try {
        let response = await fetch(url);
        let data = await response.json();
        console.log(data);
        return data
    }
    catch (error) {
        console.log(error);
    }
}
async function getData() {
    let mydata = await fetchData();
    console.log(mydata.id)
    return mydata
}

