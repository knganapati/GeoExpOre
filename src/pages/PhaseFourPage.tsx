// import { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import { toast } from 'react-toastify';
// import { Map, Table2, FileSpreadsheet, Microscope, Flag } from 'lucide-react';

// import InputField from '../components/ui/InputField';
// import TextareaField from '../components/ui/TextareaField';
// import Button from '../components/ui/Button';
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
// import FileUpload from '../components/ui/FileUpload';
// import PhaseStepper from '../components/PhaseStepper';




// const initialRow = {
//     waypoint: "",
//     structure: "",
//     latitude: "",
//     longitude: "",
//     strike: "",
//     dipAmount: "",
//     dipDirection: "",
//     remarks: ""
//   };
  
//     const [rows, setRows] = useState([initialRow]);
  
//     const handleChange = (index: number, field: string, value: string) => {
//       const updatedRows = [...rows];
//       updatedRows[index][field] = value;
//       setRows(updatedRows);
//     };
  
//     const handleAddRow = () => {
//       setRows([...rows, initialRow]);
//     };
  


// // Define the Phase 4 form schema
// const phaseFourSchema = z.object({
//   // Scale section
//   givenScale: z.string().optional(),
//   gridInterval: z.string().optional(),
//   contoursMeters: z.string().optional(),
  
//   // Maps
//   baseMap: z.string().optional(),
//   toposheetMap: z.string().optional(),
//   geologicalMap: z.string().optional(),
  
//   // Structural data
//   wayPoints: z.array(z.object({
//     waypoint: z.string(),
//     jointFaultFold: z.string(),
//     latitude: z.string(),
//     longitude: z.string(),
//     strike: z.string(),
//     dipAmount: z.string(),
//     dipDirection: z.string(),
//     remarks: z.string().optional()
//   })).optional(),

//   // Chemical sample points
//   chemicalSamples: z.array(z.object({
//     toposheetNo: z.string(),
//     sampleNumber: z.string(),
//     latitude: z.string(),
//     longitude: z.string(),
//     areaBlockName: z.string(),
//     commodityName: z.string(),
//     sampleType: z.string(),
//     sampleMedia: z.string(),
//     remarks: z.string().optional()
//   })).optional(),

//   // Lithology
//   lithologyData: z.array(z.object({
//     toposheetNo: z.string(),
//     stratigraphicAge: z.string(),
//     supergroup: z.string(),
//     groupName: z.string(),
//     lithologicalUnit: z.string(),
//     majorMineral: z.string(),
//     remarks: z.string().optional()
//   })).optional(),

//   // Chemical sample line
//   sampleLines: z.array(z.object({
//     toposheetNo: z.string(),
//     areaBlockName: z.string(),
//     commodityName: z.string(),
//     sampleType: z.string(),
//     sampleName: z.string(),
//     sampleNumber: z.string(),
//     sampleMedia: z.string(),
//     lengthInMeter: z.string(),
//     widthInMeter: z.string(),
//     depthInMeter: z.string(),
//     remarks: z.string().optional()
//   })).optional(),

//   // Locations
//   locations: z.array(z.object({
//     toposheetNo: z.string(),
//     name: z.string(),
//     type: z.string(),
//     remarks: z.string().optional()
//   })).optional(),

//   // Borehole points
//   boreholes: z.array(z.object({
//     toposheetNo: z.string(),
//     latitude: z.string(),
//     longitude: z.string(),
//     boreholeName: z.string(),
//     rlCollar: z.string(),
//     angleInDegree: z.string(),
//     azimuthInDegree: z.string(),
//     lengthInMeter: z.string(),
//     remarks: z.string().optional()
//   })).optional(),

//   // Analytical results
//   chemicalAnalysisQty: z.string().optional(),
//   petrographicQty: z.string().optional(),
//   xrfQty: z.string().optional(),
//   xrdQty: z.string().optional(),
//   epmaQty: z.string().optional(),
//   semQty: z.string().optional(),
//   fireAssayQty: z.string().optional(),
//   wholeRockAnalysisQty: z.string().optional(),
//   bulkDensityQty: z.string().optional()
// });

// type PhaseFourFormValues = z.infer<typeof phaseFourSchema>;

// const PhaseFourPage = () => {
//   // State for file uploads
//   const [outCropMap, setOutCropMap] = useState<File | null>(null);
//   const [lithoMap, setLithoMap] = useState<File | null>(null);
//   const [geoMap, setGeoMap] = useState<File | null>(null);
//   const [sampleLocMap, setSampleLocMap] = useState<File | null>(null);

//   // Form validation using react-hook-form
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = useForm<PhaseFourFormValues>({
//     resolver: zodResolver(phaseFourSchema)
//   });

//   // Handle form submission
//   const onSubmit = async (data: PhaseFourFormValues) => {
//     try {
//       console.log('Form data:', data);
//       await new Promise(resolve => setTimeout(resolve, 2000));
//       toast.success('Phase 4 data submitted successfully!');
//     } catch (error) {
//       console.error('Error submitting form:', error);
//       toast.error('Error submitting data. Please try again.');
//     }
//   };

//   // Define phases for the stepper
//   const phases = [
//     {
//       id: 1,
//       name: 'Phase 1',
//       description: 'Initial survey and planning',
//       status: 'completed' as const,
//     },
//     {
//       id: 2,
//       name: 'Phase 2',
//       description: 'Detailed assessment',
//       status: 'completed' as const,
//     },
//     {
//       id: 3,
//       name: 'Phase 3',
//       description: 'Final approval',
//       status: 'completed' as const,
//     },
//     {
//       id: 4,
//       name: 'Phase 4',
//       description: 'Field data and analysis',
//       status: 'current' as const,
//     },
//   ];

//   return (
//     <div className="pb-10">
//       <PhaseStepper phases={phases} currentPhase={4} />
      
//       <div className="mb-6 bg-white border border-dashed border-primary-200 rounded-lg p-5">
//         <div className="flex items-center text-primary-700">
//           <Flag className="h-5 w-5 mr-2" />
//           <h3 className="font-medium">Phase 4: Field Data Collection & Analysis</h3>
//         </div>
//         <p className="mt-2 text-sm text-gray-600">
//           Record detailed field data, sample information, and analytical results from the geological exploration.
//         </p>
//       </div>
      
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//         {/* Scale Information */}
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center">
//               <Map className="h-5 w-5 mr-2 text-primary-600" />
//               Scale Information
//             </CardTitle>
//             <CardDescription>Enter the scale details and measurements</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <InputField
//                 label="Given Scale"
//                 {...register('givenScale')}
//                 error={errors.givenScale?.message}
//               />
//               <InputField
//                 label="Grid Interval (meters)"
//                 type="number"
//                 {...register('gridInterval')}
//                 error={errors.gridInterval?.message}
//               />
//               <InputField
//                 label="Contours (meters)"
//                 type="number"
//                 {...register('contoursMeters')}
//                 error={errors.contoursMeters?.message}
//               />
//             </div>
//           </CardContent>
//         </Card>

//         {/* Maps */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Maps</CardTitle>
//             <CardDescription>Upload various types of maps</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <FileUpload
//                 label="Base/Grid Map"
//                 acceptedFileTypes=".jpg,.jpeg,.png,.pdf"
//                 onChange={setOutCropMap}
//                 value={outCropMap}
//               />
//               <FileUpload
//                 label="Toposheet Map"
//                 acceptedFileTypes=".jpg,.jpeg,.png,.pdf"
//                 onChange={setLithoMap}
//                 value={lithoMap}
//               />
//               <FileUpload
//                 label="Geological Map"
//                 acceptedFileTypes=".jpg,.jpeg,.png,.pdf"
//                 onChange={setGeoMap}
//                 value={geoMap}
//               />
//             </div>
//           </CardContent>
//         </Card>

//         {/* Structural Data */}
//         <Card>
//       <CardHeader>
//         <CardTitle className="flex items-center">
//           <Table2 className="h-5 w-5 mr-2 text-primary-600" />
//           Structural Data
//         </CardTitle>
//         <CardDescription>Record structural measurements and observations</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3">Way Points</th>
//                 <th className="px-6 py-3">Joint/Fault/Fold</th>
//                 <th className="px-6 py-3">Latitude</th>
//                 <th className="px-6 py-3">Longitude</th>
//                 <th className="px-6 py-3">Strike</th>
//                 <th className="px-6 py-3">Dip Amount</th>
//                 <th className="px-6 py-3">Dip Direction</th>
//                 <th className="px-6 py-3">Remarks</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {rows.map((row, index) => (
//                 <tr key={index}>
//                   {Object.entries(row).map(([key, value]) => (
//                     <td className="px-6 py-2" key={key}>
//                       <input
//                         type="text"
//                         className="border rounded w-full px-2 py-1 text-sm"
//                         value={value}
//                         onChange={(e) => handleChange(index, key, e.target.value)}
//                       />
//                     </td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           <button
//             onClick={handleAddRow}
//             className="mt-4 px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
//           >
//             + Add Row
//           </button>
//         </div>
//       </CardContent>
//     </Card>
  

//         {/* Chemical Sample Points */}
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center">
//               <FileSpreadsheet className="h-5 w-5 mr-2 text-primary-600" />
//               Chemical Sample Points (BRS)
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Toposheet No</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sample Number</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Latitude</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Longitude</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Area/Block Name</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commodity Name</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sample Type</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sample Media</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remarks</th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {/* Add dynamic rows here */}
//                 </tbody>
//               </table>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Analytical Results */}
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center">
//               <Microscope className="h-5 w-5 mr-2 text-primary-600" />
//               Analytical Results
//             </CardTitle>
//             <CardDescription>Record quantities for different types of analysis</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <InputField
//                 label="Chemical Analysis Quantity"
//                 type="number"
//                 {...register('chemicalAnalysisQty')}
//                 error={errors.chemicalAnalysisQty?.message}
//               />
//               <InputField
//                 label="Petrographic Quantity"
//                 type="number"
//                 {...register('petrographicQty')}
//                 error={errors.petrographicQty?.message}
//               />
//               <InputField
//                 label="XRF Quantity"
//                 type="number"
//                 {...register('xrfQty')}
//                 error={errors.xrfQty?.message}
//               />
//               <InputField
//                 label="XRD Quantity"
//                 type="number"
//                 {...register('xrdQty')}
//                 error={errors.xrdQty?.message}
//               />
//               <InputField
//                 label="EPMA Quantity"
//                 type="number"
//                 {...register('epmaQty')}
//                 error={errors.epmaQty?.message}
//               />
//               <InputField
//                 label="SEM Quantity"
//                 type="number"
//                 {...register('semQty')}
//                 error={errors.semQty?.message}
//               />
//               <InputField
//                 label="Fire Assay Quantity"
//                 type="number"
//                 {...register('fireAssayQty')}
//                 error={errors.fireAssayQty?.message}
//               />
//               <InputField
//                 label="Whole Rock Analysis Quantity"
//                 type="number"
//                 {...register('wholeRockAnalysisQty')}
//                 error={errors.wholeRockAnalysisQty?.message}
//               />
//               <InputField
//                 label="Bulk Density Quantity"
//                 type="number"
//                 {...register('bulkDensityQty')}
//                 error={errors.bulkDensityQty?.message}
//               />
//             </div>
//           </CardContent>
//         </Card>

//         {/* Submit Button */}
//         <div className="flex justify-end">
//           <Button
//             type="submit"
//             size="lg"
//             isLoading={isSubmitting}
//             className="px-10"
//           >
//             Submit Field Data
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default PhaseFourPage; 





// import { useState, useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import { toast } from 'react-toastify';
// import { Map, Table2, FileSpreadsheet, Microscope, Flag, Download, Upload, Search, Undo, Redo } from 'lucide-react';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import { Pie } from 'react-chartjs-2';
// import 'leaflet/dist/leaflet.css';

// // Components
// import InputField from '../components/ui/InputField';
// import Button from '../components/ui/Button';
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
// import FileUpload from '../components/ui/FileUpload';
// import PhaseStepper from '../components/PhaseStepper';

// // Define the Phase 4 form schema with enhanced validation
// const phaseFourSchema = z.object({
//   givenScale: z.string().optional(),
//   gridInterval: z.string().regex(/^\d*\.?\d+$/, "Must be a number").optional(),
//   contoursMeters: z.string().regex(/^\d*\.?\d+$/, "Must be a number").optional(),
//   baseMap: z.string().optional(),
//   toposheetMap: z.string().optional(),
//   geologicalMap: z.string().optional(),
//   wayPoints: z.array(z.object({
//     waypoint: z.string().min(1, "Required"),
//     jointFaultFold: z.string().min(1, "Required"),
//     latitude: z.string().regex(/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)$/, "Invalid latitude"),
//     longitude: z.string().regex(/^[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/, "Invalid longitude"),
//     strike: z.string().regex(/^\d*\.?\d+$/, "Must be a number"),
//     dipAmount: z.string().regex(/^\d*\.?\d+$/, "Must be a number"),
//     dipDirection: z.string().regex(/^\d*\.?\d+$/, "Must be a number"),
//     remarks: z.string().optional()
//   })).optional(),
//   chemicalSamples: z.array(z.object({
//     toposheetNo: z.string().min(1, "Required"),
//     sampleNumber: z.string().min(1, "Required"),
//     latitude: z.string().regex(/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)$/, "Invalid latitude"),
//     longitude: z.string().regex(/^[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/, "Invalid longitude"),
//     areaBlockName: z.string().min(1, "Required"),
//     commodityName: z.string().min(1, "Required"),
//     sampleType: z.string().min(1, "Required"),
//     sampleMedia: z.string().min(1, "Required"),
//     remarks: z.string().optional()
//   })).optional(),
//   // ... (other schemas remain the same)
// });

// type PhaseFourFormValues = z.infer<typeof phaseFourSchema>;

// // Predefined options for autocomplete
// const COMMODITY_OPTIONS = ['Gold', 'Silver', 'Copper', 'Iron', 'Zinc', 'Lead'];
// const SAMPLE_TYPES = ['Rock', 'Soil', 'Sediment', 'Water', 'Vegetation'];

// const PhaseFourPage = () => {
//   // State for file uploads
//   const [outCropMap, setOutCropMap] = useState<File | null>(null);
//   const [lithoMap, setLithoMap] = useState<File | null>(null);
//   const [geoMap, setGeoMap] = useState<File | null>(null);

//   // State for tables
//   const initialStructuralRow = {
//     waypoint: "",
//     jointFaultFold: "",
//     latitude: "",
//     longitude: "",
//     strike: "",
//     dipAmount: "",
//     dipDirection: "",
//     remarks: ""
//   };
  
//   const initialChemicalRow = {
//     toposheetNo: "",
//     sampleNumber: "",
//     latitude: "",
//     longitude: "",
//     areaBlockName: "",
//     commodityName: "",
//     sampleType: "",
//     sampleMedia: "",
//     remarks: ""
//   };

//   // State with localStorage persistence
//   const [structuralRows, setStructuralRows] = useState([initialStructuralRow]);
//   const [chemicalRows, setChemicalRows] = useState([initialChemicalRow]);
//   const [history, setHistory] = useState<typeof chemicalRows[]>([[]]);
//   const [historyIndex, setHistoryIndex] = useState(0);

//   // Search and filter state
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filters, setFilters] = useState({
//     commodity: '',
//     sampleType: ''
//   });

//   // Load from localStorage on mount
//   useEffect(() => {
//     const savedStructural = localStorage.getItem('structuralData');
//     const savedChemical = localStorage.getItem('chemicalSamples');
    
//     if (savedStructural) setStructuralRows(JSON.parse(savedStructural));
//     if (savedChemical) {
//       setChemicalRows(JSON.parse(savedChemical));
//       setHistory([JSON.parse(savedChemical)]);
//     }
//   }, []);

//   // Save to localStorage when data changes
//   useEffect(() => {
//     localStorage.setItem('structuralData', JSON.stringify(structuralRows));
//     localStorage.setItem('chemicalSamples', JSON.stringify(chemicalRows));
//   }, [structuralRows, chemicalRows]);

//   // Update history when chemicalRows change
//   useEffect(() => {
//     if (history[historyIndex] !== chemicalRows) {
//       const newHistory = history.slice(0, historyIndex + 1);
//       setHistory([...newHistory, chemicalRows]);
//       setHistoryIndex(newHistory.length);
//     }
//   }, [chemicalRows]);

//   // Filter chemical rows based on search and filters
//   const filteredChemicalRows = chemicalRows.filter(row => 
//     (row.sampleNumber.toLowerCase().includes(searchTerm.toLowerCase()) || 
//      row.areaBlockName.toLowerCase().includes(searchTerm.toLowerCase())) &&
//     (filters.commodity ? row.commodityName === filters.commodity : true) &&
//     (filters.sampleType ? row.sampleType === filters.sampleType : true)
//   );

//   // Handlers for structural data
//   const handleStructuralChange = (index: number, field: string, value: string) => {
//     const updatedRows = [...structuralRows];
//     updatedRows[index] = { ...updatedRows[index], [field]: value };
//     setStructuralRows(updatedRows);
//   };

//   const handleAddStructuralRow = () => {
//     setStructuralRows([...structuralRows, initialStructuralRow]);
//   };

//   const handleRemoveStructuralRow = (index: number) => {
//     if (structuralRows.length > 1) {
//       const updatedRows = structuralRows.filter((_, i) => i !== index);
//       setStructuralRows(updatedRows);
//     }
//   };

//   // Handlers for chemical samples
//   const handleChemicalChange = (index: number, field: string, value: string) => {
//     const updatedRows = [...chemicalRows];
//     updatedRows[index] = { ...updatedRows[index], [field]: value };
//     setChemicalRows(updatedRows);
//   };

//   const handleAddChemicalRow = () => {
//     setChemicalRows([...chemicalRows, initialChemicalRow]);
//   };

//   const handleRemoveChemicalRow = (index: number) => {
//     if (chemicalRows.length > 1) {
//       const updatedRows = chemicalRows.filter((_, i) => i !== index);
//       setChemicalRows(updatedRows);
//     }
//   };

//   // Undo/Redo functionality
//   const undo = () => {
//     if (historyIndex > 0) {
//       setHistoryIndex(historyIndex - 1);
//       setChemicalRows(history[historyIndex - 1]);
//     }
//   };

//   const redo = () => {
//     if (historyIndex < history.length - 1) {
//       setHistoryIndex(historyIndex + 1);
//       setChemicalRows(history[historyIndex + 1]);
//     }
//   };

//   // CSV Export/Import
//   const handleExportCSV = () => {
//     const headers = Object.keys(initialChemicalRow).join(',');
//     const csvContent = chemicalRows.map(row => 
//       Object.values(row).map(value => `"${value}"`).join(',')
//     ).join('\n');
    
//     const blob = new Blob([`${headers}\n${csvContent}`], { type: 'text/csv' });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = 'chemical_samples.csv';
//     link.click();
//   };

//   const handleImportCSV = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onload = (e) => {
//       const content = e.target?.result as string;
//       const lines = content.split('\n');
//       const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
      
//       const importedRows = lines.slice(1).map(line => {
//         const values = line.split(',').map(v => v.trim().replace(/"/g, ''));
//         return headers.reduce((obj, header, i) => {
//           obj[header as keyof typeof initialChemicalRow] = values[i] || '';
//           return obj;
//         }, {} as typeof initialChemicalRow);
//       });

//       setChemicalRows(importedRows.filter(r => r.sampleNumber));
//     };
//     reader.readAsText(file);
//   };

//   // Form handling
//   const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<PhaseFourFormValues>({
//     resolver: zodResolver(phaseFourSchema),
//     defaultValues: {
//       wayPoints: structuralRows,
//       chemicalSamples: chemicalRows
//     }
//   });

//   const onSubmit = async (data: PhaseFourFormValues) => {
//     try {
//       const formData = {
//         ...data,
//         wayPoints: structuralRows,
//         chemicalSamples: chemicalRows
//       };
      
//       console.log('Form data:', formData);
//       await new Promise(resolve => setTimeout(resolve, 2000));
//       toast.success('Phase 4 data submitted successfully!');
//     } catch (error) {
//       console.error('Error submitting form:', error);
//       toast.error('Error submitting data. Please try again.');
//     }
//   };

//   // Data for visualization
//   const commodityData = {
//     labels: COMMODITY_OPTIONS,
//     datasets: [{
//       data: COMMODITY_OPTIONS.map(c => 
//         chemicalRows.filter(r => r.commodityName === c).length
//       ),
//       backgroundColor: [
//         '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'
//       ]
//     }]
//   };

//   // Phases for stepper
//   const phases = [
//     { id: 1, name: 'Phase 1', description: 'Initial survey', status: 'completed' },
//     { id: 2, name: 'Phase 2', description: 'Detailed assessment', status: 'completed' },
//     { id: 3, name: 'Phase 3', description: 'Final approval', status: 'completed' },
//     { id: 4, name: 'Phase 4', description: 'Field data', status: 'current' },
//   ];

//   return (
//     <div className="pb-10">
//       <PhaseStepper phases={phases} currentPhase={4} />
      
//       <div className="mb-6 bg-white border border-dashed border-primary-200 rounded-lg p-5">
//         <div className="flex items-center text-primary-700">
//           <Flag className="h-5 w-5 mr-2" />
//           <h3 className="font-medium">Phase 4: Field Data Collection & Analysis</h3>
//         </div>
//         <p className="mt-2 text-sm text-gray-600">
//           Record detailed field data, sample information, and analytical results.
//         </p>
//       </div>
      
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//         {/* Scale Information */}
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center">
//               <Map className="h-5 w-5 mr-2 text-primary-600" />
//               Scale Information
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <InputField
//                 label="Given Scale"
//                 {...register('givenScale')}
//                 error={errors.givenScale?.message}
//               />
//               <InputField
//                 label="Grid Interval (meters)"
//                 {...register('gridInterval')}
//                 error={errors.gridInterval?.message}
//               />
//               <InputField
//                 label="Contours (meters)"
//                 {...register('contoursMeters')}
//                 error={errors.contoursMeters?.message}
//               />
//             </div>
//           </CardContent>
//         </Card>

//         {/* Maps */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Maps</CardTitle>
//             <CardDescription>Upload various types of maps</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <FileUpload
//                 label="Base/Grid Map"
//                 acceptedFileTypes=".jpg,.jpeg,.png,.pdf"
//                 onChange={setOutCropMap}
//                 value={outCropMap}
//               />
//               <FileUpload
//                 label="Toposheet Map"
//                 acceptedFileTypes=".jpg,.jpeg,.png,.pdf"
//                 onChange={setLithoMap}
//                 value={lithoMap}
//               />
//               <FileUpload
//                 label="Geological Map"
//                 acceptedFileTypes=".jpg,.jpeg,.png,.pdf"
//                 onChange={setGeoMap}
//                 value={geoMap}
//               />
//             </div>
//           </CardContent>
//         </Card>

//         {/* Structural Data */}
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center">
//               <Table2 className="h-5 w-5 mr-2 text-primary-600" />
//               Structural Data
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Way Points</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joint/Fault/Fold</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Latitude</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Longitude</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {structuralRows.map((row, index) => (
//                     <tr key={index}>
//                       <td className="px-6 py-2">
//                         <input
//                           type="text"
//                           className="border rounded w-full px-2 py-1 text-sm"
//                           value={row.waypoint}
//                           onChange={(e) => handleStructuralChange(index, 'waypoint', e.target.value)}
//                         />
//                       </td>
//                       <td className="px-6 py-2">
//                         <input
//                           type="text"
//                           className="border rounded w-full px-2 py-1 text-sm"
//                           value={row.jointFaultFold}
//                           onChange={(e) => handleStructuralChange(index, 'jointFaultFold', e.target.value)}
//                         />
//                       </td>
//                       <td className="px-6 py-2">
//                         <input
//                           type="text"
//                           className="border rounded w-full px-2 py-1 text-sm"
//                           value={row.latitude}
//                           onChange={(e) => handleStructuralChange(index, 'latitude', e.target.value)}
//                         />
//                         {errors.wayPoints?.[index]?.latitude && (
//                           <p className="text-red-500 text-xs">{errors.wayPoints[index]?.latitude?.message}</p>
//                         )}
//                       </td>
//                       <td className="px-6 py-2">
//                         <input
//                           type="text"
//                           className="border rounded w-full px-2 py-1 text-sm"
//                           value={row.longitude}
//                           onChange={(e) => handleStructuralChange(index, 'longitude', e.target.value)}
//                         />
//                         {errors.wayPoints?.[index]?.longitude && (
//                           <p className="text-red-500 text-xs">{errors.wayPoints[index]?.longitude?.message}</p>
//                         )}
//                       </td>
//                       <td className="px-6 py-2">
//                         <button
//                           type="button"
//                           onClick={() => handleRemoveStructuralRow(index)}
//                           className="text-red-600 hover:text-red-900 text-sm"
//                           disabled={structuralRows.length <= 1}
//                         >
//                           Remove
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//               <div className="mt-4">
//                 <Button type="button" onClick={handleAddStructuralRow}>
//                   + Add Structural Data Row
//                 </Button>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Chemical Sample Points */}
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center">
//               <FileSpreadsheet className="h-5 w-5 mr-2 text-primary-600" />
//               Chemical Sample Points (BRS)
//             </CardTitle>
//             <CardDescription>
//               <div className="flex flex-wrap items-center gap-4 mt-2">
//                 <div className="relative flex-1 min-w-[200px]">
//                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//                   <input
//                     type="text"
//                     placeholder="Search samples..."
//                     className="pl-10 pr-4 py-2 border rounded w-full text-sm"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                   />
//                 </div>
//                 <select
//                   className="border rounded px-3 py-2 text-sm"
//                   value={filters.commodity}
//                   onChange={(e) => setFilters({...filters, commodity: e.target.value})}
//                 >
//                   <option value="">All Commodities</option>
//                   {COMMODITY_OPTIONS.map(c => (
//                     <option key={c} value={c}>{c}</option>
//                   ))}
//                 </select>
//                 <select
//                   className="border rounded px-3 py-2 text-sm"
//                   value={filters.sampleType}
//                   onChange={(e) => setFilters({...filters, sampleType: e.target.value})}
//                 >
//                   <option value="">All Sample Types</option>
//                   {SAMPLE_TYPES.map(t => (
//                     <option key={t} value={t}>{t}</option>
//                   ))}
//                 </select>
//                 <div className="flex space-x-2">
//                   <Button type="button" variant="outline" size="sm" onClick={undo} disabled={historyIndex <= 0}>
//                     <Undo className="h-4 w-4 mr-1" /> Undo
//                   </Button>
//                   <Button type="button" variant="outline" size="sm" onClick={redo} disabled={historyIndex >= history.length - 1}>
//                     <Redo className="h-4 w-4 mr-1" /> Redo
//                   </Button>
//                 </div>
//                 <div className="flex space-x-2">
//                   <Button type="button" variant="outline" size="sm" onClick={handleExportCSV}>
//                     <Download className="h-4 w-4 mr-1" /> Export
//                   </Button>
//                   <Button type="button" variant="outline" size="sm" asChild>
//                     <label>
//                       <Upload className="h-4 w-4 mr-1" /> Import
//                       <input type="file" accept=".csv" onChange={handleImportCSV} className="hidden" />
//                     </label>
//                   </Button>
//                 </div>
//               </div>
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//               <div className="lg:col-span-2">
//                 <div className="overflow-x-auto">
//                   <table className="min-w-full divide-y divide-gray-200">
//                     <thead className="bg-gray-50">
//                       <tr>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sample #</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commodity</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Area</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody className="bg-white divide-y divide-gray-200">
//                       {filteredChemicalRows.map((row, index) => (
//                         <tr key={index}>
//                           <td className="px-6 py-2">
//                             <input
//                               type="text"
//                               className="border rounded w-full px-2 py-1 text-sm"
//                               value={row.sampleNumber}
//                               onChange={(e) => handleChemicalChange(index, 'sampleNumber', e.target.value)}
//                             />
//                           </td>
//                           <td className="px-6 py-2">
//                             <select
//                               className="border rounded w-full px-2 py-1 text-sm"
//                               value={row.commodityName}
//                               onChange={(e) => handleChemicalChange(index, 'commodityName', e.target.value)}
//                             >
//                               <option value="">Select</option>
//                               {COMMODITY_OPTIONS.map(c => (
//                                 <option key={c} value={c}>{c}</option>
//                               ))}
//                             </select>
//                           </td>
//                           <td className="px-6 py-2">
//                             <select
//                               className="border rounded w-full px-2 py-1 text-sm"
//                               value={row.sampleType}
//                               onChange={(e) => handleChemicalChange(index, 'sampleType', e.target.value)}
//                             >
//                               <option value="">Select</option>
//                               {SAMPLE_TYPES.map(t => (
//                                 <option key={t} value={t}>{t}</option>
//                               ))}
//                             </select>
//                           </td>
//                           <td className="px-6 py-2">
//                             <input
//                               type="text"
//                               className="border rounded w-full px-2 py-1 text-sm"
//                               value={row.areaBlockName}
//                               onChange={(e) => handleChemicalChange(index, 'areaBlockName', e.target.value)}
//                             />
//                           </td>
//                           <td className="px-6 py-2">
//                             <button
//                               type="button"
//                               onClick={() => handleRemoveChemicalRow(index)}
//                               className="text-red-600 hover:text-red-900 text-sm"
//                               disabled={chemicalRows.length <= 1}
//                             >
//                               Remove
//                             </button>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//                 <div className="mt-4">
//                   <Button type="button" onClick={handleAddChemicalRow}>
//                     + Add Sample Row
//                   </Button>
//                 </div>
//               </div>
//               <div className="space-y-6">
//                 <div className="h-64">
//                   <MapContainer 
//                     center={[20.5937, 78.9629]} 
//                     zoom={5} 
//                     style={{ height: '100%', borderRadius: '0.5rem' }}
//                   >
//                     <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//                     {chemicalRows.filter(r => r.latitude && r.longitude).map((sample, index) => (
//                       <Marker 
//                         key={index} 
//                         position={[parseFloat(sample.latitude), parseFloat(sample.longitude)]}
//                       >
//                         <Popup>
//                           <div className="text-sm">
//                             <strong>Sample #{sample.sampleNumber}</strong><br/>
//                             {sample.commodityName}<br/>
//                             {sample.areaBlockName}
//                           </div>
//                         </Popup>
//                       </Marker>
//                     ))}
//                   </MapContainer>
//                 </div>
//                 <div className="bg-white p-4 rounded-lg shadow">
//                   <h3 className="font-medium mb-2">Sample Distribution</h3>
//                   <div className="h-48">
//                     <Pie 
//                       data={commodityData} 
//                       options={{ 
//                         maintainAspectRatio: false,
//                         plugins: {
//                           legend: { position: 'right' }
//                         }
//                       }} 
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Submit Button */}
//         <div className="flex justify-end">
//           <Button
//             type="submit"
//             size="lg"
//             isLoading={isSubmitting}
//             className="px-10"
//           >
//             Submit Field Data
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default PhaseFourPage;


import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-toastify';
import { Map, Table2, FileSpreadsheet, Microscope, Flag } from 'lucide-react';

import InputField from '../components/ui/InputField';
import TextareaField from '../components/ui/TextareaField';
import Button from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import FileUpload from '../components/ui/FileUpload';
import PhaseStepper from '../components/PhaseStepper';

// Define the Phase 4 form schema
const phaseFourSchema = z.object({
  // Scale section
  givenScale: z.string().optional(),
  gridInterval: z.string().optional(),
  contoursMeters: z.string().optional(),
  
  // Maps
  baseMap: z.string().optional(),
  toposheetMap: z.string().optional(),
  geologicalMap: z.string().optional(),
  
  // Structural data
  wayPoints: z.array(z.object({
    waypoint: z.string(),
    jointFaultFold: z.string(),
    latitude: z.string(),
    longitude: z.string(),
    strike: z.string(),
    dipAmount: z.string(),
    dipDirection: z.string(),
    remarks: z.string().optional()
  })).optional(),

  // Chemical sample points
  chemicalSamples: z.array(z.object({
    toposheetNo: z.string(),
    sampleNumber: z.string(),
    latitude: z.string(),
    longitude: z.string(),
    areaBlockName: z.string(),
    commodityName: z.string(),
    sampleType: z.string(),
    sampleMedia: z.string(),
    remarks: z.string().optional()
  })).optional(),

  // Lithology
  lithologyData: z.array(z.object({
    toposheetNo: z.string(),
    stratigraphicAge: z.string(),
    supergroup: z.string(),
    groupName: z.string(),
    lithologicalUnit: z.string(),
    majorMineral: z.string(),
    remarks: z.string().optional()
  })).optional(),

  // Chemical sample line
  sampleLines: z.array(z.object({
    toposheetNo: z.string(),
    areaBlockName: z.string(),
    commodityName: z.string(),
    sampleType: z.string(),
    sampleName: z.string(),
    sampleNumber: z.string(),
    sampleMedia: z.string(),
    lengthInMeter: z.string(),
    widthInMeter: z.string(),
    depthInMeter: z.string(),
    remarks: z.string().optional()
  })).optional(),

  // Locations
  locations: z.array(z.object({
    toposheetNo: z.string(),
    name: z.string(),
    type: z.string(),
    remarks: z.string().optional()
  })).optional(),

  // Borehole points
  boreholes: z.array(z.object({
    toposheetNo: z.string(),
    latitude: z.string(),
    longitude: z.string(),
    boreholeName: z.string(),
    rlCollar: z.string(),
    angleInDegree: z.string(),
    azimuthInDegree: z.string(),
    lengthInMeter: z.string(),
    remarks: z.string().optional()
  })).optional(),

  // Analytical results
  chemicalAnalysisQty: z.string().optional(),
  petrographicQty: z.string().optional(),
  xrfQty: z.string().optional(),
  xrdQty: z.string().optional(),
  epmaQty: z.string().optional(),
  semQty: z.string().optional(),
  fireAssayQty: z.string().optional(),
  wholeRockAnalysisQty: z.string().optional(),
  bulkDensityQty: z.string().optional()
});

type PhaseFourFormValues = z.infer<typeof phaseFourSchema>;

const PhaseFourPage = () => {
  // State for file uploads
  const [outCropMap, setOutCropMap] = useState<File | null>(null);
  const [lithoMap, setLithoMap] = useState<File | null>(null);
  const [geoMap, setGeoMap] = useState<File | null>(null);
  const [sampleLocMap, setSampleLocMap] = useState<File | null>(null);

  // Form validation using react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PhaseFourFormValues>({
    resolver: zodResolver(phaseFourSchema)
  });

  // Handle form submission
  const onSubmit = async (data: PhaseFourFormValues) => {
    try {
      console.log('Form data:', data);
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('Phase 4 data submitted successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Error submitting data. Please try again.');
    }
  };

  // Define phases for the stepper
  const phases = [
    {
      id: 1,
      name: 'Phase 1',
      description: 'Initial survey and planning',
      status: 'completed' as const,
    },
    {
      id: 2,
      name: 'Phase 2',
      description: 'Detailed assessment',
      status: 'completed' as const,
    },
    {
      id: 3,
      name: 'Phase 3',
      description: 'Final approval',
      status: 'completed' as const,
    },
    {
      id: 4,
      name: 'Phase 4',
      description: 'Field data and analysis',
      status: 'current' as const,
    },
  ];

  return (
    <div className="pb-10">
      <PhaseStepper phases={phases} currentPhase={4} />
      
      <div className="mb-6 bg-white border border-dashed border-primary-200 rounded-lg p-5">
        <div className="flex items-center text-primary-700">
          <Flag className="h-5 w-5 mr-2" />
          <h3 className="font-medium">Phase 4: Field Data Collection & Analysis</h3>
        </div>
        <p className="mt-2 text-sm text-gray-600">
          Record detailed field data, sample information, and analytical results from the geological exploration.
        </p>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Scale Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Map className="h-5 w-5 mr-2 text-primary-600" />
              Scale Information
            </CardTitle>
            <CardDescription>Enter the scale details and measurements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <InputField
                label="Given Scale"
                {...register('givenScale')}
                error={errors.givenScale?.message}
              />
              <InputField
                label="Grid Interval (meters)"
                type="number"
                {...register('gridInterval')}
                error={errors.gridInterval?.message}
              />
              <InputField
                label="Contours (meters)"
                type="number"
                {...register('contoursMeters')}
                error={errors.contoursMeters?.message}
              />
            </div>
          </CardContent>
        </Card>

        {/* Maps */}
        <Card>
          <CardHeader>
            <CardTitle>Maps</CardTitle>
            <CardDescription>Upload various types of maps</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FileUpload
                label="Base/Grid Map"
                acceptedFileTypes=".jpg,.jpeg,.png,.pdf"
                onChange={setOutCropMap}
                value={outCropMap}
              />
              <FileUpload
                label="Toposheet Map"
                acceptedFileTypes=".jpg,.jpeg,.png,.pdf"
                onChange={setLithoMap}
                value={lithoMap}
              />
              <FileUpload
                label="Geological Map"
                acceptedFileTypes=".jpg,.jpeg,.png,.pdf"
                onChange={setGeoMap}
                value={geoMap}
              />
            </div>
          </CardContent>
        </Card>

        {/* Structural Data */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Table2 className="h-5 w-5 mr-2 text-primary-600" />
              Structural Data
            </CardTitle>
            <CardDescription>Record structural measurements and observations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Way Points</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joint/Fault/Fold</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Latitude</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Longitude</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Strike</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dip Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dip Direction</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remarks</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {/* Add dynamic rows here */}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Chemical Sample Points */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileSpreadsheet className="h-5 w-5 mr-2 text-primary-600" />
              Chemical Sample Points (BRS)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Toposheet No</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sample Number</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Latitude</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Longitude</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Area/Block Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commodity Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sample Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sample Media</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remarks</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {/* Add dynamic rows here */}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Analytical Results */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Microscope className="h-5 w-5 mr-2 text-primary-600" />
              Analytical Results
            </CardTitle>
            <CardDescription>Record quantities for different types of analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <InputField
                label="Chemical Analysis Quantity"
                type="number"
                {...register('chemicalAnalysisQty')}
                error={errors.chemicalAnalysisQty?.message}
              />
              <InputField
                label="Petrographic Quantity"
                type="number"
                {...register('petrographicQty')}
                error={errors.petrographicQty?.message}
              />
              <InputField
                label="XRF Quantity"
                type="number"
                {...register('xrfQty')}
                error={errors.xrfQty?.message}
              />
              <InputField
                label="XRD Quantity"
                type="number"
                {...register('xrdQty')}
                error={errors.xrdQty?.message}
              />
              <InputField
                label="EPMA Quantity"
                type="number"
                {...register('epmaQty')}
                error={errors.epmaQty?.message}
              />
              <InputField
                label="SEM Quantity"
                type="number"
                {...register('semQty')}
                error={errors.semQty?.message}
              />
              <InputField
                label="Fire Assay Quantity"
                type="number"
                {...register('fireAssayQty')}
                error={errors.fireAssayQty?.message}
              />
              <InputField
                label="Whole Rock Analysis Quantity"
                type="number"
                {...register('wholeRockAnalysisQty')}
                error={errors.wholeRockAnalysisQty?.message}
              />
              <InputField
                label="Bulk Density Quantity"
                type="number"
                {...register('bulkDensityQty')}
                error={errors.bulkDensityQty?.message}
              />
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button
            type="submit"
            size="lg"
            isLoading={isSubmitting}
            className="px-10"
          >
            Submit Field Data
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PhaseFourPage;