window.addEventListener("load" , ()=>{
    const id = localStorage.getItem("adId")
    fetch("/addetails" , {
        method : 'POST',
        body : JSON.stringify({id : id}),
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
      .then((res)=>{
         return res.json()
         
      })  
      .then((myJson)=>{
          console.log(myJson);
          
          console.log(myJson.imageUrl);
          
          const detailsContainer = document.getElementById("details-div");

          detailsContainer.innerHTML = `
            <div class="row border box-shadow" id="vertical-center">
                <div class="col-3">
                    <img src=${myJson.data.imageUrl} width="280px" />
                </div>
                <div class="col-5">
                    <table class="table" id="table">
                        <tr>
                            <td class="bold">Product Name</td>
                            <td>${myJson.data.productName}</td>
                            <td class="bold">Price</td>
                            <td>${myJson.data.adPrice}</td>
                        </tr>
                        <tr>
                            <td class="bold">Category Name</td>
                            <td>${myJson.data.cateogryName}</td>
                            <td class="bold">Address</td>
                            <td>${myJson.data.address}</td>
                        </tr>
                        <tr>
                            <td class="bold">Contact Number</td>
                            <td>${myJson.data.contactNumber}</td>
                            <td class="bold">Description</td>
                            <td>${myJson.data.adDescription}</td>
                        </tr>
                        <tr>
                            <td class="bold">Owner</td>
                            <td>${myJson.data.userName}</td>
                        </tr>
                    </table>
                </div>
            </div>
          `
      })
})