import React, { useState } from 'react';
import Joyride, { CallBackProps, STATUS } from 'react-joyride';


const steps= [
  {
    target: '.playground',
    title: 'Welcome to the Diagram Playground!',
    content: 'This is where the magic happens. Here, you can create, edit, and visualize your diagrams with ease.',
    disableBeacon: true,
  },
  {
    target: '.service-blocks-palette',
    title: 'Service Blocks',
    content: 'Drag and drop these service blocks to build your diagram. Each block represents a different component or service in your system.',
    disableBeacon: true,
  },
  {
    target: '.right-side-panel-collapse-button',
    title: 'Expand/Collapse Panel',
    content: 'Click here to toggle the side panel. This gives you more space to work on your diagram when needed.',
    disableBeacon: true,
    disableOverlayClose: true,
  },
  {
    target: '.generate-diagram-with-chat',
    title: 'AI-Powered Diagram Generation',
    content: 'Need a head start? Use our AI to generate diagram suggestions based on your description. Just chat and watch your ideas come to life!',
    disableBeacon: true,
  },
  {
    target: '.save-the-diagram',
    title: 'Save Your Work',
    content: 'Dont lose your progress! Click here to save your current diagram in a file. You can always come back and continue where you left off by uploading your File',
    disableBeacon: true,
  },
  {
    target: '.download-diagram',
    title: 'Export Your Diagram',
    content: 'Ready to share your masterpiece? Download your diagram as a file. Perfect for presentations or documentation!',
    disableBeacon: true,
  },
  {
    target: '.upload-diagram',
    title: 'Import Existing Diagrams',
    content: 'Have a diagram file already? Upload it here to continue editing or to use as a template for your new project.',
    disableBeacon: true,
  },
];




const GuideButton = () => {

    const [runGuide,setRunGuide] = useState(false)
    const handleJoyrideCallback = (data: CallBackProps) => {
      const { status } = data; //@ts-ignore
      if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
        setRunGuide(false);
      }
    };


  return (<>
    <Guide onClick={()=>setRunGuide(true)}  />
    <Joyride 
        callback={handleJoyrideCallback} 
        continuous={true} 
        run={runGuide} 
        steps={steps}
        showProgress
        showSkipButton
        spotlightClicks
        styles={{
          options: {
            arrowColor: '#fff',
            backgroundColor: '#fff',
            overlayColor: 'rgba(0, 0, 0, 0.5)',
            primaryColor: '#10B981', // Green color
            textColor: '#333',
          },
          buttonNext: {
            backgroundColor: '#10B981', // Green color
          },
          buttonBack: {
            color: '#EC4899', // Pink color
            marginRight: 10,
          },
        }}

        
        
        
        />
    </>
  )
}

export default GuideButton



interface GuideButtonProps {
    onClick: () => void;
    label?: string;
  }
  
  
   const Guide: React.FC<GuideButtonProps> = ({ onClick}) => {
    return (
      <button 
        onClick={onClick}
        className="fixed top-[37%] left-5 flex items-center justify-center bg-hovergreen text-white rounded-full hover:bg-secondary-purple transition-colors"
      >
        <svg className="w-6 h-6 " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>
    );
  };