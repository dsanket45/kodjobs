# KodJobs - Job Search Platform

A modern job search platform built with HTML, CSS, and JavaScript.

## Features

- User registration and login
- Job search with filters
- Responsive design
- Real-time job filtering
- Modern UI/UX

## Deployment

### GitHub Pages

1. Fork this repository
2. Go to repository Settings > Pages
3. Select the main branch as the source
4. Save the changes
5. Your site will be available at `https://[your-username].github.io/kodjobs`

### Vercel

1. Install Vercel CLI (optional):
   ```bash
   npm install -g vercel
   ```

2. Deploy using Vercel CLI:
   ```bash
   vercel
   ```

3. Or deploy directly from Vercel dashboard:
   - Go to [Vercel](https://vercel.com)
   - Import your GitHub repository
   - Select the repository
   - Click Deploy

## Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/[your-username]/kodjobs.git
   ```

2. Navigate to the project directory:
   ```bash
   cd kodjobs
   ```

3. Start the development server:
   ```bash
   npm install
   npm start
   ```

4. Open `http://localhost:3001` in your browser

## Project Structure

```
kodjobs/
├── src/
│   ├── js/
│   │   ├── login.js
│   │   ├── register.js
│   │   └── jobdashboard.js
│   ├── styles.css
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   └── jobdashboard.html
├── package.json
└── README.md
```

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- Node.js (for development server)

## Setup

1. Clone this repository
2. Add a job seekers image to the `assets` folder named `job-seekers.jpg`
3. For the job listings API:
   - Sign up for a job API service (e.g., Adzuna)
   - Replace the API credentials in `src/js/jobdashboard.js`

## Usage

1. Open `src/register.html` in a web browser to start
2. Register a new account
3. Login with your credentials
4. View available job listings on the dashboard

## Technical Details

- The application uses vanilla JavaScript for functionality
- User data is stored in `users.json`
- Session management is handled using `sessionStorage`
- The layout is responsive and works on both desktop and mobile devices

## Note

This is a static website that requires a web server to handle the JSON file operations. For production use, consider implementing proper backend services and security measures. 