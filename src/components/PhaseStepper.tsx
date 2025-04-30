import { Check, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';

interface Phase {
  id: number;
  name: string;
  description: string;
  status: 'upcoming' | 'current' | 'completed';
}

interface PhaseStepperProps {
  phases: Phase[];
  currentPhase: number;
}

const PhaseStepper = ({ phases, currentPhase }: PhaseStepperProps) => {
  return (
    <div className="w-full mb-8">
      <div className="hidden sm:block">
        <nav aria-label="Progress">
          <ol
            role="list"
            className="flex items-center"
          >
            {phases.map((phase, phaseIdx) => (
              <li
                key={phase.id}
                className={cn(
                  phaseIdx !== phases.length - 1 ? 'pr-8 sm:pr-20' : '',
                  'relative flex-1'
                )}
              >
                {phase.status === 'completed' ? (
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <span className="h-9 w-9 flex items-center justify-center rounded-full bg-primary">
                        <Check className="h-5 w-5 text-white" aria-hidden="true" />
                      </span>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-primary">
                        {phase.name}
                      </p>
                      <p className="text-xs text-gray-500">{phase.description}</p>
                    </div>
                    {phaseIdx !== phases.length - 1 ? (
                      <div className="hidden sm:block absolute top-4 right-0 h-0.5 w-16 bg-primary" aria-hidden="true" />
                    ) : null}
                  </div>
                ) : phase.status === 'current' ? (
                  <div className="flex items-center" aria-current="step">
                    <div className="flex-shrink-0">
                      <span className="h-9 w-9 flex items-center justify-center rounded-full border-2 border-primary">
                        <span className="text-primary font-medium">{phase.id}</span>
                      </span>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-primary">
                        {phase.name}
                      </p>
                      <p className="text-xs text-gray-500">{phase.description}</p>
                    </div>
                    {phaseIdx !== phases.length - 1 ? (
                      <div
                        className="hidden sm:block absolute top-4 right-0 h-0.5 w-16 bg-gray-200"
                        aria-hidden="true"
                      />
                    ) : null}
                  </div>
                ) : (
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <span className="h-9 w-9 flex items-center justify-center rounded-full border-2 border-gray-300">
                        <span className="text-gray-500">{phase.id}</span>
                      </span>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-500">
                        {phase.name}
                      </p>
                      <p className="text-xs text-gray-500">{phase.description}</p>
                    </div>
                    {phaseIdx !== phases.length - 1 ? (
                      <div
                        className="hidden sm:block absolute top-4 right-0 h-0.5 w-16 bg-gray-200"
                        aria-hidden="true"
                      />
                    ) : null}
                  </div>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>

      {/* Mobile version */}
      <div className="sm:hidden">
        <ol className="divide-y divide-gray-200 rounded-md border border-gray-200 md:flex md:divide-y-0">
          {phases.map((phase, phaseIdx) => (
            <li key={phase.name} className="relative flex items-center p-4 md:w-full">
              {phase.status === 'completed' ? (
                <div className="flex items-center w-full">
                  <div className="flex-shrink-0 mr-3">
                    <div className="h-8 w-8 flex items-center justify-center rounded-full bg-primary">
                      <Check className="h-4 w-4 text-white" aria-hidden="true" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-primary">{phase.name}</p>
                    <p className="text-xs text-gray-500 truncate">{phase.description}</p>
                  </div>
                  {phaseIdx !== phases.length - 1 ? (
                    <div className="ml-3 flex-shrink-0">
                      <ChevronRight className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                  ) : null}
                </div>
              ) : phase.status === 'current' ? (
                <div className="flex items-center w-full" aria-current="step">
                  <div className="flex-shrink-0 mr-3">
                    <div className="h-8 w-8 flex items-center justify-center rounded-full border-2 border-primary">
                      <span className="text-primary font-medium">{phase.id}</span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-primary">{phase.name}</p>
                    <p className="text-xs text-gray-500 truncate">{phase.description}</p>
                  </div>
                  {phaseIdx !== phases.length - 1 ? (
                    <div className="ml-3 flex-shrink-0">
                      <ChevronRight className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                  ) : null}
                </div>
              ) : (
                <div className="flex items-center w-full">
                  <div className="flex-shrink-0 mr-3">
                    <div className="h-8 w-8 flex items-center justify-center rounded-full border-2 border-gray-300">
                      <span className="text-gray-500">{phase.id}</span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-500">{phase.name}</p>
                    <p className="text-xs text-gray-500 truncate">{phase.description}</p>
                  </div>
                  {phaseIdx !== phases.length - 1 ? (
                    <div className="ml-3 flex-shrink-0">
                      <ChevronRight className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                  ) : null}
                </div>
              )}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default PhaseStepper;