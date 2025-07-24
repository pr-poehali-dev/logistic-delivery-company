import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [weight, setWeight] = useState('');
  const [distance, setDistance] = useState('');
  const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null);

  const calculatePrice = () => {
    const w = parseFloat(weight);
    const d = parseFloat(distance);
    if (w && d) {
      // Простая формула: базовая ставка + стоимость за кг + стоимость за км
      const baseRate = 500;
      const perKg = 50;
      const perKm = 15;
      const total = baseRate + (w * perKg) + (d * perKm);
      setCalculatedPrice(total);
    }
  };

  const services = [
    {
      icon: 'Truck',
      title: 'Доставка по России',
      description: 'Быстрая и надежная доставка грузов по всей территории РФ'
    },
    {
      icon: 'Globe',
      title: 'Доставка из СНГ',
      description: 'Импорт товаров из стран Содружества Независимых Государств'
    },
    {
      icon: 'Package',
      title: 'Доставка из Китая',
      description: 'Прямые поставки товаров из Поднебесной с таможенным оформлением'
    },
    {
      icon: 'MapPin',
      title: 'Отслеживание грузов',
      description: 'Контроль местоположения и статуса доставки в режиме реального времени'
    }
  ];

  const tariffs = [
    {
      name: 'Стандарт',
      price: 'от 50₽/кг',
      features: ['Доставка до 7 дней', 'Страхование груза', 'SMS уведомления'],
      popular: false
    },
    {
      name: 'Экспресс',
      price: 'от 80₽/кг',
      features: ['Доставка до 3 дней', 'Приоритетная обработка', 'Персональный менеджер'],
      popular: true
    },
    {
      name: 'Премиум',
      price: 'от 120₽/кг',
      features: ['Доставка до 24 часов', 'Белые перчатки', 'Установка/сборка'],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Icon name="Truck" size={32} className="text-blue-600" />
              <span className="text-2xl font-bold text-slate-800">РусЛогистик</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="/services" className="text-slate-600 hover:text-blue-600 transition-colors">Услуги</a>
              <a href="#tariffs" className="text-slate-600 hover:text-blue-600 transition-colors">Тарифы</a>
              <a href="#tracking" className="text-slate-600 hover:text-blue-600 transition-colors">Отслеживание</a>
              <a href="#about" className="text-slate-600 hover:text-blue-600 transition-colors">О компании</a>
              <a href="#contacts" className="text-slate-600 hover:text-blue-600 transition-colors">Контакты</a>
            </nav>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Icon name="Phone" size={16} className="mr-2" />
              Связаться
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6 leading-tight">
                Надежная доставка грузов по России и СНГ
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Профессиональные логистические решения для вашего бизнеса. 
                Быстро, безопасно, с полным контролем.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100">
                  <Icon name="Calculator" size={20} className="mr-2" />
                  Рассчитать стоимость
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                  <Icon name="Search" size={20} className="mr-2" />
                  Отследить груз
                </Button>
              </div>
            </div>
            
            {/* Calculator */}
            <Card className="bg-white/95 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-slate-800 flex items-center">
                  <Icon name="Calculator" size={24} className="mr-2 text-blue-600" />
                  Калькулятор стоимости
                </CardTitle>
                <CardDescription>
                  Узнайте стоимость доставки вашего груза
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="weight">Вес груза (кг)</Label>
                  <Input
                    id="weight"
                    type="number"
                    placeholder="Введите вес"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="distance">Расстояние (км)</Label>
                  <Input
                    id="distance"
                    type="number"
                    placeholder="Введите расстояние"
                    value={distance}
                    onChange={(e) => setDistance(e.target.value)}
                  />
                </div>
                <Button onClick={calculatePrice} className="w-full bg-blue-600 hover:bg-blue-700">
                  Рассчитать
                </Button>
                {calculatedPrice && (
                  <div className="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-600">Ориентировочная стоимость:</p>
                    <p className="text-2xl font-bold text-green-700">{calculatedPrice.toLocaleString()}₽</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Наши услуги</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Полный спектр логистических услуг для развития вашего бизнеса
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow border-0 shadow-md">
                <CardHeader>
                  <div className="mx-auto mb-4 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <Icon name={service.icon} size={32} className="text-blue-600" />
                  </div>
                  <CardTitle className="text-xl text-slate-800">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tariffs */}
      <section id="tariffs" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Тарифы</h2>
            <p className="text-xl text-slate-600">
              Выберите подходящий тариф для ваших потребностей
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tariffs.map((tariff, index) => (
              <Card key={index} className={`relative ${tariff.popular ? 'border-blue-500 border-2 shadow-xl' : 'shadow-md'}`}>
                {tariff.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600">
                    Популярный
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-slate-800">{tariff.name}</CardTitle>
                  <CardDescription className="text-3xl font-bold text-blue-600 mt-2">
                    {tariff.price}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {tariff.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center">
                        <Icon name="Check" size={16} className="text-green-500 mr-2" />
                        <span className="text-slate-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full mt-6 ${tariff.popular ? 'bg-blue-600 hover:bg-blue-700' : 'bg-slate-600 hover:bg-slate-700'}`}>
                    Выбрать тариф
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tracking */}
      <section id="tracking" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">Отслеживание груза</h2>
          <p className="text-xl text-slate-600 mb-8">
            Введите номер накладной для отслеживания статуса доставки
          </p>
          
          <Card className="max-w-md mx-auto">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <Input placeholder="Номер накладной" className="text-center text-lg" />
                <Button className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
                  <Icon name="Search" size={20} className="mr-2" />
                  Отследить
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-slate-800 mb-6">О компании</h2>
              <p className="text-lg text-slate-600 mb-6">
                РусЛогистик — ведущая логистическая компания с 15-летним опытом работы 
                на рынке грузоперевозок. Мы специализируемся на доставке грузов по России, 
                из стран СНГ и Китая.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">15+</div>
                  <div className="text-slate-600">лет опыта</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">50K+</div>
                  <div className="text-slate-600">доставленных грузов</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">200+</div>
                  <div className="text-slate-600">партнеров</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">99%</div>
                  <div className="text-slate-600">довольных клиентов</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="/img/3550ee81-91ba-4028-886e-e58436c1398c.jpg" 
                alt="Логистика" 
                className="rounded-lg shadow-xl w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contacts */}
      <section id="contacts" className="py-20 bg-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Контакты</h2>
            <p className="text-xl text-slate-300">
              Свяжитесь с нами для получения консультации
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mx-auto mb-4 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                <Icon name="Phone" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Телефон</h3>
              <p className="text-slate-300">+7 (495) 123-45-67</p>
              <p className="text-slate-300">+7 (800) 555-00-99</p>
            </div>
            
            <div className="text-center">
              <div className="mx-auto mb-4 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                <Icon name="Mail" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Email</h3>
              <p className="text-slate-300">info@ruslogistic.ru</p>
              <p className="text-slate-300">orders@ruslogistic.ru</p>
            </div>
            
            <div className="text-center">
              <div className="mx-auto mb-4 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                <Icon name="MapPin" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Адрес</h3>
              <p className="text-slate-300">г. Москва, ул. Логистическая, 123</p>
              <p className="text-slate-300">БЦ "Грузовой", офис 456</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Icon name="Truck" size={24} className="text-blue-600" />
              <span className="text-xl font-bold text-white">РусЛогистик</span>
            </div>
            <p className="text-center text-sm">
              © 2024 РусЛогистик. Все права защищены.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;