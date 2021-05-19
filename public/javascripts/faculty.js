// CREATE NOTIFICATION
$('#create-notification').on('click', function(){
    var title = $("#title").val()
    var content= $("#content").val()
    var list = document.getElementsByClassName('createCategory')
    var category
    for (var i = 0; i< list.length; i++){
        if(list[i].checked == true){
            category = $(list[i]).val()
        }
    }
    var data = {
        title: title,
        content: content,
        category: category,
        postedBy: getID
    }
    $.ajax({
        url: '/api/notification',
        type: 'POST',
        data: data,
        success: (noti)=>{
            emitNoti(noti)
            location.reload()
        }
    })
})
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
    $(`#${id}`).remove()
    $('.close').click()
})