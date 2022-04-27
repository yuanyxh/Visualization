window.addEventListener('DOMContentLoaded', function() {
    axios({
        method: 'GET',
        url: 'student/list'
    })
    .then(function(res) {
        if (res.data.code !== 0) {
            return toastr.error(res.message);
        }
        render(res.data.data)
    });

    function render(data) {
        document.querySelector('.table tbody').innerHTML = data.map(function(item) {
            return `<tr>
                        <th scope="row">${item.id}</th>
                        <td>${item.name}</td>
                        <td>${item.age}</td>
                        <td>${item.sex}</td>
                        <td>${item.group}</td>
                        <td>${item.phone}</td>
                        <td>${item.salary}</td>
                        <td>${item.truesalary}</td>
                        <td>${item.province}${item.city}${item.county}</td>
                        <td>
                        <button type="button" class="btn btn-primary btn-sm update">修改</button>
                        <button type="button" class="btn btn-danger btn-sm del">删除</button>
                        </td>
                    </tr>`;
        })
        .join('\n');
    }
});