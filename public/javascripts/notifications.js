// Goi API
$(document).ready(function () {
    $.ajax({
        url: '/api/notification/',
        type: 'GET',
        success: (allNoti) => {
            for (let i=0; i<allNoti.length; i++) {
                let row = showNoti(allNoti[i])
                $('#newnotitable').prepend(row)
                if ($('#notitable')) {
                    $('#notitable').prepend(row)
                }
            }
        }
    })
})

function showNoti(noti) {
    let date = String(noti.updatedAt).split('T')
    return `
    <tr>
        <td>
            <small><i>[ ${noti.postedBy.displayName} ]</i> - ${date[0]}</small> <br>
            <a href="/notifications/detail/${noti._id}">${noti.title}</a>
        </td>
    </tr>
    `
}