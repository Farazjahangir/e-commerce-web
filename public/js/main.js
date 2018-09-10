var errorEl = document.getElementById("error");
var navbar = document.getElementById("navbar")
function emptyFields(){
    console.log("empty");
    
    errorEl.innerText = ""
}

function showNav(){
    navbar.style.transform = "translateX(0)"
}
function hideNav(){
    navbar.style.transform = "translateX(-100%)"
}