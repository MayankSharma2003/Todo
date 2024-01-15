// const todoTextNode = document.getElementById("newtodo");
// const signup = document.getElementById("btn");
// const file = document.getElementById("file");
// const fileInput = document.querySelector('input[type="file"]');

// const userName = prompt("(REQUIRED)Enter your name : ");

// getTodos();

// signup.addEventListener("click", function (e) {
//   const id = Math.random();
//   const todoTextValue = todoTextNode.value;
//   const file = fileInput.files[0];
//   todoTextNode.value = "";

  
//   if (todoTextValue) {
//   const formData = new FormData();
//   formData.append("text",todoTextValue);
//   formData.append("createdBy", userName);
//   formData.append("id",id);
//   formData.append("flag",0);
//   formData.append("pic",file);
//     saveTodo(formData, function (error) {
//       if (error) {
//         alert(error);
//       } else {
//         console.log(error);
//         addTodoToDOM(todoTextValue, id ,error);
//       }
//     });
//   } else {
//     alert("Please enter a todo");
//   }
// });


// async function addTodoToDOM(todo, id, filename ) {
//   const todoList = document.getElementById("todolist");
//   const todoItem = document.createElement("li");

//   todoItem.setAttribute("id", id);
//   //console.log(file.file);
//   if (typeof (todo) === "string") {
//   await fetch("/ASSIGNMENT9html")
//   .then(function(response){
//     return response.json();
//   })
//   .then(function(pic){
//     filename = pic.filename;
//     console.log(filename);
//   })
// }

//   if (typeof (todo) === "string") {
//     var inner = `<p class="b">${todo}</p>
//         <img src=${filename} alt="MAYANK" >
//         <input type="checkbox" class="check" id="${id}"/>
//         <span style="cursor : pointer;" class="cross" id="${id}">&#10006;</span>`
//   }
//   else {
//     if (todo.flag == 1) {
//       var inner = `<p class="a">${todo.text}</p>
//         <img src=${todo.fileName} >
//         <input type="checkbox" checked="on" class="check" id="${todo.id}"/>
//         <span style="cursor : pointer;" class="cross" id="${todo.id}">&#10006;</span>`
//     }
//     else {
//       var inner = `<p class="b">${todo.text}</p>
//         <img src=${todo.fileName} >
//         <input type="checkbox" class="check" id="${todo.id}"/>
//         <span style="cursor : pointer;" class="cross" id="${todo.id}">&#10006;</span>`
//     }
//   }
//   todoItem.innerHTML = inner;
//   todoList.appendChild(todoItem);
// }

// const ul = document.getElementById("todolist");

// ul.addEventListener("click", function (e) {
//   const id = e.target.getAttribute("id");
//   if (e.target.classList.contains("check")) {
//     if (e.target.checked) {
//       fetch("/ASSIGNMENT9todo", {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ id: id, createdBy: userName, flag: 0 }),
//       })

//       e.target.previousSibling.previousSibling.previousElementSibling.classList.remove('b');
//       e.target.previousSibling.previousSibling.previousElementSibling.classList.add('a');
//     }
//     else {
//       fetch("/ASSIGNMENT9todo", {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ id: id, createdBy: userName, flag: 0 }),
//       })

//       e.target.previousSibling.previousSibling.previousElementSibling.classList.remove('a');
//       e.target.previousSibling.previousSibling.previousElementSibling.classList.add('b');
//     }
//   }
//   if (e.target.classList.contains("cross")) {
//     deleteTodos(id, function (error) {
//       if (error) {
//         alert(error);
//       }
//       else {
//         e.target.parentNode.remove();
//       }
//     });
//   }
// });

// function saveTodo(formData, callback) {
//   fetch("/ASSIGNMENT9todo", {
//     method: "POST",
//     body: formData,
//   }).then(function (response) {
//     if (response.status === 200) {
//       callback();
//     } else {
//       callback("Something went wrong");
//     }
//   });
// }

// function getTodos() {
//   fetch("/store?name=" + userName)
//     .then(function (response) {
//       if (response.status !== 200) {
//         throw new Error("Something went wrong");
//       }
//       return response.json();
//     })
//     .then(function (todos) {
//       todos.forEach(function (todo) {
//         addTodoToDOM(todo);
//       });
//     })
//     .catch(function (error) {
//       alert(error);
//     });
// }

// function deleteTodos(id, callback) {
//   fetch("/ASSIGNMENT9todo", {
//     method: "DELETE",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ createdBy: userName, id: id, flag: 0 }),
//   }).then(function (response) {
//     if (response.status === 200) {
//       callback(); 
//     } else {
//       callback("Something went wrong");
//     }
//   });
// }

const todoTextNode = document.getElementById("newtodo");
const signup = document.getElementById("btn");
const file = document.getElementById("file");
const fileInput = document.querySelector('input[type="file"]');
const logout = document.getElementById("logout");

//const userName = prompt("(REQUIRED)Enter your name : ");

getTodos();

signup.addEventListener("click", function (e) {
  const id = Math.random();
  const todoTextValue = todoTextNode.value;
  const file = fileInput.files[0];
  todoTextNode.value = "";

  
  if (todoTextValue) {
  const formData = new FormData();
  formData.append("text",todoTextValue);
  // formData.append("username",'');
  // formData.append("password","");
  formData.append("id",id);
  formData.append("flag",0);
  formData.append("pic",file);
    saveTodo(formData, function (error) {
      if (error) {
        alert(error);
      } else {
        console.log(error);
        addTodoToDOM(todoTextValue, id ,error);
      }
    });
  } else {
    alert("Please enter a todo");
  }
});


async function addTodoToDOM(todo, id, filename ) {
  const todoList = document.getElementById("todolist");
  const todoItem = document.createElement("li");

  todoItem.setAttribute("id", id);
  //console.log(file.file);
  if (typeof (todo) === "string") {
  await fetch("/ASSIGNMENT9html",{method:"POST"})
  .then(function(response){
    return response.json();
  })
  .then(function(pic){
    filename = pic.filename;
    console.log(filename);
  })
}

  if (typeof (todo) === "string") {
    var inner = `<p class="b">${todo}</p>
        <img src=${filename} alt="MAYANK" >
        <input type="checkbox" class="check" id="${id}"/>
        <span style="cursor : pointer;" class="cross" id="${id}">&#10006;</span>`
  }
  else {
    if (todo.flag == 1) {
      var inner = `<p class="a">${todo.text}</p>
        <img src=${todo.fileName} >
        <input type="checkbox" checked="on" class="check" id="${todo.id}"/>
        <span style="cursor : pointer;" class="cross" id="${todo.id}">&#10006;</span>`
    }
    else {
      var inner = `<p class="b">${todo.text}</p>
        <img src=${todo.fileName} >
        <input type="checkbox" class="check" id="${todo.id}"/>
        <span style="cursor : pointer;" class="cross" id="${todo.id}">&#10006;</span>`
    }
  }
  todoItem.innerHTML = inner;
  todoList.appendChild(todoItem);
}

const ul = document.getElementById("todolist");

ul.addEventListener("click", function (e) {
  const id = e.target.getAttribute("id");
  if (e.target.classList.contains("check")) {
    if (e.target.checked) {
      fetch("/ASSIGNMENT9todo", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: id, flag: 0 }),
      })

      e.target.previousSibling.previousSibling.previousElementSibling.classList.remove('b');
      e.target.previousSibling.previousSibling.previousElementSibling.classList.add('a');
    }
    else {
      fetch("/ASSIGNMENT9todo", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: id,  flag: 0 }),
      })

      e.target.previousSibling.previousSibling.previousElementSibling.classList.remove('a');
      e.target.previousSibling.previousSibling.previousElementSibling.classList.add('b');
    }
  }
  if (e.target.classList.contains("cross")) {
    deleteTodos(id, function (error) {
      if (error) {
        alert(error);
      }
      else {
        e.target.parentNode.remove();
      }
    });
  }
});

// logout.addEventListener("click",function(){
//   fetch("loggingout",{method:"GET"});
// });

function saveTodo(formData, callback) {
  fetch("/ASSIGNMENT9todo", {
    method: "POST",
    body: formData,
  }).then(function (response) {
    if (response.status === 200) {
      callback();
    } else {
      callback("Something went wrong");
    }
  });
}

function getTodos() {
  fetch("/store")
    .then(function (response) {
      if (response.status !== 200) {
        throw new Error("Something went wrong");
      }
      return response.json();
    })
    .then(function (todos) {
      todos.forEach(function (todo) {
        addTodoToDOM(todo);
      });
    })
    .catch(function (error) {
      alert(error);
    });
}

function deleteTodos(id, callback) {
  fetch("/ASSIGNMENT9todo", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: id, flag: 0 }),
  }).then(function (response) {
    if (response.status === 200) {
      callback(); 
    } else {
      callback("Something went wrong");
    }
  });
}