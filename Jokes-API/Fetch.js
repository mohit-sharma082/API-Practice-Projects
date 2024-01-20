const container = document.querySelector('.container');

const url="https://official-joke-api.appspot.com/jokes/programming/ten";


fetch(url)
.then((response)=>{
    return response.json()
})
.then((data)=>{
    let html="";
    console.log(data);
    if(data){
        data.forEach(data=>{
            html +=`
            <div class="card">
            <div class="front">
                <p>${data.setup}</p>
            </div>
            <div class="back">
                <p>${data.punchline}</p>
            </div>
            </div>
            `;
        })
    }else{
        html="Sorry, some error occured" 
    }
    container.innerHTML=html
})