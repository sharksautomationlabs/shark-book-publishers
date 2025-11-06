// Calendly redirect utility
export const setupCalendlyRedirect = () => {
  if (typeof window !== 'undefined') {
    // Remove any existing listeners to prevent duplicates
    window.removeEventListener('message', handleCalendlyMessage);
    
    // Add the event listener
    window.addEventListener('message', handleCalendlyMessage);
  }
};

const handleCalendlyMessage = (event: MessageEvent) => {
  // Check if the message is from Calendly
  if (event.data.event && event.data.event === 'calendly.event_scheduled') {
    console.log('Calendly event scheduled, redirecting to thank you page...');
    
    // Small delay to ensure the booking is processed
    setTimeout(() => {
      window.location.href = '/thank-you';
    }, 1000);
  }
  
  // Also check for other Calendly events that might indicate completion
  if (event.data.event && event.data.event === 'calendly.event_type_viewed') {
    console.log('Calendly event type viewed');
  }
  
  if (event.data.event && event.data.event === 'calendly.date_and_time_selected') {
    console.log('Calendly date and time selected');
  }
};

// Alternative approach using Calendly's built-in callbacks
export const getCalendlyConfig = () => {
  return {
    onEventScheduled: function(e: any) {
      console.log('Calendly onEventScheduled callback triggered');
      setTimeout(() => {
        window.location.href = '/thank-you';
      }, 1000);
    },
    onEventTypeViewed: function(e: any) {
      console.log('Calendly onEventTypeViewed callback triggered');
    },
    onDateAndTimeSelected: function(e: any) {
      console.log('Calendly onDateAndTimeSelected callback triggered');
    }
  };
};
