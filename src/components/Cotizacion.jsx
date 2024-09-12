import { useState } from 'react'

const products = [
  { id: 'Placas Solares', title: 'Placas Solares' },
  { id: 'Baterias Anker', title: 'Baterias Anker' },
  { id: 'Roofing', title: 'Roofing' }
]
const currentKvH = 0.23;
const appliances = [
  {name: 'Microondas', power: 700},
  {name: 'Plancha Eléctrica', power: 1500},
  {name: 'Air Fryer', power: 1000},
  {name: 'Nevera', power: 360},
  {name: 'Tostadora', power: 1500},
  {name: 'Abanico', power: 35},
  {name: 'TV', power: 105},
  {name: 'Bombilla', power: 14},
  {name: 'Luz de escritorio', power: 12},
  {name: 'Router WIFI', power: 54},
  {name: 'Celular', power: 11},
  {name: 'Portátil', power: 60},
]

const ankerMediumConstrain = 2400;

const Cotizacion = () => {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [data, setData] = useState({});
  const [applianceList, setApplianceList] = useState([]);


  const calcPlatesNumber = (average_payment) => {
    const average_use = average_payment / currentKvH;
    const average_use_year = (average_use * 13) / 1533;
    const plates_number = average_use_year * 2.44;
    
    if (isNaN(plates_number)) return 0;
    return Math.ceil(plates_number);
  }

  const handleProductSelection = (product) => {
    setSelectedProduct(product)
    setData({});
  }

  const handleFormData = (e) => {
    setData({
      ...data,
      [e.target.id]: e.target.value
    })
  }

  const handleApplianceList = (app) => {
    if (applianceList.includes(app)) {
      setApplianceList(applianceList.filter((item) => item !== app))
    }
    else {
      setApplianceList([...applianceList, app])
    }
  }

  const calculateAnker = () => {
    let totalPower = 0;
    applianceList.forEach((app) => {
      totalPower += app.power;
    });
    return totalPower
  }

  return (
    <div class="w-full md:w-1/2">
      <div id="pick-prod" className='flex flex-wrap gap-3 mt-4 md:mt-0'>
        <h3 className='w-full'>¿En qué producto estás interesado?</h3>
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => handleProductSelection(product.id)}
            className={`w-[calc(33% - 8px)] product-picker w-min px-5 py-6 rounded-md border bg-white border-gray-300 flex items-center justify-center ${
              selectedProduct === product.id ? 'selected' : ''
            }`}
          >
            <h2>{product.title}</h2>
          </div>
        ))}
      </div>
      <div>
        {selectedProduct === 'Placas Solares' && (
          <div id="placas" className='pt-4'>
            <p className='pb-2'>pago mensual promedio a LUMA</p>
            <input type="tel" id="average-payment" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-3" placeholder="pago mensual promedio a LUMA" value={data['average-payment']} onChange={handleFormData}/>
            <div className='flex flex-wrap justify-center'>
              <p className='w-8/12'>El <strong>estimado</strong> de placas necesario para tu hogar es:</p>
              <div className='relative'>
              {data['average-payment'] && (
                  <p className='absolute top-14 text-3xl left-1/2 -translate-x-1/2 font-bold'>{calcPlatesNumber(data['average-payment'])}</p>
                )}
                <img src="/images/solar_panels.webp" alt="Placas Solares" className='w-64'/>
              </div>
            </div>
          </div>
        )}
        {selectedProduct === 'Baterias Anker' && (
          <div id="anker" className='pt-4'>
            <p>¿Qué electrodomésticos quieres conectar?</p>
            <div className='flex flex-wrap gap-4 pt-4'>
              {appliances.map((app) => (
                <div key={app.name} className={`border-2 py-2 px-4 rounded-lg ${applianceList.includes(app) && 'text-[#1538a9] border-[#1538a9] bg-sky-100'}`} onClick={() => handleApplianceList(app)}>
                  <p htmlFor={app.name}>{app.name}</p>
                </div>
              ))}
            </div>
            <div className='flex flex-wrap gap-4'>
              { applianceList.length > 0 && (
                <>
                  <h5 className='w-full font-bold text-2xl text-center mt-4'>Esta batería se adapta a tus necesidades!</h5>
                  <div className='flex gap-4 justify-center'>
                    <div className='w-1/2 text-center'>
                      <p className='font-bold'>SOLIX F3800</p>
                      <img src="/images/anker_big.webp" alt="SOLIX F3800" className='w-2/3 inline-block'/>
                    </div>
                    {calculateAnker() < ankerMediumConstrain && (
                      <div className='w-1/2 text-center'>
                        <p className='font-bold'>SOLIX F2600</p>
                        <img src="/images/anker_medium.webp" alt="SOLIX F3800" className='w-2/3 inline-block'/>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
        {selectedProduct === 'Roofing' && (
          <div className='pt-4' id="roofing">
            <p className='pb-2'>¿Cuál es el área de tu techo? (Pies cuadrados)</p>
            <input type="tel" id="roof-area" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-3" placeholder="Area de tu techo" onChange={handleFormData}/>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cotizacion