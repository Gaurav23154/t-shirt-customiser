import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useCart } from './context/CartContext';
import Tshirt3DViewer from './components/Tshirt3DViewer';
import Cart from './components/Cart';
import image1 from './assets/tshirt.jpg';
import image2 from './assets/tshirt2.jpg';

// Define theme variations
const THEMES = {
  LIGHT: {
    background: 'bg-gray-100',
    card: 'bg-white',
    text: 'text-gray-800',
    accent: 'bg-blue-500 hover:bg-blue-600',
    font: 'font-sans'
  },
  DARK: {
    background: 'bg-gray-900',
    card: 'bg-gray-800',
    text: 'text-gray-200',
    accent: 'bg-purple-500 hover:bg-purple-600',
    font: 'font-sans'
  },
  PLAYFUL: {
    background: 'bg-yellow-100',
    card: 'bg-white',
    text: 'text-indigo-800',
    accent: 'bg-pink-500 hover:bg-pink-600',
    font: 'font-mono'
  }
};

export default function TShirtCustomizer() {
  const { addToCart } = useCart();
  const [currentTheme, setCurrentTheme] = useState(0);
  const { register, watch } = useForm({
    defaultValues: {
      height: 180,
      weight: 80,
      build: 'athletic',
      text: '',
      size: 'M'
    }
  });
  const [view, setView] = useState('2D');
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);
  
  // Get current theme based on index
  const getTheme = () => {
    const themes = Object.values(THEMES);
    return themes[currentTheme % themes.length];
  };
  
  const theme = getTheme();
  
  // Handle theme switching with Alt+Q keyboard shortcut
  const handleKeyDown = (e) => {
    if (e.altKey && e.key === 'q') {
      setCurrentTheme(prev => (prev + 1) % Object.keys(THEMES).length);
    }
  };
  
  // Handle file drop
  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.match('image.*')) {
        const reader = new FileReader();
        reader.onload = (e) => setImage(e.target.result);
        reader.readAsDataURL(file);
      }
    }
  };
  
  // Handle file selection
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target.result);
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  
  // Allow drag over
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  
  // Toggle between 2D and 3D views
  const toggleView = () => {
    setView(prev => prev === '2D' ? '3D' : '2D');
  };
  
  const placeholderImage = "/api/placeholder/300/400";
  const tshirtImage = "/api/placeholder/400/500";
  
  const handleAddToCart = () => {
    const customTshirt = {
      name: 'Custom T-Shirt',
      size: watch('size'),
      price: 29.99,
      customImage: image,
      customText: watch('text'),
      specifications: {
        height: watch('height'),
        weight: watch('weight'),
        build: watch('build')
      }
    };
    addToCart(customTshirt);
  };

  return (
    <div 
      className={`min-h-screen ${theme.background} ${theme.font} ${theme.text} p-4`}
      onKeyDown={handleKeyDown}
      tabIndex="0"
    >
      <Cart />
      <div className={`max-w-6xl mx-auto ${theme.card} rounded-lg shadow-lg p-6`}>
        <h1 className="text-3xl font-bold mb-6 text-center">T-Shirt Customizer</h1>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left column - T-shirt preview */}
          <div className="w-full md:w-1/2 flex flex-col items-center">
            <div className="relative w-full aspect-[3/4] flex items-center justify-center mb-4">
              {view === '2D' ? (
                <div className="relative w-full h-full flex items-center justify-center">
                  <img 
                    src={image1} 
                    alt="T-shirt preview" 
                    className="max-h-full object-contain"
                  />
                  
                  {image && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <img 
                        src={image1} 
                        alt="Custom design" 
                        className="max-w-[28%] max-h-full object-contain"
                      />
                    </div>
                  )}
                  
                  {watch('text') && (
                    <div className="absolute bottom-1/3 w-[28%] text-center">
                      <p className="text-sm break-words">
                        {watch('text').split('\n').slice(0, 3).map((line, i) => (
                          <span key={i} className="block">{line}</span>
                        ))}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <Tshirt3DViewer 
                  customImage={image} 
                  customText={watch('text')} 
                />
              )}
            </div>
            
            <button 
              onClick={toggleView} 
              className={`${theme.accent} text-white px-4 py-2 rounded-lg mb-4`}
            >
              Switch to {view === '2D' ? '3D' : '2D'} View
            </button>

            <button
              onClick={handleAddToCart}
              className={`${theme.accent} text-white px-6 py-2 rounded-lg`}
            >
              Add to Cart
            </button>
            
            <p className="text-sm text-gray-500 mt-2">
              Press Alt+Q to switch between themes
            </p>
          </div>
          
          {/* Right column - Customization options */}
          <div className="w-full md:w-1/2">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Size Customization</h2>
              <div className={`border ${theme.text} border-gray-300 rounded-lg p-4`}>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Height (cm)</label>
                  <input
                    type="range"
                    min="150"
                    max="210"
                    {...register('height')}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="block text-right">{watch('height')} cm</span>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Weight (kg)</label>
                  <input
                    type="range"
                    min="40"
                    max="150"
                    {...register('weight')}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="block text-right">{watch('weight')} kg</span>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Build</label>
                  <select
                    {...register('build')}
                    className="w-full p-2 border border-gray-300 rounded-lg bg-white"
                  >
                    <option value="lean">Lean</option>
                    <option value="regular">Regular</option>
                    <option value="athletic">Athletic</option>
                    <option value="big">Big</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Custom Image</h2>
              <div 
                className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
                onClick={() => fileInputRef.current.click()}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                {image ? (
                  <div className="flex flex-col items-center">
                    <img 
                      src={image} 
                      alt="Custom uploaded image" 
                      className="h-24 object-contain mb-2" 
                    />
                    <p className="text-sm text-gray-500">Click or drag to replace image</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <img 
                      src={image2} 
                      alt="Placeholder" 
                      className="h-24 object-contain mb-2" 
                    />
                    <p>Drop an image here or click to upload</p>
                    <p className="text-sm text-gray-500">Recommended size: 1200×1200px</p>
                  </div>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
            </div>
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Custom Text</h2>
              <textarea
                {...register('text')}
                placeholder="Enter text to print on your t-shirt (max 3 lines)"
                className="w-full p-3 border border-gray-300 rounded-lg h-24 resize-none"
                maxLength={100}
              />
              <p className="text-sm text-gray-500 mt-1">
                Characters: {watch('text').length}/100 | Lines: {watch('text').split('\n').length}/3
              </p>
            </div>
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Size Selection</h2>
              <select
                {...register('size')}
                className="w-full p-2 border border-gray-300 rounded-lg bg-white"
              >
                <option value="S">Small</option>
                <option value="M">Medium</option>
                <option value="L">Large</option>
                <option value="XL">Extra Large</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}