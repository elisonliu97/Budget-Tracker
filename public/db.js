let db;
// create a new db request for a database
const request = window.indexedDB.open("BudgetDB", 1);

// create an objectStore with autoIncrement being true
request.onupgradeneeded = ({ target }) => {
    const db = target.result
    db.createObjectStore("BudgetStore", {autoIncrement: true});
}

request.onsuccess = (event) => {
    db = event.target.result;
    
    if (navigator.onLine) {
        checkDatabase();
    }
}

request.onerror = (event) => {
    console.log(event.target.errorCode)
}

// function to save record

// function to check database

// event listener to check if online