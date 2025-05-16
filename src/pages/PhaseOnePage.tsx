import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { formatDate } from '../lib/utils';
import { CalendarDays, Check, FileText, Info, Map, Upload, X } from 'lucide-react';
import { toast } from 'react-toastify';

import InputField from '../components/ui/InputField';
import TextareaField from '../components/ui/TextareaField';
import Button from '../components/ui/Button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import FileUpload from '../components/ui/FileUpload';
import RadioGroup from '../components/ui/RadioGroup';
import CoordinateMap from '../components/maps/CoordinateMap';
import PhaseStepper from '../components/PhaseStepper';
import ForestCoverChart from '../components/charts/ForestCoverChart';

// Define the coordinate type
interface Coordinate {
  name: string;
  latitude: number;
  longitude: number;
}

// Define the Phase 1 form schema
const phaseOneSchema = z.object({
  projectTitle: z.string().min(1, 'Project title is required'),
  commodity: z.string().min(1, 'Commodity is required'),
  toposheetNo: z.string().min(1, 'Toposheet number is required'),
  totalAreaSqKm: z.string().transform((val) => (val === '' ? '0' : val)),
  forestCoverPrivate: z.string().transform((val) => (val === '' ? '0' : val)),
  forestCoverBarren: z.string().transform((val) => (val === '' ? '0' : val)),
  forestCoverForest: z.string().transform((val) => (val === '' ? '0' : val)),
  directorReview: z.string().optional(),
  mailDate: z.string().optional(),
  inPrincipleDate: z.string().optional(),
  meetingRemarks: z.string().optional(),

    // Progress tracking
    geologicalAreaCovered: z.string().min(0),
    geologicalAreaToBeCovered: z.string().min(0),
    geochemicalAreaCovered: z.string().min(0),
    geochemicalAreaToBeCovered: z.string().min(0),
    geophysicalAreaCovered: z.string().min(0),
    geophysicalAreaToBeCovered: z.string().min(0),
    samplesCollected: z.string().min(0),
    samplesPending: z.string().min(0),
    trenchingConducted: z.string().min(0),
    trenchingPending: z.string().min(0),
    drillingAchieved: z.string().min(0),
    drillingPending: z.string().min(0),
});

type PhaseOneFormValues = z.infer<typeof phaseOneSchema>;

const PhaseOnePage = () => {
  // State for file uploads
  const [referenceFile, setReferenceFile] = useState<File | null>(null);
  const [toposheetMapFile, setToposheetMapFile] = useState<File | null>(null);
  const [geologicalMapFile, setGeologicalMapFile] = useState<File | null>(null);
  const [regionalGeologicalMapFile, setRegionalGeologicalMapFile] = useState<File | null>(null);
  const [tectonicMapFile, setTectonicMapFile] = useState<File | null>(null);
  const [aeroMagneticMapFile, setAeroMagneticMapFile] = useState<File | null>(null);
  const [remoteSensingMapFile, setRemoteSensingMapFile] = useState<File | null>(null);
  const [sampleLocationsMapFile, setSampleLocationsMapFile] = useState<File | null>(null);
  const [dueDiligenceFile, setDueDiligenceFile] = useState<File | null>(null);
  const [mailAttachmentFile, setMailAttachmentFile] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [wordFile, setWordFile] = useState<File | null>(null);
  const [jpgFile, setJpgFile] = useState<File | null>(null);
  const [shapeFile, setShapeFile] = useState<File | null>(null);
  const [excelFile, setExcelFile] = useState<File | null>(null);
  const [pptFile, setPptFile] = useState<File | null>(null);

  // State for coordinates
  const [coordinates, setCoordinates] = useState<Coordinate[]>([
    { name: 'A', latitude: 20.5937, longitude: 78.9629 },
    { name: 'B', latitude: 20.6937, longitude: 79.0629 },
    { name: 'C', latitude: 20.5437, longitude: 79.0129 },
  ]);
  const [newCoordName, setNewCoordName] = useState('D');
  const [newCoordLat, setNewCoordLat] = useState('');
  const [newCoordLng, setNewCoordLng] = useState('');

  // Form validation using react-hook-form
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<PhaseOneFormValues>({
    resolver: zodResolver(phaseOneSchema),
    defaultValues: {
      projectTitle: '',
      commodity: '',
      toposheetNo: '',
      totalAreaSqKm: '0',
      forestCoverPrivate: '33.3',
      forestCoverBarren: '33.3',
      forestCoverForest: '33.4',
      directorReview: '',
      mailDate: formatDate(new Date()),
      inPrincipleDate: '',
      meetingRemarks: '',

      // Initialize progress tracking fields
      geologicalAreaCovered: '0',
      geologicalAreaToBeCovered: '0',
      geochemicalAreaCovered: '0',
      geochemicalAreaToBeCovered: '0',
      geophysicalAreaCovered: '0',
      geophysicalAreaToBeCovered: '0',
      samplesCollected: '0',
      samplesPending: '0',
      trenchingConducted: '0',
      trenchingPending: '0',
      drillingAchieved: '0',
      drillingPending: '0',
    },
  });

  // Watch forest cover values to ensure they add up to 100%
  const forestCoverPrivate = parseFloat(watch('forestCoverPrivate') || '0');
  const forestCoverBarren = parseFloat(watch('forestCoverBarren') || '0');
  const forestCoverForest = parseFloat(watch('forestCoverForest') || '0');
  
  // Calculate total forest cover
  const totalForestCover = forestCoverPrivate + forestCoverBarren + forestCoverForest;
  
  // Check if forest cover values are valid
  const isForestCoverValid = Math.abs(totalForestCover - 100) < 0.1;

  // Add a new coordinate
  // const addCoordinate = () => {
  //   if (!newCoordName || !newCoordLat || !newCoordLng) {
  //     toast.error('Please fill in all coordinate fields');
  //     return;
  //   }

  //   const lat = parseFloat(newCoordLat);
  //   const lng = parseFloat(newCoordLng);
    
  //   if (isNaN(lat) || isNaN(lng)) {
  //     toast.error('Latitude and longitude must be valid numbers');
  //     return;
  //   }

  //   setCoordinates([
  //     ...coordinates,
  //     { name: newCoordName, latitude: lat, longitude: lng },
  //   ]);
    
  //   // Reset input fields
  //   setNewCoordName(String.fromCharCode(newCoordName.charCodeAt(0) + 1));
  //   setNewCoordLat('');
  //   setNewCoordLng('');
    
  //   toast.success('Coordinate added successfully');
  // };
  const addCoordinate = () => {
    if (!newCoordName || !newCoordLat || !newCoordLng) {
      toast.error('Please fill in all coordinate fields');
      return;
    }
  
    const lat = parseFloat(newCoordLat);
    const lng = parseFloat(newCoordLng);
  
    if (isNaN(lat) || isNaN(lng)) {
      toast.error('Latitude and longitude must be valid numbers');
      return;
    }
  
    setCoordinates([
      ...coordinates,
      { name: newCoordName, latitude: lat, longitude: lng },
    ]);
  
    // Automatically increment next coordinate name (A → B → C ...)
    const nextChar = String.fromCharCode(newCoordName.charCodeAt(0) + 1);
    setNewCoordName(nextChar);
    setNewCoordLat('');
    setNewCoordLng('');
  
    toast.success('Coordinate added successfully');
  };
  

  // Remove a coordinate
  // const removeCoordinate = (index: number) => {
  //   const newCoordinates = [...coordinates];
  //   newCoordinates.splice(index, 1);
  //   setCoordinates(newCoordinates);
  //   toast.info('Coordinate removed');
  // };
  const removeCoordinate = (index: number) => {
    const updatedCoordinates = [...coordinates];
    updatedCoordinates.splice(index, 1);
    setCoordinates(updatedCoordinates);
    toast.success('Coordinate removed');
  };
  


  // Handle form submission
  const onSubmit = async (data: PhaseOneFormValues) => {
    try {
      // In a real application, you would send the data and files to your backend here
      console.log('Form data:', data);
      console.log('Coordinates:', coordinates);
      
      // Example of files that would be submitted
      const formData = new FormData();
      formData.append('projectTitle', data.projectTitle);
      formData.append('commodity', data.commodity);
      formData.append('coordinates', JSON.stringify(coordinates));
      
      if (referenceFile) formData.append('referenceFile', referenceFile);
      if (toposheetMapFile) formData.append('toposheetMapFile', toposheetMapFile);
      // Add other files...
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Phase 1 data submitted successfully!');
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
      status: 'current' as const,
    },
    {
      id: 2,
      name: 'Phase 2',
      description: 'Detailed assessment',
      status: 'upcoming' as const,
    },
    {
      id: 3,
      name: 'Phase 3',
      description: 'Final approval',
      status: 'upcoming' as const,
    },
  ];

  useEffect(() => {
    // Auto-adjust forest cover to ensure it equals 100%
    const adjustForestCover = () => {
      if (totalForestCover > 0 && totalForestCover !== 100) {
        const remainder = 100 - totalForestCover;
        setValue('forestCoverForest', (forestCoverForest + remainder).toFixed(1));
      }
    };

    // Only adjust if user has modified values and they're not at 100%
    if (forestCoverPrivate !== 33.3 || forestCoverBarren !== 33.3 || forestCoverForest !== 33.4) {
      if (!isForestCoverValid) {
        const timer = setTimeout(adjustForestCover, 1500);
        return () => clearTimeout(timer);
      }
    }
  }, [forestCoverPrivate, forestCoverBarren, forestCoverForest, setValue, totalForestCover, isForestCoverValid]);

  return (
    <div className="pb-10">
      <PhaseStepper phases={phases} currentPhase={1} />
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-6">
          {/* Basic Project Information */}
          <Card>
            <CardHeader>
              <CardTitle>Project Information</CardTitle>
              <CardDescription>Enter the basic details of the geological exploration project</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="Title of Project"
                  placeholder="Enter project title"
                  {...register('projectTitle')}
                  error={errors.projectTitle?.message}
                />
                <InputField
                  label="Category"
                  placeholder="Mention Category as G4 OR G3"
                  {...register('projectTitle')}
                  error={errors.projectTitle?.message}
                />
                <InputField
                  label="Commodity"
                  placeholder="Enter commodity"
                  {...register('commodity')}
                  error={errors.commodity?.message}
                />
                <InputField
                  label="Toposheet No."
                  placeholder="Enter toposheet number"
                  {...register('toposheetNo')}
                  error={errors.toposheetNo?.message}
                />
                <InputField
                  label="Total Area (sq.km)"
                  type="number"
                  placeholder="Enter total area"
                  {...register('totalAreaSqKm')}
                  error={errors.totalAreaSqKm?.message}
                />
              </div>
            </CardContent>
          </Card>
          
          {/* Newly added ta table */}
          {/* Progress Tracking */}
          <Card>
            <CardHeader>
              <CardTitle>Progress Tracking</CardTitle>
              <CardDescription>Track progress of various exploration activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Area Coverage */}
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-4">Area Coverage Status</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-4">
                      <h5 className="text-sm font-medium text-gray-700">Geological</h5>
                      <InputField
                        label="Area Covered"
                        type="number"
                        {...register('geologicalAreaCovered')}
                        error={errors.geologicalAreaCovered?.message}
                      />
                      <InputField
                        label="To be Covered"
                        type="number"
                        {...register('geologicalAreaToBeCovered')}
                        error={errors.geologicalAreaToBeCovered?.message}
                      />
                    </div>
                    <div className="space-y-4">
                      <h5 className="text-sm font-medium text-gray-700">Geochemical</h5>
                      <InputField
                        label="Area Covered"
                        type="number"
                        {...register('geochemicalAreaCovered')}
                        error={errors.geochemicalAreaCovered?.message}
                      />
                      <InputField
                        label="To be Covered"
                        type="number"
                        {...register('geochemicalAreaToBeCovered')}
                        error={errors.geochemicalAreaToBeCovered?.message}
                      />
                    </div>
                    <div className="space-y-4">
                      <h5 className="text-sm font-medium text-gray-700">Geophysical</h5>
                      <InputField
                        label="Area Covered"
                        type="number"
                        {...register('geophysicalAreaCovered')}
                        error={errors.geophysicalAreaCovered?.message}
                      />
                      <InputField
                        label="To be Covered"
                        type="number"
                        {...register('geophysicalAreaToBeCovered')}
                        error={errors.geophysicalAreaToBeCovered?.message}
                      />
                    </div>
                  </div>
                </div>

                {/* Sample and Activity Progress */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                  <div className="space-y-4">
                    <h5 className="text-sm font-medium text-gray-700">Samples</h5>
                    <InputField
                      label="Collected"
                      type="number"
                      {...register('samplesCollected')}
                      error={errors.samplesCollected?.message}
                    />
                    <InputField
                      label="Pending"
                      type="number"
                      {...register('samplesPending')}
                      error={errors.samplesPending?.message}
                    />
                  </div>
                  <div className="space-y-4">
                    <h5 className="text-sm font-medium text-gray-700">Trenching</h5>
                    <InputField
                      label="Conducted"
                      type="number"
                      {...register('trenchingConducted')}
                      error={errors.trenchingConducted?.message}
                    />
                    <InputField
                      label="Pending"
                      type="number"
                      {...register('trenchingPending')}
                      error={errors.trenchingPending?.message}
                    />
                  </div>
                  <div className="space-y-4">
                    <h5 className="text-sm font-medium text-gray-700">Drilling Target</h5>
                    <InputField
                      label="Achieved"
                      type="number"
                      {...register('drillingAchieved')}
                      error={errors.drillingAchieved?.message}
                    />
                    <InputField
                      label="Pending"
                      type="number"
                      {...register('drillingPending')}
                      error={errors.drillingPending?.message}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Boundary Coordinates */}
          <Card>
            <CardHeader>
              <CardTitle>Boundary Coordinates</CardTitle>
              <CardDescription>Define the boundary coordinates for the exploration area</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* <CoordinateMap 
                  coordinates={coordinates} 
                  title="Exploration Area"
                  description="Interactive map of the exploration boundary"
                /> */}
                <CoordinateMap
                  coordinates={coordinates}
                  title="Coordinate Map"
                  onRemoveCoordinate={removeCoordinate}
                />

                
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      {coordinates.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-4">
                          {coordinates.map((coord, index) => (
                            <div key={index} className="p-3 bg-gray-100 rounded border flex justify-between items-center">
                              <div>
                                <div className="text-sm font-medium">{coord.name}</div>
                                <div className="text-xs text-gray-600">
                                  Lat: {coord.latitude.toFixed(6)}, Lng: {coord.longitude.toFixed(6)}
                                </div>
                              </div>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => removeCoordinate(index)}
                              >
                                Remove
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}

                  <h4 className="text-sm font-medium text-gray-700 mb-3">Add New Coordinate</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <InputField
                      label="Coordinate Name"
                      placeholder="e.g. A, B, C"
                      value={newCoordName}
                      onChange={(e) => setNewCoordName(e.target.value)}
                      containerClassName="sm:col-span-1"
                    />
                    <InputField
                      label="Latitude"
                      type="number"
                      step="0.000001"
                      placeholder="e.g. 20.5937"
                      value={newCoordLat}
                      onChange={(e) => setNewCoordLat(e.target.value)}
                      containerClassName="sm:col-span-1"
                    />
                    <InputField
                      label="Longitude"
                      type="number"
                      step="0.000001"
                      placeholder="e.g. 78.9629"
                      value={newCoordLng}
                      onChange={(e) => setNewCoordLng(e.target.value)}
                      containerClassName="sm:col-span-1"
                    />
                    <div className="flex items-end sm:col-span-1">
                      <Button 
                        type="button" 
                        onClick={addCoordinate}
                        className="w-full"
                      >
                        Add Coordinate
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

            {/* Maps and References */}
            <Card>
            <CardHeader>
              <CardTitle>Maps and References</CardTitle>
              <CardDescription>Upload relevant maps and reference documents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border-b border-gray-200 pb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Reference Document</h4>
                  <FileUpload
                    label="Upload Reference Document"
                    acceptedFileTypes=".pdf,.doc,.docx"
                    onChange={setReferenceFile}
                    value={referenceFile}
                  />
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Required Maps</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="text-sm text-gray-500">Regional Geological Map</p>
                      <FileUpload
                        acceptedFileTypes=".jpg,.jpeg,.png,.pdf"
                        onChange={setRegionalGeologicalMapFile}
                        value={regionalGeologicalMapFile}
                      />
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-500">Tectonic Map</p>
                      <FileUpload
                        acceptedFileTypes=".jpg,.jpeg,.png,.pdf"
                        onChange={setTectonicMapFile}
                        value={tectonicMapFile}
                      />
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-500">Aero Magnetic Map</p>
                      <FileUpload
                        acceptedFileTypes=".jpg,.jpeg,.png,.pdf"
                        onChange={setAeroMagneticMapFile}
                        value={aeroMagneticMapFile}
                      />
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-500">Remote Sensing Map</p>
                      <FileUpload
                        acceptedFileTypes=".jpg,.jpeg,.png,.pdf"
                        onChange={setRemoteSensingMapFile}
                        value={remoteSensingMapFile}
                      />
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-500">Toposheet Map</p>
                      <FileUpload
                        acceptedFileTypes=".jpg,.jpeg,.png,.pdf"
                        onChange={setToposheetMapFile}
                        value={toposheetMapFile}
                      />
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-500">Geological Map</p>
                      <FileUpload
                        acceptedFileTypes=".jpg,.jpeg,.png,.pdf"
                        onChange={setGeologicalMapFile}
                        value={geologicalMapFile}
                      />
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-500">Sample Locations Map</p>
                      <FileUpload
                        acceptedFileTypes=".jpg,.jpeg,.png,.pdf"
                        onChange={setSampleLocationsMapFile}
                        value={sampleLocationsMapFile}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card> 

          {/* Forest Cover */}
          <Card>
            <CardHeader>
              <CardTitle>Forest Cover Distribution</CardTitle>
              <CardDescription>
                Specify the percentage distribution of different land types
                {!isForestCoverValid && (
                  <span className="text-amber-500 block mt-1">
                    <Info className="h-4 w-4 inline mr-1" />
                    Percentages should add up to 100%. Values will be adjusted automatically.
                  </span>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <InputField
                    label="Private Land (%)"
                    type="number"
                    step="0.1"
                    placeholder="Enter percentage"
                    {...register('forestCoverPrivate')}
                    error={errors.forestCoverPrivate?.message}
                  />
                  <InputField
                    label="Barren Land (%)"
                    type="number"
                    step="0.1"
                    placeholder="Enter percentage"
                    {...register('forestCoverBarren')}
                    error={errors.forestCoverBarren?.message}
                  />
                  <InputField
                    label="Forest RF/PF (%)"
                    type="number"
                    step="0.1"
                    placeholder="Enter percentage"
                    {...register('forestCoverForest')}
                    error={errors.forestCoverForest?.message}
                  />
                  <div className="pt-2">
                    <p className={`text-sm font-medium ${isForestCoverValid ? 'text-green-600' : 'text-amber-600'}`}>
                      Total: {totalForestCover.toFixed(1)}%
                      {isForestCoverValid && <Check className="inline h-4 w-4 ml-1" />}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <ForestCoverChart 
                    privatePercentage={forestCoverPrivate}
                    barrenPercentage={forestCoverBarren}
                    forestPercentage={forestCoverForest}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Maps and References */}
          <Card>
            <CardHeader>
              <CardTitle>Maps and References</CardTitle>
              <CardDescription>Upload relevant maps and reference documents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border-b border-gray-200 pb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Reference Document</h4>
                  <FileUpload
                    label="Upload Reference Document"
                    acceptedFileTypes=".pdf,.doc,.docx"
                    onChange={setReferenceFile}
                    value={referenceFile}
                  />
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Required Maps</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <p className="text-sm text-gray-500">Toposheet Map</p>
                      <FileUpload
                        acceptedFileTypes=".jpg,.jpeg,.png,.pdf"
                        onChange={setToposheetMapFile}
                        value={toposheetMapFile}
                      />
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-500">Geological Map</p>
                      <FileUpload
                        acceptedFileTypes=".jpg,.jpeg,.png,.pdf"
                        onChange={setGeologicalMapFile}
                        value={geologicalMapFile}
                      />
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-500">Sample Locations Map</p>
                      <FileUpload
                        acceptedFileTypes=".jpg,.jpeg,.png,.pdf"
                        onChange={setSampleLocationsMapFile}
                        value={sampleLocationsMapFile}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Due Diligence */}
          <Card>
            <CardHeader>
              <CardTitle>Due Diligence</CardTitle>
              <CardDescription>Upload due diligence documentation as per NMet format</CardDescription>
            </CardHeader>
            <CardContent>
              <FileUpload
                label="Upload Due Diligence Document"
                acceptedFileTypes=".pdf,.doc,.docx"
                onChange={setDueDiligenceFile}
                value={dueDiligenceFile}
              />
            </CardContent>
          </Card>

          {/* Director Review */}
          <Card>
            <CardHeader>
              <CardTitle>Director Review</CardTitle>
              <CardDescription>Select approval status from director review</CardDescription>
            </CardHeader>
            <CardContent>
              <Controller
                name="directorReview"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <RadioGroup
                    label="Status"
                    options={[
                      { label: 'Approved', value: 'approved' },
                      { label: 'Rejected', value: 'rejected' },
                      { label: 'Pending', value: 'pending' }
                    ]}
                    {...field}
                    error={errors.directorReview?.message}
                  />
                )}
              />
            </CardContent>
          </Card>

          {/* Mail to Nmet */}
          <Card>
            <CardHeader>
              <CardTitle>Mail to NMet</CardTitle>
              <CardDescription>Record communication with NMet</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    label="Date"
                    type="date"
                    {...register('mailDate')}
                    error={errors.mailDate?.message}
                  />
                  <div className="flex items-end">
                    <FileUpload
                      label="Upload Mail Attachment"
                      acceptedFileTypes=".pdf,.doc,.docx,.msg,.eml"
                      onChange={setMailAttachmentFile}
                      value={mailAttachmentFile}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* All Data & Shapefile */}
          <Card>
            <CardHeader>
              <CardTitle>All Data & Shapefile</CardTitle>
              <CardDescription>Upload all required files from source</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <FileUpload
                  label="PDF File"
                  acceptedFileTypes=".pdf"
                  onChange={setPdfFile}
                  value={pdfFile}
                />
                <FileUpload
                  label="Word File"
                  acceptedFileTypes=".doc,.docx"
                  onChange={setWordFile}
                  value={wordFile}
                />
                <FileUpload
                  label="JPG Image"
                  acceptedFileTypes=".jpg,.jpeg"
                  onChange={setJpgFile}
                  value={jpgFile}
                />
                <FileUpload
                  label="Shape File"
                  acceptedFileTypes=".shp,.shx,.dbf,.prj,.sbn,.sbx"
                  onChange={setShapeFile}
                  value={shapeFile}
                />
                <FileUpload
                  label="Excel File"
                  acceptedFileTypes=".xls,.xlsx,.csv"
                  onChange={setExcelFile}
                  value={excelFile}
                />
              </div>
            </CardContent>
          </Card>

          {/* InPrinciple: PPT */}
          <Card>
            <CardHeader>
              <CardTitle>InPrinciple: PPT</CardTitle>
              <CardDescription>Upload presentation and specify date</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="Date"
                  type="date"
                  {...register('inPrincipleDate')}
                  error={errors.inPrincipleDate?.message}
                />
                <div className="flex items-end">
                  <FileUpload
                    label="Upload PPT"
                    acceptedFileTypes=".ppt,.pptx"
                    onChange={setPptFile}
                    value={pptFile}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Meeting Remarks */}
          <Card>
            <CardHeader>
              <CardTitle>Meeting Remarks</CardTitle>
              <CardDescription>Add any additional remarks or notes from meetings</CardDescription>
            </CardHeader>
            <CardContent>
              <TextareaField
                label="Remarks"
                placeholder="Enter meeting remarks or any additional notes here..."
                {...register('meetingRemarks')}
                error={errors.meetingRemarks?.message}
              />
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
              Submit Phase 1 Data
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PhaseOnePage;