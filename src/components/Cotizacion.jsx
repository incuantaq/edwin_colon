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
const ankerCapacity = {
  big: 3840,
  medium: 2560
}

const Cotizacion = () => {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [data, setData] = useState({});
  const [applianceList, setApplianceList] = useState([]);


  const calcPlatesNumber = (average_payment) => {
    const average_use = average_payment / currentKvH;
    const average_use_year = (average_use * 13) / 1533;
    const plates_number = average_use_year * 2.44;
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

    console.log(totalPower);
    const bigAnker = ankerCapacity.big / (totalPower);
    const mediumAnker = ankerCapacity.medium / (totalPower);

    return {bigAnker, mediumAnker}
  }

  return (
    <>
      <div>
        <div id="pick-prod" className='flex flex-wrap gap-3'>
          <h3 className='w-full'>¿En qué producto estás interesado?</h3>
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => handleProductSelection(product.id)}
              className={`product-picker w-min px-5 py-6 rounded-md border bg-white border-gray-300 flex items-center justify-center ${
                selectedProduct === product.id ? 'selected' : ''
              }`}
            >
              <h2>{product.title}</h2>
            </div>
          ))}
        </div>
      </div>
      <div>
        {selectedProduct === 'Placas Solares' && (
          <div id="placas">
            <input type="text" id="average-payment" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-3" placeholder="Pago mensual promedio" value={data['average-payment']} onChange={handleFormData}/>
            <div id="">
              {data['average-payment'] && calcPlatesNumber(data['average-payment'])}
            </div>
          </div>
        )}
        {selectedProduct === 'Baterias Anker' && (
          <div id="anker">
            <p>¿Qué electrodomésticos quieres conectar?</p>
            <div className='flex flex-wrap gap-4'>
              {appliances.map((app) => (
                <div key={app.name} className={`border-2 py-2 px-4 rounded-lg ${applianceList.includes(app) && 'text-[#1538a9] border-[#1538a9] bg-sky-100'}`} onClick={() => handleApplianceList(app)}>
                  <p htmlFor={app.name}>{app.name}</p>
                </div>
              ))}
            </div>
            <div className='flex flex-wrap gap-4'>
              <p>Grande <span>{calculateAnker().bigAnker} h</span></p>
              <p>Mediana <span>{calculateAnker().mediumAnker} h</span></p>
            </div>
          </div>
        )}
        {selectedProduct === 'Roofing' && (
          <div id="roofing">
            <p>¿Cuál es el área de tu techo? (sqrft)</p>
            <input type="text" id="roof-area" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-3" placeholder="Area de tu techo" onChange={handleFormData}/>
          </div>
        )}
      </div>
    </>
  )
}

export default Cotizacion