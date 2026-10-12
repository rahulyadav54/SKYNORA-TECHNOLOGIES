import React, { useState } from 'react';
import { AppView } from '../types';
import { CANDOLIM_EXPERIENCES } from '../data/mockData';

interface ExperiencesViewProps {
  onNavigate: (view: AppView) => void;
  onBookExperience: (exp: any) => void;
}

export const ExperiencesView: React.FC<ExperiencesViewProps> = ({ onNavigate, onBookExperience }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const allExperiences = [
    ...CANDOLIM_EXPERIENCES,
    {
      id: 'dudhsagar-safari',
      title: 'Dudhsagar Waterfalls & Organic Spice Plantation Safari',
      tag: 'Full Day Safari',
      tagIcon: 'nature',
      rating: 4.88,
      description: '4x4 open-top Jeep safari through Bhagwan Mahavir Wildlife Sanctuary to India’s 5th highest cascading waterfall with traditional Goan buffet lunch.',
      price: 2850,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD41cPVuv-DsTdGKBlStFjpSu9NP1IV01TlLbDWhzg1HijaDM0sxBkgMgwvXdyAkDDPRUJn8NRnRhFkjq1boHfEWiwQ4bYuty6XqOMLbQJx2EVpOTbpV2BV6zPBgzeUpl1wOoGx014vxExHHAbYzFGHgVvJlK-MbfHJKu5OkfoK0y9UVabwXaAz_1ntwOSqBOKuIY0T2xOaEos74eyRhfYU23erOTJpNrFvV_a1R5AVXden_ETJTeaXqA'
    },
    {
      id: 'sunset-yacht',
      title: 'Private Luxury Yacht Charter at Mandovi River',
      tag: 'VIP Luxury',
      tagIcon: 'sailing',
      rating: 4.95,
      description: '3-hour private luxury yacht cruise with personal steward, imported champagne, gourmet grazing platter, and golden hour drone photography.',
      price: 18500,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQl8zArycC7cZntla_gfva2VpBYO01dk67Z7g0gk4Y_yKgeCK6A0xn5BoJKJ9A0Xe8MzRhPOflRd-ZojbKbwqsa0h9kJiohcTYq-u_6mIjSsIzALrFNS-QmHmCzfPb83S3ASoqnyflqYQwO0vW8te4THoAv5uasaSLjZvoiq-kUU3vYsIZr1IaBPRPeqc2oE4Af-XRHraP7z0dwP8ZiU85TBQuoLjGVbTSKJqgXe-cnZetqXNMX92cBA'
    }
  ];

  return (
    <div className="pt-24 pb-20 bg-[#faf8ff] min-h-screen text-[#131b2e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-[#45464d] mb-1">
              <button onClick={() => onNavigate('explore')} className="hover:text-[#4b41e1] cursor-pointer">Home</button>
              <span>/</span>
              <span className="font-semibold text-[#131b2e]">Handpicked Travel Experiences</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-['Plus_Jakarta_Sans']">
              Curated Coastal & Heritage Experiences
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#e2e7ff] text-[#4b41e1]">
              Skynora Local Curators & Certified Guides
            </span>
          </div>
        </div>

        {/* Experience Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allExperiences.map(exp => (
            <div key={exp.id} className="bg-white rounded-3xl overflow-hidden border border-[#e2e7ff] shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="relative h-52 w-full overflow-hidden">
                  <img
                    src={exp.image}
                    alt={exp.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#131b2e]/80 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">{exp.tagIcon}</span>
                    <span>{exp.tag}</span>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-white/95 text-[#131b2e] text-xs font-black px-2 py-0.5 rounded-lg shadow-sm">
                    ★ {exp.rating}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-bold text-base text-[#131b2e] mb-2">{exp.title}</h3>
                  <p className="text-xs text-[#5a5c65] leading-relaxed mb-4">{exp.description}</p>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-[#f8f9ff] flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-[#757780]">From</span>
                  <div className="text-xl font-black font-['Plus_Jakarta_Sans'] text-[#131b2e]">
                    ₹{exp.price.toLocaleString('en-IN')}
                  </div>
                </div>

                <button
                  onClick={() =>
                    onBookExperience({
                      title: exp.title,
                      category: 'Experience',
                      price: exp.price,
                      date: '19 Nov 2025',
                    })
                  }
                  className="px-5 py-2.5 rounded-xl bg-[#4b41e1] text-white text-xs font-bold hover:bg-[#3b30d0] transition-colors shadow-sm cursor-pointer"
                >
                  Reserve Pass
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
