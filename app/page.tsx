// pages/index.js
import dynamic from 'next/dynamic';

const MapComponent = dynamic(() => import('./MapComponent'), { ssr: false });

export default function Home() {
  return (
    <div>
      <h1 className='text-center p-2'>Map with Markers made by MOHD AZAM</h1>
      <MapComponent />
    </div>
  );
}
