/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  FileText, 
  Search, 
  Calendar, 
  MessageSquare, 
  User,
  Bell,
  Menu,
  ChevronRight,
  MapPin,
  Phone,
  Clock,
  ArrowLeft
} from 'lucide-react';
import { Screen } from './types';

// Mock data
const NEWS = [
  { id: '1', title: 'Thông báo về việc cấp căn cước công dân gắn chip đợt 5', date: '05/05/2026', image: 'https://images.unsplash.com/photo-1589209249712-96947ed0283c?auto=format&fit=crop&q=80&w=400' },
  { id: '2', title: 'Tiêm chủng mở rộng cho trẻ em tại Trạm Y tế phường', date: '04/05/2026', image: 'https://images.unsplash.com/photo-1584634731339-252c581abfc5?auto=format&fit=crop&q=80&w=400' },
  { id: '3', title: 'Hướng dẫn nộp hồ sơ trực tuyến qua Cổng dịch vụ công', date: '02/05/2026', image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=400' },
];

const PROCEDURES = [
  { id: '1', title: 'Đăng ký cư trú', category: 'Hộ tịch', duration: '3 ngày', fee: 'Miễn phí' },
  { id: '2', title: 'Cấp bản sao trích lục hộ tịch', category: 'Hộ tịch', duration: '1 ngày', fee: '8.000đ' },
  { id: '3', title: 'Xác nhận tình trạng hôn nhân', category: 'Hộ tịch', duration: '3 ngày', fee: 'Miễn phí' },
  { id: '4', title: 'Chứng thực bản sao từ bản chính', category: 'Chứng thực', duration: 'Trong ngày', fee: '2.000đ/trang' },
  { id: '5', title: 'Khai báo tạm trú cho người nước ngoài', category: 'Cư trú', duration: 'Trong ngày', fee: 'Miễn phí' },
];

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const screenTitles: Record<Screen, string> = {
    home: 'Tây Thạnh Smart City',
    procedures: 'Thủ tục hành chính',
    tracking: 'Tra cứu hồ sơ',
    booking: 'Đặt lịch hẹn',
    feedback: 'Phản ánh kiến nghị',
    profile: 'Cá nhân'
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home': return <HomeScreen onNavigate={setCurrentScreen} />;
      case 'procedures': return <ProceduresScreen />;
      case 'tracking': return <TrackingScreen />;
      case 'booking': return <BookingScreen />;
      case 'feedback': return <FeedbackScreen />;
      case 'profile': return <ProfileScreen />;
      default: return <HomeScreen onNavigate={setCurrentScreen} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-0 md:p-4">
      {/* Mobile App Container */}
      <div className="w-full max-w-[450px] h-screen md:h-[850px] bg-white shadow-2xl relative flex flex-col overflow-hidden md:rounded-[3rem] border-[8px] border-slate-900">
        
        {/* Status Bar simulation */}
        <div className="bg-slate-900 h-8 flex items-center justify-between px-8 text-white text-xs font-medium">
          <span>9:41</span>
          <div className="flex gap-1">
            <div className="w-4 h-2 bg-white/40 rounded-sm"></div>
            <div className="w-4 h-2 bg-white rounded-sm"></div>
          </div>
        </div>

        {/* Header */}
        <header className="px-6 py-4 bg-white border-b border-slate-100 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            {currentScreen !== 'home' && (
              <button onClick={() => setCurrentScreen('home')} className="p-1 hover:bg-slate-100 rounded-full">
                <ArrowLeft className="w-6 h-6 text-slate-600" />
              </button>
            )}
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              {screenTitles[currentScreen]}
            </h1>
          </div>
          <div className="flex gap-3">
            <button className="relative p-2 hover:bg-slate-100 rounded-full">
              <Bell className="w-6 h-6 text-slate-600" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 hover:bg-slate-100 rounded-full">
              <Menu className="w-6 h-6 text-slate-600" />
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto pb-24 scroll-smooth">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentScreen}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="p-6"
            >
              {renderScreen()}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Navigation Bar */}
        <nav className="absolute bottom-0 w-full bg-white/80 backdrop-blur-md border-t border-slate-100 px-6 py-4 flex justify-between items-center z-20">
          <NavButton active={currentScreen === 'home'} icon={<Home />} label="Trang chủ" onClick={() => setCurrentScreen('home')} />
          <NavButton active={currentScreen === 'procedures'} icon={<FileText />} label="Thủ tục" onClick={() => setCurrentScreen('procedures')} />
          <NavButton active={currentScreen === 'tracking'} icon={<Search />} label="Tra cứu" onClick={() => setCurrentScreen('tracking')} />
          <NavButton active={currentScreen === 'booking'} icon={<Calendar />} label="Đặt lịch" onClick={() => setCurrentScreen('booking')} />
        </nav>
      </div>
    </div>
  );
}

function NavButton({ active, icon, label, onClick }: { active: boolean, icon: React.ReactNode, label: string, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-1 transition-colors ${active ? 'text-blue-600' : 'text-slate-400'}`}
    >
      {React.cloneElement(icon as React.ReactElement, { className: 'w-6 h-6' })}
      <span className="text-[10px] font-medium uppercase tracking-wider">{label}</span>
    </button>
  );
}

// SCREENS Implementation

function HomeScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  return (
    <div className="space-y-8">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input 
          type="text" 
          placeholder="Bạn đang tìm kiếm gì?" 
          className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-slate-700"
        />
      </div>

      {/* Quick Services Grid */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 mb-4 px-1">Dịch vụ phổ biến</h2>
        <div className="grid grid-cols-2 gap-4">
          <ServiceCard 
            icon={<FileText className="w-6 h-6 text-blue-600" />} 
            label="Nộp hồ sơ trực tuyến" 
            color="bg-blue-50"
            onClick={() => onNavigate('procedures')} 
          />
          <ServiceCard 
            icon={<Search className="w-6 h-6 text-emerald-600" />} 
            label="Tra cứu kết quả" 
            color="bg-emerald-50"
            onClick={() => onNavigate('tracking')} 
          />
          <ServiceCard 
            icon={<Calendar className="w-6 h-6 text-amber-600" />} 
            label="Đặt lịch hẹn" 
            color="bg-amber-50"
            onClick={() => onNavigate('booking')} 
          />
          <ServiceCard 
            icon={<MessageSquare className="w-6 h-6 text-rose-600" />} 
            label="Phản ánh kiến nghị" 
            color="bg-rose-50"
            onClick={() => onNavigate('feedback')} 
          />
        </div>
      </div>

      {/* Featured News */}
      <div>
        <div className="flex items-center justify-between mb-4 px-1">
          <h2 className="text-lg font-bold text-slate-900">Tin tức Tây Thạnh</h2>
          <button className="text-blue-600 text-sm font-semibold">Tất cả</button>
        </div>
        <div className="space-y-4">
          {NEWS.map(item => (
            <div key={item.id} className="flex gap-4 p-2 rounded-2xl hover:bg-slate-50 transition-colors group cursor-pointer">
              <img src={item.image} alt={item.title} className="w-24 h-24 rounded-xl object-cover" />
              <div className="flex flex-col justify-center">
                <span className="text-[10px] font-bold text-blue-600 uppercase mb-1">{item.date}</span>
                <h3 className="text-sm font-semibold text-slate-800 line-clamp-2 leading-relaxed group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Info */}
      <div className="bg-slate-900 rounded-3xl p-6 text-white text-sm space-y-4">
          <h3 className="font-bold flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-400" />
            UBND Phường Tây Thạnh
          </h3>
          <p className="text-slate-400 font-medium">17 Lê Trọng Tấn, P. Tây Thạnh, Q. Tân Phú, TP. HCM</p>
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-blue-400" />
              <span>(028) 3816...</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-400" />
              <span>07:30 - 17:00</span>
            </div>
          </div>
      </div>
    </div>
  );
}

function ServiceCard({ icon, label, color, onClick }: { icon: React.ReactNode, label: string, color: string, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center justify-center p-6 rounded-[2rem] gap-3 transition-transform active:scale-95 ${color}`}
    >
      <div className="bg-white p-3 rounded-2xl shadow-sm">
        {icon}
      </div>
      <span className="text-xs font-bold text-slate-800 text-center leading-tight">{label}</span>
    </button>
  );
}

function ProceduresScreen() {
  const [filter, setFilter] = useState('Tất cả');
  const categories = ['Tất cả', 'Hộ tịch', 'Chứng thực', 'Cư trú'];

  return (
    <div className="space-y-6">
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              filter === cat ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-slate-100 text-slate-600'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {PROCEDURES.filter(p => filter === 'Tất cả' || p.category === filter).map(p => (
          <div key={p.id} className="p-5 bg-white border border-slate-100 rounded-3xl flex items-center justify-between group cursor-pointer hover:border-blue-200 hover:shadow-xl hover:shadow-slate-100 transition-all">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{p.category}</span>
              <h4 className="font-bold text-slate-800 text-base">{p.title}</h4>
              <div className="flex gap-4 text-xs text-slate-500 font-medium">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {p.duration}</span>
                <span className="flex items-center gap-1"><Search className="w-3 h-3" /> {p.fee}</span>
              </div>
            </div>
            <ChevronRight className="w-6 h-6 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
          </div>
        ))}
      </div>
    </div>
  );
}

function TrackingScreen() {
  const [code, setCode] = useState('');
  const [results, setResults] = useState<any>(null);

  const handleSearch = () => {
    if(!code) return;
    setResults({
      status: 'Đang xử lý',
      step: 'Chờ lãnh đạo ký',
      updateAt: '05/05/2026 14:30',
      history: [
        { title: 'Tiếp nhận hồ sơ', date: '01/05/2026 09:00', done: true },
        { title: 'Xử lý chuyên môn', date: '03/05/2026 10:30', done: true },
        { title: 'Ký duyệt hồ sơ', date: '-', done: false }
      ]
    });
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <label className="text-sm font-bold text-slate-900 px-1">Nhập mã số hồ sơ</label>
        <div className="flex gap-2">
          <input 
            type="text" 
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Ví dụ: 000.00.00.H47-240501-0001" 
            className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl p-4 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
          />
          <button 
            onClick={handleSearch}
            className="bg-blue-600 text-white p-4 rounded-2xl shadow-lg shadow-blue-200 active:scale-95 transition-transform"
          >
            <Search className="w-6 h-6" />
          </button>
        </div>
      </div>

      {results && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border-2 border-blue-50 rounded-[2.5rem] p-8 space-y-8 shadow-2xl shadow-slate-200"
        >
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Trạng thái</span>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                <h3 className="text-2xl font-black text-slate-900">{results.status}</h3>
              </div>
            </div>
            <div className="bg-blue-50 text-blue-600 px-4 py-2 rounded-2xl font-bold text-xs uppercase">75%</div>
          </div>

          <div className="space-y-6">
            {results.history.map((step: any, idx: number) => (
              <div key={idx} className="flex gap-4 relative">
                {idx !== results.history.length - 1 && (
                  <div className={`absolute left-3 top-8 w-0.5 h-10 ${step.done ? 'bg-blue-500' : 'bg-slate-100'}`}></div>
                )}
                <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 z-10 ${step.done ? 'bg-blue-500 text-white shadow-lg shadow-blue-200' : 'bg-slate-100 border-2 border-slate-200'}`}>
                  {step.done && <ChevronRight className="w-4 h-4" />}
                </div>
                <div className="flex-1">
                  <h4 className={`text-sm font-bold ${step.done ? 'text-slate-900' : 'text-slate-400'}`}>{step.title}</h4>
                  <p className="text-[11px] font-medium text-slate-400">{step.date}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}

function BookingScreen() {
  return (
    <div className="space-y-6">
      <div className="p-6 bg-blue-600 rounded-[2rem] text-white space-y-4 shadow-xl shadow-blue-100">
        <h3 className="text-xl font-black leading-tight">Đặt lịch hẹn làm việc tại Công sở</h3>
        <p className="text-blue-100 text-sm font-medium leading-relaxed">Giảm thời gian chờ đợi bằng cách đặt lịch trước đợt tiếp nhận hồ sơ.</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-1 px-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Lĩnh vực</label>
          <select className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 appearance-none font-semibold text-slate-700">
            <option>Sao y, chứng thực</option>
            <option>Hộ tịch (Khai sinh, Kết hôn...)</option>
            <option>Đất đai, Xây dựng</option>
            <option>Lao động, Thương binh xã hội</option>
          </select>
        </div>

        <div className="space-y-1 px-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ngày hẹn</label>
          <input type="date" className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 font-semibold text-slate-700" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1 px-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Thời gian</label>
            <select className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 font-semibold text-slate-700">
              <option>Sáng (07:30 - 11:30)</option>
              <option>Chiều (13:30 - 17:00)</option>
            </select>
          </div>
          <div className="flex items-end">
            <button className="w-full bg-slate-900 text-white rounded-2xl p-4 font-bold active:scale-95 transition-transform shadow-lg shadow-slate-200">Xác nhận</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeedbackScreen() {
  return (
    <div className="space-y-6">
      <div className="space-y-1 text-center py-4">
        <h3 className="text-2xl font-black text-slate-900">Gửi phản ánh</h3>
        <p className="text-slate-500 text-sm font-medium">Chúng tôi luôn lắng nghe ý kiến của bạn</p>
      </div>

      <div className="space-y-4">
        <textarea 
          placeholder="Nhập nội dung phản ánh, kiến nghị..." 
          className="w-full bg-slate-50 border border-slate-200 rounded-3xl p-6 min-h-[200px] focus:ring-2 focus:ring-blue-500/20 focus:outline-none font-medium text-slate-700 placeholder:text-slate-400"
        ></textarea>
        
        <div className="p-6 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center gap-2 cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors group">
          <div className="bg-slate-100 p-3 rounded-2xl group-hover:bg-white transition-colors">
            <Search className="w-6 h-6 text-slate-400 group-hover:text-blue-600" />
          </div>
          <span className="text-xs font-bold text-slate-400 group-hover:text-blue-600">Đính kèm ảnh/video</span>
        </div>

        <button className="w-full bg-blue-600 text-white py-5 rounded-[2rem] font-black text-lg shadow-2xl shadow-blue-200 active:scale-95 transition-all">Gửi thông tin</button>
      </div>
    </div>
  );
}

function ProfileScreen() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="w-24 h-24 bg-blue-100 rounded-[3rem] flex items-center justify-center border-4 border-white shadow-xl">
          <User className="w-12 h-12 text-blue-600" />
        </div>
        <div>
          <h3 className="text-xl font-black text-slate-900">Nguyễn Văn A</h3>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Cư dân Tây Thạnh</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-slate-50 rounded-3xl text-center space-y-1">
          <span className="text-2xl font-black text-blue-600">03</span>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Hồ sơ đã nộp</p>
        </div>
        <div className="p-4 bg-slate-50 rounded-3xl text-center space-y-1">
          <span className="text-2xl font-black text-emerald-600">01</span>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Hoàn thành</p>
        </div>
      </div>

      <div className="space-y-4">
         <ProfileMenuItem icon={<Bell />} label="Thông báo của tôi" />
         <ProfileMenuItem icon={<Calendar />} label="Lịch hẹn sắp tới" />
         <ProfileMenuItem icon={<Search />} label="Hồ sơ đã lưu" />
         <div className="pt-4">
            <button className="w-full p-4 text-red-500 font-bold text-sm bg-red-50 rounded-2xl">Đăng xuất</button>
         </div>
      </div>
    </div>
  );
}

function ProfileMenuItem({ icon, label }: { icon: React.ReactNode, label: string }) {
  return (
    <div className="flex items-center justify-between p-5 bg-white border border-slate-100 rounded-3xl cursor-pointer hover:border-blue-200 transition-all group">
      <div className="flex items-center gap-4">
        <div className="text-slate-400 group-hover:text-blue-600 transition-colors">
          {React.cloneElement(icon as React.ReactElement, { className: 'w-5 h-5' })}
        </div>
        <span className="text-sm font-bold text-slate-800">{label}</span>
      </div>
      <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
    </div>
  );
}
