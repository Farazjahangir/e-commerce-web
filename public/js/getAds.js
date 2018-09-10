var adContainer = document.getElementById("ad-container");
var loader = document.getElementById("custom-loader");

// Show Ads On Body Load
window.addEventListener("load" , ()=>{
    console.log("run");
    
    fetch("/getAds")
    .then(res => {
        return res.json();
    })
    .then(json => {
        //if Any error It will throw in catch
        if(json.isError){
            throw json
        }
        // If no Ads Found
        if(json.adsData.length === 0){
            adContainer.innerHTML = `
            <div class="align-center">
                <h1 class="error">No Ads Found</h1>

            </div>
            `
        }
        console.log(json);
        
        loader.style.display = "none"
        json.adsData.map((data)=>{
            adContainer.innerHTML += `
                    <div class="col-md-4 col-sm-5 card padding my-5">
                        <div>
                          <img src=${data.imageUrl} class="img" />
                        </div>
                        <table class="table">
                            <tr>
                                <td class="bold">Product Name</td>
                                <td>${data.productName}</td>
                            </tr>
                            <tr>
                                <td class="bold">Owner Name</td>
                                <td>${data.userName}</td>
                            </tr>
                            <tr>
                                <td class="bold">Price</td>
                                <td>${data.adPrice} Rs</td>
                            </tr>
                            <tr>
                                <td>
                                    <button class="btn btn-success" onClick="seeDetails('${data._id}')">See Details</button>
                                </td>
                            </tr>
                        </table>
                    </div>
            `
        })
        console.log(json);
        
    })
    .catch(err => {
        console.log(err);
    })    

})

function searchAd(){
    adContainer.innerHTML = ""
    loader.style.display = "block"
    var cateogryName = document.getElementById("select").value
    var productName = document.getElementById("product").value
    const searchObj = {
        cateogryName,
        productName
    }
   
   fetch("/search" , {
    method : 'POST',
    body : JSON.stringify(searchObj),
    headers : {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})
.then((res)=>{
    return res.json()
})
// If The Search AD Not Found
.then((myJson)=>{
    loader.style.display = "none"
    if(myJson.data.length === 0){
        loader.style.display = "none"
        adContainer.innerHTML = `
            <div class="align-center">
                <h1 class="error">Sorry No Ads Found</h1>

            </div>
        `
    }
    myJson.data.map((data)=>{
        adContainer.innerHTML += `
        <div class="col-md-4 col-sm-5 card padding my-5">
        <div>
          <img src=${data.imageUrl} class="img" />
        </div>
        <table class="table">
            <tr>
                <td class="bold">Product Name</td>
                <td>${data.productName}</td>
            </tr>
            <tr>
                <td class="bold">Owner Name</td>
                <td>${data.userName}</td>
            </tr>
            <tr>
                <td class="bold">Price</td>
                <td>${data.adPrice} Rs</td>
            </tr>
            <tr>
                <td>
                    <button class="btn btn-success" onClick="seeDetails('${data._id}')">See Details</button>
                </td>
            </tr>
        </table>
    </div>
`
    })
})    
}

// Save Selected Ad ID In local Storage
function seeDetails(id){
    localStorage.setItem("adId" , id)
    window.location.assign("details")
}