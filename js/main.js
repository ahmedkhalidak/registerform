var name1 = document.getElementById("name1");
var age = document.getElementById("age");
var course = document.getElementById("courses");
var add = document.getElementById("add");
var deleteBtn = document.getElementById("delete");
var dataUser;

if (localStorage.users != null) {
  dataUser = JSON.parse(localStorage.users);
} else {
  dataUser = [];
}

// تحقق من الإدخال في الحقل age عند النقر على زر add
add.onclick = function () {
  var nameValue = name1.value.trim();
  var ageValue = parseInt(age.value);

  if (!/^[A-Za-z]+$/.test(nameValue)) {
    name1.classList.add("red-background");
    return;
  } else {
    name1.classList.remove("red-background");
  }

  if (ageValue < 18 || ageValue > 60) {
    age.classList.add("red-background");
    return;
  } else {
    age.classList.remove("red-background");
  }

  var data = {
    name1: nameValue,
    age: ageValue,
    courses: Array.from(course.selectedOptions).map((option) =>
      option.value.trim()
    ),
  };
  dataUser.push(data);
  localStorage.setItem("users", JSON.stringify(dataUser));
  clearData();
  readData();
};

age.addEventListener("input", function () {
  var ageValue = parseInt(age.value);

  if (isNaN(ageValue) || ageValue < 18 || ageValue > 60) {
    age.classList.add("red-background");
  } else {
    age.classList.remove("red-background");
  }
});

name1.addEventListener("input", function () {
  var nameValue = name1.value.trim();
  if (!/^[A-Za-z]+$/.test(nameValue)) {
    name1.classList.add("red-background");
  } else {
    name1.classList.remove("red-background");
  }
});

function deleteLastData() {
  if (dataUser.length > 0) {
    dataUser.pop();
    localStorage.setItem("users", JSON.stringify(dataUser));
    readData();
  }
}
// clear data
function clearData() {
  name1.value = "";
  age.value = "";
  course.value = "";
}

// read
function readData() {
  var table = "";
  for (var i = 0; i < dataUser.length; i++) {
    table += `<tr>
        <td>${dataUser[i].name1}</td>
        <td>${dataUser[i].age}</td>
        <td>${dataUser[i].courses}</td>
        <td><button class="btn btn-danger" id="update">update</button></td>
        <td><button onclick="deleteData(${i})" class="btn btn-danger" id="delete">Delete</button></td>
        </tr>`;
  }
  document.getElementById("tbody").innerHTML = table;
  var btnDeleteAll = document.getElementById("deleteall");
  if (dataUser.length > 0) {
    btnDeleteAll.innerHTML = `
    <button onclick="deleteAll()" class="btn btn-danger" id="deleteall">Delete All</button>`;
  } else {
    btnDeleteAll.innerHTML = "";
  }
}

// delete
function deleteData(i) {
  dataUser.splice(i, 1);
  localStorage.users = JSON.stringify(dataUser);
  readData();
}
// delete all
function deleteAll() {
  localStorage.clear();
  dataUser.splice(0);
  readData();
}

// search
function searchdata(value) {
  var table = "";
  for (var i = 0; i < dataUser.length; i++) {
    if (dataUser[i].name1.includes(value)) {
      table += `<tr>
            <td>${dataUser[i].name1}</td>
            <td>${dataUser[i].age}</td>
            <td>${dataUser[i].courses}</td>
            <td><button class="btn btn-danger" id="update">update</button></td>
            <td><button onclick="deleteData(${i})" class="btn btn-danger" id="delete">Delete</button></td>
            </tr>`;
    } else {
      // not found
      table += `<tr>
            <td colspan="5" style="text-align: center;">No Data Found</td>
            </tr>`;
    }

    document.querySelector("tbody").innerHTML = table;
  }
}
readData();
