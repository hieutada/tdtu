$(document).ready(()=>{
    $.get('/api/faculty/' + getID, result =>{
        if(result.role == "admin"){
            $.get('/api/faculty', results =>{
                renderListAccount('listAccount', results.reverse())
            })
        }else{
            var access = result.access.split(',')
            var list = document.getElementsByClassName('createCategory')
            for(var i = 0; i < list.length; i++){
                if(!access.includes($(list[i]).val())){
                    $(list[i]).prop('disabled', 'false')
                }
            }
        }
    })
    
})
function renderListAccount(element, data){
    var html = ``
    data.forEach(e =>{
        html = html + `
        <tr id="">
            <th></th>
            <td>${e.displayName}</td>
            <td>${e.username}</td>
            <td>${e.password}</td>
            <td class="text-right">
                <button class="btn btn-sm btn-info btn-edit-user"
                data-id="${e._id}"
                data-name="${e.displayName}"
                data-username="${e.username}"
                data-password="${e.password}"
                data-access='${e.access}'
                data-toggle="modal"
                data-target="#confirm-edit-user">
                    <i class="fa fa-pencil"></i>
                </button>
                <button class="btn btn-sm btn-danger btn-delete-user"
                data-id="${e._id}"
                data-name="${e.displayName}"
                data-toggle="modal"
                data-target="#confirm-delete-user">
                    <i class="fa fa-trash"></i>
                </button>
            </td>
        </tr>
        `
    })
    $('.listAccount').html(html)
}
// 1.1 EDIT
$(document).on('click', '.btn-edit-user', function() {
    let id = $(this).attr("data-id")
    let username = $(this).attr("data-username")
    let password = $(this).attr("data-password")
    let name = $(this).attr("data-name")
    let access = $(this).attr('data-access').split(',')
    $('#btn-edit-user-confirmed').attr('data-id', id)
    $('#edit-username').val(username)
    $('#edit-password') .val(password)
    $('#edit-name').val(name)
    var list = document.getElementsByClassName('createCategory2')
    for(var i = 0; i < list.length; i++){
        if(access.includes($(list[i]).val())){
            list[i].checked = true
        }
    }
    

})

// 1.2 REMOVE
$(document).on('click', '.btn-delete-user',function(){
    let id = $(this).attr("data-id")
    let name = $(this).attr("data-name")

    console.log(id)
    $('#delete-name').html(name)
    $('#btn-delete-user-confirmed').attr('data-id', id)
})

// 1.3 PROCESS DB
$('#btn-edit-user-confirmed').on('click', function(event){
    // do something
    var access = []
    var list = document.getElementsByClassName('createCategory2')
    for(var i = 0; i < list.length; i++){
        if(list[i].checked == true){
            access.push($(list[i]).val())
        }
    }
    console.log(access)
    var access2 = access.toString()
    var data = {
        username: $('#edit-username').val(),
        password: $('#edit-password').val(),
        displayName: $('#edit-name').val(),
        access: access2
    }
    $.ajax({
        url: '/api/faculty/' + $(this).attr('data-id'),
        type: "PUT",
        data: data,
        success: ()=>{
            location.reload()
        }
    })
    $('.close').click()
})

$('#btn-delete-user-confirmed').on('click', function(){
    // do something
    let id = $(this).attr("data-id")
    console.log(id)
    $.ajax({
        url: '/api/faculty/' + id,
        type: "DELETE",
        success: ()=>{
            location.reload()
        }
    })
    $('.close').click()
})

//1.4 CREATE ACCOUNT
$('.createAccount').on('click', function(){
   
    var access = []
    var list = document.getElementsByClassName('createCategory')
    for(var i = 0; i < list.length; i++){
        if(list[i].checked == true){
            access.push($(list[i]).val())
        }
    }
     var data = {
        username: $("#username").val(),
        password: $("#password").val(),
        displayName:$("#name").val(),
        role: "faculty",
        access: access.toString()
        
    }

    $.ajax({
        url: '/api/faculty',
        type: "POST",
        data: data,
        success: ()=>{
            location.reload()
        }
    })
})