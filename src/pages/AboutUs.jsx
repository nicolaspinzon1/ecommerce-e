import { Carousel } from "../components/Carousel";
import { blogs } from "../data/data";

function AboutUs() {
  const carouseLogos = [...blogs, ...blogs];

  return (
    <div className="overflow-hidden bg-white">
      <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-10">
        <div
          className="flex justify-center items-center"
          style={{
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "300px",
          }}
        >
          <img
            src="https://res.cloudinary.com/dlxf1d5ag/image/upload/v1716502783/Yamaha-MT-09-2019-26-1200x900_gvprda.jpg"
            alt=""
            className="h-full w-full sm:w-[80%] object-cover object-center"
          />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-5">
          <div className="text-center">
            <h1 className="text-4xl font-bold">Bienvenidos Motobikershop</h1>
            <p className="mt-4 text-xl text-gray-500">
              Aquí es donde los verdaderos amantes de las motos encuentran los
              accesorios perfectos para llevar su pasión al siguiente nivel.
              Desde cascos de alta calidad hasta equipos de protección y gadgets
              innovadores, estamos aquí para equiparte con todo lo que necesitas
              para tus aventuras en dos ruedas. ¡Explora nuestro catálogo y
              prepárate para vivir la emoción de la carretera con estilo y
              seguridad!
            </p>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mt-4 text-center ">
            Explora Nuestras Marcas
          </h1>
          <div className="container my-5">
            <div className="overflow-hidden w-full">
              <div className="flex whitespace-nowrap animate-scroll">
                {carouseLogos.map((blog, index) => (
                  <Carousel blog={blog} key={index} />
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-full sm:w-1/2 ">
              <div className="text-center sm:text-left">
                <h1 className="text-4xl font-bold text-center">Misión</h1>
                <p className="mt-4 text-xl text-gray-500">
                  Proporcionar a los entusiastas de las motocicletas los
                  accesorios y equipos más innovadores, seguros y de alta
                  calidad para que disfruten al máximo de su pasión por las dos
                  ruedas. Nos esforzamos por ofrecer una experiencia de compra
                  excepcional, brindando un servicio al cliente de primera clase
                  y asegurando la satisfacción total de nuestros clientes en
                  cada interacción.
                </p>
              </div>
            </div>
            <div className="w-full sm:w-1/2 ">
              <div className="text-center sm:text-left">
                <h1 className="text-4xl font-bold text-center">Visión</h1>
                <p className="mt-4 text-xl text-gray-500">
                  Convertirnos en el destino preferido para los motociclistas de
                  todo el mundo, ofreciendo una amplia gama de productos que
                  satisfagan todas sus necesidades y deseos. Aspiramos a ser
                  reconocidos como líderes en la industria por nuestra
                  dedicación a la calidad, la innovación y el servicio al
                  cliente, contribuyendo así al crecimiento y la comunidad
                  global de amantes de las motocicletas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
