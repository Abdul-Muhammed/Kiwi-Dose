# Kiwi Dose - Coming Soon Website

A sleek, modern static website for Kiwi Dose, a vibrant juice and coffee bar launching in mid-December 2024 in Auckland, New Zealand.

## Project Overview

This is a "coming soon" landing page that showcases the Kiwi Dose brand story, values, and vision. The design is inspired by modern juice bar aesthetics and incorporates the brand's unique identity.

## Features

- **Coming Soon Landing Page** - Eye-catching hero section with launch date
- **Brand Story** - Incorporates the brand narrative and vision
- **Brand Values** - Showcases Fresh & Energetic, Community-Driven, and Innovative Spirit
- **Email Signup** - Collects email addresses for launch notifications
- **Responsive Design** - Fully optimized for mobile, tablet, and desktop
- **Smooth Animations** - Modern transitions and scroll effects
- **Accessible** - Semantic HTML and ARIA labels

## Color Palette

- **Primary Green**: `#064B31` - Dark green for headings and primary elements
- **Secondary Green**: `#2D8A4B` - Medium green for accents and CTAs
- **Gray**: `#ADADAD` - Neutral gray for secondary text
- **White**: `#FFFFFF` - Background and primary text
- **Dark**: `#14010` - Dark text color

## File Structure

```
kiwi-dose/
├── index.html          # Main HTML file
├── css/
│   └── styles.css     # All styles and responsive design
├── js/
│   └── main.js        # JavaScript for interactions and form handling
├── assets/
│   └── images/        # Placeholder for brand images
└── README.md          # Project documentation
```

## Getting Started

1. Open `index.html` in a web browser
2. For local development, you can use a simple HTTP server:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js (with http-server)
   npx http-server
   ```
3. Navigate to `http://localhost:8000` in your browser

## Form Integration

The email signup form currently includes client-side validation. To integrate with a backend service:

1. **Mailchimp**: Use Mailchimp's API or embed form
2. **Formspree**: Update form action to Formspree endpoint
3. **Custom API**: Modify the fetch call in `js/main.js`

Example integration code is commented in `js/main.js`.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

When the site launches in mid-December, consider adding:
- Product menu showcase
- Location finder
- Online ordering integration
- Gallery of products
- Customer testimonials
- Blog/news section

## License

© 2024 Kiwi Dose. All rights reserved.

