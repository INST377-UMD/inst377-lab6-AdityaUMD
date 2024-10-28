const map = L.map('map').setView([37.0902, -95.7129], 4);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
}).addTo(map);
function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}
const coordinates = [
    { lat: getRandomInRange(30, 35, 3), lon: getRandomInRange(-90, -100, 3) },
    { lat: getRandomInRange(30, 35, 3), lon: getRandomInRange(-90, -100, 3) },
    { lat: getRandomInRange(30, 35, 3), lon: getRandomInRange(-90, -100, 3) }
];
async function fetchLocality(latitude, longitude) {
    const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
    const data = await response.json();
    return data.locality || "Locality not found";
}
coordinates.forEach(async (coord, index) => {
    const marker = L.marker([coord.lat, coord.lon]).addTo(map);
    marker.bindPopup(`Marker ${index + 1}`);
    const locality = await fetchLocality(coord.lat, coord.lon);
    document.getElementById('localities').innerHTML += `<p>Marker ${index + 1}: ${coord.lat}, ${coord.lon} - ${locality}</p>`;
});
