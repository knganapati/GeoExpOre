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

// Define the Phase 2 form schema
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