import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-toastify';
import { Check, FileCheck, FileWarning, Flag } from 'lucide-react';

import InputField from '../components/ui/InputField';
import TextareaField from '../components/ui/TextareaField';
import Button from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../components/ui/Card';
import FileUpload from '../components/ui/FileUpload';
import PhaseStepper from '../components/PhaseStepper';
import RadioGroup from '../components/ui/RadioGroup';

// Define the Phase 3 form schema
const phaseThreeSchema = z.object({
  applicationId: z.string().min(1, 'Application ID is required'),
  submissionDate: z.string().min(1, 'Submission date is required'),
  forestVerificationStatus: z.string().min(1, 'Verification status is required'),
  teamMemberNotes: z.string().optional(),
  completionNotes: z.string().optional()
});

type PhaseThreeFormValues = z.infer<typeof phaseThreeSchema>;

const PhaseThreePage = () => {
  // State for file uploads
  const [forestApplicationFile, setForestApplicationFile] = useState<File | null>(null);
  const [verificationResponseFile, setVerificationResponseFile] = useState<File | null>(null);
  const [finalReportFile, setFinalReportFile] = useState<File | null>(null);

  // Form validation using react-hook-form
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<PhaseThreeFormValues>({
    resolver: zodResolver(phaseThreeSchema),
    defaultValues: {
      applicationId: '',
      submissionDate: '',
      forestVerificationStatus: '',
      teamMemberNotes: '',
      completionNotes: ''
    },
  });

  // Handle form submission
  const onSubmit = async (data: PhaseThreeFormValues) => {
    try {
      // In a real application, you would send the data and files to your backend here
      console.log('Form data:', data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Phase 3 data submitted successfully!');
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
      status: 'current' as const,
    },
  ];

  return (
    <div className="pb-10">
      <PhaseStepper phases={phases} currentPhase={3} />
      
      <div className="mb-6 bg-white border border-dashed border-primary-200 rounded-lg p-5">
        <div className="flex items-center text-primary-700">
          <Flag className="h-5 w-5 mr-2" />
          <h3 className="font-medium">Phase 3: Final Approval & Forest Verification</h3>
        </div>
        <p className="mt-2 text-sm text-gray-600">
          In this final phase, you'll apply for online forest verification, distribute
          project details to team members, and finalize all documentation for project completion.
        </p>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-6">
          {/* Online Forest Verification */}
          <Card className="border-l-4 border-l-earth-400">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileCheck className="h-5 w-5 mr-2 text-earth-500" />
                Online Forest Verification
              </CardTitle>
              <CardDescription>Apply for online forest verification and track status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    label="Application ID"
                    placeholder="Enter application ID"
                    {...register('applicationId')}
                    error={errors.applicationId?.message}
                  />
                  <InputField
                    label="Submission Date"
                    type="date"
                    {...register('submissionDate')}
                    error={errors.submissionDate?.message}
                  />
                </div>
                
                <Controller
                  name="forestVerificationStatus"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <RadioGroup
                      label="Verification Status"
                      options={[
                        { label: 'Approved', value: 'approved' },
                        { label: 'Rejected', value: 'rejected' },
                        { label: 'Pending Review', value: 'pending' }
                      ]}
                      {...field}
                      error={errors.forestVerificationStatus?.message}
                    />
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FileUpload
                    label="Upload Forest Application"
                    acceptedFileTypes=".pdf,.doc,.docx"
                    onChange={setForestApplicationFile}
                    value={forestApplicationFile}
                  />
                  <FileUpload
                    label="Upload Verification Response"
                    acceptedFileTypes=".pdf,.doc,.docx"
                    onChange={setVerificationResponseFile}
                    value={verificationResponseFile}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Team Member Distribution */}
          <Card className="border-l-4 border-l-primary-300">
            <CardHeader>
              <CardTitle>Team Member Distribution</CardTitle>
              <CardDescription>Record details distribution to team members</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <TextareaField
                  label="Distribution Notes"
                  placeholder="Enter notes regarding distribution of information to team members..."
                  {...register('teamMemberNotes')}
                  error={errors.teamMemberNotes?.message}
                />
                
                <FileUpload
                  label="Upload Final Report for Team"
                  acceptedFileTypes=".pdf,.ppt,.pptx,.doc,.docx"
                  onChange={setFinalReportFile}
                  value={finalReportFile}
                />
              </div>
            </CardContent>
          </Card>

          {/* Project Completion */}
          <Card className="border-l-4 border-l-green-400">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Check className="h-5 w-5 mr-2 text-green-500" />
                Project Completion
              </CardTitle>
              <CardDescription>Final notes and completion details</CardDescription>
            </CardHeader>
            <CardContent>
              <TextareaField
                label="Completion Notes"
                placeholder="Enter any final notes or observations about the completed project..."
                {...register('completionNotes')}
                error={errors.completionNotes?.message}
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
              Complete Phase 3
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PhaseThreePage;