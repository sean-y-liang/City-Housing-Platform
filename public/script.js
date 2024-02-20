let map;
let propertyDetailMap;
let propertiesDataGlobal;
let isMainMapViewActive = true;
let currentMapCenter = null;
let currentMapZoom = null;
let sidebarScrollPosition = 0;



async function geocodeAddress(address) {
    const geocoder = new google.maps.Geocoder();
    return new Promise((resolve, reject) => {
        geocoder.geocode({ 'address': address }, (results, status) => {
            if (status === 'OK') {
                const location = results[0].geometry.location;
                resolve({ lat: location.lat(), lng: location.lng() });
            } else {
                reject('Geocode was not successful for the following reason: ' + status);
            }
        });
    });
}

function createMarker(lat, lng, title, map) {
    return new google.maps.Marker({
        position: { lat, lng },
        map: map,
        title: title,
    });
}



async function initMap() {
    const mapElement = document.getElementById('map');
    if (mapElement) { // Check if the map element exists
        map = new google.maps.Map(mapElement, {
            center: { lat: 44.22543338265272, lng: -76.49516120688114 }, // Queen's University coordinates
            zoom: 15,
        });

        try {
            const propertiesResponse = await fetch('http://localhost:3000/api/properties');
            if (!propertiesResponse.ok) {
                throw new Error(`Failed to fetch properties: ${propertiesResponse.statusText}`);
            }
            const propertiesData = await propertiesResponse.json();
            propertiesDataGlobal = propertiesData;

            const propertyPromises = propertiesData.map(async (property) => {
                const picturesResponse = await fetch(`http://localhost:3000/api/pictures/${property.PID}`);
                if (!picturesResponse.ok) {
                    throw new Error(`Failed to fetch pictures for property ${property.PID}: ${picturesResponse.statusText}`);
                }
                const picturesData = await picturesResponse.json();
                property.pictures = picturesData.map((picture) => picture.file_name);

                const { lat, lng } = await geocodeAddress(property.address);
                const marker = createMarker(lat, lng, property.listing_name, map);

                const infoWindow = new google.maps.InfoWindow({
                    content: `<div><strong>${property.listing_name}</strong><br>$${property.monthly_rent} / month</div>`,
                });

                marker.addListener('mouseover', () => infoWindow.open(map, marker));
                marker.addListener('mouseout', () => infoWindow.close());

                marker.addListener('click', () => displayPropertyDetails(property));
            });

            await Promise.all(propertyPromises);

            populateSidebarWithPropertyModules(propertiesData);
        } catch (error) {
            console.error('Error fetching properties:', error);
            alert('An error occurred: ' + error.message);
        }
        // Initialize Autocomplete
        initAutocomplete();        
    } else {
        console.error("Failed to find map element for initialization.");
    }
}

function returnToMainMapView() {
    if (currentMapCenter && currentMapZoom) {
        map.setCenter(currentMapCenter);
        map.setZoom(currentMapZoom);
    }
    document.getElementById('map').style.display = 'block';
    document.getElementById('property-images').style.display = 'none';
    if (propertyDetailMap) {
        const propertyMapContainer = document.getElementById('property-location-map');
        if (propertyMapContainer) propertyMapContainer.style.display = 'none';
    }
    populateSidebarWithPropertyModules(propertiesDataGlobal);
    isMainMapViewActive = true;
    let sidebar = document.getElementById('sidebar');
    sidebar.scrollTop = sidebarScrollPosition;
    sidebarScrollPosition = 0; 
    initAutocomplete();
}


function initializeFancybox() {
    $('[data-fancybox="gallery"]').fancybox({
        buttons: ['thumbs', 'close'],
        thumbs: {
            autoStart: true, 
            fitToView: true, 
        },
        loop: false,
        infobar: true,
        keyboard: true,
        wheel: "auto", 
        afterShow: function(instance, current) {
            // Intentionally left blank to prevent history state manipulation by Fancybox
        }
    });
}

function updateImageGallery(pictures, title) {
    const imagesContainer = document.getElementById('property-images');
    imagesContainer.innerHTML = ''; // Clear the container before adding new images

    const columns = Math.min(pictures.length, 4);
    imagesContainer.style.display = 'grid';
    imagesContainer.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    imagesContainer.style.gap = '25px';

    pictures.forEach((pictureUrl, index) => {
        const anchor = document.createElement('a');
        anchor.href = pictureUrl;
        anchor.dataset.fancybox = 'gallery';
        anchor.dataset.caption = `${title} - Image ${index + 1}`;

        const imgElement = document.createElement('img');
        imgElement.src = pictureUrl;
        imgElement.className = 'property-image';
        imgElement.alt = `${title} - Image ${index + 1}`;

        anchor.appendChild(imgElement);
        imagesContainer.appendChild(anchor);
    });

    initializeFancybox();
}

function populateSidebarWithPropertyModules(propertiesData) {
    isMainMapViewActive = true; 
    const sidebar = document.getElementById('sidebar');
    sidebar.innerHTML = '';
    toggleNavButtons(false);
    document.getElementById('map').style.display = 'block';
    document.getElementById('property-images').style.display = 'none';

    sidebar.innerHTML = '<h2>Available Properties</h2>';

    if (Array.isArray(propertiesData) && propertiesData.length > 0) {
        propertiesData.forEach((property) => {
            const propertyModule = document.createElement('div');
            propertyModule.className = 'property-module';
            propertyModule.innerHTML = `
                <div class="property-info">
                    <h3>${property.listing_name}</h3>
                    <p>${property.address}</p>
                    <p>$${property.monthly_rent} / month</p>
                </div>
                <img src="${property.pictures.length > 0 ? property.pictures[0] : ''}" alt="Property image" class="property-listing-img">
            `;
            propertyModule.addEventListener('click', () => displayPropertyDetails(property));
            sidebar.appendChild(propertyModule);
        });
    } else {
        sidebar.innerHTML += '<p>No properties available.</p>';
    }

    if (propertyDetailMap) {
        propertyDetailMap = null;
        const propertyMapContainer = document.getElementById('property-location-map');
        if (propertyMapContainer) propertyMapContainer.style.display = 'none';
    }

}
function toggleNavButtons(isDetailView) {
    const leftNav = document.querySelector('.left-nav');
    if (!leftNav) return console.error('Left navigation element not found!');

    leftNav.innerHTML = ''; // Clear existing buttons to ensure we don't duplicate them

    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.id = 'search-input';
    searchInput.placeholder = 'Search...';
    searchInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            searchLocation(searchInput.value);
        }
    });
    const searchIcon = document.createElement('div');
    searchIcon.className = 'search-icon';
    searchIcon.id = 'search-icon';
    // Add visual item for search
    const searchImg = document.createElement('img');
    searchImg.src = 'assets/icons/search.svg';
    searchImg.alt = 'Search';
    searchIcon.appendChild(searchImg);
    searchContainer.appendChild(searchInput);
    searchContainer.appendChild(searchIcon);

    leftNav.appendChild(searchContainer);

    if (isDetailView) {
        searchContainer.style.display = 'none';

        const backButton = document.createElement('button');
        backButton.className = 'nav-button';
        backButton.textContent = 'Back';
        backButton.onclick = () => {
            // Instead of refreshing or navigating via history, we directly call the function to return to main view. 
            // This avoids any need for a page refresh or relying on the browser's history state
            returnToMainMapView();
        };
        leftNav.appendChild(backButton);
    } else {
        const filterButton = document.createElement('button');
        filterButton.className = 'nav-button';
        filterButton.id = 'filter-button';
        filterButton.textContent = 'Filter ▼';
        leftNav.appendChild(filterButton);
    }
}

function searchLocation(location) {
    const placesService = new google.maps.places.PlacesService(map); 
    placesService.textSearch({
        query: location
    }, function(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            const firstResult = results[0];
            map.setCenter(firstResult.geometry.location);
            const marker = new google.maps.Marker({
                map: map,
                position: firstResult.geometry.location
            });
        } else {
            console.error('Search failed:', status);
        }
    });
}


async function displayPropertyDetails(property) {
    if (isMainMapViewActive) {
        currentMapCenter = map.getCenter();
        currentMapZoom = map.getZoom();
        let sidebar = document.getElementById('sidebar');
        sidebarScrollPosition = sidebar.scrollTop;
        history.pushState({ level: 'details', property: property }, property.listing_name, `#property${property.PID}`);
    }    
    isMainMapViewActive = false;
    toggleNavButtons(true);
    document.getElementById('map').style.display = 'none';

    const imagesContainer = document.getElementById('property-images');
    imagesContainer.className = 'visible';
    imagesContainer.style.display = 'block';
    imagesContainer.scrollTop = 0; // Reset scroll position

    updateImageGallery(property.pictures, property.listing_name);

    initializeFancybox();

    const sidebar = document.getElementById('sidebar');
    sidebar.innerHTML = `
    <h2>${property.listing_name}</h2>
    <p>Address: ${property.address}</p>
    ${property.house_type === 'Apartment' && property.floor_number !== null ? `<p>Floor Number: ${property.floor_number}</p>` : ''}
    <p>Monthly Rent: $${property.monthly_rent}</p>
    ${property.number_of_offered_rooms ? `<p>Rooms Offered: ${property.number_of_offered_rooms}</p>` : ''}
    <p>Bedrooms: ${property.bedrooms}</p>
    <p>Bathrooms: ${property.bathrooms % 1 === 0 ? Math.floor(property.bathrooms) : property.bathrooms}</p>
    <p>Parking: ${property.parking ? 'Yes' : 'No'}</p>
    <p>Laundry: ${property.laundry}</p>
    ${property.house_type === 'House' && property.fenced_yard !== null ? `<p>Fenced Yard: ${property.fenced_yard ? 'Yes' : 'No'}</p>` : ''}
    ${property.house_type === 'House' && property.detached_or_semi ? `<p>Type: ${property.detached_or_semi}</p>` : ''}
    ${property.house_type === 'Apartment' && property.elevator !== null ? `<p>Elevator: ${property.elevator ? 'Yes' : 'No'}</p>` : ''}
    ${property.private_kitchen !== null ? `<p>Private Kitchen: ${property.private_kitchen ? 'Yes' : 'No'}</p>` : ''}
    <p>Furniture: ${property.furniture}</p>
    <p>Listed Date: ${new Date(property.date_listed).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
    <p>Status: ${property.status}</p>
`;

    sidebar.innerHTML += `<div id="property-location-map" class="property-map"></div>`;

    try {
        const { lat, lng } = await geocodeAddress(property.address);
        propertyDetailMap = new google.maps.Map(document.getElementById('property-location-map'), {
            center: { lat, lng },
            zoom: 15,
            disableDefaultUI: true,
            streetViewControl: false,
            mapTypeControl: false,
            zoomControl: true,
            fullscreenControl: false,
        });

        const marker = createMarker(lat, lng, property.listing_name, propertyDetailMap);

        if (map) {
            map.panTo(new google.maps.LatLng(lat, lng));
            map.setZoom(15);
        } else {
            console.error('Large map is not initialized.');
        }
    } catch (error) {
        console.error('Error geocoding address:', error);
        alert('An error occurred: ' + error.message);
    }
}

window.addEventListener('load', initMap);

// Handle browser back and forward buttons
window.addEventListener('popstate', function(event) {
    if ($.fancybox.getInstance()) {
        $.fancybox.close(true);
    } else {
        if (event.state && event.state.level === 'details') {
            displayPropertyDetails(event.state.property);
        } else {
            returnToMainMapView();
        }
    }
});


document.querySelector('.nav-logo img').addEventListener('click', function () {
    if (!isMainMapViewActive) {
        returnToMainMapView();
        history.pushState(null, 'Main Map', '/');
    }
});

document.getElementById('search-input').addEventListener('keyup', function(event) {
    const searchTerm = event.target.value.trim();
    if (searchTerm.length > 0) {
        autocompleteSearch(searchTerm);
    } else {
        clearAutocompleteResults();
    }
});

function autocompleteSearch(searchTerm) {
    const autocompleteService = new google.maps.places.AutocompleteService();
    autocompleteService.getPlacePredictions({ input: searchTerm }, function(predictions, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            displayAutocompleteResults(predictions);
        } else {
            console.error('Autocomplete search failed:', status);
            clearAutocompleteResults();
        }
    });
}

function displayAutocompleteResults(predictions) {
    const autocompleteResultsContainer = document.getElementById('autocomplete-results');
    autocompleteResultsContainer.innerHTML = ''; // Clear previous results
    predictions.forEach(prediction => {
        const option = document.createElement('div');
        option.classList.add('autocomplete-option');
        option.textContent = prediction.description;
        option.addEventListener('click', function() {
            document.getElementById('search-input').value = prediction.description;
            clearAutocompleteResults();
            searchProperties(prediction.place_id); // Trigger search with place ID
        });
        autocompleteResultsContainer.appendChild(option);
    });
    autocompleteResultsContainer.style.display = 'block';
}

function clearAutocompleteResults() {
    document.getElementById('autocomplete-results').innerHTML = '';
    document.getElementById('autocomplete-results').style.display = 'none';
}

async function searchProperties(placeId) {
    try {
        const placeDetails = await getPlaceDetails(placeId);
        const { lat, lng } = placeDetails.geometry.location;
        map.setCenter({ lat, lng });
        map.setZoom(15);
    } catch (error) {
        console.error('Error searching properties:', error);
    }
}

function getPlaceDetails(placeId) {
    const placesService = new google.maps.places.PlacesService(map); 
    return new Promise((resolve, reject) => {
        placesService.getDetails({ placeId: placeId }, (place, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                resolve(place);
            } else {
                reject('Failed to fetch place details');
            }
        });
    });
}

function initAutocomplete() {
    const input = document.getElementById('search-input');
    const autocomplete = new google.maps.places.Autocomplete(input, { types: ['geocode'] });

    autocomplete.addListener('place_changed', function() {
        const place = autocomplete.getPlace();
        if (place.geometry) {
            map.setCenter(place.geometry.location);
            map.setZoom(15);
        }
    });

    // Make sure the search icon is correctly identified and the click event is attached
    const searchIcon = document.getElementById('search-icon');
    searchIcon.addEventListener('click', function() {
        const inputValue = input.value;
        if (inputValue) {
            searchLocation(inputValue);
        }
    });
}

