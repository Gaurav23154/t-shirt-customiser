# T-Shirt Customizer Project

This is a React-based customization page for a POD (Print on Demand) t-shirt store. The page allows users to customize their t-shirt with personalized size specifications, upload custom images, and add custom text to their design.

## Project Features

- Size customization (height, weight, build type)
- Image upload via drag-and-drop or file selection
- Custom text input (max 3 lines)
- Theme switching functionality (Alt+Q)
- Toggle between 2D and 3D views
- Fully responsive design
- Built with React + Vite + Tailwind CSS + React Hook Form

## Deployment Instructions

### Local Development

1. Clone the repository
2. Install dependencies
   ```bash
   npm install
   ```
3. Start the development server
   ```bash
   npm run dev
   ```

### Cloudflare Deployment

1. Ensure you have a Cloudflare account
2. Install Wrangler (Cloudflare's CLI)
   ```bash
   npm install -g wrangler
   ```
3. Build the project
   ```bash
   npm run build
   ```
4. Configure Cloudflare Pages:
   ```bash
   wrangler login
   wrangler pages project create t-shirt-customizer
   ```
5. Deploy the project
   ```bash
   wrangler pages publish dist --project-name=t-shirt-customizer
   ```

## Live Demo

Deployed site: [https://t-shirt-customizer.pages.dev](https://t-shirt-customizer.pages.dev)

## Repository Information

This project is available as a .GZ GitLab export as requested in the assignment.

## Implementation Notes

The implementation satisfies all requirements from the assignment:

1. ✅ Size customization with height, weight, and build options (defaults: 180cm, 80kg, athletic)
2. ✅ Image upload functionality (file and drag-and-drop)
3. ✅ Text customization (max 3 lines)
4. ✅ Theme variations and 3D view toggle (Alt+Q to switch themes)
5. ✅ Responsive single-page design
6. ✅ Using React with React Hook Form and Tailwind CSS

## AI Usage Explanation

During development, AI assistance was used in the following ways:
- Initial component structure setup and organization
- Implementing the theme switching logic
- Creating the responsive layout with Tailwind CSS
- Setting up the file drag-and-drop functionality

The core design decisions, implementation approach, and creative elements were human-directed while leveraging AI to speed up the coding process and ensure best practices were followed.

## Interview Availability

I am available for interviews on the following dates and times:
- Weekdays: 10 AM - 4 PM EST
- Weekends: By appointment

Please contact me at [gauravjaiswal1098@gmail.com] to schedule an interview.