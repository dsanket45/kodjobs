import config from './config.js';

document.addEventListener("DOMContentLoaded", () => {
    // Check if user is logged in
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

    if (!currentUser) {
        // Redirect to login if not logged in
        window.location.href = "login.html";
        return;
    }

    // Display user name
    document.getElementById("userName").textContent = currentUser.name;

    // Logout functionality
    document.getElementById("logoutBtn").addEventListener("click", () => {
        sessionStorage.removeItem("currentUser");
        window.location.href = "login.html";
    });

    // Fetch and display jobs
    fetchJobs();

    // Search functionality
    document.getElementById("searchBtn").addEventListener("click", () => {
        fetchJobs();
    });

    // Filter change events
    document.getElementById("categoryFilter").addEventListener("change", fetchJobs);
    document.getElementById("locationFilter").addEventListener("change", fetchJobs);
});

function fetchJobs() {
    const jobsContainer = document.getElementById("jobsContainer");
    const searchTerm = document.getElementById("searchInput").value.toLowerCase();
    const categoryFilter = document.getElementById("categoryFilter").value;
    const locationFilter = document.getElementById("locationFilter").value;

    jobsContainer.innerHTML = '<div class="loading">Loading jobs...</div>';

    // Fetch jobs from API
    fetch(`${config.apiUrl}/codingresources/codingResources`)
        .then((response) => response.json())
        .then((data) => {
            // Transform the coding resources into job listings for demo purposes
            const jobs = data.map((resource) => {
                return {
                    id: resource.id,
                    title: `${resource.topics[0] || "Developer"} Position`,
                    company: resource.description.split(" ").slice(0, 2).join(" ") + " Inc.",
                    location: ["Remote", "Onsite", "Hybrid"][Math.floor(Math.random() * 3)],
                    salary: `$${Math.floor(Math.random() * 50) + 70},000 - $${Math.floor(Math.random() * 50) + 100},000`,
                    category: resource.topics[0] || "Technology",
                    description: resource.description,
                    url: resource.url,
                };
            });

            // Apply filters
            let filteredJobs = jobs;

            if (searchTerm) {
                filteredJobs = filteredJobs.filter(
                    (job) =>
                        job.title.toLowerCase().includes(searchTerm) ||
                        job.company.toLowerCase().includes(searchTerm) ||
                        job.description.toLowerCase().includes(searchTerm)
                );
            }

            if (categoryFilter) {
                filteredJobs = filteredJobs.filter(
                    (job) => job.category.toLowerCase() === categoryFilter.toLowerCase()
                );
            }

            if (locationFilter) {
                filteredJobs = filteredJobs.filter(
                    (job) => job.location.toLowerCase() === locationFilter.toLowerCase()
                );
            }

            // Display jobs
            if (filteredJobs.length === 0) {
                jobsContainer.innerHTML = '<div class="loading">No jobs found matching your criteria.</div>';
                return;
            }

            jobsContainer.innerHTML = "";

            filteredJobs.forEach((job) => {
                const jobCard = document.createElement("div");
                jobCard.className = "job-card";
                jobCard.innerHTML = `
                    <h3 class="job-title">${job.title}</h3>
                    <p class="company-name">${job.company}</p>
                    <div class="job-details">
                        <div class="job-detail">Location: ${job.location}</div>
                        <div class="job-detail">Salary: ${job.salary}</div>
                        <div class="job-detail">Category: ${job.category}</div>
                    </div>
                    <p class="job-description">${job.description.substring(0, 150)}...</p>
                    <a href="${job.url}" target="_blank" class="btn-apply">Apply Now</a>
                `;

                jobsContainer.appendChild(jobCard);
            });
        })
        .catch((error) => {
            console.error("Error fetching jobs:", error);
            jobsContainer.innerHTML = '<div class="loading">Error loading jobs. Please try again later.</div>';
        });
} 