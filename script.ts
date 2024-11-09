// Get Element from the Resume 
const form = document.getElementById('form') as HTMLFormElement;
const resumeDisplayElement = document.getElementById('resume-display') as HTMLDivElement;
const downloadButton = document.getElementById('download-resume') as HTMLButtonElement;
const shareableLinkContainer = document.getElementById('shareable-link-container') as HTMLDivElement;
const shareableLinkElement = document.getElementById('shareable-link') as HTMLAnchorElement;


// Hendle form submission
form.addEventListener('submit',(event:Event)=>{
    event.preventDefault();
      if(resumeDisplayElement.style.display==='none'){
        resumeDisplayElement.style.display='block';
        downloadButton.style.display = 'block';
      }
      else{resumeDisplayElement.style.display==="none"
        downloadButton.style.display = 'none';
      }
    const name = (document.getElementById('name') as HTMLInputElement).value
    const email = (document.getElementById('email') as HTMLInputElement).value
    const contact = (document.getElementById('contact') as HTMLInputElement).value
    const education = (document.getElementById('education') as HTMLInputElement).value
    const workExperience = (document.getElementById('work-experience') as HTMLInputElement).value
    const skill = (document.getElementById('skill') as HTMLInputElement).value
    // Generated Resume Section 
    const resumeGenerate =`
    <h2>Resume</h2>
    <h3>Personal Information</h3>
    <h4 style="color: navy;"><span contenteditable="true"> ${name} </span></h4>
    <p><b>Email:</b> <span contenteditable="true">${email} </span></p>
    <p><b>Contact:</b> <span contenteditable="true">${contact} </span></p>

    <h3>Education</h3>
    <p contenteditable="true"> ${education}</p>

    <h3>Work Experience</h3>
    <p contenteditable="true"> ${workExperience}</p>

    <h3>Skills</h3>
    <p contenteditable="true">${skill}</p>
    `
    if(resumeDisplayElement){
        resumeDisplayElement.innerHTML = resumeGenerate
         // Generate shareable link with the name as a query parameter
         const url = new URL(window.location.href);
         url.searchParams.set('name', name);
         const shareableLink = url.href;
 
         // Update the shareable link element
         shareableLinkElement.href = shareableLink;
         shareableLinkElement.textContent = shareableLink;
 
         // Show the shareable link container
         shareableLinkContainer.style.display = 'block';
 
         // Update the browser's URL without reloading the page
         window.history.pushState({}, '', url);
     } else {
         console.error("The Resume display element is missing");
     }
 });

 window.onload = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');
    if (name) {
        (document.getElementById('name') as HTMLInputElement).value = name;
    }
};

// Adding download functionality
downloadButton.addEventListener('click', () => {
    const resumeContent = resumeDisplayElement.innerHTML;

    // Create a blob with the resume content
    const blob = new Blob([resumeContent], { type: 'text/html' });

    // Create a link element
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'resume.html';  // Set the file name and extension
    link.click();

    // Cleanup: revoke the object URL after download
    URL.revokeObjectURL(link.href);
});