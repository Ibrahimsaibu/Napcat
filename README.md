#Blog created with Next.js, TailwindCss and Sanity CMS
This is a blog template built with Next.js and Sanity CMS. The blog has a responsive design and features the following functionality:

Homepage with a list of blog posts
Individual blog post pages with a title, date, author, and content
Navigation bar with links to the homepage and categories
Category pages with a list of blog posts in that category
Search functionality
Getting Started
Prerequisites
To run this project, you will need to have Node.js installed on your machine.

Installation
Clone this repository to your local machine:
bash
Copy code
git clone https://github.com/Ibrahimsaibu/Napcat.git
Navigate to the project directory:
bash
Copy code
cd napcat
Install the dependencies:
Copy code
npm install
Create a .env file in the root of the project and add the following environment variables:
makefile
Copy code
SANITY_DATASET=your-dataset-name
SANITY_PROJECT_ID=your-project-id
Start the development server:
Copy code
npm run dev
Open your browser and navigate to http://localhost:3000.
Configuration
Sanity CMS
To use your own Sanity CMS backend, you will need to create a new project in the Sanity Dashboard and replace the values of SANITY_PROJECT_ID and SANITY_DATASET in the .env file with your own.

You can also customize the schema of your blog in the schemas directory. After making changes, run npm run update-schema to update the schema in Sanity.

Styling
This project uses Tailwind CSS for styling. You can customize the design of the blog by editing the tailwind.config.js file.

Deployment
To deploy the blog, you can use a platform like Vercel or Netlify. Simply link your repository to your preferred platform and follow their deployment instructions.

Contributing
If you find a bug or have a feature request, please open an issue or submit a pull request. Contributions are always welcome!
