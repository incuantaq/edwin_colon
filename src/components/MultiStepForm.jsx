import { useState } from 'react';
import { NeonGradientCard } from '@/components/ui/neon-gradient-card';

const products = [
  { id: 'Placas Solares', title: 'Placas Solares' },
  { id: 'Baterias Anker', title: 'Baterias Anker' },
  { id: 'Roofing', title: 'Roofing' }
];

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
];

const roofingCat = [
  {
    name: 'Silver',
    firstColor: '#C0C0C0',
    secondColor: '#808080'
  },
  {
    name: 'Gold',
    firstColor: '#FFD700',
    secondColor: '#DAA520'
  },
  {
    name: 'Platinum',
    firstColor: '#559190',
    secondColor: '#6abac3'
  },
];

const ankerMediumConstrain = 2400;

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    selectedProduct: '',
    fullName: '',
    email: '',
    phone: '',
    address: '',
    averagePayment: '',
    roofArea: '',
    selectedAppliances: []
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showRoofBundles, setShowRoofBundles] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleProductSelection = (productId) => {
    setFormData(prev => ({ ...prev, selectedProduct: productId }));
  };

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  const handleApplianceSelection = (appliance) => {
    setFormData(prev => {
      const newAppliances = prev.selectedAppliances.includes(appliance)
        ? prev.selectedAppliances.filter(app => app !== appliance)
        : [...prev.selectedAppliances, appliance];
      return { ...prev, selectedAppliances: newAppliances };
    });
  };

  const calcPlatesNumber = (averagePayment) => {
    const average_use = averagePayment / currentKvH;
    const average_use_year = (average_use * 13) / 1533;
    const plates_number = average_use_year * 2.44;
    return isNaN(plates_number) ? 0 : Math.ceil(plates_number);
  };

  const calculateAnkerPower = () => {
    return formData.selectedAppliances.reduce((total, app) => total + app.power, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (step === 1 && !formData.selectedProduct) {
      alert('Por favor seleccione un producto');
      return;
    }

    if (step === 2) {
      if (!formData.fullName || !formData.email || !formData.phone || !formData.address) {
        alert('Por favor complete todos los campos');
        return;
      }
      if (!validateEmail(formData.email)) {
        alert('Por favor ingrese un email válido');
        return;
      }

      // Fill Zoho form
      const zohoForm = document.getElementById('webform6541791000000514010');
      if (!zohoForm) {
        console.error('Zoho form not found');
        return;
      }

      // Split full name into first and last name
      const nameParts = formData.fullName.split(' ');
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(' ') || firstName;

      // Fill hidden Zoho form fields
      zohoForm.querySelector('#First_Name').value = firstName;
      zohoForm.querySelector('#Last_Name').value = lastName;
      zohoForm.querySelector('#Email').value = formData.email;
      zohoForm.querySelector('#Phone').value = formData.phone;
      zohoForm.querySelector('#Street').value = formData.address;

      // Set description with product specific details
      let description = `Producto de interés: ${formData.selectedProduct}\n`;
      if (formData.selectedProduct === 'Placas Solares') {
        description += `Pago mensual promedio: ${formData.averagePayment}`;
      } else if (formData.selectedProduct === 'Baterias Anker') {
        description += `Electrodomésticos seleccionados: ${formData.selectedAppliances.map(app => app.name).join(', ')}`;
      } else if (formData.selectedProduct === 'Roofing') {
        description += `Área del techo: ${formData.roofArea} pies cuadrados`;
      }
      zohoForm.querySelector('#Description').value = description;

      function validateEmail6541791000000514010() {
        var form = document.forms['WebToLeads6541791000000514010'];
        var emailFld = form.querySelectorAll('[ftype=email]');
        for (var i = 0; i < emailFld.length; i++) {
          var emailVal = emailFld[i].value;
          if((emailVal.replace(/^\s+|\s+$/g, '')).length!=0) {
            var atpos=emailVal.indexOf('@');
            var dotpos=emailVal.lastIndexOf('.');
            if (atpos<1 || dotpos<atpos+2 || dotpos+2>=emailVal.length) {
              alert('Introduzca una dirección de correo electrónico válida');
              emailFld[i].focus();
              return false;
            }
          }
        }
        return true;
      }
    
      function checkMandatory6541791000000514010() {
        var mndFileds = new Array('Last Name');
        var fldLangVal = new Array('Apellidos');
        for(var i=0;i<mndFileds.length;i++) {
          var fieldObj=document.forms['WebToLeads6541791000000514010'][mndFileds[i]];
          if(fieldObj) {
            if (((fieldObj.value).replace(/^\s+|\s+$/g, '')).length==0) {
              alert(fldLangVal[i] +' no puede estar vacío.');
              fieldObj.focus();
              return false;
            }
          }
        }
        return true;
      }

      // Submit form using Zoho's validation functions
      if (typeof validateEmail6541791000000514010 === 'function' && 
          typeof checkMandatory6541791000000514010 === 'function') {
        if (validateEmail6541791000000514010() && checkMandatory6541791000000514010()) {
          grecaptcha.ready(function(){
            grecaptcha.execute('6LckJ7EqAAAAABbUp2J5wMio3tRh-MBoepDYcwmo', {action: 'submit'})
              .then(function(token) {
                console.log(token);
                zohoForm.submit();
                setIsSubmitted(true);
                setStep(3);
              });
          });
          return;
        }
      } else {
        console.error('Zoho validation functions not found');
        return;
      }

      return;
    }

    setStep(prev => prev + 1);
  };

  const renderStep1 = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-white">Paso 1: Seleccione un producto</h2>
      <div className="flex flex-wrap gap-3">
        {products.map((product) => (
          <div
          key={product.id}
          onClick={() => handleProductSelection(product.id)}
          className={`w-full sm:w-[calc(33%-8px)] product-picker px-5 py-6 rounded-md border flex items-center justify-center cursor-pointer hover:border-blue-500 ${
            formData.selectedProduct === product.id ? 'border-blue-500 bg-blue-50' : 'bg-white border-gray-300'
          }`}
          >
            <h2>{product.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-white">Paso 2: Información de contacto</h2>
      <div className="space-y-3">
        <input
          type="text"
          id="fullName"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Nombre completo"
          value={formData.fullName}
          onChange={handleInputChange}
          required
        />
        <input
          type="email"
          id="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <input
          type="tel"
          id="phone"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Teléfono"
          value={formData.phone}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          id="address"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Dirección"
          value={formData.address}
          onChange={handleInputChange}
          required
        />
      </div>
    </div>
  );

  const renderStep3 = () => {
    if (!isSubmitted) return null;

    return (
      <div className="space-y-6">
        <h2 className="text-xl font-bold">Resultado de su cotización</h2>
        
        {formData.selectedProduct === 'Placas Solares' && (
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Placas Solares Necesarias</h3>
            <div className="flex flex-col items-center">
              <p className="text-3xl font-bold text-blue-600 mb-2">
                {calcPlatesNumber(formData.averagePayment)}
              </p>
              <p className="text-gray-600">placas solares recomendadas</p>
            </div>
          </div>
        )}

        {formData.selectedProduct === 'Baterias Anker' && (
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Batería Recomendada</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="text-center">
                <p className="font-bold mb-2">SOLIX F3800</p>
                <img src="/images/anker_big.webp" alt="SOLIX F3800" className="w-48 inline-block"/>
              </div>
              {calculateAnkerPower() < ankerMediumConstrain && (
                <div className="text-center">
                  <p className="font-bold mb-2">SOLIX F2600</p>
                  <img src="/images/anker_medium.webp" alt="SOLIX F2600" className="w-48 inline-block"/>
                </div>
              )}
            </div>
          </div>
        )}

        {formData.selectedProduct === 'Roofing' && (
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Paquetes Disponibles</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {roofingCat.map((cat) => (
                <NeonGradientCard 
                  key={cat.name} 
                  className="items-center justify-center text-center w-full sm:w-64 p-6"
                  neonColors={{firstColor: cat.firstColor, secondColor: cat.secondColor}}
                >
                  <span 
                    className="pointer-events-none z-10 whitespace-pre-wrap bg-clip-text text-center text-4xl font-bold leading-none tracking-tighter text-transparent"
                    style={{
                      backgroundImage: `linear-gradient(to bottom right, ${cat.firstColor} 35%, ${cat.secondColor})`,
                    }}
                  >
                    {cat.name}
                  </span>
                </NeonGradientCard>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderProductSpecificInputs = () => {
    if (step !== 2) return null;

    switch (formData.selectedProduct) {
      case 'Placas Solares':
        return (
          <input
            type="tel"
            id="averagePayment"
            className="mt-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Pago mensual promedio a LUMA"
            value={formData.averagePayment}
            onChange={handleInputChange}
          />
        );
      case 'Baterias Anker':
        return (
          <div className="mt-4 space-y-4">
            <p className="font-medium text-white">Seleccione los electrodomésticos que desea conectar:</p>
            <div className="flex flex-wrap gap-2">
              {appliances.map((app) => (
                <div
                  key={app.name}
                  onClick={() => handleApplianceSelection(app)}
                  className={`border-2 py-2 px-4 rounded-lg cursor-pointer text-white hover:border-blue-500 ${
                    formData.selectedAppliances.includes(app) ? 'text-black border-blue-500 bg-blue-50' : ''
                  }`}
                >
                  <p>{app.name}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 'Roofing':
        return (
          <input
            type="tel"
            id="roofArea"
            className="mt-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Área del techo en pies cuadrados"
            value={formData.roofArea}
            onChange={handleInputChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 space-y-6">
      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
      {renderProductSpecificInputs()}
      {step === 3 && renderStep3()}
      
      {step < 3 && (
        <div className="flex justify-between">
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep(prev => prev - 1)}
              className="bg-transparent text-white hover:underline decoration-transparent hover:decoration-red-500"
            >
              Volver
            </button>
          )}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ml-auto"
          >
            {step === 2 ? 'Enviar' : 'Siguiente'}
          </button>
        </div>
      )}
    </form>
  );
};

export default MultiStepForm;