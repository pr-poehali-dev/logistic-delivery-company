import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface CalculationResult {
  price: number;
  time: string;
  service: string;
  route: string;
}

const DeliveryCalculator = () => {
  const [fromRegion, setFromRegion] = useState('');
  const [toRegion, setToRegion] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [weight, setWeight] = useState('');
  const [volume, setVolume] = useState('');
  const [cargoType, setCargoType] = useState('');
  const [result, setResult] = useState<CalculationResult | null>(null);

  const regions = [
    { value: 'moscow', label: 'Москва' },
    { value: 'spb', label: 'Санкт-Петербург' },
    { value: 'ekb', label: 'Екатеринburg' },
    { value: 'nsk', label: 'Новосибирск' },
    { value: 'kzn', label: 'Казань' },
    { value: 'nn', label: 'Нижний Новгород' },
    { value: 'samara', label: 'Самара' },
    { value: 'rostov', label: 'Ростов-на-Дону' },
    { value: 'krasnodar', label: 'Краснодар' },
    { value: 'voronezh', label: 'Воронеж' }
  ];

  const internationalRegions = [
    { value: 'kazakhstan', label: 'Казахстан (Алматы)' },
    { value: 'belarus', label: 'Беларусь (Минск)' },
    { value: 'uzbekistan', label: 'Узбекистан (Ташкент)' },
    { value: 'china-guangzhou', label: 'Китай (Гуанчжоу)' },
    { value: 'china-beijing', label: 'Китай (Пекин)' },
    { value: 'china-shanghai', label: 'Китай (Шанхай)' },
    { value: 'china-yiwu', label: 'Китай (Иу)' }
  ];

  const services = [
    {
      category: 'Автомобильные перевозки',
      options: [
        { value: 'auto-standard', label: 'Стандарт (до 20т)', baseRate: 25 },
        { value: 'auto-express', label: 'Экспресс (до 10т)', baseRate: 45 },
        { value: 'auto-premium', label: 'Премиум (до 5т)', baseRate: 65 }
      ]
    },
    {
      category: 'Железнодорожные перевозки',
      options: [
        { value: 'rail-container', label: 'Контейнерные', baseRate: 15 },
        { value: 'rail-wagon', label: 'Полувагоны', baseRate: 12 },
        { value: 'rail-covered', label: 'Крытые вагоны', baseRate: 18 }
      ]
    },
    {
      category: 'Авиаперевозки',
      options: [
        { value: 'air-standard', label: 'Стандарт', baseRate: 150 },
        { value: 'air-express', label: 'Экспресс', baseRate: 200 },
        { value: 'air-premium', label: 'Премиум', baseRate: 280 }
      ]
    },
    {
      category: 'Морские перевозки',
      options: [
        { value: 'sea-lcl', label: 'LCL (сборный груз)', baseRate: 0.8 },
        { value: 'sea-fcl', label: 'FCL (контейнер)', baseRate: 1.2 }
      ]
    }
  ];

  const cargoTypes = [
    { value: 'general', label: 'Генеральные грузы', coefficient: 1.0 },
    { value: 'fragile', label: 'Хрупкие грузы', coefficient: 1.3 },
    { value: 'hazardous', label: 'Опасные грузы', coefficient: 1.8 },
    { value: 'oversized', label: 'Негабаритные грузы', coefficient: 1.5 },
    { value: 'perishable', label: 'Скоропортящиеся', coefficient: 1.4 },
    { value: 'valuable', label: 'Ценные грузы', coefficient: 1.6 }
  ];

  const getDistance = (from: string, to: string): number => {
    const distances: Record<string, Record<string, number>> = {
      'moscow': {
        'spb': 635, 'ekb': 1416, 'nsk': 3354, 'kzn': 719, 'nn': 400,
        'kazakhstan': 1777, 'belarus': 700, 'uzbekistan': 2863,
        'china-guangzhou': 7500, 'china-beijing': 5800, 'china-shanghai': 6300
      },
      'spb': {
        'moscow': 635, 'ekb': 1766, 'nsk': 3634, 'kzn': 1145, 'nn': 1000,
        'kazakhstan': 2412, 'belarus': 470, 'uzbekistan': 3498
      },
      'china-guangzhou': {
        'moscow': 7500, 'spb': 8000, 'ekb': 6200, 'nsk': 4800
      }
    };

    return distances[from]?.[to] || distances[to]?.[from] || 1000;
  };

  const getDeliveryTime = (serviceValue: string, distance: number): string => {
    const isInternational = ['kazakhstan', 'belarus', 'uzbekistan'].some(country => 
      [fromRegion, toRegion].includes(country)
    );
    const isChina = ['china-guangzhou', 'china-beijing', 'china-shanghai', 'china-yiwu'].some(city => 
      [fromRegion, toRegion].includes(city)
    );

    if (isChina) {
      if (serviceValue.includes('air')) return '3-7 дней';
      if (serviceValue.includes('rail')) return '15-25 дней';
      if (serviceValue.includes('sea')) return '25-35 дней';
      return '12-20 дней';
    }

    if (isInternational) {
      if (serviceValue.includes('express') || serviceValue.includes('premium')) return '2-5 дней';
      return '3-8 дней';
    }

    if (serviceValue.includes('air')) return distance > 3000 ? '1-2 дня' : '1 день';
    if (serviceValue.includes('express')) return distance > 2000 ? '2-3 дня' : '1-2 дня';
    if (serviceValue.includes('premium')) return '1 день';
    if (serviceValue.includes('rail')) return distance > 2000 ? '5-10 дней' : '3-7 дней';
    
    return distance > 2000 ? '3-7 дней' : '1-5 дней';
  };

  const calculatePrice = () => {
    if (!fromRegion || !toRegion || !serviceType || !weight) {
      return;
    }

    const weightNum = parseFloat(weight);
    const volumeNum = parseFloat(volume) || 0;
    const distance = getDistance(fromRegion, toRegion);

    // Найдем выбранную услугу
    const selectedService = services
      .flatMap(cat => cat.options)
      .find(opt => opt.value === serviceType);

    if (!selectedService) return;

    let basePrice = 0;
    const cargoCoeff = cargoTypes.find(type => type.value === cargoType)?.coefficient || 1.0;

    // Логика расчета в зависимости от типа услуги
    if (serviceType.includes('air')) {
      // Авиаперевозки - цена за кг
      basePrice = weightNum * selectedService.baseRate * cargoCoeff;
    } else if (serviceType.includes('sea')) {
      // Морские перевозки - цена за кг для международных
      basePrice = weightNum * selectedService.baseRate * cargoCoeff;
    } else if (serviceType.includes('rail')) {
      // ЖД перевозки - базовая ставка + за км
      basePrice = (500 + distance * selectedService.baseRate + weightNum * 30) * cargoCoeff;
    } else {
      // Автомобильные перевозки - базовая ставка + за км + за кг
      basePrice = (500 + distance * selectedService.baseRate + weightNum * 50) * cargoCoeff;
    }

    // Дополнительные коэффициенты
    const isInternational = ['kazakhstan', 'belarus', 'uzbekistan'].some(country => 
      [fromRegion, toRegion].includes(country)
    );
    const isChina = ['china-guangzhou', 'china-beijing', 'china-shanghai', 'china-yiwu'].some(city => 
      [fromRegion, toRegion].includes(city)
    );

    if (isInternational) basePrice *= 1.4;
    if (isChina) basePrice *= 2.1;

    // Объемный вес (если указан объем)
    if (volumeNum > 0) {
      const volumeWeight = volumeNum / 6; // 1 м³ = ~167 кг для авиа
      if (volumeWeight > weightNum) {
        basePrice = basePrice * (volumeWeight / weightNum);
      }
    }

    const fromLabel = [...regions, ...internationalRegions].find(r => r.value === fromRegion)?.label || fromRegion;
    const toLabel = [...regions, ...internationalRegions].find(r => r.value === toRegion)?.label || toRegion;

    setResult({
      price: Math.round(basePrice),
      time: getDeliveryTime(serviceType, distance),
      service: selectedService.label,
      route: `${fromLabel} → ${toLabel}`
    });
  };

  const reset = () => {
    setFromRegion('');
    setToRegion('');
    setServiceType('');
    setWeight('');
    setVolume('');
    setCargoType('');
    setResult(null);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl flex items-center justify-center">
          <Icon name="Calculator" size={28} className="mr-3 text-blue-600" />
          Калькулятор стоимости доставки
        </CardTitle>
        <CardDescription>
          Рассчитайте предварительную стоимость доставки груза
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Маршрут */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="from">Откуда</Label>
            <Select value={fromRegion} onValueChange={setFromRegion}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите город отправления" />
              </SelectTrigger>
              <SelectContent>
                <div className="px-2 py-1 text-sm font-semibold text-slate-600">Россия</div>
                {regions.map(region => (
                  <SelectItem key={region.value} value={region.value}>
                    {region.label}
                  </SelectItem>
                ))}
                <Separator className="my-2" />
                <div className="px-2 py-1 text-sm font-semibold text-slate-600">СНГ и Китай</div>
                {internationalRegions.map(region => (
                  <SelectItem key={region.value} value={region.value}>
                    {region.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="to">Куда</Label>
            <Select value={toRegion} onValueChange={setToRegion}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите город назначения" />
              </SelectTrigger>
              <SelectContent>
                <div className="px-2 py-1 text-sm font-semibold text-slate-600">Россия</div>
                {regions.map(region => (
                  <SelectItem key={region.value} value={region.value}>
                    {region.label}
                  </SelectItem>
                ))}
                <Separator className="my-2" />
                <div className="px-2 py-1 text-sm font-semibold text-slate-600">СНГ и Китай</div>
                {internationalRegions.map(region => (
                  <SelectItem key={region.value} value={region.value}>
                    {region.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Вид доставки */}
        <div>
          <Label>Вид доставки</Label>
          <Select value={serviceType} onValueChange={setServiceType}>
            <SelectTrigger>
              <SelectValue placeholder="Выберите способ доставки" />
            </SelectTrigger>
            <SelectContent>
              {services.map(category => (
                <div key={category.category}>
                  <div className="px-2 py-1 text-sm font-semibold text-slate-600">
                    {category.category}
                  </div>
                  {category.options.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                  <Separator className="my-2" />
                </div>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Характеристики груза */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            <Label htmlFor="volume">Объем груза (м³)</Label>
            <Input
              id="volume"
              type="number"
              placeholder="Опционально"
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
            />
          </div>

          <div>
            <Label>Тип груза</Label>
            <Select value={cargoType} onValueChange={setCargoType}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите тип" />
              </SelectTrigger>
              <SelectContent>
                {cargoTypes.map(type => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Кнопки */}
        <div className="flex gap-4">
          <Button 
            onClick={calculatePrice} 
            className="flex-1 bg-blue-600 hover:bg-blue-700" 
            size="lg"
          >
            <Icon name="Calculator" size={20} className="mr-2" />
            Рассчитать стоимость
          </Button>
          <Button onClick={reset} variant="outline" size="lg">
            <Icon name="RotateCcw" size={20} className="mr-2" />
            Сбросить
          </Button>
        </div>

        {/* Результат */}
        {result && (
          <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-green-700 flex items-center">
                <Icon name="CheckCircle" size={24} className="mr-2" />
                Результат расчета
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Маршрут:</span>
                    <span className="font-medium">{result.route}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Способ доставки:</span>
                    <span className="font-medium">{result.service}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Срок доставки:</span>
                    <Badge variant="outline" className="text-blue-600 border-blue-600">
                      {result.time}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Стоимость:</span>
                    <Badge className="bg-green-600 text-white text-lg px-3 py-1">
                      {result.price.toLocaleString()} ₽
                    </Badge>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="text-center space-y-3">
                <p className="text-sm text-slate-600">
                  * Указана предварительная стоимость. Точная цена рассчитывается индивидуально.
                </p>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Icon name="Send" size={16} className="mr-2" />
                  Оформить заявку на доставку
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
};

export default DeliveryCalculator;