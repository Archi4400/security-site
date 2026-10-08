import { BRAND, HOST, LEGAL_EMAIL } from '../../brand';

export const legalEs = {
  privacy: {
    title: 'Política de privacidad',
    lede: `Cómo trata los datos personales el sitio web de ${BRAND} en ${HOST}. El producto ${BRAND} tiene sus propias condiciones de tratamiento de datos, acordadas con cada cliente.`,
    sections: [
      {
        title: 'Responsable',
        body: [
          `Este sitio web lo gestiona ${BRAND}. Para cualquier cuestión sobre sus datos personales, escriba a ${LEGAL_EMAIL}.`,
        ],
      },
      {
        title: 'Qué datos recogemos',
        body: [
          'Cuando envía el formulario de contacto: su nombre, su correo de trabajo, la empresa, el asunto elegido y su mensaje.',
          'Cuando navega: los datos técnicos que recibe cualquier servidor web (su dirección IP, el tipo de navegador y las páginas solicitadas), que se guardan en los registros del servidor.',
          'No usamos rastreadores publicitarios, ni compramos ni vendemos datos personales.',
        ],
      },
      {
        title: 'Para qué los usamos',
        body: [
          'Para responder a su solicitud y, si pidió acceso, para gestionarlo. La base legal es su consentimiento y nuestro interés legítimo en responder a quien nos escribe.',
          'Los registros del servidor se usan para mantener el sitio en funcionamiento y protegido.',
        ],
      },
      {
        title: 'Cuánto tiempo los guardamos',
        body: [
          'Los mensajes del formulario de contacto se guardan mientras dura la conversación y hasta 24 meses después de que termine. Los registros del servidor se guardan hasta 30 días.',
        ],
      },
      {
        title: 'Qué se queda en su navegador',
        body: [
          'El sitio recuerda su idioma y su tema en el almacenamiento local del navegador. No se guarda nada más ni se nos envía nada desde ahí. La política de cookies lo explica en detalle.',
        ],
      },
      {
        title: 'Quién más los ve',
        body: [
          'Nuestro proveedor de alojamiento trata los registros del servidor por cuenta nuestra. Las fuentes se cargan desde Google Fonts, que recibe su dirección IP al cargar la página. No compartimos sus datos con nadie más, salvo que la ley lo exija.',
        ],
      },
      {
        title: 'Sus derechos',
        body: [
          `Puede pedir acceder a sus datos, rectificarlos o suprimirlos, limitar u oponerse a su uso y llevárselos. Escriba a ${LEGAL_EMAIL}; respondemos en un plazo de 30 días. También puede reclamar ante su autoridad de protección de datos.`,
        ],
      },
      {
        title: 'Cambios',
        body: [
          'Cuando esta política cambie, la fecha de arriba cambiará con ella.',
        ],
      },
    ],
  },
  terms: {
    title: 'Condiciones de uso',
    lede: `Las condiciones para usar el sitio web de ${BRAND}. El uso del producto ${BRAND} se rige por un acuerdo independiente con cada cliente.`,
    sections: [
      {
        title: 'Aceptación',
        body: [
          'Al usar este sitio web acepta estas condiciones. Si no las acepta, le rogamos que no lo utilice.',
        ],
      },
      {
        title: 'Qué es el sitio',
        body: [
          `El sitio describe el producto ${BRAND} y permite contactar con el equipo. Las cifras que contiene proceden de nuestro banco de pruebas y describen el producto tal como es hoy; no garantizan resultados en su entorno.`,
        ],
      },
      {
        title: 'Propiedad intelectual',
        body: [
          `Los textos, el diseño, el logotipo y el código de este sitio pertenecen a ${BRAND}. Puede citarlo y enlazarlo; el kit de prensa puede usarse para escribir sobre ${BRAND}. Cualquier otro uso requiere nuestro permiso por escrito.`,
        ],
      },
      {
        title: 'Uso aceptable',
        body: [
          'No intente romper, sobrecargar o escanear el sitio, acceder a partes no destinadas al público ni usarlo para enviar mensajes no solicitados.',
        ],
      },
      {
        title: 'Enlaces a otros sitios',
        body: [
          'Los enlaces a otros sitios se ofrecen por comodidad; no respondemos de su contenido.',
        ],
      },
      {
        title: 'Responsabilidad',
        body: [
          'El sitio se ofrece tal cual. En la medida en que la ley lo permita, no respondemos de las pérdidas derivadas de su uso o de los periodos en que no esté disponible.',
        ],
      },
      {
        title: 'Cambios y contacto',
        body: [
          `Podemos modificar estas condiciones; la fecha de arriba indica la versión vigente. Consultas: ${LEGAL_EMAIL}.`,
        ],
      },
    ],
  },
  cookies: {
    title: 'Política de cookies',
    lede: `Qué guarda el sitio web de ${BRAND} en su navegador y por qué.`,
    sections: [
      {
        title: 'Sin cookies de seguimiento',
        body: [
          'El sitio no instala cookies publicitarias ni analíticas, y no muestra aviso de cookies porque no hay nada que consentir.',
        ],
      },
      {
        title: 'Qué se guarda',
        body: [
          'Dos valores en el almacenamiento local de su navegador: el idioma elegido y el tema, claro u oscuro. Se quedan en su navegador y no se nos envían.',
        ],
      },
      {
        title: 'Terceros',
        body: [
          'Las fuentes se cargan desde Google Fonts. Google recibe su dirección IP al cargar la página y puede aplicar sus propias políticas.',
        ],
      },
      {
        title: 'Cómo borrarlo',
        body: [
          'Borre los datos del sitio para esta dirección en los ajustes de su navegador. El sitio se abrirá entonces con el idioma y el tema predeterminados.',
        ],
      },
    ],
  },
};
