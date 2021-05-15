

$(document).ready(function () {

    $.ajax({
        url: '/api/post',
        type: 'GET',
        success: (allPost) => {

            var reAllPost = allPost.reverse()

            for (var i = 0; i < 5; i++) {
                let status = statusBox(reAllPost[i])
                $('#timeline').append(status)
            }

            var page = 10

            $(window).scroll(function () {

                if ($(window).scrollTop() + $(window).height() + 1 > $(document).height() && page <= reAllPost.length) {

                    let temp = page
                    
                    if (page + 10 > reAllPost.length) {
                        page += (reAllPost.length - page)
                    } else {
                        page += 10
                    }

                    for (let i = temp; i < page; i++) {
                        let status = statusBox(reAllPost[i])
                        $('#timeline').append(status)
                    }
                }
            })
        }
    })
})



$('#buttonPost').click(function (e) {
    let record = $('#inputPost').val()
    let linkvideo = $('#linkYT').val()
    // let image = $('#customFile').val()

    let data = {
        who: getID,
        content: record,
        youtube: linkvideo
    }

    $('#inputPost').val('')

    $.ajax({
        url: '/api/post',
        type: 'POST',
        data: data,
        success: (newPost) => {
            console.log(newPost)
            let box = statusBox(newPost)
            $('#timeline').prepend(box)
        }
    })


})

function convertEmbed(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)

    return (match && match[2].length === 11)
      ? match[2]
      : null;
}

function statusBox(post) {

    var action = ``

    if (post.who._id == getID) {
        action = `
            <div class="dropdown">
                <button class="btn" type="button" id="drop${post._id}" data-toggle="dropdown" aria-haspopup="true"
                    aria-expanded="false">
                    <i class="fa fa-ellipsis-v"></i>
                </button>
                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="drop${post._id}">
                    <button class="dropdown-item edit" data-id="${post._id}" data-toggle="modal" data-target="#confirm-edit-dialog">
                        <i class="fa fa-pencil"></i> Chỉnh sửa
                    </button>
                    <button class="dropdown-item" onclick="deleteBtn()" data-id="${post._id}" data-toggle="modal" data-target="#confirm-delete-dialog">
                        <i class="fa fa-trash"></i> Xóa
                    </button>
                </div>
            </div>
        `
    }

    var linkvideo = ``

    if (post.youtube != "") {

        let videoEmbed = convertEmbed(post.youtube)
        
        console.log(videoEmbed)

        if (videoEmbed != null) {
            linkvideo = `
            <a href="${post.youtube}" target="_blank">${post.youtube}</a>
            <div class="mt-1 embed-responsive embed-responsive-16by9">
                <iframe src="https://www.youtube.com/embed/${videoEmbed}" allowfullscreen></iframe>
            </div>
            `
        }
    }

    return `
    <div class="card my-3" id="${post._id}">
        <div class="card-header">
            <div class="d-flex justify-content-between align-items-center">
                <div class="d-flex justify-content-between align-items-center">
                    <div class="mr-2">
                        <img class="rounded-circle" width="45" height="45" src="${post.who.profilePic}"
                            alt="" />
                    </div>
                    <div class="ml-2">
                        <div class="h6 m-0"><a href="#" class="text-dark">${post.who.displayName}</a>
                        </div>
                        <small>20/11/2020 11:20 am</small>
                    </div>
                </div>
                <div>
                    ${action}
                </div>
            </div>
        </div>
        <div class="card-body">
            <p class="card-text">
                ${post.content}
            </p>
            ${linkvideo}
        </div>
        <div class="card-footer">
            <div class="d-flex">
                <a href="#" class="card-link text-dark"><i class="fa fa-heart-o"></i> Thích</a>
                <a class="card-link text-dark" data-toggle="collapse" href="#comment${post._id}" role="button"
                    aria-expanded="false" aria-controls="comment${post._id}">
                    <i class="fa fa-comment-o"></i> Bình luận
                </a>
                <a class="card-link text-dark">
                    <i class="fa fa-mail-forward"></i> Chia sẻ
                </a>
                <a class="card-link text-dark ml-auto" data-toggle="collapse" href="#allComments${post._id}" role="button"
                    aria-expanded="false" aria-controls="allComments${post._id}">
                    <small>Tất cả bình luận</small>
                </a>
            </div>
            <div class="collapse mt-3" id="allComments${post._id}">
                <hr>
                <div class="d-flex" >
                    <img class="rounded-circle mr-2" src="https://via.placeholder.com/50?text=Avt" alt="" width="35px"
                        height="35px">
                    <div class="ml-auto">
                        <div class="px-2 py-1 bg-white border rounded-right rounded-bottom">
                            <div class="h6 m-0"><a href="#" class="text-dark">Nguyễn Thành Long</a></div>
                            <div class="mt-1">In this tutorial we will see how to import existing json data to
                                mongoDB Database (Collection). We will perform some operations with find and findOne
                                methods. And we will also have some queries with Comparison and Logical Operators.
                            </div>
                        </div>
                        <div class="d-flex">
                            <a class="text-secondary ml-2" href=""><small>Thích</small></a>
                            <a class="text-secondary ml-3" data-toggle="collapse" href="#repcomment${post._id}" role="button"
                                aria-expanded="false" aria-controls="repcomment${post._id}">
                                <small>Trả lời</small>
                            </a>
                        </div>
                        <div class="collapse mt-3" id="repcomment${post._id}">
                            <div class="form-row">
                                <div class="col-auto">
                                    <img class="rounded-circle" src="${profilePic}" alt="" width="30px"
                                    height="30px">
                                </div>
                                <div class="col">
                                    <input class="form-control form-control-sm" type="text">
                                </div>
                                <div class="col-auto">
                                    <button class="btn btn-sm btn-primary" id="send"><i class="fa fa-paper-plane"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="collapse mt-3" id="comment${post._id}">
                <div class="form-row">
                    <div class="col-auto">
                        <img class="rounded-circle" src="${profilePic}" alt="" width="35px"
                        height="35px">
                    </div>
                    <div class="col">
                        <input class="form-control" type="text">
                    </div>
                    <div class="col-auto">
                        <button class="btn btn-primary" id="send"><i class="fa fa-paper-plane"></i></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
}

function deleteBtn() {
    $(this).click(e => {
        let btn = e.target
        let id = btn.dataset.id
        $('#comfirm-delete-btn').val(id)
    })
}

$('#comfirm-delete-btn').click((e) => {
    let id = $('#comfirm-delete-btn').val()
    $('.close').click()
    $.ajax({
        url: '/api/post',
        type: 'DELETE',
        data: { id: id },
        success: () => {
            $(`#${id}`).remove()
        }
    })
})