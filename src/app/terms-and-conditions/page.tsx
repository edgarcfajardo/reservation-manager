import React from 'react';

export default function TermsAndConditionsPage() {
  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-8 text-justify">
      {/* Título principal */}
      <section className="space-y-2 border-b pb-6">
        <h1 className="text-3xl font-bold text-center">
          TÉRMINOS Y CONDICIONES DE USO PARA USUARIOS ADMINISTRADORES
        </h1>
        <p className="text-gray-500 text-center">
          Última actualización: 9 de julio de 2025
        </p>
      </section>

      {/* Introducción */}
      <section className="space-y-4">
        <p>
          Estos Términos y Condiciones regulan el acceso y uso del sistema de gestión de citas en línea disponible en{' '}
          <span className="font-semibold">[DOMINIO]</span>, por parte de usuarios administradores que representan a un negocio o empresa (en adelante, &quot;el Usuario&quot; o &quot;el Administrador&quot;).
        </p>
        <p className="font-medium">
          Al registrarse y utilizar nuestros servicios, el Usuario acepta expresamente las disposiciones aquí contenidas.
        </p>
      </section>

      {/* Objeto */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Objeto</h2>
        <p>
          La plataforma permite a negocios o profesionales gestionar citas en línea con sus clientes, automatizar recordatorios, consultar agendas, y mantener información organizada en un entorno digital seguro.
        </p>
      </section>

      {/* Registro y Responsabilidades */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Registro y Responsabilidades del Usuario</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Para acceder a los servicios, el Usuario deberá crear una cuenta y proporcionar datos veraces de su negocio.</li>
          <li>El Usuario es responsable de la veracidad de la información que introduce, tanto propia como de sus clientes.</li>
          <li>El Usuario debe mantener la confidencialidad de sus credenciales de acceso y notificar inmediatamente cualquier uso no autorizado de su cuenta.</li>
        </ul>
      </section>

      {/* Uso del Servicio */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Uso del Servicio</h2>
        <p>
          El Usuario utilizará la Plataforma exclusivamente para fines lícitos y relacionados con su actividad profesional. Está prohibido el uso del sistema para actividades fraudulentas, spam, o cualquier otro propósito contrario a la ley o a la moral.
        </p>
      </section>

      {/* Información de Clientes */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Información de Clientes</h2>
        <p>
          Al utilizar la Plataforma, el Usuario podrá ingresar datos personales de sus propios clientes (nombre, correo, teléfono, motivo de cita, etc.).
        </p>
        <p>
          El Usuario declara tener el consentimiento informado de sus clientes para capturar, almacenar y tratar dicha información en la Plataforma.
        </p>
        <p>
          La Empresa titular de la Plataforma actúa como encargado del tratamiento de esos datos, comprometiéndose a la custodia, confidencialidad y no divulgación de los mismos.
        </p>
      </section>

      {/* Propiedad Intelectual */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Propiedad Intelectual</h2>
        <p>
          Todo el contenido, diseño y código fuente de la Plataforma es propiedad exclusiva de [Nombre de la Empresa titular de la plataforma], y no podrá ser copiado, distribuido ni utilizado sin autorización.
        </p>
      </section>

      {/* Limitación de Responsabilidad */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Limitación de Responsabilidad</h2>
        <p>
          La Empresa no se hace responsable de pérdidas, daños, cancelaciones de citas o cualquier perjuicio derivado del mal uso de la Plataforma o de interrupciones del servicio ajenas a su control.
        </p>
      </section>

      {/* Suspensión del Servicio */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Suspensión o Terminación del Servicio</h2>
        <p>
          La Empresa se reserva el derecho de suspender o eliminar cuentas en caso de incumplimiento de estos términos, uso abusivo o sospechas de actividad ilícita.
        </p>
      </section>

      {/* Legislación */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Legislación Aplicable</h2>
        <p>
          Estos Términos se rigen por las leyes de [país], y cualquier conflicto será resuelto en los tribunales de [ciudad o estado].
        </p>
      </section>

      {/* Aviso de Privacidad - Administradores */}
      <section className="space-y-6 pt-8">
        <h2 className="text-2xl font-bold border-b pb-2">
          AVISO DE PRIVACIDAD PARA USUARIOS ADMINISTRADORES (NEGOCIOS)
        </h2>
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Responsable del tratamiento de datos:</h3>
          <p>
            Al utilizar esta plataforma, el Usuario reconoce que es el único responsable del tratamiento de los datos personales de sus clientes, de conformidad con las leyes aplicables. El Usuario se obliga a contar con el consentimiento adecuado de sus clientes para registrar y gestionar sus datos en el sistema, y a cumplir con sus obligaciones como responsable del tratamiento.
          </p>
          <p>
            La empresa titular de esta plataforma actúa como encargado del tratamiento, limitando su intervención al resguardo técnico y operación del sistema bajo estándares de seguridad y confidencialidad.
          </p>

          <h3 className="text-lg font-semibold">Datos que se recaban:</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Nombre del representante o usuario</li>
            <li>Nombre del negocio o marca</li>
            <li>Correo electrónico</li>
            <li>Teléfono de contacto</li>
            <li>Logotipo, descripción del negocio</li>
            <li>Ubicación y horarios</li>
            <li>Preferencias de configuración del servicio</li>
            <li>Información técnica como IP, navegador, sistema operativo</li>
          </ul>

          <h3 className="text-lg font-semibold">Finalidad del tratamiento:</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Crear y administrar cuentas de usuarios</li>
            <li>Proveer el servicio de gestión de citas</li>
            <li>Enviar notificaciones administrativas</li>
            <li>Emitir facturación y comprobantes</li>
            <li>Mejorar la funcionalidad del sistema</li>
          </ul>

          <h3 className="text-lg font-semibold">Derechos ARCO:</h3>
          <p>
            El Usuario tiene derecho a Acceder, Rectificar, Cancelar u Oponerse al tratamiento de sus datos, conforme a la legislación aplicable. Para ejercer estos derechos, puede enviar una solicitud al correo: <span className="font-semibold">[privacidad@dominio.com]</span>.
          </p>

          <h3 className="text-lg font-semibold">Transferencia de datos:</h3>
          <p>
            No se realizarán transferencias de datos personales a terceros, salvo obligación legal o cuando sea estrictamente necesario para la prestación del servicio (por ejemplo, almacenamiento en servidores en la nube).
          </p>
        </div>
      </section>

      {/* Aviso de Privacidad - Clientes Finales */}
      <section className="space-y-6 pt-8">
        <h2 className="text-2xl font-bold border-b pb-2">
          AVISO DE PRIVACIDAD PARA CLIENTES FINALES (CLIENTES QUE AGENDAN CITAS)
        </h2>
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Responsable del tratamiento de sus datos personales:</h3>
          <p>
            El negocio o proveedor del servicio con el que usted agenda su cita a través de esta plataforma es el responsable del tratamiento de sus datos personales, conforme a la legislación vigente.
          </p>
          <p>
            Esta plataforma, únicamente actúa como encargado del tratamiento, proporcionando el servicio tecnológico para la gestión de citas, sin tener acceso, control ni fines propios sobre sus datos personales.
          </p>

          <h3 className="text-lg font-semibold">Datos personales que se recaban:</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Nombre completo</li>
            <li>Número telefónico</li>
            <li>Correo electrónico</li>
            <li>Motivo de la cita o servicio solicitado</li>
            <li>Fecha y hora seleccionada</li>
          </ul>

          <h3 className="text-lg font-semibold">Finalidad del tratamiento:</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Agendar citas y enviarte confirmaciones y recordatorios</li>
            <li>Comunicarte cambios, cancelaciones o seguimiento a tu cita</li>
            <li>Mejorar la atención y servicio del negocio que te atiende</li>
          </ul>

          <h3 className="text-lg font-semibold">Custodia de datos:</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Los datos ingresados serán visibles y gestionados únicamente por el negocio al que el cliente ha agendado su cita.</li>
            <li>La Plataforma implementa medidas de seguridad para proteger la confidencialidad de la información.</li>
          </ul>

          <h3 className="text-lg font-semibold">Derechos del cliente:</h3>
          <p>
            El cliente tiene derecho a solicitar acceso, rectificación o eliminación de sus datos personales a través del negocio con el que ha interactuado. La Plataforma también puede canalizar solicitudes enviadas al correo: <span className="font-semibold">[clientes@dominio.com]</span>.
          </p>

          <h3 className="text-lg font-semibold">Conservación de datos:</h3>
          <p>
            Los datos se almacenan durante el tiempo necesario para cumplir con la finalidad descrita, y posteriormente serán eliminados de forma segura, salvo obligación legal de conservación.
          </p>
        </div>
      </section>
    </div>
  );
}
