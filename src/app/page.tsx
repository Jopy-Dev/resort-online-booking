import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow">
        {/* HERO SECTION */}
        <section className="relative h-screen w-full flex items-center justify-center">
          {/* Background Image Placeholder */}
          <div className="absolute inset-0 z-0 bg-gray-900">
            <div className="absolute inset-0 bg-black/30 z-10" />
            <img 
              src="https://images.unsplash.com/photo-1542314831-c6a4d27ece6a?q=80&w=2500&auto=format&fit=crop" 
              alt="Luxury Resort"
              className="w-full h-full object-cover opacity-80"
            />
          </div>

          <div className="relative z-20 text-center px-4 max-w-5xl mx-auto mt-16">
            <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl text-white font-medium tracking-tight mb-6">
              Discover Deals<br />Hotel & Resorts
            </h1>
            <p className="text-gray-200 text-lg md:text-xl font-light tracking-wide max-w-2xl mx-auto mb-10">
              An architectural masterpiece completely immersed in nature, blending uncompromising luxury with extreme minimalism.
            </p>
          </div>

          {/* FLOATING BOOKING SEARCH BAR */}
          <div className="absolute bottom-0 left-0 w-full z-30 translate-y-1/2 px-4">
            <div className="max-w-5xl mx-auto bg-white shadow-2xl p-4 md:p-8 flex flex-col md:flex-row gap-4 md:gap-8 items-end border border-gray-100">
              <div className="flex-1 w-full relative">
                <label className="block text-xs uppercase tracking-widest text-gray-500 font-semibold mb-2">Check-in</label>
                <input type="date" className="w-full pb-2 border-b border-gray-300 focus:border-primary focus:outline-none bg-transparent text-gray-900 transition-colors" />
              </div>
              <div className="flex-1 w-full relative">
                <label className="block text-xs uppercase tracking-widest text-gray-500 font-semibold mb-2">Check-out</label>
                <input type="date" className="w-full pb-2 border-b border-gray-300 focus:border-primary focus:outline-none bg-transparent text-gray-900 transition-colors" />
              </div>
              <div className="w-full md:w-32 relative">
                <label className="block text-xs uppercase tracking-widest text-gray-500 font-semibold mb-2">Guests</label>
                <select className="w-full pb-2 border-b border-gray-300 focus:border-primary focus:outline-none bg-transparent text-gray-900 appearance-none rounded-none cursor-pointer transition-colors">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4+</option>
                </select>
              </div>
              <Button className="w-full md:w-auto bg-primary text-white hover:bg-primary/95 rounded-none px-10 py-6 text-sm uppercase tracking-widest font-semibold h-auto">
                Check Availability
              </Button>
            </div>
          </div>
        </section>

        {/* THE COLLECTION SECTION - Asymmetrical Layout */}
        <section className="py-32 md:py-48 px-4 bg-white mt-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-24 md:mb-32">
              <h2 className="text-xs uppercase tracking-widest text-primary font-semibold mb-4">Accommodations</h2>
              <h3 className="font-heading text-4xl md:text-5xl lg:text-6xl text-gray-900">The Collection</h3>
            </div>

            {/* Room 1 */}
            <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24 mb-32">
              <div className="flex-1 w-full">
                <div className="aspect-[4/5] relative overflow-hidden bg-gray-100 group">
                  <img src="https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1600&auto=format&fit=crop" alt="Signature Suite" className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-1000" />
                </div>
              </div>
              <div className="flex-1 w-full py-8">
                <h4 className="font-heading text-3xl md:text-4xl text-gray-900 mb-6">Signature Presidential Suite</h4>
                <p className="text-gray-500 font-light leading-relaxed mb-10 max-w-md">
                  A sanctuary of absolute privacy and understated elegance. Floor-to-ceiling windows obliterate the boundary between the opulent interior and the dramatic alpine landscape.
                </p>
                <div className="flex items-center gap-6 mb-12 border-y border-gray-100 py-6">
                  <div className="text-center">
                    <span className="block font-heading text-2xl text-gray-900">180</span>
                    <span className="text-[10px] uppercase tracking-widest text-gray-400">SQM</span>
                  </div>
                  <div className="w-px h-10 bg-gray-200" />
                  <div className="text-center">
                    <span className="block font-heading text-2xl text-gray-900">4</span>
                    <span className="text-[10px] uppercase tracking-widest text-gray-400">GUESTS</span>
                  </div>
                  <div className="w-px h-10 bg-gray-200" />
                  <div className="text-center">
                    <span className="block font-heading text-2xl text-gray-900">1</span>
                    <span className="text-[10px] uppercase tracking-widest text-gray-400">SPA</span>
                  </div>
                </div>
                <Button variant="outline" className="rounded-none border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-8 py-6 uppercase tracking-widest text-xs">
                  Discover Suite
                </Button>
              </div>
            </div>

            {/* Room 2 - Flipped */}
            <div className="flex flex-col-reverse md:flex-row items-center gap-12 md:gap-24">
              <div className="flex-1 w-full py-8 md:text-right flex flex-col md:items-end">
                <h4 className="font-heading text-3xl md:text-4xl text-gray-900 mb-6">Grand Chalet Residence</h4>
                <p className="text-gray-500 font-light leading-relaxed mb-10 max-w-md">
                  Vast open spaces anchored by a striking central fireplace. This residence redefines alpine living, offering direct piste access and a private cinema.
                </p>
                <Button variant="outline" className="rounded-none border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-8 py-6 uppercase tracking-widest text-xs">
                  Discover Residence
                </Button>
              </div>
              <div className="flex-1 w-full">
                <div className="aspect-[4/5] relative overflow-hidden bg-gray-100 group">
                  <img src="https://images.unsplash.com/photo-1621293954908-907159247fc8?q=80&w=1600&auto=format&fit=crop" alt="Chalet Residence" className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-1000" />
                </div>
              </div>
            </div>
            
            <div className="mt-32 text-center">
              <Button variant="link" className="text-primary uppercase tracking-widest text-sm font-semibold hover:text-primary/80">
                View Entire Collection &rarr;
              </Button>
            </div>
          </div>
        </section>

        {/* EXPERIENCES SECTION */}
        <section id="experiences" className="w-full relative py-32 md:py-48 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
             <div className="flex flex-col md:flex-row gap-12 justify-between items-end mb-20 px-4 md:px-0">
               <div className="max-w-xl">
                 <h2 className="text-xs uppercase tracking-widest text-primary font-semibold mb-4">Gastronomy & Spa</h2>
                 <h3 className="font-heading text-4xl md:text-5xl text-gray-900">Curated Experiences</h3>
               </div>
               <p className="text-gray-500 leading-relaxed max-w-md pb-2">
                 From Michelin-grade dining under the stars to holistic rejuvenation in our subterranean thermal baths.
               </p>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="group relative h-[600px] overflow-hidden">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500 z-10" />
                  <img src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=1600&auto=format&fit=crop" alt="Fine Dining" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                  <div className="absolute bottom-0 left-0 p-10 z-20">
                    <h4 className="font-heading text-3xl text-white mb-4">The Restaurant</h4>
                    <p className="text-white/80 font-light mb-6">Culinary alchemy featuring locally foraged ingredients.</p>
                    <span className="text-white uppercase tracking-widest text-xs border-b border-white pb-1">Explore Dining</span>
                  </div>
                </div>
                <div className="group relative h-[600px] overflow-hidden mt-0 md:mt-24">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500 z-10" />
                  <img src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1600&auto=format&fit=crop" alt="Spa" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                  <div className="absolute bottom-0 left-0 p-10 z-20">
                    <h4 className="font-heading text-3xl text-white mb-4">The Clinic Spa</h4>
                    <p className="text-white/80 font-light mb-6">Bespoke cellular rejuvenation therapies.</p>
                    <span className="text-white uppercase tracking-widest text-xs border-b border-white pb-1">Explore Wellness</span>
                  </div>
                </div>
             </div>
          </div>
        </section>

        {/* REVIEWS SECTION */}
        <section className="py-24 md:py-32 bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-xs uppercase tracking-widest text-primary font-semibold mb-4">Guest Experiences</h2>
            <h3 className="font-heading text-4xl text-gray-900 mb-16">Stories from Our Guests</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Review 1 */}
              <div className="p-8 border border-gray-100 bg-gray-50 flex flex-col items-center text-center">
                <div className="flex text-yellow-500 mb-6">
                  {Array(5).fill(0).map((_, i) => (
                    <svg key={i} className="w-5 h-5 mx-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 font-light italic mb-8 flex-grow">"An absolute sanctuary. The attention to detail and the architectural brilliance harmonizing with the alpine environment is unmatched."</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" alt="Guest" className="w-full h-full object-cover" />
                  </div>
                  <div className="text-left">
                    <h5 className="font-heading text-sm text-gray-900 font-semibold">David M.</h5>
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider">Google Review</span>
                  </div>
                </div>
              </div>

              {/* Review 2 */}
              <div className="p-8 border border-gray-100 bg-gray-50 flex flex-col items-center text-center transform md:-translate-y-4">
                <div className="flex text-yellow-500 mb-6">
                  {Array(5).fill(0).map((_, i) => (
                    <svg key={i} className="w-5 h-5 mx-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 font-light italic mb-8 flex-grow">"The culinary experience at The Restaurant redefined my expectations. Minimalist luxury at its absolute finest. Will definitely return."</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop" alt="Guest" className="w-full h-full object-cover" />
                  </div>
                  <div className="text-left">
                    <h5 className="font-heading text-sm text-gray-900 font-semibold">Sarah J.</h5>
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider">Google Review</span>
                  </div>
                </div>
              </div>

              {/* Review 3 */}
              <div className="p-8 border border-gray-100 bg-gray-50 flex flex-col items-center text-center">
                <div className="flex text-yellow-500 mb-6">
                  {Array(5).fill(0).map((_, i) => (
                    <svg key={i} className="w-5 h-5 mx-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 font-light italic mb-8 flex-grow">"Unobtrusive yet flawless service. The privacy of the Grand Chalet Residence allowed us to truly disconnect while enjoying ultimate comfort."</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop" alt="Guest" className="w-full h-full object-cover" />
                  </div>
                  <div className="text-left">
                    <h5 className="font-heading text-sm text-gray-900 font-semibold">Michael T.</h5>
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider">Google Review</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* LOCATION SECTION (Google Maps Embed) */}
        <section className="w-full h-[600px] relative bg-gray-100">
          <div className="absolute inset-0 w-full h-full">
            {/* Replace the src with an actual embedded Google Maps iframe URL when available */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d88258.91616556108!2d9.758835848529283!3d46.495287708536766!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47847a61d1ea0ed3%3A0x404d2226ebda860!2sSt%20Moritz%2C%20Switzerland!5e0!3m2!1sen!2sus!4v1709653198533!5m2!1sen!2sus" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale opacity-80 mix-blend-multiply transition-all duration-700 hover:grayscale-0 hover:opacity-100 hover:mix-blend-normal"
            ></iframe>
          </div>
          <div className="absolute inset-0 pointer-events-none z-10 hidden md:block">
            <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-end">
              <div className="bg-white/95 backdrop-blur-sm p-10 max-w-sm border border-gray-100 pointer-events-auto shadow-2xl">
                <h3 className="font-heading text-3xl text-gray-900 mb-6">The Location</h3>
                <p className="text-gray-600 font-light leading-relaxed mb-8">
                  Nestled in the pristine alpine peaks of St. Moritz. Accessible via private transfer from Samedan Airport or a scenic helicopter journey.
                </p>
                <Button variant="outline" className="w-full rounded-none border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white uppercase tracking-widest text-xs h-12">
                  Get Directions
                </Button>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
