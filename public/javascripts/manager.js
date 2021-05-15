// 1 MODAL CONTROL FOR ADMIN USER

// 1.1 EDIT
$('.btn-edit-user').on('click', function() {
    let id = $(this).attr("data-id")
    let username = $(this).attr("data-username")
    let password = $(this).attr("data-password")
    let name = $(this).attr("data-name")

    console.log(password);
    $('#btn-edit-confirmed').attr('data-id', id)
    $('#edit-username').val(username)
    $('#edit-password').val(password)
    $('#edit-name').val(name)
})

// 1.2 REMOVE
$('.btn-delete-user').on('click', function(){
    let id = $(this).attr("data-id")
    let name = $(this).attr("data-name")

    console.log(id)
    $('#delete-name').html(name)
    $('#btn-delete-user-confirmed').attr('data-id', id)
})

// 1.3 PROCESS DB
$('#btn-edit-user-confirmed').on('click', function(){
    // do something
    $('.close').click()
})

$('#btn-delete-user-confirmed').on('click', function(){
    // do something
    let id = $(this).attr("data-id")
    $(`#row${id}`).remove()
    $('.close').click()
})


// 2. MODAL CONTROL FOR FACULTY MANAGER

// 2.1 EDIT
$('.btn-edit-notification').on('click', function() {
    let id = $(this).attr("data-id")
    let title = $(this).attr("data-title")
    let content = $(this).attr("data-content")

    $('#btn-edit-confirmed').attr('data-title', id)
    $('#edit-title').val(title)
    $('#edit-content').val(content)
})

// 2.2 REMOVE
$('.btn-delete-notification').on('click', function(){
    let id = $(this).attr("data-id")
    $('#btn-delete-notification-confirmed').attr('data-id', id)
})

// 2.3 PROCESS DB
$('#btn-edit-notification-confirmed').on('click', function(){
    // do something
    $('.close').click()
})
$('#btn-delete-notification-confirmed').on('click', function(){
    // do something
    let id = $(this).attr("data-id")
    $(`#row${id}`).remove()
    $('.close').click()
})