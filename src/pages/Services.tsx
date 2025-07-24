import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

const Services = () => {
  const serviceCategories = [
    {
      title: 'Внутренние перевозки',
      description: 'Доставка грузов по территории Российской Федерации',
      icon: 'MapPin',
      color: 'bg-blue-100 text-blue-600',
      services: [
        {
          name: 'Автомобильные перевозки',
          description: 'Доставка различных грузов автотранспортом до 20 тонн',
          features: ['Габаритные грузы', 'Экспресс-доставка', 'Попутная загрузка'],
          price: 'от 25₽/км',
          time: '1-5 дней'
        },
        {
          name: 'Железнодорожные перевозки',
          description: 'Транспортировка крупных партий груза по ж/д',
          features: ['Контейнерные перевозки', 'Полувагоны', 'Крытые вагоны'],
          price: 'от 15₽/км',
          time: '3-10 дней'
        },
        {
          name: 'Авиаперевозки',
          description: 'Срочная доставка ценных и скоропортящихся грузов',
          features: ['Экспресс-доставка', 'Температурный режим', 'Ценные грузы'],
          price: 'от 150₽/кг',
          time: '1-2 дня'
        }
      ]
    },
    {
      title: 'Международные перевозки СНГ',
      description: 'Импорт и экспорт грузов из стран Содружества',
      icon: 'Globe',
      color: 'bg-green-100 text-green-600',
      services: [
        {
          name: 'Доставка из Казахстана',
          description: 'Импорт товаров и сырья из Республики Казахстан',
          features: ['Таможенное оформление', 'Сертификация', 'Складское хранение'],
          price: 'от 35₽/км',
          time: '2-7 дней'
        },
        {
          name: 'Доставка из Беларуси',
          description: 'Перевозки грузов из Республики Беларусь',
          features: ['Упрощенная таможня', 'Мультимодальные перевозки', 'Страхование'],
          price: 'от 30₽/км',
          time: '2-5 дней'
        },
        {
          name: 'Доставка из Узбекистана',
          description: 'Импорт сельхозпродукции и текстиля из Узбекистана',
          features: ['Рефрижераторы', 'Фитосанитарный контроль', 'Сертификация'],
          price: 'от 40₽/км',
          time: '3-8 дней'
        }
      ]
    },
    {
      title: 'Доставка из Китая',  
      description: 'Полный цикл доставки товаров из КНР',
      icon: 'Package',
      color: 'bg-orange-100 text-orange-600',
      services: [
        {
          name: 'Автомобильная доставка',
          description: 'Наземная доставка через пограничные переходы',
          features: ['Сборные грузы', 'Контейнерные перевозки', 'Таможенное оформление'],
          price: 'от 2$/кг',
          time: '12-20 дней'
        },
        {
          name: 'Железнодорожная доставка',
          description: 'Доставка по Транссибирской магистрали',
          features: ['Контейнеры 20/40 футов', 'Негабаритные грузы', 'Температурный режим'],
          price: 'от 1.5$/кг',
          time: '15-25 дней'
        },
        {
          name: 'Авиадоставка',
          description: 'Срочная доставка товаров из Китая авиатранспортом',
          features: ['Экспресс до 5 дней', 'Опасные грузы', 'Высокая ценность'],
          price: 'от 8$/кг',
          time: '3-7 дней'
        },
        {
          name: 'Морская доставка',
          description: 'Доставка крупных партий морским транспортом',
          features: ['LCL/FCL контейнеры', 'Сборные грузы', 'Проектные грузы'],
          price: 'от 0.8$/кг',
          time: '25-35 дней'
        }
      ]
    },
    {
      title: 'Дополнительные услуги',
      description: 'Комплексное логистическое обслуживание',
      icon: 'Settings',
      color: 'bg-purple-100 text-purple-600',
      services: [
        {
          name: 'Таможенное оформление',
          description: 'Полный цикл таможенных процедур и документооборота',
          features: ['Декларирование', 'Сертификация', 'Валютное законодательство'],
          price: 'от 5000₽',
          time: '1-3 дня'
        },
        {
          name: 'Складские услуги',
          description: 'Хранение, обработка и консолидация грузов',
          features: ['Температурные режимы', 'Комплектация', 'Кросс-докинг'],
          price: 'от 15₽/м³/день',
          time: 'По запросу'
        },
        {
          name: 'Страхование грузов',
          description: 'Защита от рисков повреждения и утраты грузов',
          features: ['Полное покрытие', 'Быстрые выплаты', 'Международное страхование'],
          price: 'от 0.1% стоимости',
          time: 'При оформлении'
        },
        {
          name: 'Упаковка и маркировка',
          description: 'Профессиональная подготовка грузов к транспортировке',
          features: ['Экспортная упаковка', 'Паллетирование', 'Специальная маркировка'],
          price: 'от 50₽/место',
          time: '1-2 дня'
        }
      ]
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
              <a href="/" className="text-slate-600 hover:text-blue-600 transition-colors">Главная</a>
              <a href="/services" className="text-blue-600 font-medium">Услуги</a>
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
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Наши услуги</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Полный спектр логистических решений для доставки грузов по России, 
            из стран СНГ и Китая с профессиональным сервисом
          </p>
        </div>
      </section>

      {/* Services Categories */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {serviceCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-20">
              {/* Category Header */}
              <div className="text-center mb-12">
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${category.color} mb-4`}>
                  <Icon name={category.icon} size={40} />
                </div>
                <h2 className="text-4xl font-bold text-slate-800 mb-4">{category.title}</h2>
                <p className="text-xl text-slate-600 max-w-3xl mx-auto">{category.description}</p>
              </div>

              {/* Services Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {category.services.map((service, serviceIndex) => (
                  <Card key={serviceIndex} className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-xl text-slate-800">{service.name}</CardTitle>
                      <CardDescription className="text-sm">{service.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 space-y-4">
                      {/* Features */}
                      <div>
                        <h4 className="font-semibold text-slate-700 mb-2">Особенности:</h4>
                        <div className="space-y-1">
                          {service.features.map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-center text-sm text-slate-600">
                              <Icon name="Check" size={14} className="text-green-500 mr-2 flex-shrink-0" />
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      {/* Price and Time */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-600">Стоимость:</span>
                          <Badge variant="secondary" className="bg-green-100 text-green-700">
                            {service.price}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-600">Срок доставки:</span>
                          <Badge variant="outline" className="text-blue-600 border-blue-600">
                            {service.time}
                          </Badge>
                        </div>
                      </div>

                      <Button className="w-full bg-blue-600 hover:bg-blue-700 mt-4">
                        Заказать услугу
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {categoryIndex < serviceCategories.length - 1 && (
                <Separator className="mt-16" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Не нашли нужную услугу?</h2>
          <p className="text-xl text-slate-300 mb-8">
            Мы предоставляем индивидуальные логистические решения под ваши потребности
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Icon name="Phone" size={20} className="mr-2" />
              Получить консультацию
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-slate-800">
              <Icon name="Calculator" size={20} className="mr-2" />
              Рассчитать стоимость
            </Button>
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

export default Services;