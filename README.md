# Attestation Visualizer for RetroPGF

## Overview
Visualize the RetroPGF network like never before! This project uses the ThreeGraph module to create a 3D graph that helps you understand the relationships and pathways within the RetroPGF ecosystem. Explore, zoom, and highlight to your heart's content.

## Future Features
- 🌈 **Highlight Paths**: Easily track the path of any selected badgeholder to see their connections.
- 🎭 **ENS & PFP Support**: If the referred-by address has an ENS or a profile picture, we display it.
- 🎨 **Custom Styling**: Choose from different background colors and enjoy visually pleasing arrows.
- 🔄 **Round Switching**: Toggle between rounds, with the latest round as the default view.
- 📜 **List View**: A streamlined list of all badgeholders for quick access.
- 📚 **Collapsible Menu**: Get more info with a detailed title description and various options.
- 🔒 **Conditional Display**: The "ReferredBy" field is only visible when it's a `badgeholder choice`.

## Getting Started

### Prerequisites
- Node.js installed
- Yarn package manager

### Installation
1. Clone the repository
    ```bash
    git clone https://github.com/your-repo/attestation-visualizer.git
    ```
2. Navigate into the directory
    ```bash
    cd attestation-visualizer
    ```
3. Install dependencies
    ```bash
    yarn install
    ```

### Running the Development Server
Start the development server by running:
```bash
yarn dev
```

Now open [http://localhost:3000](http://localhost:3000) in your browser to see the magic happen!

## Contributing
If you'd like to contribute, please fork the repository and make changes as you'd like. Pull requests are warmly welcomed.

## Credits
- **JSeiferth**: Check out his GitHub [here](https://github.com/JSeiferth).
- **coolgraph**: Learn more about the project [here](https://github.com/smartcontracts/coolgraph).
