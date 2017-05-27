$(document).ready(function(){
    const countryInfoUrl = 'https://restcountries.eu/rest/v2/name/';
    var countryName = '';
    var capital = '';
    var region = '';
    var population = '';
    var language = [];
    var currencyList = [];
    $('#search-form').submit((e)=>{
        e.preventDefault();
        var userInput = $('.user-input').val();
        var countryNameUrl = encodeURI(countryInfoUrl+userInput);
        $.getJSON(countryNameUrl,(countryData)=>{
            console.log(countryData);
            for (let i = 0; i < countryData.length; i++){
                language = [];
                currencyList = [];
                countryName = countryData[i].name;
                if(countryData[i].capital){
                    capital = countryData[i].capital;
                }else {continue;}
                region = countryData[i].region;
                population = countryData[i].population;
                for (let i = 0; i < countryData[i].languages.length; i++){
                    language.push(countryData[i].languages[i].name);
                }
                currencyList.push(countryData[i].currencies[0].code);
                currencyList.push(countryData[i].currencies[0].name);
                currencyList.push(countryData[i].currencies[0].symbol);
                console.log(region);
                var tableHTML = createHTML();
                $(".info-wrapper").append(tableHTML);
            }
            if (capital.indexOf(" ") > -1){
                capital = capital.split(" ").join("-");
            }
            var photoSearchApi = `https://api.teleport.org/api/urban_areas/slug:${capital.toLowerCase()}/images/`
            $.getJSON(photoSearchApi, (photoData)=>{
                var cityImg = photoData.photos[0].image.web;
                var imgDiv = `<img src="${cityImg}">`;
                $('.img-gallery-container').html(imgDiv);
            });
        });

    });
    function createHTML(){
        var newDiv = '';
        var newHTML = '';
        newHTML += `<table id=${countryName}>`;
            newHTML += `<caption>${countryName}</caption>`;
            newHTML += `<tr><th>Capital</th><td>${capital}</td></tr>`;
            newHTML += `<tr><th>Region</th><td>${region}</td></tr>`;
            newHTML += `<tr><th>Population</th><td>${population}</td></tr>`;
            newHTML += `<tr><th>Language</th><td>${language}</td></tr>`;
            console.log(countryName);
            newHTML += `<tr><th>Currency</th><td>${currencyList.join(" ")}</td></tr>`;
        newHTML += '</table>';

        return newHTML;
    }
});
