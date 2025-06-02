import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-app.js";
import { firebaseConfig } from "./config.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-auth.js";
import { getDatabase, ref, set,onValue } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-database.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const database = getDatabase(app)

// const show = document.getElementById('show');

onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log(user);
        show.innerHTML = `
            <h3>Welcome ${user.displayName}</h3>
            <img src=${user.photoURL} alt="Profile Picture" style="width: 100px; height: 100px; border-radius: 100%;" />
        `
    } else {
        setTimeout(()=>{
            window.location.href = 'signin.html'
        }, 500)
    }
});
const addTodo = () => {
    const myTodo = document.getElementById('todo').value
    if (myTodo == '') {
        alert('emptyyyyyyyyyyyyyyyyyyyyyy!!')
    } else {
        console.log(myTodo);
        let time = new Date().toLocaleTimeString()
        let date = new Date().toLocaleDateString()
        const todoObj = { myTodo, time, date }
        console.log(todoObj);
        // Generate a unique key for each todo
        const newTodoRef = ref(database, 'todos/' + Date.now());
        set(newTodoRef, todoObj)
    }
};

let newRef = ref(database, 'todos')

onValue(newRef, (snapshot) => {
    const data = snapshot.val();
    console.log(data);
    display.innerHTML = ''
    if (data) {
        Object.entries(data).forEach(([key, info], i) => {
            display.innerHTML += `
            <div id="todo-${key}">
                <p>${i + 1}. <strong>${info.myTodo}</strong></p>
                <small>${info.time} ${info.date}</small>
                <button onclick="editTodo('${key}', '${info.myTodo.replace(/'/g, "\\'")}')">Edit</button>
                <button onclick="deleteTodo('${key}')">Delete</button>
            </div>
            `;
        });

        // Edit todo function
        window.editTodo = (key, currentValue) => {
            const newValue = prompt("Edit your todo:", currentValue);
            if (newValue !== null && newValue.trim() !== "") {
            const todoRef = ref(database, 'todos/' + key);
            set(todoRef, {
                myTodo: newValue,
                time: new Date().toLocaleTimeString(),
                date: new Date().toLocaleDateString()
            });
            }
        };

        // Delete todo function
        window.deleteTodo = (key) => {
            if (confirm("Are you sure you want to delete this todo?")) {
            const todoRef = ref(database, 'todos/' + key);
            set(todoRef, null);
            }
        };
        }
        // Clear input after adding todo
        window.addTodo = () => {
            addTodo();
            document.getElementById('todo').value = '';
        };
});
window.addTodo = addTodo;


        //         // Generate a unique key for each todo
        //         const newTodoRef = ref(database, 'todos/' + Date.now());
        //         set(newTodoRef, todoObj)
        //             .then(() => {
        //                 alert('Todo added successfully!');
        //                 document.getElementById('todo').value = '';
        //             })
        //             .catch((error) => {
        //                 alert('Error adding todo: ' + error.message);
        //             });
        //     }
        // }