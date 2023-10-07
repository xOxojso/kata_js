

const tbody=document.querySelector("#tableBody");
const tableOfUsers=document.querySelector("#tableAllUsers");
let str="";
$(document).ready(async function() {
    let users=await fetch("http://localhost:8080/allUsers").then(r =>r.json());
    const template = document.querySelector('#product');
    users.forEach((u) => {
        let rol = "";
        u.roles.forEach((u) => {
            rol+= u.withoutPrefix + "  ";
        });
        str += `<tr id="dele${u.id}"><td>${u.id}</td> 
<td>${u.username}</td>
<td>${u.age}</td>
<td>${u.email}</td>
<td>${u.password}</td>
 <td>${rol}</td>
<td><button class="btn btn-info editbtn" >Edit</button></td>
<td><button class="btn btn-danger delbtn">Delete</button></td></tr>`;
    })
    tbody.innerHTML = str;
})



$(document).ready(async function () {
    let rolles = await fetch("http://localhost:8080/allRoles").then(r => r.json());
    let rol = "";
    rolles.forEach((r) => rol += `<option value="${r.role}">${r.withoutPrefix}</option>`);
    let sel = `<select name="sele" onchange="console.log($('#select').val())" id="select"  
multiple class="form-control sel" size="2">
${rol}
</select>`;
    document.getElementById('selector').innerHTML = sel;
})



async function rol(userRol) {
    console.log(userRol);
    let rolles = await fetch("http://localhost:8080/allRoles").then(r => r.json());
    let rol = "";
    for (let n = 0; n < rolles.length; n++) {
        rol += `<option value="${rolles[n].role}">${rolles[n].withoutPrefix}</option>`;
    }
    let sel = `<select name="sele" onchange="console.log($('#selectEdit').val())" id="selectEdit"  
multiple class="form-control sel" size="2">
${rol}
</select>`;
    document.getElementById('selectorEdit').innerHTML = sel;
}



$(document).ready(async function () {
    let principal = await fetch("http://localhost:8080/myPrincipal").then(r => r.json());
    for (let i = 0; i < principal.roles.length; i++) {
        if (principal.roles[i].role === 'ROLE_ADMIN') {
            return;
        }
    }
    $('#userpanel').hide();
    lookTablePrincipal();
})



async function lookTablePrincipal() {
    let princ = await fetch("http://localhost:8080/myPrincipal").then(r => r.json());
    $('#centralTable').hide();
    let rol = "";
    princ.roles.forEach((u) => {
        rol+= u.withoutPrefix + "  ";
    });
    let strPr = `<tr><td>${princ.id}</td>
<td>${princ.username}</td>
<td>${princ.age}</td>
<td>${princ.email}</td>
<td>${princ.password}</td>
<td>${rol}</td></tr>`;
    let tab = `
<div class="col-10 bg-light vh-150 p-4">
<h1>User information-page</h1> 
<div class=" show active border" id="user_panel" role="tabpanel" aria-labelledby="home-tab">
<td class="bg-white p-0"></td>
<h4 class=" px-5">About User</h4>
<table class="table table-striped ">
<thead>
<th>ID</th>
<th>Username</th>
<th>Age</th>
<th>Email</th>
<th>Password</th>
<th>Roles</th>
</thead>         
<tbody id="tbodyPrincip">${strPr}</tbody>
</table>
</div>
</div>`
    document.getElementById('us_tab').innerHTML = tab;
}



$('.action').on('click', async function () {
    lookTablePrincipal();
});
$(document).ready(async function () {
    let principal = await fetch("http://localhost:8080/myPrincipal").then(r => r.json());
    let rol = "";
    principal.roles.forEach((r) => {
        rol += r.withoutPrefix + "  "
    });
    document.getElementById('black').innerHTML = `<b>${principal.email}</b>` + ' with roles: ' + `<b>${rol}</b>`;
})



const usernameCreate = document.getElementById('usernameCreate');
const ageCreate = document.getElementById('ageCreate');
const emailCreate = document.getElementById('emailCreate');
const passwordCreate = document.getElementById('passwordCreate');

$(document).ready(async function () {
    $('.btnCreate').on('click', async function (e) {
        e.preventDefault();
        let u = await fetch('http://localhost:8080/makeUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: usernameCreate.value,
                age: ageCreate.value,
                email: emailCreate.value,
                password: passwordCreate.value,
                roles: $('#select').val()
            })
        }).then(f => f.json());
        usernameCreate.value = "";
        ageCreate.value = "";
        emailCreate.value = "";
        passwordCreate.value = "";
        document.getElementById('select').value = "";
        document.getElementById('ad_pan').click();
        let rol = "";
        u.roles.forEach((u) => {
            rol += u.withoutPrefix + " \n";
        });
        row = ` <tr id="dele${u.id}"><td>${u.id}</td>
<td>${u.username}</td>
<td>${u.age}</td>
<td>${u.email}</td>
<td>${u.password}</td>
<td>${rol}</td>
<td><button class="btn btn-info editbtn">Edit</button></td>
<td><button class="btn btn-danger delbtn">Delete</button></td></tr>`;
        tbody.insertAdjacentHTML('beforeend', row);
    })
})

const idEdit = document.getElementById('idFormEdit');
const usernameEdit = document.getElementById('usernameFormEdit');
const ageEdit = document.getElementById('ageFormEdit');
const emailEdit = document.getElementById('emailFormEdit');
const passwordEdit = document.getElementById('passwordFormEdit');
let row = "";



$(document).ready(function () {
    $('#submitEdit').on('click', async function (e) {
        e.preventDefault();
        let id = idEdit.value;
        let one = document.getElementById(`dele${id}`);
        let u = await fetch('http://localhost:8080/changeUser', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: idEdit.value,
                username: usernameEdit.value,
                age: ageEdit.value,
                email: emailEdit.value,
                password: passwordEdit.value,
                roles: $('#selectEdit').val()
            })
        }).then(u => u.json());
        let rol = "";
        u.roles.forEach((u) => {
            rol += u.withoutPrefix + " \n";
        });
        row = ` <tr id="dele${u.id}"><td>${u.id}</td>
<td>${u.username}</td>
<td>${u.age}</td>
<td>${u.email}</td>
<td>${u.password}</td>
<td>${rol}</td>
<td><button class="btn btn-info editbtn">Edit</button></td>
<td><button class="btn btn-danger delbtn">Delete</button></td></tr>`;
        one.innerHTML = row;
        $('#editModal').modal('hide');
    })
});






const on = (element, even, selector, handle) => {
    element.addEventListener(even, e => {
        if (e.target.closest(selector)) {
            handle(e)
        }
    })
}


on(document, 'click', '.editbtn', (e) => {
    e.preventDefault();
    const father = e.target.parentNode.parentNode;
    const id = father.firstElementChild.innerHTML;
    const username = father.children[1].innerHTML;
    const age = father.children[2].innerHTML;
    const email = father.children[3].innerHTML;
    const password = father.children[4].innerHTML;
    const role = father.children[5].innerHTML;
    let rolAr = role.replace(/[^A-Za-z]+/, " ").trim().split(/\s+/);
    rol(rolAr);
    $('#idFormEdit').val(id);
    $('#usernameFormEdit').val(username);
    $('#ageFormEdit').val(age);
    $('#emailFormEdit').val(email);
    $('#passwordFormEdit').val(password);
    $('#editModal').modal();
})


const idValue = document.querySelector('#idDelete');
on(document, 'click', '.delbtn', (e) => {
    e.preventDefault();
    const father = e.target.parentNode.parentNode;
    const id = father.firstElementChild.innerHTML;
    const username = father.children[1].innerHTML;
    const age = father.children[2].innerHTML;
    const email = father.children[3].innerHTML;
    const password = father.children[4].innerHTML;
    const role = father.children[5].innerHTML;
    $('#idDelete').val(id);
    $('#usernameDelete').val(username);
    $('#ageDelete').val(age);
    $('#emailDelete').val(email);
    $('#passwordDelete').val(password);
    $('#roleDelete').val(role);
    $('#deleteModal').modal();
})

$(document).ready(function () {
    $('#submitDelete').on('click', async function (e) {
        e.preventDefault();
        let id = idValue.value;
        let deleteUser = document.getElementById(`dele${id}`);
        await fetch(`http://localhost:8080/delete/${id}`, {
            method: 'DELETE'
        });
        deleteUser.remove();
        $('#deleteModal').modal('hide');
    });
});