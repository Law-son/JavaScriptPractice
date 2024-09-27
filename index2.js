//using a callback function
function getDataFromServer(callback) {
    console.log("Fetching data...");
    setTimeout(() => {
        // Simulating a server request with setTimeout
        callback("Data received");
    }, 2000);
}

//the callback function
function processData(data) {
    console.log("Processing: " + data);
}

getDataFromServer(processData); // 'processData' is the callback function


//JavaScript promise
let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        let success = true;
        if (success) {
            resolve("Data fetched successfully");
        } else {
            reject("Error fetching data");
        }
    }, 2000);
});

//using the promise
promise
    .then(result => console.log(result))  // Success handler
    .catch(error => console.error(error)); // Error handler

//Chained promises
//promise 1
function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Data received");
        }, 1000);
    });
}

//promise 2
function processData(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(`Processed: ${data}`);
        }, 1000);
    });
}


//running the chainged promises
fetchData()
    .then(data => processData(data))
    .then(result => console.log(result))
    .catch(error => console.error(error));


//asynchronous functions
async function fetchAndProcessData() {
    try {
        const data = await fetchData();  // Waits for the promise to resolve
        const result = await processData(data);  // Waits for the second promise
        console.log(result);
    } catch (error) {
        console.error(error);  // Handles any error
    }
}

fetchAndProcessData();

//how it wpuld have looked like using promises
fetchData()
    .then(data => processData(data))
    .then(result => console.log(result))
    .catch(error => console.error(error));


//asynchronous functions to fetch from an api
async function getUserData(userId) {
    try {
        let response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        if (!response.ok) throw new Error("Network response was not ok");
        let data = await response.json();
        console.log(data);
    } catch (error) {
        console.error("Error fetching user data:", error);
    }
}

getUserData(1);
