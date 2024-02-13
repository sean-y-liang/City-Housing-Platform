let map;
let propertyDetailMap;
let propertiesDataGlobal;

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

async function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 44.22543338265272, lng: -76.49516120688114 }, // Queen's University coordinates
        zoom: 13,
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
            const marker = new google.maps.Marker({
                position: { lat, lng },
                map: map,
                title: property.house_name,
            });

            const infoWindow = new google.maps.InfoWindow({
                content: `<div><strong>${property.house_name}</strong><br>${property.address}<br>$${property.monthly_rent} / month</div>`,
            });

            marker.addListener('mouseover', () => infoWindow.open(map, marker));
            marker.addListener('mouseout', () => infoWindow.close());

            marker.addListener('click', () => displayPropertyDetails(property));
        });

        await Promise.all(propertyPromises);

        populateSidebarWithPropertyModules(propertiesData);
    } catch (error) {
        console.error('Error fetching properties:', error);
    }
}

function updateImageGallery(pictures, title) {
    const imagesContainer = document.getElementById('property-images');
    imagesContainer.innerHTML = ''; // Clear the container before adding new images

    const columns = Math.min(pictures.length, 4);
    imagesContainer.style.display = 'grid';
    imagesContainer.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    imagesContainer.style.gap = '25px';
    imagesContainer.style.paddingRight = '25px'; 

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

function initializeFancybox() {
    $('[data-fancybox="gallery"]').fancybox({
        thumbs: { autoStart: true },
        buttons: ['slideShow', 'fullScreen', 'thumbs', 'close'],
        animationEffect: 'zoom',
    });
}

function populateSidebarWithPropertyModules(propertiesData) {
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

    leftNav.innerHTML = isDetailView
        ? `<button class="nav-button" onclick="populateSidebarWithPropertyModules(propertiesDataGlobal)">Back</button>`
        : `<button class="nav-button" id="search-button">Search</button>
         <button class="nav-button" id="filter-button">Filter ▼</button>`;
}

async function displayPropertyDetails(property) {
    toggleNavButtons(true);
    document.getElementById('map').style.display = 'none';

    const imagesContainer = document.getElementById('property-images');
    imagesContainer.className = 'visible';
    imagesContainer.style.display = 'block';

    updateImageGallery(property.pictures, property.house_name);

    initializeFancybox();

    const sidebar = document.getElementById('sidebar');
    sidebar.innerHTML = `
        <h2>${property.listing_name}</h2>
        <p>Address: ${property.address}</p>
        <p>Monthly Rent: $${property.monthly_rent}</p>
        <p>Bedrooms: ${property.bedrooms}, Bathrooms: ${property.bathrooms}</p>
        <p>Parking: ${property.parking ? 'Yes' : 'No'}, Laundry: ${property.laundry}</p>
        <p>Furniture: ${property.furniture}</p>
        <p>Listed Date: ${property.date_listed}, Status: ${property.status}</p>
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

        new google.maps.Marker({
            position: { lat, lng },
            map: propertyDetailMap,
            title: property.house_name,
        });

        if (map) {
            map.panTo(new google.maps.LatLng(lat, lng));
            map.setZoom(15);
        } else {
            console.error('Large map is not initialized.');
        }
    } catch (error) {
        console.error('Error geocoding address:', error);
    }
}

window.addEventListener('load', initMap);