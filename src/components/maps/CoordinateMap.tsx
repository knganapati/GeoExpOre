// import { useEffect, useState } from 'react';
// import { MapContainer, TileLayer, Marker, Popup, Polygon, useMap } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import 'leaflet-defaulticon-compatibility';
// import { cn } from '../../lib/utils';

// interface Coordinate {
//   name: string;
//   latitude: number;
//   longitude: number;
// }

// // interface CoordinateMapProps {
// //   coordinates: Coordinate[];
// //   className?: string;
// //   title?: string;
// //   description?: string;
// // }
// interface CoordinateMapProps {
//   coordinates: Coordinate[];
//   className?: string;
//   title?: string;
//   description?: string;
//   onRemoveCoordinate?: (index: number) => void;  // ← Add this
// }


// // Component to handle map view updates
// function MapController({ coordinates }: { coordinates: Coordinate[] }) {
//   const map = useMap();
  
//   useEffect(() => {
//     if (coordinates.length > 0) {
//       const latlngs = coordinates.map(coord => [coord.latitude, coord.longitude] as [number, number]);
      
//       if (latlngs.length === 1) {
//         map.setView(latlngs[0], 13);
//       } else if (latlngs.length > 1) {
//         map.fitBounds(latlngs);
//       }
//     }
//   }, [coordinates, map]);
  
//   return null;
// }

// const CoordinateMap = ({ coordinates, className, title, description }: CoordinateMapProps) => {
//   const [mapCenter, setMapCenter] = useState<[number, number]>([20.5937, 78.9629]); // India center
//   const [mapZoom, setMapZoom] = useState(5);
  
//   useEffect(() => {
//     if (coordinates.length > 0) {
//       // Set center to first coordinate
//       const firstCoord = coordinates[0];
//       setMapCenter([firstCoord.latitude, firstCoord.longitude]);
      
//       // If only one point, zoom closer
//       if (coordinates.length === 1) {
//         setMapZoom(13);
//       } else {
//         setMapZoom(10);
//       }
//     }
//   }, [coordinates]);
  
//   // Create polygon points if more than 2 coordinates
//   const polygonPositions = coordinates.length > 2
//     ? coordinates.map(coord => [coord.latitude, coord.longitude] as [number, number])
//     : [];
  
//   return (
//     <div className={cn('flex flex-col', className)}>
//       {title && <h3 className="font-medium text-gray-900 mb-1">{title}</h3>}
//       {description && <p className="text-sm text-gray-500 mb-2">{description}</p>}
      
//       <div className="border border-gray-200 rounded-lg overflow-hidden">
//         <MapContainer 
//           center={mapCenter} 
//           zoom={mapZoom} 
//           scrollWheelZoom={false}
//           className="h-80 z-0"
//         >
//           <TileLayer
//             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           />
          
//           <MapController coordinates={coordinates} />
          
//           {coordinates.map((coord, index) => (
//             <Marker 
//               key={`marker-${index}`}
//               position={[coord.latitude, coord.longitude]}
//             >
//               <Popup>
//                 <div className="font-medium">{coord.name}</div>
//                 <div className="text-xs mt-1">
//                   Lat: {coord.latitude.toFixed(6)}, Lng: {coord.longitude.toFixed(6)}
//                 </div>
//               </Popup>
//             </Marker>
//           ))}
          
//           {polygonPositions.length > 2 && (
//             <Polygon 
//               positions={polygonPositions} 
//               pathOptions={{ color: 'blue', fillColor: 'rgba(0, 0, 255, 0.2)' }}
//             />
//           )}
//         </MapContainer>
//       </div>
      
//       {coordinates.length > 0 && (
//         <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 text-xs text-gray-500">
//           {coordinates.length > 0 && (
//   <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 text-xs text-gray-500">
//     {coordinates.map((coord, index) => (
//       <div
//         key={`coord-${index}`}
//         className="flex justify-between items-center p-2 bg-gray-50 rounded border border-gray-200"
//       >
//         <div className="flex items-center">
//           <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-primary-100 text-primary-700 mr-2">
//             {index + 1}
//           </div>
//           <div>
//             <div className="font-medium text-gray-700">{coord.name}</div>
//             <div>Lat: {coord.latitude.toFixed(6)}, Lng: {coord.longitude.toFixed(6)}</div>
//           </div>
//         </div>

//         {onRemoveCoordinate && (
//           <button
//             onClick={() => onRemoveCoordinate(index)}
//             className="ml-4 text-red-600 text-xs hover:underline"
//           >
//             Remove
//           </button>
//         )}
//       </div>
//     ))}
//   </div>
// )}

//           {/* {coordinates.map((coord, index) => (
//             // <div key={`coord-${index}`} className="flex items-center p-2 bg-gray-50 rounded border border-gray-200">
//               <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-primary-100 text-primary-700 mr-2">
//                 {index + 1}
//               </div>
//               <div>
//                 <div className="font-medium text-gray-700">{coord.name}</div>
//                 <div>Lat: {coord.latitude.toFixed(6)}, Lng: {coord.longitude.toFixed(6)}</div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )} */}
//     </div>
//   );
// };

// export default CoordinateMap;



import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import { cn } from '../../lib/utils';

interface Coordinate {
  name: string;
  latitude: number;
  longitude: number;
}

interface CoordinateMapProps {
  coordinates: Coordinate[];
  className?: string;
  title?: string;
  description?: string;
  onRemoveCoordinate?: (index: number) => void;
}

// Component to handle map view updates
function MapController({ coordinates }: { coordinates: Coordinate[] }) {
  const map = useMap();

  useEffect(() => {
    if (coordinates.length > 0) {
      const latlngs = coordinates.map(coord => [coord.latitude, coord.longitude] as [number, number]);

      if (latlngs.length === 1) {
        map.setView(latlngs[0], 13);
      } else if (latlngs.length > 1) {
        map.fitBounds(latlngs);
      }
    }
  }, [coordinates, map]);

  return null;
}

const CoordinateMap = ({ coordinates, className, title, description, onRemoveCoordinate }: CoordinateMapProps) => {
  const [mapCenter, setMapCenter] = useState<[number, number]>([20.5937, 78.9629]); // India center
  const [mapZoom, setMapZoom] = useState(5);

  useEffect(() => {
    if (coordinates.length > 0) {
      const firstCoord = coordinates[0];
      setMapCenter([firstCoord.latitude, firstCoord.longitude]);
      setMapZoom(coordinates.length === 1 ? 13 : 10);
    }
  }, [coordinates]);

  const polygonPositions = coordinates.length > 2
    ? coordinates.map(coord => [coord.latitude, coord.longitude] as [number, number])
    : [];

  return (
    <div className={cn('flex flex-col', className)}>
      {title && <h3 className="font-medium text-gray-900 mb-1">{title}</h3>}
      {description && <p className="text-sm text-gray-500 mb-2">{description}</p>}

      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <MapContainer
          center={mapCenter}
          zoom={mapZoom}
          scrollWheelZoom={false}
          className="h-80 z-0"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MapController coordinates={coordinates} />

          {coordinates.map((coord, index) => (
            <Marker
              key={`marker-${index}`}
              position={[coord.latitude, coord.longitude]}
            >
              <Popup>
                <div className="font-medium">{coord.name}</div>
                <div className="text-xs mt-1">
                  Lat: {coord.latitude.toFixed(6)}, Lng: {coord.longitude.toFixed(6)}
                </div>
              </Popup>
            </Marker>
          ))}

          {polygonPositions.length > 2 && (
            <Polygon
              positions={polygonPositions}
              pathOptions={{ color: 'blue', fillColor: 'rgba(0, 0, 255, 0.2)' }}
            />
          )}
        </MapContainer>
      </div>

      {coordinates.length > 0 && (
        <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 text-xs text-gray-500">
          {coordinates.map((coord, index) => (
            <div
              key={`coord-${index}`}
              className="flex justify-between items-center p-2 bg-gray-50 rounded border border-gray-200"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-primary-100 text-primary-700 mr-2">
                  {index + 1}
                </div>
                <div>
                  <div className="font-medium text-gray-700">{coord.name}</div>
                  <div>Lat: {coord.latitude.toFixed(6)}, Lng: {coord.longitude.toFixed(6)}</div>
                </div>
              </div>

              {onRemoveCoordinate && (
                <button
                  onClick={() => onRemoveCoordinate(index)}
                  className="ml-4 text-red-600 text-xs hover:underline"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CoordinateMap;
