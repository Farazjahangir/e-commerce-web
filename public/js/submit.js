var imageUrl;
var form = document.getElementById('form')

function encodeImageFileAsURL(element) {
    var file = element.files[0];
    var reader = new FileReader();
    reader.onloadend = function() {
        imageUrl = reader.result
    }
    reader.readAsDataURL(file);
  }

form.addEventListener("submit" , (e)=>{

    e.preventDefault()
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
        swal("Your Ad Have Been Posted")
        window.location.assign("/")
        console.log(myJson);
        
    })
})
