window.addEventListener('DOMContentLoaded', function() {
    const asides = document.querySelectorAll('.nav li li a');
    asides.forEach(function(item) {
        item.addEventListener('click', function(e) {
            document.querySelector('.nav li li a.active').classList.remove('active');
            this.classList.add('active');
        })
    });

    const init = document.querySelector('.init');
    init.addEventListener('click', function(e) {
        axios({
            method: 'GET',
            url: '/init/data'
        })
        .then(function(res) {
            if (res.code === 0) {
                toastr.success(res.data.message);
            } else {
                toastr.error(res.data.message);
            }
        });
    });
});