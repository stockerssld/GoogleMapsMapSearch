import axios from 'axios'
// import Here from 'here-geocoder'
declare var google : any;


const GOOGLE_API_KEY = "AIzaSyDgc8Fwj14tXs0o93sNQSHRC15AoZAa5pY"


const form = document.querySelector('form')!
const addressInput = document.getElementById('address')! as HTMLInputElement

type GoogleGeocodingResponse = {
    status  : any,
    results : { geometry: {location:{lat: number, lng: number}}}[]
}



function  searchAddressHandler(e: Event){
    e.preventDefault()
    const enteredAddress = addressInput.value

    axios.get<GoogleGeocodingResponse>(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(enteredAddress)}&key=${GOOGLE_API_KEY}`)
    .then(response=>{
        alert(JSON.stringify(response))
        if(response.data.status !=="OK"){
            throw new Error ('Could not fetch location!')
        }

        
        const coordinates = response.data.results[0].geometry.location;
        const map = new google.maps.Map(document.getElementById('map'),{
            center: coordinates,
            zoom: 16
        })
        new google.maps.Marker({position: coordinates, map:map})
        
    })
    .catch(err=>{
        alert(err.message)
        console.log(err)
    })
   
    // const url = new URL(`https://${subdomain}geocoder.api.here.com/6.2}/geocode.json`);
    // url.searchParams.append('app_code', appCode);
    // url.searchParams.append('app_id', appId);
}

form.addEventListener('submit',searchAddressHandler)


