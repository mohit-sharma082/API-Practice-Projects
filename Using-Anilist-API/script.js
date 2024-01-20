

const container = document.querySelector('.container');






// Here we define our query as a multi-line string
// Storing it in a separate .graphql/.gql file is also possible
var query = `
query ($query: String, $page: Int, $perPage: Int) {
    Page (page: $page, perPage: $perPage) {
        pageInfo {
            total
            currentPage
            lastPage
            hasNextPage
            perPage
        }
        media (search: $query, type: ANIME, sort: [TRENDING_DESC, POPULARITY_DESC]) {
            id
            title {
                romaji
                english
            }
            coverImage {
                large
                medium
                extraLarge
            }
            season
            episodes
            format
            source
            duration
            genres
            seasonYear
            isAdult
            averageScore
            popularity
            hashtag
        }
    }
}
`;

var variables = {
    page: 1,
    perPage: 50
}

// Define the config we'll need for our Api request
var url = 'https://graphql.anilist.co',
    options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: query,
            variables: variables
        })
    };




function fetchData() {

    // Make the HTTP Api request
    fetch(url, options)
        .then(handleResponse)
        .then(handleData)
        .catch(handleError);

}
fetchData()

function handleResponse(response) {
    return response.json().then(function (json) {
        return response.ok ? json : Promise.reject(json);
    });
}

function handleData(data) {
    console.log("This is the data fetched -->",data);
    
    dataArr = data.data.Page.media;

    console.log("This is the data to show ->>", dataArr);
    
    let html="";
    if(dataArr){
        
        dataArr.forEach(element=>{

            html +=`
            <div class="card">
                <div class="card-header">
                    <img src=${ element.coverImage.extraLarge} alt=${ element.coverImage.extraLarge}>
                    <div>
                    <h3 class="name">${ element.title.english}</h3>
                    <hr>
                    <h4>${ element.season}, ${element.seasonYear}</h4>
                    <span>Avg.Score- ${ element.averageScore}</span><br>
                    <span>Popularity - ${ element.popularity}</span><br>
                    <span> ${ element.genres}</span><br>
                    </div>
                </div>
            </div>
            `;
        })
    }else{
        html="Sorry, some error occured" 
    }
    container.innerHTML=html

}


function handleError(error) {
    alert('Error, Check console');
    console.error(error);
}
