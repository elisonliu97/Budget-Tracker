let db;
// create a new db request for a database
const request = window.indexedDB.open("BudgetDB", 1);

// create an objectStore with autoIncrement being true
request.onupgradeneeded = ({ target }) => {
    const db = target.result
    db.createObjectStore("BudgetStore", { autoIncrement: true });
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
function saveRecord(record) {
    // create a transaction on BudgetStore with readwrite access
    const transaction = db.transaction(["BudgetStore"], "readwrite");
    // access your pending object store
    const BudgetStore = transaction.objectStore("BudgetStore");
    // add record to object store with add method
    BudgetStore.add(record);
}

// function to check database
function checkDatabase() {
    // create a transaction on BudgetStore with readwrite access
    const transaction = db.transaction(["BudgetStore"], "readwrite");
    // access your pending object store
    const pending = transaction.objectStore("BudgetStore");
    // get all records from object store 
    const getAll = pending.getAll();

    // on success
    getAll.onsuccess = () => {
        // if object store not empty, post to database
        if (getAll.result.length > 0) {
            fetch('/api/transaction/bulk', {
                method: 'POST',
                body: JSON.stringify(getAll.result),
                headers: {
                    Accept: 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                },
            })
            // format data to be in json format
            .then((response) => response.json())
            // clear the object store
            .then(() => {
                const transaction = db.transaction(["BudgetStore"], "readwrite");
                const pending = transaction.objectStore("BudgetStore");
                pending.clear();
            })
        }
    }
}

// event listener to check if online
window.addEventListener('online', checkDatabase)