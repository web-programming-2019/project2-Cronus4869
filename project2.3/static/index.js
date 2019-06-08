
if (!localStorage.getItem('name'))
    localStorage.setItem('name', '');

document.addEventListener('DOMContentLoaded', () => {
    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

    document.querySelector('#name').innerHTML = localStorage.getItem('name');

    //document.querySelector('#sub').onclick = () => {
       // let getname = localStorage.getItem('name');
       // document.querySelector('#name').innerHTML = getname;
       // localStorage.setItem('name', getname);
     //   //document.querySelector('#name').value = '';
   // };

    let getname = localStorage.getItem('name');
    document.querySelector('#name').innerHTML = getname;

    document.querySelector('#sub').onclick = () => {
        let newname = document.querySelector('#name').value;
        
        localStorage.setItem('name', newname);
        console.log(newname);
        document.querySelector('#name').value = '';
    };
    document.querySelector('#newroom').onclick = () => {
        socket.emit('new room');
    };
    socket.on('connect', () => {
        document.querySelector('#consub').onclick = function() {
            var mydate = new Date();
            var getcontent = localStorage.getItem('name') + " " +  mydate.toLocaleString() +" :  " + document.querySelector('#content').value;

         //   var getcontent = " " + mydate.toLocaleString() + " ";
            document.querySelector('#content').value = '';
            socket.emit('submit content', getcontent=getcontent);
        };
    });

    socket.on('getcontent', conpara =>{
        const li = document.createElement('li');
        li.innerHTML = conpara["content"];
        const hide = document.createElement('button');
        hide.className = 'hide';
        hide.innerHTML = 'Delete';
        li.appendChild(hide);
        document.querySelector('#chat').append(li);

        if(conpara["num"] > 5){
            var chat = document.getElementById('chat');
            var children = chat.firstChild;
            chat.removeChild(children);
            console.log("did 5");
        } 
    });

    socket.on('build room', param =>{
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = param["url"];
        a.target = "_blank";
        a.innerHTML = "room " + String(param["count"]);
        li.appendChild(a);
        document.querySelector('#room').append(li);
       // newo = new window("").document.write("url");
        window.open(param["url"], "_blank");
    });
});

document.addEventListener('click', event =>{
    const element = event.target;
    if(element.className === 'hide'){
        element.parentElement.remove();
    }
});
