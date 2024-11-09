// Get Element from the Resume 
var form = document.getElementById('form');
var resumeDisplayElement = document.getElementById('resume-display');
var downloadButton = document.getElementById('download-resume');
var shareableLinkContainer = document.getElementById('shareable-link-container');
var shareableLinkElement = document.getElementById('shareable-link');
// Hendle form submission
form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (resumeDisplayElement.style.display === 'none') {
        resumeDisplayElement.style.display = 'block';
        downloadButton.style.display = 'block';
    }
    else {
        resumeDisplayElement.style.display === "none";
        downloadButton.style.display = 'none';
    }
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var contact = document.getElementById('contact').value;
    var education = document.getElementById('education').value;
    var workExperience = document.getElementById('work-experience').value;
    var skill = document.getElementById('skill').value;
    // Generated Resume Section 
    var resumeGenerate = "\n    <h2>Resume</h2>\n    <h3>Personal Information</h3>\n    <h4 style=\"color: navy;\"><span contenteditable=\"true\"> ".concat(name, " </span></h4>\n    <p><b>Email:</b> <span contenteditable=\"true\">").concat(email, " </span></p>\n    <p><b>Contact:</b> <span contenteditable=\"true\">").concat(contact, " </span></p>\n\n    <h3>Education</h3>\n    <p contenteditable=\"true\"> ").concat(education, "</p>\n\n    <h3>Work Experience</h3>\n    <p contenteditable=\"true\"> ").concat(workExperience, "</p>\n\n    <h3>Skills</h3>\n    <p contenteditable=\"true\">").concat(skill, "</p>\n    ");
    if (resumeDisplayElement) {
        resumeDisplayElement.innerHTML = resumeGenerate;
        // Generate shareable link with the name as a query parameter
        var url = new URL(window.location.href);
        url.searchParams.set('name', name);
        var shareableLink = url.href;
        // Update the shareable link element
        shareableLinkElement.href = shareableLink;
        shareableLinkElement.textContent = shareableLink;
        // Show the shareable link container
        shareableLinkContainer.style.display = 'block';
        // Update the browser's URL without reloading the page
        window.history.pushState({}, '', url);
    }
    else {
        console.error("The Resume display element is missing");
    }
});
window.onload = function () {
    var urlParams = new URLSearchParams(window.location.search);
    var name = urlParams.get('name');
    if (name) {
        document.getElementById('name').value = name;
    }
};
// Adding download functionality
downloadButton.addEventListener('click', function () {
    var resumeContent = resumeDisplayElement.innerHTML;
    // Create a blob with the resume content
    var blob = new Blob([resumeContent], { type: 'text/html' });
    // Create a link element
    var link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'resume.html'; // Set the file name and extension
    link.click();
    // Cleanup: revoke the object URL after download
    URL.revokeObjectURL(link.href);
});
