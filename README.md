# Pan and Zoom Image Viewer with Interactive Points

This React application displays an image with interactive, animated points that remain correctly positioned during pan and zoom interactions. The layout is responsive, featuring static header and footer components.

## Features

- **Pan and Zoom**: Seamlessly navigate the image using mouse or touch gestures.
- **Interactive Points**: Animated markers highlight specific areas on the image.
- **Responsive Design**: Adapts to various screen sizes, ensuring usability on both desktop and mobile devices.
- **Static Header and Footer**: Consistent header and footer sections remain fixed during content interaction.

## Demo

A live demonstration of the application is available at: [Demo Link](https://your-demo-link.com)

## Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/your-username/pan-zoom-image-viewer.git
   cd pan-zoom-image-viewer
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Start the Application**:

   ```bash
   npm start
   ```

   The application will run at `http://localhost:3000`.

## Usage

1. **Pan and Zoom**:

   - **Desktop**: Click and drag to pan; use the mouse wheel to zoom in and out.
   - **Touch Devices**: Use pinch gestures to zoom and swipe to pan.

2. **Interactive Points**:

   - Hover over or tap on the animated points to receive additional information or trigger specific actions.

## Configuration

- **Adding Points**: Modify the `points` array in `src/components/ImageWithPoints.js` to add or remove interactive points. Each point requires an `id`, `x`, and `y` position (expressed as percentages relative to the image dimensions).

  ```javascript
  const points = [
    { id: 1, x: '30%', y: '40%' },
    { id: 2, x: '60%', y: '70%' },
    // Add more points as needed
  ];
  ```

- **Image Source**: Replace the `src` attribute in the `<img>` tag within `ImageWithPoints.js` with the path to your desired image.

  ```jsx
  <img src="path_to_your_image.jpg" alt="Descriptive Alt Text" className="w-full h-auto" />
  ```

## Dependencies

- **react-zoom-pan-pinch**: Facilitates pan and zoom functionality.
- **Tailwind CSS**: Provides utility-first CSS for rapid UI development.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

This project utilizes the `react-zoom-pan-pinch` library for pan and zoom functionality.

For more information, visit the [react-zoom-pan-pinch documentation](https://www.npmjs.com/package/react-zoom-pan-pinch). 

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

## Contact

For questions or suggestions, please open an issue in this repository.

---

*This README was generated with the assistance of ChatGPT, a language model developed by OpenAI.* 