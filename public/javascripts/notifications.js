// Goi API
$(document).ready(function () {
    $.ajax({
        url: '/api/notification/',
        type: 'GET',
        success: (allNoti) => {
            console.log(allNoti)
            for (let i=0; i<allNoti.length; i++) {
                let row = showNoti(allNoti[i])
                $('#notitable').prepend(row)
                $('#newnotitable').prepend(row)
            }
        }
    })
})

function showNoti(noti) {
    return `
    <tr>
        <td>
            <small><i>[ Khoa XXX ]</i> - 22/11/2020</small> <br>
            <a href="/notification/${noti._id}">${noti.title}</a>
        </td>
    </tr>
    `
}