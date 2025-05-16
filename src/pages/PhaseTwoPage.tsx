import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-toastify';
import { CalendarCheck, FileText, Upload } from 'lucide-react';

import InputField from '../components/ui/InputField';
import TextareaField from '../components/ui/TextareaField';
import Button from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../components/ui/Card';
import FileUpload from '../components/ui/FileUpload';
import PhaseStepper from '../components/PhaseStepper';




// // State for file uploads (add these with your existing file states)
// const [referenceFile, setReferenceFile] = useState<File | null>(null);
// const [regionalGeologicalMapFile, setRegionalGeologicalMapFile] = useState<File | null>(null);
// const [tectonicMapFile, setTectonicMapFile] = useState<File | null>(null);
// const [aeroMagneticMapFile, setAeroMagneticMapFile] = useState<File | null>(null);
// const [remoteSensingMapFile, setRemoteSensingMapFile] = useState<File | null>(null);
// const [toposheetMapFile, setToposheetMapFile] = useState<File | null>(null);
// const [geologicalMapFile, setGeologicalMapFile] = useState<File | null>(null);
// const [sampleLocationsMapFile, setSampleLocationsMapFile] = useState<File | null>(null);
// // Define the Phase 2 form schema
const phaseTwoSchema = z.object({ 
  nqtDeadline: z.string().min(1, 'NQT deadline is required'),
  nqtFeedback: z.string().optional(),
  ecDeadline: z.string().min(1, 'EC deadline is required'),
  ecNotes: z.string().optional()
});

type PhaseTwoFormValues = z.infer<typeof phaseTwoSchema>;

const PhaseTwoPage = () => {
  // State for file uploads
  const [detailedPresentationFile, setDetailedPresentationFile] = useState<File | null>(null);
  const [nqtFormatFile, setNqtFormatFile] = useState<File | null>(null);
  const [ecFullOrderFile, setEcFullOrderFile] = useState<File | null>(null);
  const [projectCoordinators, setProjectCoordinators] = useState(['']);
  const [geologists, setGeologists] = useState(['']);

 // Add another coordinator field
const addCoordinatorField = () => {
  setProjectCoordinators([...projectCoordinators, '']);
};

// Add another geologist field
const addGeologistField = () => {
  setGeologists([...geologists, '']);
};

// Handle change for coordinators
const handleCoordinatorChange = (e, index) => {
  const updatedCoordinators = [...projectCoordinators];
  updatedCoordinators[index] = e.target.value;
  setProjectCoordinators(updatedCoordinators);
};

// Handle change for geologists
const handleGeologistChange = (e, index) => {
  const updatedGeologists = [...geologists];
  updatedGeologists[index] = e.target.value;
  setGeologists(updatedGeologists);
};
  // Form validation using react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PhaseTwoFormValues>({
    resolver: zodResolver(phaseTwoSchema),
    defaultValues: {
      nqtDeadline: '',
      nqtFeedback: '',
      ecDeadline: '',
      ecNotes: ''
    },
  });

  // Handle form submission
  const onSubmit = async (data: PhaseTwoFormValues) => {
    try {
      // In a real application, you would send the data and files to your backend here
      console.log('Form data:', data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Phase 2 data submitted successfully!');
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
      status: 'current' as const,
    },
    {
      id: 3,
      name: 'Phase 3',
      description: 'Final approval',
      status: 'upcoming' as const,
    },
  ];
 

  const [selectedResponsiblePersons, setSelectedResponsiblePersons] = useState({
    fieldPlanning: [],
    campSetting: [],
    // Add other sections like BRS Sampling, etc., if needed
  });
  
  // Handle person selection and updating the list of selected responsible persons
  const handlePersonChange = (e, section) => {
    const { value, checked } = e.target;
  
    setSelectedResponsiblePersons((prev) => {
      const updatedList = checked
        ? [...prev[section], value]
        : prev[section].filter((person) => person !== value);
  
      return { ...prev, [section]: updatedList };
    });
  };
  // Calculate days remaining for NQT deadline
  const calculateDaysRemaining = (deadlineDate: string) => {
    if (!deadlineDate) return null;
    
    const deadline = new Date(deadlineDate);
    const today = new Date();
    
    // Calculate the difference in milliseconds
    const differenceMs = deadline.getTime() - today.getTime();
    
    // Convert to days
    return Math.ceil(differenceMs / (1000 * 60 * 60 * 24));
  };

  const nqtDaysRemaining = calculateDaysRemaining(register('nqtDeadline').value as string);
  const ecDaysRemaining = calculateDaysRemaining(register('ecDeadline').value as string);

  return (
    <div className="pb-10">
      <PhaseStepper phases={phases} currentPhase={2} />
      
      <div className="mb-6 bg-white border border-dashed border-primary-200 rounded-lg p-5">
        <div className="flex items-center text-primary-700">
          <CalendarCheck className="h-5 w-5 mr-2" />
          <h3 className="font-medium">Phase 2: Detailed Assessment & NQT Approval</h3>
        </div>
        <p className="mt-2 text-sm text-gray-600">
          In Phase 2, you'll prepare a detailed presentation based on Phase 1 results,
          submit the NQT format document for approval, and upload the EC full order copy.
          Please complete all required fields and uploads.
        </p>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-6">
          {/* Detailed Presentation Section */}
          <Card>
            <CardHeader>
              <CardTitle>Detailed Presentation</CardTitle>
              <CardDescription>Upload the detailed presentation based on Phase 1 findings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <FileUpload
                  label="Upload Detailed Presentation"
                  acceptedFileTypes=".ppt,.pptx,.pdf"
                  onChange={setDetailedPresentationFile}
                  value={detailedPresentationFile}
                />
              </div>
            </CardContent>
          </Card>

          {/* NQT Section */}
          {/* <Card>
            <CardHeader>
              <CardTitle>NQT Format & Approval</CardTitle>
              <CardDescription>
                Upload NQT format document and specify deadline
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <InputField
                      label="NQT Deadline"
                      type="date"
                      {...register('nqtDeadline')}
                      error={errors.nqtDeadline?.message}
                    />
                    {nqtDaysRemaining !== null && nqtDaysRemaining > 0 && (
                      <p className={`mt-2 text-sm ${nqtDaysRemaining <= 2 ? 'text-red-600 font-medium' : 'text-gray-500'}`}>
                        {nqtDaysRemaining} days remaining until deadline
                      </p>
                    )}
                  </div>
                  <div>
                    <InputField
                      label="Heading"
                      type=""
                      
                    />
                  
                  </div>
                  <div>
                    <InputField
                      label="Qunatity"
                      type=""
                  
                    />
                   
                  </div>
                  <div>
                    <InputField
                      label="Resposnible person"
                      type=""
                      />
                  </div>
                  <div>
                    <FileUpload
                      label="Upload NQT Format Document"
                      acceptedFileTypes=".doc,.docx,.pdf"
                      onChange={setNqtFormatFile}
                      value={nqtFormatFile}
                    />
                  </div>
                </div>
                
                <TextareaField
                  label="NQT Feedback & Requested Changes"
                  placeholder="Enter feedback received from NQT and any requested changes to Phase 1..."
                  {...register('nqtFeedback')}
                  error={errors.nqtFeedback?.message}
                />
              </div>
            </CardContent>
          </Card> */}
          {/* NQT Section */}
<Card>
  <CardHeader>
    <CardTitle>NQT Format & Approval</CardTitle>
    <CardDescription>
      Upload NQT format document and specify deadline
    </CardDescription>
  </CardHeader>
  <CardContent>
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <InputField
            label="NQT Deadline"
            type="date"
            {...register('nqtDeadline')}
            error={errors.nqtDeadline?.message}
          />
          {nqtDaysRemaining !== null && nqtDaysRemaining > 0 && (
            <p className={`mt-2 text-sm ${nqtDaysRemaining <= 2 ? 'text-red-600 font-medium' : 'text-gray-500'}`}>
              {nqtDaysRemaining} days remaining until deadline
            </p>
          )}
        </div>
        <div>
          <InputField
            label="Heading"
            type="text"
            {...register('heading')}
            error={errors.heading?.message}
          />
        </div>
        <div>
          <InputField
            label="Quantity"
            type="number"
            {...register('quantity')}
            error={errors.quantity?.message}
          />
        </div>
        <div>
          <InputField
            label="Responsible Person"
            type="text"
            {...register('responsiblePerson')}
            error={errors.responsiblePerson?.message}
          />
        </div>
        
      </div>

       {/* New Fields */}
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Project Coordinators</label>
          {projectCoordinators.map((coordinator, index) => (
            <InputField
              key={index}
              label={`Coordinator ${index + 1}`}
              type="text"
              value={coordinator}
              onChange={(e) => handleCoordinatorChange(e, index)}
            />
          ))}
          <button
            type="button"
            onClick={addCoordinatorField}
            className="text-blue-600 mt-2"
          >
            Add Another Coordinator
          </button>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Geologists</label>
          {geologists.map((geologist, index) => (
            <InputField
              key={index}
              label={`Geologist ${index + 1}`}
              type="text"
              value={geologist}
              onChange={(e) => handleGeologistChange(e, index)}
            />
          ))}
          <button
            type="button"
            onClick={addGeologistField}
            className="text-blue-600 mt-2"
          >
            Add Another Geologist
          </button>
        </div>
        <div>
          <InputField
            label="Nmet Start Date"
            type="date"
            {...register('nmetStartDate')}
            error={errors.nmetStartDate?.message}
          />
        </div>
        <div>
          <InputField
            label="Nmet End Date"
            type="date"
            {...register('nmetEndDate')}
            error={errors.nmetEndDate?.message}
          />
        </div>
        <div>
          <InputField
            label="Nmet Project Review Date"
            type="date"
            {...register('nmetReviewDate')}
            error={errors.nmetReviewDate?.message}
          />
        </div>
        <div>
          <InputField
            label="Date of Approval"
            type="date"
            {...register('dateOfApproval')}
            error={errors.dateOfApproval?.message}
          />
        </div>
        <div className = "w-full">
                    <FileUpload
                      label="Upload NQT Format Document"
                      acceptedFileTypes=".doc,.docx,.pdf"
                      onChange={setNqtFormatFile}
                      value={nqtFormatFile}
                    />
                  </div>
      </div>

      <TextareaField
        label="NQT Feedback & Requested Changes"
        placeholder="Enter feedback received from NQT and any requested changes to Phase 1..."
        {...register('nqtFeedback')}
        error={errors.nqtFeedback?.message}
      />
    </div>
  </CardContent>
</Card>

{/* Maps and References Section */}
{/* <Card>
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
          </Card> */}

<Card className="overflow-hidden">
  <CardHeader className="border-b bg-gray-50">
    <CardTitle className="text-lg font-semibold text-gray-800">Nmet Format & Approval</CardTitle>
    <CardDescription className="text-gray-600">
      Upload Nmet format document and specify deadline
    </CardDescription>
  </CardHeader>
  <CardContent className="p-6">
    <div className="space-y-8">
      {/* Field Planning */}
      <div className="rounded-lg border p-4">
        <h3 className="mb-4 text-sm font-medium text-gray-700">Field Planning</h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div>
            <InputField
              label="Start Date"
              type="date"
              {...register('fieldPlanningStartDate')}
              error={errors.fieldPlanningStartDate?.message}
              className="w-full"
            />
          </div>
          <div>
            <InputField
              label="End Date"
              type="date"
              {...register('fieldPlanningEndDate')}
              error={errors.fieldPlanningEndDate?.message}
              className="w-full"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Responsible Person(s)</label>
            <div className="space-y-2">
              {['Mr. Renukesh', 'Mr. A Gopal', 'Mr. Manoj V P', 'Dr. Chandrasekharan'].map((person) => (
                <label key={person} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={person}
                    {...register('fieldPlanningResponsiblePerson')}
                    onChange={(e) => handlePersonChange(e, 'fieldPlanning')}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-sm text-gray-700">{person}</span>
                </label>
              ))}
              <div className="flex items-center space-x-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    {...register('fieldPlanningOtherResponsiblePerson')}
                    onChange={(e) => handlePersonChange(e, 'fieldPlanning')}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-sm text-gray-700">Other</span>
                </label>
                <InputField
                  type="text"
                  placeholder="Enter name"
                  {...register('fieldPlanningOtherPersonName')}
                  error={errors.fieldPlanningOtherPersonName?.message}
                  className="flex-1 text-sm"
                  noLabel
                />
              </div>
            </div>
            <div className="mt-4">
              <strong>Selected Responsible Persons:</strong>
              <ul className="list-disc pl-5">
                {selectedResponsiblePersons.fieldPlanning.map((person, index) => (
                  <li key={index} className="text-sm text-gray-700">{person}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Camp Setting */}
      <div className="rounded-lg border p-4">
        <h3 className="mb-4 text-sm font-medium text-gray-700">Camp Setting</h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div>
            <InputField
              label="Start Date"
              type="date"
              {...register('campSettingStartDate')}
              error={errors.campSettingStartDate?.message}
              className="w-full"
            />
          </div>
          <div>
            <InputField
              label="End Date"
              type="date"
              {...register('campSettingEndDate')}
              error={errors.campSettingEndDate?.message}
              className="w-full"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Responsible Person(s)</label>
            <div className="space-y-2">
              {['Mr. Renukesh', 'Mr. A Gopal', 'Mr. Manoj V P', 'Dr. Chandrasekharan'].map((person) => (
                <label key={person} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={person}
                    {...register('campSettingResponsiblePerson')}
                    onChange={(e) => handlePersonChange(e, 'campSetting')}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-sm text-gray-700">{person}</span>
                </label>
              ))}
              <div className="flex items-center space-x-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    {...register('campSettingOtherResponsiblePerson')}
                    onChange={(e) => handlePersonChange(e, 'campSetting')}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-sm text-gray-700">Other</span>
                </label>
                <InputField
                  type="text"
                  placeholder="Enter name"
                  {...register('campSettingOtherPersonName')}
                  error={errors.campSettingOtherPersonName?.message}
                  className="flex-1 text-sm"
                  Others
                />
              </div>
            </div>
            <div className="mt-4">
              <strong>Selected Responsible Persons:</strong>
              <ul className="list-disc pl-5">
                {selectedResponsiblePersons.campSetting.map((person, index) => (
                  <li key={index} className="text-sm text-gray-700">{person}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </CardContent>
</Card>



          {/* EC Full Order Section */}
          <Card>
            <CardHeader>
              <CardTitle>EC Full Order Copy</CardTitle>
              <CardDescription>Upload EC full order copy and specify deadline</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <InputField
                      label="EC Deadline"
                      type="date"
                      {...register('ecDeadline')}
                      error={errors.ecDeadline?.message}
                    />
                    {ecDaysRemaining !== null && ecDaysRemaining > 0 && (
                      <p className={`mt-2 text-sm ${ecDaysRemaining <= 2 ? 'text-red-600 font-medium' : 'text-gray-500'}`}>
                        {ecDaysRemaining} days remaining until deadline
                      </p>
                    )}
                  </div> 
                  <div>
                    <FileUpload
                      label="Upload EC Full Order Copy"
                      acceptedFileTypes=".pdf,.doc,.docx"
                      onChange={setEcFullOrderFile}
                      value={ecFullOrderFile}
                    />
                  </div>
                </div>
                
                <TextareaField
                  label="EC Notes"
                  placeholder="Enter notes related to the EC order..."
                  {...register('ecNotes')}
                  error={errors.ecNotes?.message}
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
              Submit Phase 2 Data
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PhaseTwoPage;