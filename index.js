<head>
    <script src="https://code.jquery.com/jquery-3.4.1.js"
    integrity="sha256-WpOohJOqMqqyKL9FccASB9O0KwACQJpFTUBLTYOVvVU="
    crossorigin="anonymous"></script>
</head>


function httpGet(theUrl) {
    let miPromesa = new Promise((resolve, reject) => {                       
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            resolve(xmlHttp.responseText);
        } else {}}
        xmlHttp.open("GET", theUrl, false); 
        xmlHttp.send(null);
})
​
    return miPromesa;
}