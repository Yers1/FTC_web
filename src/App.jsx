import React, { useState, useEffect } from 'react';
import { Calendar, Users, MessageCircle, Plus, Edit2, Trash2, Save, X, Menu, Upload } from 'lucide-react';

const translations = {
  en: { 
    home: 'Home', mentors: 'Mentors', calendar: 'Calendar', bot: 'Bot', admin: 'Admin', 
    hero: 'Queue.Team #24443', subtitle: 'FTC Team from Kazakhstan', 
    ourMentors: 'Our Mentors', addMentor: 'Add Mentor', edit: 'Edit', delete: 'Delete', 
    save: 'Save', cancel: 'Cancel', name: 'Name', role: 'Role', expertise: 'Expertise', 
    experience: 'Experience', contact: 'Contact', events: 'Events', addEvent: 'Add Event', 
    title: 'Title', date: 'Date', type: 'Type', description: 'Description', 
    tournament: 'Tournament', deadline: 'Deadline', meeting: 'Meeting', workshop: 'Workshop', 
    telegramBot: 'FTC Insight Bot', botDesc: 'AI assistant for FTC methodology. Ask questions in 7 languages.', 
    tryBot: 'Try Bot', password: 'Password', login: 'Login', logout: 'Logout',
    aboutTeam: 'About Our Team',
    teamDesc: 'Queue.Team #24443 is an innovative robotics team from Astana, Kazakhstan. We participate in FIRST Tech Challenge competitions and help other teams worldwide through mentorship programs and AI-powered assistance.',
    ourMission: 'Our Mission',
    missionDesc: 'To promote STEM education, develop engineering skills, and support the global FTC community through technology and knowledge sharing.',
    uploadPhoto: 'Upload Photo',
    photoUrl: 'Photo URL'
  },
  ru: { 
    home: 'Главная', mentors: 'Менторы', calendar: 'Календарь', bot: 'Бот', admin: 'Админ', 
    hero: 'Команда Queue.Team #24443', subtitle: 'FTC команда из Казахстана', 
    ourMentors: 'Наши Менторы', addMentor: 'Добавить', edit: 'Редактировать', delete: 'Удалить', 
    save: 'Сохранить', cancel: 'Отмена', name: 'Имя', role: 'Роль', expertise: 'Специализация', 
    experience: 'Опыт', contact: 'Контакт', events: 'События', addEvent: 'Добавить', 
    title: 'Название', date: 'Дата', type: 'Тип', description: 'Описание', 
    tournament: 'Турнир', deadline: 'Дедлайн', meeting: 'Встреча', workshop: 'Воркшоп', 
    telegramBot: 'FTC Insight Bot', botDesc: 'AI-помощник по методологии FTC. Отвечает на вопросы на 7 языках.', 
    tryBot: 'Попробовать', password: 'Пароль', login: 'Войти', logout: 'Выйти',
    aboutTeam: 'О Нашей Команде',
    teamDesc: 'Queue.Team #24443 - инновационная команда робототехники из Астаны, Казахстан. Мы участвуем в соревнованиях FIRST Tech Challenge и помогаем командам по всему миру через программы менторства и AI-помощника.',
    ourMission: 'Наша Миссия',
    missionDesc: 'Продвигать STEM образование, развивать инженерные навыки и поддерживать глобальное FTC сообщество через технологии и обмен знаниями.',
    uploadPhoto: 'Загрузить фото',
    photoUrl: 'URL фото'
  },
  kk: { 
    home: 'Басты', mentors: 'Менторлар', calendar: 'Күнтізбе', bot: 'Бот', admin: 'Админ', 
    hero: 'Queue.Team #24443', subtitle: 'Қазақстаннан FTC командасы', 
    ourMentors: 'Біздің Менторлар', addMentor: 'Қосу', edit: 'Өңдеу', delete: 'Жою', 
    save: 'Сақтау', cancel: 'Болдырмау', name: 'Аты', role: 'Рөлі', expertise: 'Мамандығы', 
    experience: 'Тәжірибе', contact: 'Байланыс', events: 'Оқиғалар', addEvent: 'Қосу', 
    title: 'Атауы', date: 'Күні', type: 'Түрі', description: 'Сипаттама', 
    tournament: 'Турнир', deadline: 'Мерзім', meeting: 'Кездесу', workshop: 'Семинар', 
    telegramBot: 'FTC Insight Bot', botDesc: 'FTC әдістемесі бойынша AI-көмекші. 7 тілде сұрақтарға жауап береді.', 
    tryBot: 'Сынау', password: 'Құпия сөз', login: 'Кіру', logout: 'Шығу',
    aboutTeam: 'Біздің Команда Туралы',
    teamDesc: 'Queue.Team #24443 - Астана қаласынан инновациялық робототехника командасы, Қазақстан. Біз FIRST Tech Challenge жарыстарына қатысамыз және бүкіл әлем бойынша командаларға менторлық бағдарламалар мен AI-көмекші арқылы көмектесеміз.',
    ourMission: 'Біздің Миссия',
    missionDesc: 'STEM білімін дамыту, инженерлік дағдыларды жетілдіру және технологиялар мен білім алмасу арқылы жаһандық FTC қоғамдастығын қолдау.',
    uploadPhoto: 'Фото жүктеу',
    photoUrl: 'Фото URL'
  }
};

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || '';

export default function App() {
  const [lang, setLang] = useState('en');
  const [tab, setTab] = useState('home');
  const [menu, setMenu] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [pwd, setPwd] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const [mentors, setMentors] = useState([
    {id:1, name:'John Doe', role:'Lead Mentor', expertise:'Programming & Strategy', exp:5, contact:'@john', img:'👨‍💻'},
    {id:2, name:'Jane Smith', role:'Mechanical Mentor', expertise:'CAD & Design', exp:3, contact:'@jane', img:'👩‍🔧'}
  ]);
  const [editM, setEditM] = useState(null);
  const [formM, setFormM] = useState({name:'', role:'', expertise:'', exp:'', contact:'', img:'👤'});
  const [events, setEvents] = useState([
    {id:1, title:'Regional Championship', date:'2026-02-15', type:'tournament', desc:'Kazakhstan Regional FTC Tournament'},
    {id:2, title:'Registration Deadline', date:'2026-01-30', type:'deadline', desc:'Last day to register for regionals'}
  ]);
  const [editE, setEditE] = useState(null);
  const [formE, setFormE] = useState({title:'', date:'', type:'tournament', desc:''});
  const t = translations[lang];

  useEffect(() => {
    const m = localStorage.getItem('m');
    const e = localStorage.getItem('e');
    if(m) setMentors(JSON.parse(m));
    if(e) setEvents(JSON.parse(e));
  }, []);

  const saveM = (x) => { setMentors(x); localStorage.setItem('m', JSON.stringify(x)); };
  const saveE = (x) => { setEvents(x); localStorage.setItem('e', JSON.stringify(x)); };
  
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormM({...formM, img: reader.result});
      };
      reader.readAsDataURL(file);
    }
  };

  const addM = () => { 
    saveM([...mentors, {id:Date.now(), ...formM}]); 
    setFormM({name:'', role:'', expertise:'', exp:'', contact:'', img:'👤'}); 
    setEditM(null); 
  };
  
  const updM = () => { 
    saveM(mentors.map(m=>m.id===editM.id?{...editM, ...formM}:m)); 
    setEditM(null); 
    setFormM({name:'', role:'', expertise:'', exp:'', contact:'', img:'👤'}); 
  };
  
  const delM = (id) => saveM(mentors.filter(m=>m.id!==id));
  
  const addE = () => { 
    saveE([...events, {id:Date.now(), ...formE}]); 
    setFormE({title:'', date:'', type:'tournament', desc:''}); 
    setEditE(null); 
  };
  
  const updE = () => { 
    saveE(events.map(e=>e.id===editE.id?{...editE, ...formE}:e)); 
    setEditE(null); 
    setFormE({title:'', date:'', type:'tournament', desc:''}); 
  };
  
  const delE = (id) => saveE(events.filter(e=>e.id!==id));
  
  const colors = {
    tournament:'bg-blue-500',
    deadline:'bg-red-500',
    meeting:'bg-green-500',
    workshop:'bg-purple-500'
  };

  const handleLogin = () => {
    if(pwd === ADMIN_PASSWORD) {
      setAdmin(true);
      setShowLogin(false);
      setPwd('');
    } else {
      alert('Wrong password!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">Q</div>
              <div>
                <h1 className="text-xl font-bold">Queue.Team</h1>
                <p className="text-xs text-gray-600">#24443 🇰🇿</p>
              </div>
            </div>
            <nav className="hidden md:flex gap-4">
              {['home','mentors','calendar','bot'].map(x=>
                <button key={x} onClick={()=>setTab(x)} className={`px-4 py-2 rounded-lg transition ${tab===x?'bg-blue-600 text-white':'hover:bg-gray-100'}`}>
                  {t[x]}
                </button>
              )}
              {admin&&<button onClick={()=>setTab('admin')} className={`px-4 py-2 rounded-lg transition ${tab==='admin'?'bg-red-600 text-white':'hover:bg-red-100'}`}>{t.admin}</button>}
            </nav>
            <div className="hidden md:flex gap-2 items-center">
              {['en','ru','kk'].map(l=>
                <button key={l} onClick={()=>setLang(l)} className={`px-3 py-1 rounded transition ${lang===l?'bg-blue-600 text-white':'bg-gray-200 hover:bg-gray-300'}`}>
                  {l.toUpperCase()}
                </button>
              )}
              {!admin?
                <button onClick={()=>setShowLogin(true)} className="ml-2 text-2xl">🔒</button>:
                <button onClick={()=>setAdmin(false)} className="ml-2 text-red-600 font-semibold">{t.logout}</button>
              }
            </div>
            <button onClick={()=>setMenu(!menu)} className="md:hidden">{menu?<X/>:<Menu/>}</button>
          </div>
          {menu&&
            <div className="md:hidden mt-4 space-y-2">
              {['home','mentors','calendar','bot'].map(x=>
                <button key={x} onClick={()=>{setTab(x);setMenu(false)}} className={`w-full text-left px-4 py-2 rounded ${tab===x?'bg-blue-600 text-white':''}`}>
                  {t[x]}
                </button>
              )}
              <div className="flex gap-2 px-4 pt-2">
                {['en','ru','kk'].map(l=>
                  <button key={l} onClick={()=>setLang(l)} className={`px-3 py-1 rounded ${lang===l?'bg-blue-600 text-white':'bg-gray-200'}`}>
                    {l.toUpperCase()}
                  </button>
                )}
              </div>
            </div>
          }
        </div>
      </header>

      {showLogin&&
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-xl font-bold mb-4">Admin Login</h3>
            <input 
              type="password" 
              value={pwd} 
              onChange={e=>setPwd(e.target.value)} 
              onKeyPress={e=>e.key==='Enter'&&handleLogin()} 
              className="w-full px-4 py-2 border rounded mb-4" 
              placeholder={t.password}
            />
            <div className="flex gap-2">
              <button onClick={handleLogin} className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                {t.login}
              </button>
              <button onClick={()=>{setShowLogin(false);setPwd('')}} className="flex-1 bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">
                {t.cancel}
              </button>
            </div>
          </div>
        </div>
      }

      <main className="max-w-7xl mx-auto px-4 py-8">
        {tab==='home'&&
          <div className="space-y-8">
            <div className="text-center py-16 bg-white rounded-2xl shadow-xl">
              <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {t.hero}
              </h2>
              <p className="text-2xl text-gray-600 mb-2">{t.subtitle}</p>
              <p className="text-lg text-gray-500 mb-8">Astana, Kazakhstan</p>
              <div className="max-w-3xl mx-auto px-6">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-6">
                  <h3 className="text-2xl font-bold mb-3 text-blue-900">{t.aboutTeam}</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {t.teamDesc}
                  </p>
                </div>
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6">
                  <h3 className="text-2xl font-bold mb-3 text-indigo-900">{t.ourMission}</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {t.missionDesc}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-2xl transition">
                <Users size={48} className="mx-auto mb-4 text-blue-600"/>
                <h3 className="text-3xl font-bold">{mentors.length}</h3>
                <p className="text-gray-600">{t.mentors}</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-2xl transition">
                <Calendar size={48} className="mx-auto mb-4 text-green-600"/>
                <h3 className="text-3xl font-bold">{events.length}</h3>
                <p className="text-gray-600">{t.events}</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-2xl transition">
                <MessageCircle size={48} className="mx-auto mb-4 text-purple-600"/>
                <h3 className="text-3xl font-bold">7</h3>
                <p className="text-gray-600">Languages</p>
              </div>
            </div>
          </div>
        }

        {tab==='mentors'&&
          <div>
            <div className="flex justify-between mb-6">
              <h2 className="text-3xl font-bold">{t.ourMentors}</h2>
              {admin&&!editM&&
                <button onClick={()=>setEditM({id:'new'})} className="bg-blue-600 text-white px-4 py-2 rounded flex gap-2 items-center hover:bg-blue-700">
                  <Plus size={20}/>{t.addMentor}
                </button>
              }
            </div>

            {admin&&editM&&
              <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
                <h3 className="text-xl font-bold mb-4">{editM.id==='new'?t.addMentor:t.edit}</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <input 
                    placeholder={t.name} 
                    value={formM.name} 
                    onChange={e=>setFormM({...formM,name:e.target.value})} 
                    className="px-4 py-2 border rounded"
                  />
                  <input 
                    placeholder={t.role} 
                    value={formM.role} 
                    onChange={e=>setFormM({...formM,role:e.target.value})} 
                    className="px-4 py-2 border rounded"
                  />
                  <input 
                    placeholder={t.expertise} 
                    value={formM.expertise} 
                    onChange={e=>setFormM({...formM,expertise:e.target.value})} 
                    className="px-4 py-2 border rounded"
                  />
                  <input 
                    type="number" 
                    placeholder={t.experience} 
                    value={formM.exp} 
                    onChange={e=>setFormM({...formM,exp:e.target.value})} 
                    className="px-4 py-2 border rounded"
                  />
                  <input 
                    placeholder={t.contact} 
                    value={formM.contact} 
                    onChange={e=>setFormM({...formM,contact:e.target.value})} 
                    className="px-4 py-2 border rounded"
                  />
                  <input 
                    placeholder={t.photoUrl} 
                    value={formM.img} 
                    onChange={e=>setFormM({...formM,img:e.target.value})} 
                    className="px-4 py-2 border rounded"
                  />
                </div>
                <div className="mt-4">
                  <label className="block mb-2 font-semibold">{t.uploadPhoto}</label>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageUpload}
                    className="w-full px-4 py-2 border rounded"
                  />
                  {formM.img && formM.img.startsWith('data:image')&&
                    <img src={formM.img} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded"/>
                  }
                </div>
                <div className="flex gap-2 mt-4">
                  <button onClick={editM.id==='new'?addM:updM} className="bg-green-600 text-white px-6 py-2 rounded flex gap-2 items-center hover:bg-green-700">
                    <Save size={20}/>{t.save}
                  </button>
                  <button onClick={()=>{setEditM(null);setFormM({name:'',role:'',expertise:'',exp:'',contact:'',img:'👤'})}} className="bg-gray-300 px-6 py-2 rounded hover:bg-gray-400">
                    {t.cancel}
                  </button>
                </div>
              </div>
            }

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mentors.map(m=>
                <div key={m.id} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition">
                  {m.img.startsWith('data:image')?
                    <img src={m.img} alt={m.name} className="w-32 h-32 mx-auto mb-4 rounded-full object-cover"/>:
                    <div className="text-6xl text-center mb-4">{m.img}</div>
                  }
                  <h3 className="text-xl font-bold text-center mb-2">{m.name}</h3>
                  <p className="text-blue-600 text-center mb-4">{m.role}</p>
                  <div className="space-y-1 text-sm">
                    <p><b>{t.expertise}:</b> {m.expertise}</p>
                    <p><b>{t.experience}:</b> {m.exp} years</p>
                    <p><b>{t.contact}:</b> {m.contact}</p>
                  </div>
                  {admin&&
                    <div className="flex gap-2 mt-4">
                      <button onClick={()=>{setEditM(m);setFormM(m)}} className="flex-1 bg-blue-100 text-blue-700 px-3 py-2 rounded hover:bg-blue-200 flex gap-1 items-center justify-center">
                        <Edit2 size={16}/>{t.edit}
                      </button>
                      <button onClick={()=>delM(m.id)} className="flex-1 bg-red-100 text-red-700 px-3 py-2 rounded hover:bg-red-200 flex gap-1 items-center justify-center">
                        <Trash2 size={16}/>{t.delete}
                      </button>
                    </div>
                  }
                </div>
              )}
            </div>
          </div>
        }

        {tab==='calendar'&&
          <div>
            <div className="flex justify-between mb-6">
              <h2 className="text-3xl font-bold">{t.events}</h2>
              {admin&&!editE&&
                <button onClick={()=>setEditE({id:'new'})} className="bg-blue-600 text-white px-4 py-2 rounded flex gap-2 items-center hover:bg-blue-700">
                  <Plus size={20}/>{t.addEvent}
                </button>
              }
            </div>

            {admin&&editE&&
              <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
                <h3 className="text-xl font-bold mb-4">{editE.id==='new'?t.addEvent:t.edit}</h3>
                <div className="space-y-4">
                  <input 
                    placeholder={t.title} 
                    value={formE.title} 
                    onChange={e=>setFormE({...formE,title:e.target.value})} 
                    className="w-full px-4 py-2 border rounded"
                  />
                  <input 
                    type="date" 
                    value={formE.date} 
                    onChange={e=>setFormE({...formE,date:e.target.value})} 
                    className="w-full px-4 py-2 border rounded"
                  />
                  <select value={formE.type} onChange={e=>setFormE({...formE,type:e.target.value})} className="w-full px-4 py-2 border rounded">
                    <option value="tournament">{t.tournament}</option>
                    <option value="deadline">{t.deadline}</option>
                    <option value="meeting">{t.meeting}</option>
                    <option value="workshop">{t.workshop}</option>
                  </select>
                  <textarea 
                    placeholder={t.description} 
                    value={formE.desc} 
                    onChange={e=>setFormE({...formE,desc:e.target.value})} 
                    className="w-full px-4 py-2 border rounded" 
                    rows="3"
                  />
                </div>
                <div className="flex gap-2 mt-4">
                  <button onClick={editE.id==='new'?addE:updE} className="bg-green-600 text-white px-6 py-2 rounded flex gap-2 items-center hover:bg-green-700">
                    <Save size={20}/>{t.save}
                  </button>
                  <button onClick={()=>{setEditE(null);setFormE({title:'',date:'',type:'tournament',desc:''})}} className="bg-gray-300 px-6 py-2 rounded hover:bg-gray-400">
                    {t.cancel}
                  </button>
                </div>
              </div>
            }

            <div className="space-y-4">
              {events.sort((a,b)=>new Date(a.date)-new Date(b.date)).map(e=>
                <div key={e.id} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex gap-3 mb-2 flex-wrap">
                        <span className={`px-3 py-1 rounded-full text-white text-sm ${colors[e.type]}`}>
                          {t[e.type]}
                        </span>
                        <span className="text-gray-600">{new Date(e.date).toLocaleDateString()}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2">{e.title}</h3>
                      <p className="text-gray-700">{e.desc}</p>
                    </div>
                    {admin&&
                      <div className="flex gap-2">
                        <button onClick={()=>{setEditE(e);setFormE(e)}} className="bg-blue-100 text-blue-700 p-2 rounded hover:bg-blue-200">
                          <Edit2 size={16}/>
                        </button>
                        <button onClick={()=>delE(e.id)} className="bg-red-100 text-red-700 p-2 rounded hover:bg-red-200">
                          <Trash2 size={16}/>
                        </button>
                      </div>
                    }
                  </div>
                </div>
              )}
            </div>
          </div>
        }

        {tab==='bot'&&
          <div className="max-w-3xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-xl text-center">
              <MessageCircle size={64} className="mx-auto mb-6 text-blue-600"/>
              <h2 className="text-3xl font-bold mb-4">{t.telegramBot}</h2>
              <p className="text-lg text-gray-700 mb-4">{t.botDesc}</p>
              <p className="text-sm text-gray-600 mb-6">Made by Queue.Team #24443 🇰🇿</p>
              <a 
                href="https://t.me/FTCInsightBot" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-bold hover:bg-blue-700 transition"
              >
                {t.tryBot}
              </a>
              <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="p-3 bg-blue-50 rounded">
                  <p className="font-bold">English</p>
                  <p>🇺🇸</p>
                </div>
                <div className="p-3 bg-blue-50 rounded">
                  <p className="font-bold">Русский</p>
                  <p>🇷🇺</p>
                </div>
                <div className="p-3 bg-blue-50 rounded">
                  <p className="font-bold">Қазақша</p>
                  <p>🇰🇿</p>
                </div>
                <div className="p-3 bg-blue-50 rounded">
                  <p className="font-bold">+4 more</p>
                  <p>🌍</p>
                </div>
              </div>
            </div>
          </div>
        }

        {tab==='admin'&&admin&&
          <div className="bg-white p-8 rounded-2xl shadow-xl">
            <h2 className="text-3xl font-bold mb-6">Admin Panel</h2>
            <div className="space-y-4">
              <p className="text-lg">✅ Logged in as Admin</p>
              <p className="text-gray-600">You can now edit mentors and events using the buttons on their respective pages.</p>
              <div className="mt-6 p-4 bg-blue-50 rounded">
                <p className="font-bold mb-2">Quick Stats:</p>
                <p>• Total Mentors: {mentors.length}</p>
                <p>• Total Events: {events.length}</p>
              </div>
            </div>
          </div>
        }
      </main>
    </div>
  );
}