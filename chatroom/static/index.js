document.addEventListener('DOMContentLoaded', () => {
    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

    socket.on('connect', () => {
        document.querySelector('#sub').onclick = function() {
            var getname = document.querySelector('#name').value;
            document.querySelector('#name').value = '';
            socket.emit('submit name', getname=getname);
           };
      });

    socket.on('getname', name =>{
        document.querySelector('#foname').innerHTML = name;
       });
});
