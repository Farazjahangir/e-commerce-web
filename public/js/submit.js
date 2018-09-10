var imageUrl;
var form = document.getElementById('form');
var loader = document.getElementById("custom-loader");
loader.style.display = "none"

// Convert Image into Base64 on Onchange Event 
function encodeImageFileAsURL(element) {
    var file = element.files[0];
    var reader = new FileReader();
    reader.onloadend = function() {
        imageUrl = reader.result
    }
    reader.readAsDataURL(file);
  }

// Function For Submit Ad
form.addEventListener("submit" , (e)=>{

    e.preventDefault()
    loader.style.display = "block"
    var productName = document.getElementById("product").value;
    var cateogryName = document.getElementById('select').value;
    var address = document.getElementById('address').value;
    var contactNumber = document.getElementById('contact-num').value;
    var adPrice = document.getElementById('price').value;
    var adDescription = document.getElementById('descrip').value;
    

    var adDataObj = {
        productName,
        cateogryName,
        address,
        contactNumber,
        adPrice,
        adDescription,
        imageUrl
    }
    console.log(adDataObj);

    fetch("/submitAd/submit" , {
        method : 'POST',
        body : JSON.stringify(adDataObj),
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then((myJson)=>{
        loader.style.display = "none"
        window.location.assign("/")
        console.log(myJson);
        
    })
})
